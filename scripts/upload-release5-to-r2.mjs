#!/usr/bin/env node
/**
 * Upload PURSUE Release 05 files to Cloudflare R2 using the same public key
 * layout as earlier releases: pdf/<filename>, video/<filename>, image/<filename>.
 */
import {
  S3Client,
  HeadBucketCommand,
  PutObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('.');
const DATA_FILE = path.join(ROOT, 'src/data/release-05-documents.ts');
const DOCUMENT_DIR = path.join(ROOT, 'source-files/release5/Documents');
const VIDEO_DIR = path.join(ROOT, 'source-files/release5/videos');

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx <= 0) continue;
    const key = line.slice(0, eqIdx).trim();
    const value = line.slice(eqIdx + 1).trim();
    if (key && value) env[key] = value;
  }
  return env;
}

function loadRelease05Documents() {
  const text = fs.readFileSync(DATA_FILE, 'utf8');
  const start = text.indexOf('= [') + 2;
  const end = text.lastIndexOf('];') + 1;
  if (start < 2 || end < 1) {
    throw new Error(`Unable to parse ${DATA_FILE}`);
  }
  return JSON.parse(text.slice(start, end));
}

function getMime(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.mp4': 'video/mp4',
    '.pdf': 'application/pdf',
    '.webp': 'image/webp',
  };
  return mimes[ext] || 'application/octet-stream';
}

function findLocalFile(file) {
  const baseDir = file.type === 'video' ? VIDEO_DIR : DOCUMENT_DIR;
  const filePath = path.join(baseDir, file.filename);
  return fs.existsSync(filePath) ? filePath : null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(fn, label, maxAttempts = 4) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === maxAttempts) break;
      const delay = 1000 * attempt;
      console.warn(`Retry ${label} after error: ${err.message}`);
      await sleep(delay);
    }
  }
  throw lastErr;
}

async function uploadFile({ s3, bucket, key, filePath, contentType }) {
  const stats = fs.statSync(filePath);
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fs.createReadStream(filePath),
    ContentLength: stats.size,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }));
  return stats.size;
}

async function uploadFileMultipart({ s3, bucket, key, filePath, contentType }) {
  const stats = fs.statSync(filePath);
  const partSize = 64 * 1024 * 1024;
  let uploadId;

  try {
    const created = await s3.send(new CreateMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    uploadId = created.UploadId;

    const parts = [];
    const partCount = Math.ceil(stats.size / partSize);
    for (let partNumber = 1; partNumber <= partCount; partNumber += 1) {
      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize, stats.size) - 1;
      const uploaded = await withRetry(
        () => s3.send(new UploadPartCommand({
          Bucket: bucket,
          Key: key,
          UploadId: uploadId,
          PartNumber: partNumber,
          Body: fs.createReadStream(filePath, { start, end }),
          ContentLength: end - start + 1,
        })),
        `${key} part ${partNumber}/${partCount}`
      );
      parts.push({ ETag: uploaded.ETag, PartNumber: partNumber });
      console.log(`Uploaded part ${partNumber}/${partCount} for ${key}`);
    }

    await s3.send(new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    }));
    return stats.size;
  } catch (err) {
    if (uploadId) {
      await s3.send(new AbortMultipartUploadCommand({ Bucket: bucket, Key: key, UploadId: uploadId })).catch(() => {});
    }
    throw err;
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const forceMultipart = process.argv.includes('--multipart');
  const onlyArg = process.argv.find((arg) => arg.startsWith('--only='));
  const onlyFiles = onlyArg
    ? new Set(onlyArg.slice('--only='.length).split(',').map((item) => item.trim()).filter(Boolean))
    : null;
  const env = loadEnv();
  const bucket = env.R2_BUCKET_NAME || 'ufo-declassified-media';
  const s3 = new S3Client({
    region: 'auto',
    endpoint: env.R2_ENDPOINT,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });

  if (!dryRun) {
    console.log('Testing R2 connection...');
    await s3.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log(`Connected to bucket: ${bucket}`);
  }

  const docs = loadRelease05Documents();
  const fileEntries = docs
    .flatMap((doc) => doc.files.map((file) => ({ doc, file })))
    .filter(({ file }) => !onlyFiles || onlyFiles.has(file.filename));
  const uploadedKeys = new Set();
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  let totalBytes = 0;

  for (const { doc, file } of fileEntries) {
    const key = `${file.type}/${file.filename}`;
    if (uploadedKeys.has(key)) {
      skipped += 1;
      console.log(`Skip duplicate ${key}`);
      continue;
    }

    const filePath = findLocalFile(file);
    if (!filePath) {
      failed += 1;
      console.error(`Missing local file for ${key} (${doc.id})`);
      continue;
    }

    try {
      if (dryRun) {
        const stats = fs.statSync(filePath);
        uploadedKeys.add(key);
        uploaded += 1;
        totalBytes += stats.size;
        console.log(`Would upload ${key} (${(stats.size / 1024 / 1024).toFixed(1)} MB)`);
        continue;
      }

      const stats = fs.statSync(filePath);
      const contentType = file.contentType || getMime(file.filename);
      const bytes = forceMultipart || stats.size > 512 * 1024 * 1024
        ? await uploadFileMultipart({ s3, bucket, key, filePath, contentType })
        : await uploadFile({ s3, bucket, key, filePath, contentType });
      uploadedKeys.add(key);
      uploaded += 1;
      totalBytes += bytes;
      console.log(`Uploaded ${key} (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
    } catch (err) {
      failed += 1;
      console.error(`Failed ${key}: ${err.message}`);
    }
  }

  const verb = dryRun ? 'Checked' : 'Uploaded';
  console.log(`Done. ${verb}: ${uploaded}, skipped: ${skipped}, failed: ${failed}, total: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
