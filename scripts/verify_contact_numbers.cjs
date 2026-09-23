const puppeteer = require('puppeteer-core');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Check Header Utility Strip
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const headerContact = await page.evaluate(() => {
    const ptcl = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('0512000066'));
    const whatsapp = Array.from(document.querySelectorAll('a')).find(a => a.href.includes('923099923232') && a.innerText.includes('WhatsApp'));
    return {
      ptcl: ptcl ? { text: ptcl.innerText.trim(), href: ptcl.href } : null,
      whatsapp: whatsapp ? { text: whatsapp.innerText.trim(), href: whatsapp.href } : null
    };
  });
  console.log('Header Strip Contact:', headerContact);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_header_numbers.png') });

  // 2. Check Contact Page
  await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const contactPageNumbers = await page.evaluate(() => {
    const body = document.body.innerText;
    return {
      hasPTCL: body.includes('051 2000066'),
      hasMobile1: body.includes('0309 9923232'),
      hasMobile2: body.includes('0315 2323811')
    };
  });
  console.log('Contact Page Numbers:', contactPageNumbers);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_contact_page_numbers.png') });

  // 3. Check Footer
  const footerContact = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    return footer ? {
      hasPTCL: footer.innerText.includes('051 2000066'),
      hasMobile1: footer.innerText.includes('0309 9923232'),
      hasMobile2: footer.innerText.includes('0315 2323811')
    } : null;
  });
  console.log('Footer Contact:', footerContact);

  await browser.close();
  console.log('Verification finished successfully!');
}

main().catch(console.error);
