import fs from 'fs';

const content = fs.readFileSync('public/obj_9.txt', 'utf-8');
const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

let svgPaths = [];
let currentPath = '';
let currentColor = '#ffffff';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(/\s+/);
  const op = parts[parts.length - 1];
  
  if (op === 'k') {
    const c = parseFloat(parts[0]);
    const m = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const k = parseFloat(parts[3]);
    if (k > 0.9) {
      currentColor = '#000000';
    } else if (m > 0.8 && y > 0.8) {
      currentColor = '#e61e2b'; // Vibrant brand red
    } else if (c < 0.2 && m < 0.2 && y < 0.2 && k === 0) {
      currentColor = '#ffffff'; // Brand white
    } else {
      const r = Math.round(255 * (1 - c) * (1 - k));
      const g = Math.round(255 * (1 - m) * (1 - k));
      const b = Math.round(255 * (1 - y) * (1 - k));
      currentColor = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }
  } else if (op === 'm') {
    const x = parseFloat(parts[0]);
    const y = 15000 - parseFloat(parts[1]);
    currentPath += 'M ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
  } else if (op === 'l') {
    const x = parseFloat(parts[0]);
    const y = 15000 - parseFloat(parts[1]);
    currentPath += 'L ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
  } else if (op === 'c') {
    const x1 = parseFloat(parts[0]);
    const y1 = 15000 - parseFloat(parts[1]);
    const x2 = parseFloat(parts[2]);
    const y2 = 15000 - parseFloat(parts[3]);
    const x3 = parseFloat(parts[4]);
    const y3 = 15000 - parseFloat(parts[5]);
    currentPath += 'C ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ', ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + ', ' + x3.toFixed(2) + ' ' + y3.toFixed(2) + ' ';
  } else if (op === 'v') {
    const x2 = parseFloat(parts[0]);
    const y2 = 15000 - parseFloat(parts[1]);
    const x3 = parseFloat(parts[2]);
    const y3 = 15000 - parseFloat(parts[3]);
    currentPath += 'S ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + ', ' + x3.toFixed(2) + ' ' + y3.toFixed(2) + ' ';
  } else if (op === 'h') {
    currentPath += 'Z ';
  } else if (op === 'f') {
    if (currentPath.trim()) {
      svgPaths.push({ d: currentPath.trim(), fill: currentColor });
      currentPath = '';
    }
  }
}

console.log('Total SVG paths extracted:', svgPaths.length);
svgPaths.forEach((p, idx) => {
  console.log(`Path ${idx}: fill=${p.fill}, d_length=${p.d.length}`);
});

// Also check the bounding box of the non-background paths (excluding full canvas 15000x15000)
const nonBgPaths = svgPaths.filter(p => p.fill !== '#000000');

console.log('Non-background paths:', nonBgPaths.length);

const svgOutput = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15000 15000" width="100%" height="100%">
  <rect width="15000" height="15000" fill="#000000"/>
${svgPaths.filter(p => p.fill !== '#000000').map(p => `  <path d="${p.d}" fill="${p.fill}" />`).join('\n')}
</svg>`;

fs.writeFileSync('public/logo_raw_extracted.svg', svgOutput, 'utf-8');
console.log('Saved raw extracted SVG to public/logo_raw_extracted.svg');
