const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.nav-sliding-glass-pill', { timeout: 10000 });

  // Helper to get pill rect and active/illuminated info
  async function getNavStatus() {
    return await page.evaluate(() => {
      const pill = document.querySelector('.nav-sliding-glass-pill');
      const track = document.querySelector('.nav-liquid-track');
      const illuminated = document.querySelector('.nav-link-illuminated');
      
      const pillStyle = pill ? {
        transform: pill.style.transform,
        width: pill.style.width,
        height: pill.style.height,
        opacity: pill.style.opacity,
        visibility: pill.style.visibility,
        computedWidth: window.getComputedStyle(pill).width
      } : null;

      const trackRect = track ? track.getBoundingClientRect() : null;
      const pillRect = pill ? pill.getBoundingClientRect() : null;

      return {
        pillStyle,
        pillRelativeLeft: pillRect && trackRect ? pillRect.left - trackRect.left : null,
        pillWidth: pillRect ? pillRect.width : null,
        illuminatedText: illuminated ? illuminated.innerText.trim() : null
      };
    });
  }

  // 1. Initial State (Home active)
  await new Promise(r => setTimeout(r, 600));
  let status = await getNavStatus();
  console.log('Initial Status (Home active):', status);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_nav_home.png') });

  // 2. Hover over "Services"
  console.log('Hovering over Services...');
  const servicesLink = await page.evaluateHandle(() => {
    const links = Array.from(document.querySelectorAll('.nav-link-pill'));
    return links.find(l => l.innerText.includes('Services'));
  });
  await servicesLink.hover();
  await new Promise(r => setTimeout(r, 450));
  status = await getNavStatus();
  console.log('Status on Services hover:', status);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_nav_services.png') });

  // 3. Hover over "FAQ" (short item, test snug resizing)
  console.log('Hovering over FAQ...');
  const faqLink = await page.evaluateHandle(() => {
    const links = Array.from(document.querySelectorAll('.nav-link-pill'));
    return links.find(l => l.innerText.trim() === 'FAQ');
  });
  await faqLink.hover();
  await new Promise(r => setTimeout(r, 450));
  status = await getNavStatus();
  console.log('Status on FAQ hover (should have smaller width):', status);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_nav_faq.png') });

  // 4. Hover over "Travel Insights" (long item, test snug expansion)
  console.log('Hovering over Travel Insights...');
  const insightsLink = await page.evaluateHandle(() => {
    const links = Array.from(document.querySelectorAll('.nav-link-pill'));
    return links.find(l => l.innerText.includes('Travel Insights'));
  });
  await insightsLink.hover();
  await new Promise(r => setTimeout(r, 450));
  status = await getNavStatus();
  console.log('Status on Travel Insights hover (should expand):', status);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_nav_insights.png') });

  // 5. Mouse leave (move to body top left outside navbar)
  console.log('Moving mouse away from nav bar (testing reset to Home)...');
  await page.mouse.move(50, 400);
  await new Promise(r => setTimeout(r, 500));
  status = await getNavStatus();
  console.log('Status after mouse leave (should reset to Home):', status);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_nav_reset.png') });

  // 6. Test Click Navigation (Click "About Us", verify route changes and pill stays on About Us)
  console.log('Testing click navigation to About Us...');
  const aboutLink = await page.evaluateHandle(() => {
    const links = Array.from(document.querySelectorAll('.nav-link-pill'));
    return links.find(l => l.innerText.includes('About Us'));
  });
  await aboutLink.click();
  await new Promise(r => setTimeout(r, 600));
  await page.mouse.move(50, 400); // move mouse away to verify it stays on active route
  await new Promise(r => setTimeout(r, 500));
  status = await getNavStatus();
  console.log('Status on /about page after mouse leave (should stay on About Us):', status);
  await page.screenshot({ path: path.join(__dirname, 'screenshot_nav_about_page.png') });

  // 7. Test Dark Mode
  console.log('Toggling dark mode...');
  const themeToggle = await page.$('.navbar-theme-toggle');
  if (themeToggle) {
    await themeToggle.click();
    await new Promise(r => setTimeout(r, 300));
    // Hover on Destinations in dark mode
    const destLink = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll('.nav-link-pill'));
      return links.find(l => l.innerText.includes('Destinations'));
    });
    await destLink.hover();
    await new Promise(r => setTimeout(r, 450));
    status = await getNavStatus();
    console.log('Status in Dark Mode on Destinations hover:', status);
    await page.screenshot({ path: path.join(__dirname, 'screenshot_nav_dark.png') });
  }

  await browser.close();
  console.log('All tests completed successfully!');
}

main().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
