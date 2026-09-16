const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const airlinesDir = 'c:/Users/w/Desktop/alarbab-pk-website/public/airlines';

// Reusable PNG helpers
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        if (c & 1) c = 0xedb88320 ^ (c >>> 1);
        else c = c >>> 1;
      }
      table[n] = c;
    }
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);
  
  const stride = 1 + width * 4;
  const rawData = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    rawData[y * stride] = 0;
    rgbaBuffer.copy(rawData, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idatData = zlib.deflateSync(rawData, { level: 9 });
  const idat = makeChunk('IDAT', idatData);
  const iend = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([signature, ihdr, idat, iend]);
}

function decodePNG(buf) {
  let offset = 8;
  let idatChunks = [];
  let width = buf.readUInt32BE(16);
  let height = buf.readUInt32BE(20);
  
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IDAT') {
      idatChunks.push(buf.slice(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4;
  const stride = 1 + width * bpp;
  const raw = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(width * bpp);
  
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[y * stride];
    const row = decompressed.slice(y * stride + 1, (y + 1) * stride);
    const outRow = Buffer.alloc(width * bpp);
    
    for (let x = 0; x < width * bpp; x++) {
      const byte = row[x];
      const a = (x >= bpp) ? outRow[x - bpp] : 0;
      const b = prevRow[x];
      const c = (x >= bpp) ? prevRow[x - bpp] : 0;
      
      let val = 0;
      if (filterType === 0) val = byte;
      else if (filterType === 1) val = (byte + a) & 0xff;
      else if (filterType === 2) val = (byte + b) & 0xff;
      else if (filterType === 3) val = (byte + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (byte + pr) & 0xff;
      }
      outRow[x] = val;
    }
    outRow.copy(raw, y * width * bpp);
    prevRow = outRow;
  }
  return { width, height, raw };
}

// 1. Qatar Airways White / Light variant
{
  const qatar = decodePNG(fs.readFileSync(path.join(airlinesDir, 'qatar.png')));
  const whiteRaw = Buffer.alloc(qatar.width * qatar.height * 4);
  for (let i = 0; i < qatar.width * qatar.height; i++) {
    const idx = i * 4;
    const a = qatar.raw[idx + 3];
    if (a > 10) {
      whiteRaw[idx] = 255;
      whiteRaw[idx + 1] = 255;
      whiteRaw[idx + 2] = 255;
      whiteRaw[idx + 3] = a;
    }
  }
  fs.writeFileSync(path.join(airlinesDir, 'qatar_white.png'), encodePNG(qatar.width, qatar.height, whiteRaw));
  console.log('Created qatar_white.png');
}

// 2. Saudia White variant (White text + Authentic Luxury Gold emblem)
{
  const saudia = decodePNG(fs.readFileSync(path.join(airlinesDir, 'saudia.png')));
  const optRaw = Buffer.alloc(saudia.width * saudia.height * 4);
  for (let i = 0; i < saudia.width * saudia.height; i++) {
    const idx = i * 4;
    const r = saudia.raw[idx];
    const g = saudia.raw[idx + 1];
    const b = saudia.raw[idx + 2];
    const a = saudia.raw[idx + 3];
    if (a > 10) {
      // Check if it's the gold emblem: r > 140, g > 100, b < 90 (gold/yellow tones)
      const isGold = r > 130 && g > 90 && b < 100 && (r - b > 40);
      if (isGold) {
        // Brighten the gold slightly for dark mode
        optRaw[idx] = Math.min(255, Math.round(r * 1.15));
        optRaw[idx + 1] = Math.min(255, Math.round(g * 1.15));
        optRaw[idx + 2] = Math.round(b * 1.05);
        optRaw[idx + 3] = a;
      } else {
        // Navy blue text converted to clean crisp white
        optRaw[idx] = 255;
        optRaw[idx + 1] = 255;
        optRaw[idx + 2] = 255;
        optRaw[idx + 3] = a;
      }
    }
  }
  fs.writeFileSync(path.join(airlinesDir, 'saudia_white.png'), encodePNG(saudia.width, saudia.height, optRaw));
  console.log('Created saudia_white.png');
}

// 3. airblue White / Vivid variant
{
  const airblue = decodePNG(fs.readFileSync(path.join(airlinesDir, 'airblue.png')));
  const optRaw = Buffer.alloc(airblue.width * airblue.height * 4);
  for (let i = 0; i < airblue.width * airblue.height; i++) {
    const idx = i * 4;
    const r = airblue.raw[idx];
    const g = airblue.raw[idx + 1];
    const b = airblue.raw[idx + 2];
    const a = airblue.raw[idx + 3];
    if (a > 10) {
      // "air" is gray (r ≈ g ≈ b), "blue" is navy blue (b > r, b > g)
      const isBlue = b > r + 20 && b > g + 10;
      if (isBlue) {
        // Electric / bright royal blue for dark background
        optRaw[idx] = 60;
        optRaw[idx + 1] = 130;
        optRaw[idx + 2] = 255;
        optRaw[idx + 3] = a;
      } else {
        // "air" in crisp white
        optRaw[idx] = 255;
        optRaw[idx + 1] = 255;
        optRaw[idx + 2] = 255;
        optRaw[idx + 3] = a;
      }
    }
  }
  fs.writeFileSync(path.join(airlinesDir, 'airblue_white.png'), encodePNG(airblue.width, airblue.height, optRaw));
  console.log('Created airblue_white.png');
}

// 4. Emirates SVG with iconic red and white typography
const emiratesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" height="40" fill="none">
  <rect width="140" height="40" rx="6" fill="#d71921"/>
  <text x="70" y="27" fill="#ffffff" font-family="'Playfair Display', Georgia, serif" font-size="21" font-weight="800" text-anchor="middle" letter-spacing="0.3">Emirates</text>
</svg>`;
fs.writeFileSync(path.join(airlinesDir, 'emirates.svg'), emiratesSvg);

// 5. flynas SVG with official turquoise and orange
const flynasSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 38" height="38" fill="none">
  <g font-family="'Sora', -apple-system, sans-serif" font-weight="900" font-style="italic">
    <text x="10" y="28" font-size="27" fill="#00adb5">fly</text>
    <text x="56" y="28" font-size="27" fill="#ff7e47">nas</text>
  </g>
</svg>`;
fs.writeFileSync(path.join(airlinesDir, 'flynas.svg'), flynasSvg);

console.log('All airline contrast variants generated successfully.');
