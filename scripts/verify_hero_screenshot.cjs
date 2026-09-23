const puppeteer = require('puppeteer-core');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scripts/hero_and_marquee_preview.png' });
  console.log('Saved hero_and_marquee_preview.png');

  // Mobile viewport test
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/hero_marquee_mobile_preview.png' });
  console.log('Saved hero_marquee_mobile_preview.png');

  await browser.close();
}

test().catch(console.error);
