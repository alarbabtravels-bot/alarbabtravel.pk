const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const srcDir = 'C:/Users/w/.gemini/antigravity-ide/brain/e071ed9a-e7d7-4e54-926c-9248955855c2/.user_uploaded';
const outDir = 'c:/Users/w/Desktop/alarbab-pk-website/public/airlines';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// CRC32 implementation
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
  ihdrData[8] = 8; // 8-bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);
  
  const stride = 1 + width * 4;
  const rawData = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    rawData[y * stride] = 0; // Filter 0
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

// Crop transparent padding from an RGBA image
function cropTransparent(width, height, raw, padding = 4) {
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = raw[(y * width + x) * 4 + 3];
      if (a > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  if (minX > maxX) {
    return { width, height, raw };
  }
  
  minX = Math.max(0, minX - padding);
  maxX = Math.min(width - 1, maxX + padding);
  minY = Math.max(0, minY - padding);
  maxY = Math.min(height - 1, maxY + padding);
  
  const croppedW = maxX - minX + 1;
  const croppedH = maxY - minY + 1;
  const croppedRaw = Buffer.alloc(croppedW * croppedH * 4);
  
  for (let y = 0; y < croppedH; y++) {
    const srcOffset = ((minY + y) * width + minX) * 4;
    const dstOffset = y * croppedW * 4;
    raw.copy(croppedRaw, dstOffset, srcOffset, srcOffset + croppedW * 4);
  }
  
  return { width: croppedW, height: croppedH, raw: croppedRaw };
}

console.log('Processing airline logos to:', outDir);

// 1. Qatar Airways
{
  const qatarBuf = fs.readFileSync(path.join(srcDir, 'media_1789565899149.png'));
  const decoded = decodePNG(qatarBuf);
  const cropped = cropTransparent(decoded.width, decoded.height, decoded.raw, 8);
  const outBuf = encodePNG(cropped.width, cropped.height, cropped.raw);
  fs.writeFileSync(path.join(outDir, 'qatar.png'), outBuf);
  console.log(`Saved qatar.png (${cropped.width}x${cropped.height})`);
}

// 2. Fly Jinnah
{
  const fjBuf = fs.readFileSync(path.join(srcDir, 'media_1789565955308.png'));
  const decoded = decodePNG(fjBuf);
  const cropped = cropTransparent(decoded.width, decoded.height, decoded.raw, 8);
  const outBuf = encodePNG(cropped.width, cropped.height, cropped.raw);
  fs.writeFileSync(path.join(outDir, 'flyjinnah.png'), outBuf);
  console.log(`Saved flyjinnah.png (${cropped.width}x${cropped.height})`);
}

// 3. airblue
{
  const airblueBuf = fs.readFileSync(path.join(srcDir, 'media_1789566029052.png'));
  const decoded = decodePNG(airblueBuf);
  const cropped = cropTransparent(decoded.width, decoded.height, decoded.raw, 6);
  const outBuf = encodePNG(cropped.width, cropped.height, cropped.raw);
  fs.writeFileSync(path.join(outDir, 'airblue.png'), outBuf);
  console.log(`Saved airblue.png (${cropped.width}x${cropped.height})`);
}

// 4. Saudia
{
  const saudiaBuf = fs.readFileSync(path.join(srcDir, 'media_1789566067897.png'));
  const decoded = decodePNG(saudiaBuf);
  const cropped = cropTransparent(decoded.width, decoded.height, decoded.raw, 8);
  const outBuf = encodePNG(cropped.width, cropped.height, cropped.raw);
  fs.writeFileSync(path.join(outDir, 'saudia.png'), outBuf);
  console.log(`Saved saudia.png (${cropped.width}x${cropped.height})`);
}

// 5. PIA (Remove fake checkerboard & isolate official green logo)
{
  const piaBuf = fs.readFileSync(path.join(srcDir, 'media_1789565868790.png'));
  const decoded = decodePNG(piaBuf);
  const { width, height, raw } = decoded;
  
  // Also save raw original
  fs.writeFileSync(path.join(outDir, 'pia_raw.png'), piaBuf);
  
  const cleanRaw = Buffer.alloc(width * height * 4);
  const lightRaw = Buffer.alloc(width * height * 4); // White/light variant for dark mode
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = raw[idx];
      const g = raw[idx + 1];
      const b = raw[idx + 2];
      const brightness = (r + g + b) / 3;
      
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      const isCheckerboard = brightness > 175 && maxDiff < 30;
      
      if (isCheckerboard) {
        cleanRaw[idx] = 0;
        cleanRaw[idx + 1] = 0;
        cleanRaw[idx + 2] = 0;
        cleanRaw[idx + 3] = 0;
        
        lightRaw[idx] = 0;
        lightRaw[idx + 1] = 0;
        lightRaw[idx + 2] = 0;
        lightRaw[idx + 3] = 0;
      } else {
        let alpha = 255;
        if (brightness > 120) {
          alpha = Math.max(0, Math.min(255, Math.round((175 - brightness) / 55 * 255)));
        }
        
        // Clean original green
        cleanRaw[idx] = r;
        cleanRaw[idx + 1] = g;
        cleanRaw[idx + 2] = b;
        cleanRaw[idx + 3] = alpha;
        
        // Light / bright version for dark background (soft mint white / #e2f5ec)
        lightRaw[idx] = 230;
        lightRaw[idx + 1] = 245;
        lightRaw[idx + 2] = 238;
        lightRaw[idx + 3] = alpha;
      }
    }
  }
  
  const croppedClean = cropTransparent(width, height, cleanRaw, 6);
  const croppedLight = cropTransparent(width, height, lightRaw, 6);
  
  fs.writeFileSync(path.join(outDir, 'pia.png'), encodePNG(croppedClean.width, croppedClean.height, croppedClean.raw));
  fs.writeFileSync(path.join(outDir, 'pia_light.png'), encodePNG(croppedLight.width, croppedLight.height, croppedLight.raw));
  console.log(`Saved pia.png and pia_light.png (${croppedClean.width}x${croppedClean.height})`);
}

console.log('All airline logos written successfully to:', outDir);
