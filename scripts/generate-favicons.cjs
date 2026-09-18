const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const logoMarkPath = path.join(PUBLIC_DIR, 'logo_mark.svg');
const rawSvg = fs.readFileSync(logoMarkPath, 'utf8');

// Extract paths from logo_mark.svg
const innerSvgContent = rawSvg.replace(/<svg[^>]*>|<\/svg>/gi, '');

// Master SVG template for squircle / rounded icon (favicons and Android)
function getIconSvg({ isSquare = false } = {}) {
  const rx = isSquare ? 0 : 100;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1626" />
      <stop offset="50%" stop-color="#070f1a" />
      <stop offset="100%" stop-color="#04080e" />
    </linearGradient>
    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(238, 216, 138, 0.4)" />
      <stop offset="100%" stop-color="rgba(238, 216, 138, 0.1)" />
    </linearGradient>
  </defs>

  <!-- Deep Brand Navy Canvas with Gold Accent Border -->
  <rect width="512" height="512" rx="${rx}" fill="url(#bgGrad)" />
  <rect width="506" height="506" x="3" y="3" rx="${Math.max(0, rx - 3)}" fill="none" stroke="url(#goldBorder)" stroke-width="6" />

  <!-- Authentic Al Arbab 'A' with Ascending Jet and Flight Orbit -->
  <g transform="translate(64, 64) scale(0.75)">
    <svg viewBox="4400 4000 6200 5000" width="512" height="512">
      ${innerSvgContent}
    </svg>
  </g>
</svg>`;
}

async function generate() {
  console.log('🎨 Generating Al Arbab Travel Favicon Set...');

  const roundedSvg = Buffer.from(getIconSvg({ isSquare: false }));
  const squareSvg = Buffer.from(getIconSvg({ isSquare: true }));

  // 1. favicon-16x16.png
  console.log('Generating favicon-16x16.png...');
  const buf16 = await sharp(roundedSvg).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), buf16);

  // 2. favicon-32x32.png
  console.log('Generating favicon-32x32.png...');
  const buf32 = await sharp(roundedSvg).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), buf32);

  // 3. favicon-48x48.png (for ICO multi-size bundle)
  console.log('Generating 48x48 for ICO...');
  const buf48 = await sharp(roundedSvg).resize(48, 48).png().toBuffer();

  // 4. apple-touch-icon.png (180x180 - iOS expects square, applies its own mask)
  console.log('Generating apple-touch-icon.png (180x180)...');
  const buf180 = await sharp(squareSvg).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), buf180);

  // 5. android-chrome-192x192.png (192x192)
  console.log('Generating android-chrome-192x192.png...');
  const buf192 = await sharp(roundedSvg).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'), buf192);

  // 6. android-chrome-512x512.png (512x512)
  console.log('Generating android-chrome-512x512.png...');
  const buf512 = await sharp(roundedSvg).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'), buf512);

  // 7. favicon.ico (multi-size: 16x16, 32x32, 48x48)
  console.log('Packing favicon.ico (16, 32, 48 multi-size)...');
  const icoBuf = await toIco([buf16, buf32, buf48]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuf);

  console.log('✅ All favicon and icon assets generated successfully in /public!');
}

generate().catch(err => {
  console.error('❌ Failed to generate favicons:', err);
  process.exit(1);
});
