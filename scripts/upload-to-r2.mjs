#!/usr/bin/env node
/**
 * Upload source-files to Cloudflare R2 using S3-compatible API
 */
import { S3Client, ListBucketsCommand, CreateBucketCommand, PutObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Load .env.local
const envFile = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const env = {};
for (const line of envFile.split('\n')) {
  if (line.startsWith('#') || !line.trim()) continue;
  const eqIdx = line.indexOf('=');
  if (eqIdx > 0) {
    const key = line.substring(0, eqIdx).trim();
    const val = line.substring(eqIdx + 1).trim();
    if (key && val) env[key] = val;
  }
}

const BUCKET = env.R2_BUCKET_NAME || 'ufo-declassified-media';
const SOURCE = path.resolve('source-files');

const s3 = new S3Client({
  region: 'auto',
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

// Determine MIME type
function getMime(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimes = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.webp': 'image/webp',
  };
  return mimes[ext] || 'application/octet-stream';
}

async function main() {
  console.log('🔌 Testing R2 connection...');
  console.log(`   Endpoint: ${env.R2_ENDPOINT}`);
  console.log(`   Bucket: ${BUCKET}`);

  // 1. Test connection by trying a small operation on the bucket directly
  try {
    await s3.send(new HeadBucketCommand({ Bucket: BUCKET }));
    console.log(`✅ Connected! Bucket '${BUCKET}' is accessible.`);
  } catch (err) {
    console.error('❌ Cannot access bucket:', err.message);
    console.log(`\n💡 Check that:`);
    console.log(`   1. Bucket '${BUCKET}' exists in Cloudflare R2`);
    console.log(`   2. The API Token has "Object Read & Write" permission on this bucket`);
    console.log(`   3. Access Key ID and Secret are correct in .env.local`);
    process.exit(1);
  }

  // 3. Upload files
  const subdirs = ['image', 'video', 'pdf'];
  let uploaded = 0, skipped = 0, failed = 0;
  
  for (const subdir of subdirs) {
    const dir = path.join(SOURCE, subdir);
    if (!fs.existsSync(dir)) { console.log(`⏭️  Skipping ${subdir}/ (not found)`); continue; }
    
    const files = fs.readdirSync(dir).filter(f => !f.startsWith('.'));
    console.log(`\n📁 Uploading ${subdir}/ (${files.length} files)...`);
    
    for (const filename of files) {
      const filePath = path.join(dir, filename);
      const key = `${subdir}/${filename}`;
      const stats = fs.statSync(filePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
      
      try {
        const body = fs.readFileSync(filePath);
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: body,
          ContentType: getMime(filename),
          CacheControl: 'public, max-age=31536000, immutable',
        }));
        uploaded++;
        console.log(`   ✅ ${key} (${sizeMB} MB)`);
      } catch (err) {
        failed++;
        console.error(`   ❌ ${key}: ${err.message}`);
      }
    }
  }
  
  console.log(`\n🏁 Done! Uploaded: ${uploaded}, Failed: ${failed}`);
  console.log(`\n📌 Next step: Enable public access for the bucket in Cloudflare Dashboard`);
  console.log(`   R2 → ${BUCKET} → Settings → Public Access → Enable`);
  console.log(`   Or connect a custom domain like media.ufodeclassified.com`);
}

main().catch(console.error);
