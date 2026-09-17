const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:4173';

const BREAKPOINTS = [
  { name: 'Mobile 375 (iPhone SE)', width: 375, height: 667, type: 'mobile' },
  { name: 'Mobile 390 (iPhone 14)', width: 390, height: 844, type: 'mobile' },
  { name: 'Large Mobile 428', width: 428, height: 926, type: 'mobile' },
  { name: 'Tablet 768 (iPad portrait)', width: 768, height: 1024, type: 'tablet' },
  { name: 'Tablet 1024 (iPad landscape)', width: 1024, height: 768, type: 'tablet' },
  { name: 'Desktop 1280', width: 1280, height: 800, type: 'desktop' },
  { name: 'Desktop 1440', width: 1440, height: 900, type: 'desktop' },
  { name: 'Desktop 1920', width: 1920, height: 1080, type: 'desktop' },
];

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Destination Detail', path: '/destinations/malaysia' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Starting Responsive & Layout Verification...\n');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const results = [];

  for (const bp of BREAKPOINTS) {
    console.log(`\n======================================================`);
    console.log(`📱 Testing Viewport: ${bp.name} (${bp.width}x${bp.height})`);
    console.log(`======================================================`);
    await page.setViewport({ width: bp.width, height: bp.height, isMobile: bp.type === 'mobile' });

    for (const p of PAGES) {
      const url = `${BASE_URL}${p.path}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
      // Small pause for any animations
      await new Promise(r => setTimeout(r, 400));

      const pageMetrics = await page.evaluate((bp) => {
        const docWidth = document.documentElement.scrollWidth;
        const bodyWidth = document.body.scrollWidth;
        const winWidth = window.innerWidth;
        const hasOverflow = docWidth > winWidth || bodyWidth > winWidth;

        // Find overflowing elements if any
        const overflowingElements = [];
        if (hasOverflow) {
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > winWidth + 1 || r.left < -1) {
              overflowingElements.push({
                tag: el.tagName.toLowerCase(),
                id: el.id,
                className: typeof el.className === 'string' ? el.className.slice(0, 50) : '',
                right: Math.round(r.right),
                width: Math.round(r.width)
              });
            }
          });
        }

        // Check grid columns if on destinations page
        let gridCols = null;
        const destGrid = document.querySelector('.destinations-responsive-grid');
        if (destGrid) {
          const style = window.getComputedStyle(destGrid);
          gridCols = style.gridTemplateColumns.split(' ').length;
        }

        // Check touch targets on buttons & links
        let smallTouchTargets = 0;
        const buttons = Array.from(document.querySelectorAll('button, a[href], input[type="button"], input[type="submit"]'));
        buttons.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          // only check visible elements
          if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(btn).display !== 'none') {
            if (rect.width < 40 && rect.height < 40) {
              smallTouchTargets++;
            }
          }
        });

        // Check input font size
        const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
        const smallInputs = inputs.filter(inp => {
          const fs = parseFloat(window.getComputedStyle(inp).fontSize);
          return fs < 16;
        }).length;

        // Check WhatsApp floating button
        const waBtn = document.querySelector('a[href*="whatsapp"], a[aria-label*="WhatsApp"], [data-whatsapp]');
        let waVisible = false;
        if (waBtn) {
          const r = waBtn.getBoundingClientRect();
          waVisible = r.width > 0 && r.height > 0 && r.top < window.innerHeight;
        }

        return {
          winWidth,
          docWidth,
          hasOverflow,
          overflowCount: overflowingElements.length,
          topOverflow: overflowingElements.slice(0, 3),
          gridCols,
          smallTouchTargets,
          smallInputs,
          waVisible
        };
      }, bp);

      const status = !pageMetrics.hasOverflow ? '✅ PASS' : '❌ FAIL (OVERFLOW)';
      console.log(`  ${status} [${p.name.padEnd(20)}] Scroll: ${pageMetrics.docWidth}px / ${pageMetrics.winWidth}px | Touch: ${pageMetrics.smallTouchTargets} small | InputFont: ${pageMetrics.smallInputs} <16px ${pageMetrics.gridCols ? `| GridCols: ${pageMetrics.gridCols}` : ''}`);

      if (pageMetrics.hasOverflow) {
        console.log(`      ⚠️  Overflow elements:`, pageMetrics.topOverflow);
      }

      // Take screenshots for representative viewports (375, 768, 1440)
      if ([375, 768, 1440].includes(bp.width) && ['Home', 'Destinations', 'Contact'].includes(p.name)) {
        const shotPath = path.join(SCREENSHOT_DIR, `${p.name.toLowerCase()}_${bp.width}.png`);
        await page.screenshot({ path: shotPath, fullPage: false });
      }

      results.push({
        viewport: bp.name,
        width: bp.width,
        page: p.name,
        hasOverflow: pageMetrics.hasOverflow,
        gridCols: pageMetrics.gridCols,
        smallInputs: pageMetrics.smallInputs
      });
    }
  }

  await browser.close();

  const totalChecks = results.length;
  const failedChecks = results.filter(r => r.hasOverflow);
  console.log(`\n======================================================`);
  console.log(`📊 SUMMARY: ${totalChecks} tests completed.`);
  console.log(`Passed: ${totalChecks - failedChecks.length} / ${totalChecks}`);
  if (failedChecks.length > 0) {
    console.log(`Failed checks:`, failedChecks);
  } else {
    console.log(`🎉 ALL VIEWPORTS & PAGES HAVE ZERO HORIZONTAL OVERFLOW!`);
  }
}

run().catch(console.error);
