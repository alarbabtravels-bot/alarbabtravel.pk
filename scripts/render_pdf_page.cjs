const puppeteer = require('puppeteer-core');
const path = require('path');

async function renderPdf() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 2560, deviceScaleFactor: 2 });
  
  const pdfFilePath = 'file:///C:/Users/w/Downloads/Blue%20and%20Yellow%20Illustrative%20Travel%20Instagram%20Story.pdf';
  console.log('Navigating to:', pdfFilePath);
  await page.goto(pdfFilePath, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: 'scripts/rendered_pdf.png' });
  console.log('Screenshot saved to scripts/rendered_pdf.png');

  await browser.close();
}

renderPdf().catch(console.error);
