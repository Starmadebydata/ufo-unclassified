#!/usr/bin/env node
/**
 * Upload PURSUE Release 02 files to Cloudflare R2 using the same public key
 * layout as Release 01: pdf/<filename>, video/<filename>, audio/<filename>.
 */
import { S3Client, HeadBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('.');
const DATA_FILE = path.join(ROOT, 'src/data/release-02-documents.ts');
const DOCUMENT_DIR = path.join(ROOT, 'source-files/release2/release_02_document_bundle');
const MEDIA_DIR = path.join(ROOT, 'source-files/release2/uap052226');

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

function loadRelease02Documents() {
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
  if (file.type === 'pdf') {
    const pdfPath = path.join(DOCUMENT_DIR, file.filename);
    return fs.existsSync(pdfPath) ? pdfPath : null;
  }

  const dodId = file.filename.match(/DOD_\d+/)?.[0];
  if (!dodId) return null;
  const match = fs
    .readdirSync(MEDIA_DIR)
    .find((name) => !name.startsWith('.') && name.includes(dodId) && path.extname(name).toLowerCase() === '.mp4');

  return match ? path.join(MEDIA_DIR, match) : null;
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

async function main() {
  const dryRun = process.argv.includes('--dry-run');
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

  const docs = loadRelease02Documents();
  const fileEntries = docs.flatMap((doc) => doc.files.map((file) => ({ doc, file })));
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

      const bytes = await uploadFile({
        s3,
        bucket,
        key,
        filePath,
        contentType: file.contentType || getMime(file.filename),
      });
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
