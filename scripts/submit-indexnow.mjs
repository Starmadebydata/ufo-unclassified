#!/usr/bin/env node
/**
 * Submit all site URLs to IndexNow (Bing, Yandex, Seznam, Naver)
 * Reads from the local built sitemap and submits in bulk.
 */
import fs from 'fs';
import path from 'path';

const SITE = 'https://ufo-declassified.com';
const KEY = 'd35c5737d716d5cb971bbe496b5f84f3';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  // 1. Build site first to get fresh sitemap
  console.log('🔨 Building site to generate fresh sitemap...');
  const { execSync } = await import('child_process');
  execSync('npm run build', { stdio: 'inherit', cwd: path.resolve('.') });

  // 2. Read sitemap from dist/
  console.log('\n📡 Reading sitemap from dist/...');
  const distDir = path.resolve('dist');

  // Find all sitemap XML files
  const sitemapFiles = fs.readdirSync(distDir).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
  console.log(`   Found ${sitemapFiles.length} sitemap file(s): ${sitemapFiles.join(', ')}`);

  // 3. Extract all URLs
  const allUrls = [];
  for (const file of sitemapFiles) {
    const xml = fs.readFileSync(path.join(distDir, file), 'utf-8');
    const urls = [...xml.matchAll(/<loc>(.+?)<\/loc>/g)]
      .map(m => m[1])
      .filter(u => !u.endsWith('.xml')); // Skip sitemap index references
    allUrls.push(...urls);
  }

  // Deduplicate
  const uniqueUrls = [...new Set(allUrls)];
  console.log(`\n📋 Total unique URLs to submit: ${uniqueUrls.length}`);

  // 4. Submit to IndexNow in batch (max 10,000 per request)
  const batchSize = 10000;
  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const batch = uniqueUrls.slice(i, i + batchSize);
    const payload = {
      host: 'ufo-declassified.com',
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    };

    console.log(`\n🚀 Submitting batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs)...`);

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (res.status === 200 || res.status === 202) {
        console.log(`   ✅ Success! Status: ${res.status} (${res.status === 200 ? 'URL submitted successfully' : 'URL received, pending crawl'})`);
      } else {
        const body = await res.text();
        console.error(`   ❌ Failed! Status: ${res.status}`);
        console.error(`   Response: ${body}`);
      }
    } catch (err) {
      console.error(`   ❌ Network error: ${err.message}`);
      console.log('   Retrying with Bing endpoint directly...');

      // Fallback: try Bing's direct endpoint
      try {
        const res2 = await fetch('https://www.bing.com/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        });
        console.log(`   Bing fallback status: ${res2.status}`);
      } catch (err2) {
        console.error(`   Bing fallback also failed: ${err2.message}`);
      }
    }
  }

  console.log('\n🏁 IndexNow submission complete!');
  console.log('   URLs will be crawled by Bing, Yandex, Seznam, and Naver within 24 hours.');
  console.log(`\n📊 Submitted ${uniqueUrls.length} URLs:`);
  uniqueUrls.slice(0, 15).forEach(u => console.log(`   ${u}`));
  if (uniqueUrls.length > 15) console.log(`   ... and ${uniqueUrls.length - 15} more`);
}

main().catch(console.error);
