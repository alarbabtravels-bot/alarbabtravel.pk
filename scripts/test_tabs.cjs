const puppeteer = require('puppeteer-core');

async function testTabs() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Scroll to widget
  await page.evaluate(() => {
    const el = document.querySelector('.liquid-glass-widget');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 400));

  // Click Umrah tab
  const tabs = await page.$$('.glass-tab-pill');
  if (tabs[1]) {
    await tabs[1].click();
    await new Promise(r => setTimeout(r, 300));
    const widget = await page.$('.liquid-glass-widget');
    await widget.screenshot({ path: 'scripts/tab_umrah.png' });
    console.log('Saved tab_umrah.png');
  }

  // Click Flights tab
  if (tabs[2]) {
    await tabs[2].click();
    await new Promise(r => setTimeout(r, 300));
    const widget = await page.$('.liquid-glass-widget');
    await widget.screenshot({ path: 'scripts/tab_flights.png' });
    console.log('Saved tab_flights.png');
  }

  // Click Hotels tab
  if (tabs[3]) {
    await tabs[3].click();
    await new Promise(r => setTimeout(r, 300));
    const widget = await page.$('.liquid-glass-widget');
    await widget.screenshot({ path: 'scripts/tab_hotels.png' });
    console.log('Saved tab_hotels.png');
  }

  await browser.close();
}

testTabs().catch(console.error);
