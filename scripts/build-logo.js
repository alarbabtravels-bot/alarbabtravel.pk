import fs from 'fs';

// Read raw extracted SVG
const rawSvg = fs.readFileSync('public/logo_raw_extracted.svg', 'utf-8');

// Extract all path elements
const pathMatches = [...rawSvg.matchAll(/<path d="([^"]+)" fill="([^"]+)" \/>/g)];

// Transform coordinates from 15000 space to a clean 1000x1000 coordinate space
// Emblem center is at X=7500, Y=6400; Text is at Y=9500
// Total vertical range: 4000 to 9800 = 5800.
// Let's create two versions:
// 1. Normalized Logo Mark (Icon only: viewBox 0 0 6200 5000, shifted to 0,0)
// 2. Full Horizontal/Stacked Logo (Emblem + Text)

// Let's inspect the paths
const emblemPaths = pathMatches.map(m => ({ d: m[1], fill: m[2] }));

// Logo Mark standalone (transparent & black background versions)
// Emblem BBox: minX: 4500, maxX: 10500, minY: 4050, maxY: 8900.
// ViewBox for emblem alone: 4400 4000 6200 5000
const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4400 4000 6200 5000" width="100%" height="100%">
${emblemPaths.map(p => `  <path d="${p.d}" fill="${p.fill}" />`).join('\n')}
</svg>`;
fs.writeFileSync('public/logo_mark.svg', logoMarkSvg, 'utf-8');

// Full Logo with Text (Exact replica of original PDF layout)
// Text BBox: X from 4024.8 to 10977.6, Y around 9100 to 9700.
// Center is 7500.
// In Mont/Montserrat/Inter Bold, "Al Arbab Travel" + superscript "PK"
const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="3800 3800 7400 6400" width="100%" height="100%">
  <!-- Central Emblem: Stylized White 'A' with Red Plane & Flight Orbit -->
  <g id="logo-emblem">
${emblemPaths.map(p => `    <path d="${p.d}" fill="${p.fill}" />`).join('\n')}
  </g>

  <!-- Brand Typography: Al Arbab Travel PK -->
  <g id="logo-text" transform="translate(7500, 9600)" text-anchor="middle">
    <text 
      x="0" 
      y="0" 
      fill="#ffffff" 
      font-family="'Montserrat', 'League Spartan', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" 
      font-size="520" 
      font-weight="800" 
      letter-spacing="0.03em"
    >
      Al Arbab Travel<tspan font-size="280" font-weight="700" dx="70" dy="-230">PK</tspan>
    </text>
  </g>
</svg>`;

fs.writeFileSync('public/logo.svg', fullLogoSvg, 'utf-8');

// Full Logo on Black Square (matching original screenshot)
const fullLogoWithBgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="3000 3000 9000 9000" width="100%" height="100%">
  <rect x="3000" y="3000" width="9000" height="9000" fill="#000000" rx="360" />
  <!-- Central Emblem -->
  <g id="logo-emblem">
${emblemPaths.map(p => `    <path d="${p.d}" fill="${p.fill}" />`).join('\n')}
  </g>

  <!-- Brand Typography -->
  <g id="logo-text" transform="translate(7500, 9600)" text-anchor="middle">
    <text 
      x="0" 
      y="0" 
      fill="#ffffff" 
      font-family="'Montserrat', 'League Spartan', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" 
      font-size="520" 
      font-weight="800" 
      letter-spacing="0.03em"
    >
      Al Arbab Travel<tspan font-size="280" font-weight="700" dx="70" dy="-230">PK</tspan>
    </text>
  </g>
</svg>`;

fs.writeFileSync('public/logo_card.svg', fullLogoWithBgSvg, 'utf-8');

console.log('Successfully generated public/logo.svg, public/logo_mark.svg, and public/logo_card.svg');
