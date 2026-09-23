const fs = require('fs');
const sharp = require('sharp');

async function processImage() {
  const width = 3873;
  const height = 2581;
  const rawMask = fs.readFileSync('scripts/mask_raw.bin');
  
  // Undo PNG predictor
  // Each scanline is 1 filter byte + width bytes
  const unpredicted = Buffer.alloc(width * height);
  const rowStride = width + 1;
  
  let prevRow = null;
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowStride;
    const filter = rawMask[rowStart];
    const currentRow = Buffer.alloc(width);
    
    for (let x = 0; x < width; x++) {
      const rawVal = rawMask[rowStart + 1 + x];
      const left = x > 0 ? currentRow[x - 1] : 0;
      const up = prevRow ? prevRow[x] : 0;
      const upLeft = (x > 0 && prevRow) ? prevRow[x - 1] : 0;
      
      let val = 0;
      if (filter === 0) { // None
        val = rawVal;
      } else if (filter === 1) { // Sub
        val = (rawVal + left) & 0xff;
      } else if (filter === 2) { // Up
        val = (rawVal + up) & 0xff;
      } else if (filter === 3) { // Average
        val = (rawVal + Math.floor((left + up) / 2)) & 0xff;
      } else if (filter === 4) { // Paeth
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        let pr;
        if (pa <= pb && pa <= pc) pr = left;
        else if (pb <= pc) pr = up;
        else pr = upLeft;
        val = (rawVal + pr) & 0xff;
      } else {
        val = rawVal;
      }
      currentRow[x] = val;
      unpredicted[y * width + x] = val;
    }
    prevRow = currentRow;
  }
  
  console.log('Successfully decoded mask into', unpredicted.length, 'bytes');
  
  // Convert JPEG to RGB
  // Note: the original image was DeviceCMYK in JPEG.
  // sharp handles CMYK -> sRGB automatically!
  const rgbBuffer = await sharp('scripts/extracted_img_1.jpg')
    .toColorspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  console.log('RGB buffer info:', rgbBuffer.info);
  
  // Combine RGB and decoded alpha channel
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  const rgbData = rgbBuffer.data;
  
  for (let i = 0; i < width * height; i++) {
    rgbaBuffer[i * 4 + 0] = rgbData[i * 3 + 0];
    rgbaBuffer[i * 4 + 1] = rgbData[i * 3 + 1];
    rgbaBuffer[i * 4 + 2] = rgbData[i * 3 + 2];
    rgbaBuffer[i * 4 + 3] = unpredicted[i];
  }
  
  // Save full RGBA image
  await sharp(rgbaBuffer, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .trim() // Trim any transparent borders around the couple
  .toFile('public/hero_couple_travelers.png');
  
  console.log('Saved transparent couple to public/hero_couple_travelers.png');
  
  // Let's also check trimmed dimensions
  const meta = await sharp('public/hero_couple_travelers.png').metadata();
  console.log('Trimmed metadata:', meta);
  
  // Create an optimized WebP version as well
  await sharp('public/hero_couple_travelers.png')
    .webp({ quality: 90 })
    .toFile('public/hero_couple_travelers.webp');
  console.log('Saved public/hero_couple_travelers.webp');
}

processImage().catch(console.error);
