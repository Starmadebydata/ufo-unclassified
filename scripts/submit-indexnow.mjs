#!/usr/bin/env node
/**
 * Submit all site URLs to IndexNow (Bing, Yandex, Seznam, Naver)
 * Reads from the built sitemap and submits in bulk.
 */

const SITE = 'https://ufo-declassified.com';
const KEY = 'd35c5737d716d5cb971bbe496b5f84f3';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  // 1. Fetch sitemap from live site
  console.log('📡 Fetching sitemap...');
  const sitemapIndexUrl = `${SITE}/sitemap-index.xml`;
  const indexRes = await fetch(sitemapIndexUrl);
  const indexXml = await indexRes.text();

  // Extract sitemap URLs from the index
  const sitemapUrls = [...indexXml.matchAll(/<loc>(.+?)<\/loc>/g)].map(m => m[1]);
  console.log(`   Found ${sitemapUrls.length} sitemap(s)`);

  // 2. Fetch each sub-sitemap and collect all page URLs
  const allUrls = [];
  for (const smUrl of sitemapUrls) {
    const res = await fetch(smUrl);
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>(.+?)<\/loc>/g)].map(m => m[1]);
    allUrls.push(...urls);
    console.log(`   ${smUrl} → ${urls.length} URLs`);
  }

  console.log(`\n📋 Total URLs to submit: ${allUrls.length}`);

  // 3. Submit to IndexNow in batch (max 10,000 per request)
  const batchSize = 10000;
  for (let i = 0; i < allUrls.length; i += batchSize) {
    const batch = allUrls.slice(i, i + batchSize);
    const payload = {
      host: 'ufo-declassified.com',
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    };

    console.log(`\n🚀 Submitting batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs)...`);

    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`   ✅ Success! Status: ${res.status}`);
    } else {
      const body = await res.text();
      console.error(`   ❌ Failed! Status: ${res.status}`);
      console.error(`   Response: ${body}`);
    }
  }

  console.log('\n🏁 IndexNow submission complete!');
  console.log('   URLs will be crawled by Bing, Yandex, Seznam, and Naver within 24 hours.');
  console.log(`\n📊 Submitted URLs:`);
  allUrls.slice(0, 10).forEach(u => console.log(`   ${u}`));
  if (allUrls.length > 10) console.log(`   ... and ${allUrls.length - 10} more`);
}

main().catch(console.error);
