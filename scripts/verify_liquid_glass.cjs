const puppeteer = require('puppeteer-core');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // 1. Desktop test
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scripts/liquid_glass_desktop.png' });
  console.log('Saved liquid_glass_desktop.png');

  // 2. Focused screenshot of widget
  const widget = await page.$('.liquid-glass-widget');
  if (widget) {
    await widget.screenshot({ path: 'scripts/liquid_glass_card_only.png' });
    console.log('Saved liquid_glass_card_only.png');
  }

  // 3. Mobile test
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const el = document.querySelector('.liquid-glass-widget');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scripts/liquid_glass_mobile.png' });
  console.log('Saved liquid_glass_mobile.png');

  await browser.close();
}

test().catch(console.error);
