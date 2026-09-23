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
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to destination cards
  await page.evaluate(() => {
    const el = document.querySelector('.interactive-destinations-wrapper');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 500));

  // 1. Move mouse to first card (e.g. Malaysia)
  const card = await page.$('.destination-card-item');
  const box = await card.boundingBox();
  console.log('Card bounding box:', box);

  // Move mouse over the card
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: 'scripts/destination_card_hover.png' });
  console.log('Saved destination_card_hover.png');

  // 2. Test click navigation
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise(r => setTimeout(r, 800));
  const currentUrl = page.url();
  console.log('URL after click:', currentUrl);

  await browser.close();
}

test().catch(console.error);
