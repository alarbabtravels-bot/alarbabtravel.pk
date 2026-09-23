const fs = require('fs');
const path = require('path');

const pdfPath = 'C:/Users/w/Downloads/Blue and Yellow Illustrative Travel Instagram Story.pdf';
if (!fs.existsSync(pdfPath)) {
  console.error('File not found:', pdfPath);
  process.exit(1);
}

const buf = fs.readFileSync(pdfPath);
console.log('PDF file size:', buf.length);

// Let's find all JPEG images in the PDF file
// JPEG starts with FF D8 FF and ends with FF D9
let pos = 0;
let imgIndex = 0;
while (pos < buf.length) {
  const start = buf.indexOf(Buffer.from([0xff, 0xd8, 0xff]), pos);
  if (start === -1) break;
  const end = buf.indexOf(Buffer.from([0xff, 0xd9]), start + 3);
  if (end === -1) break;

  const imgData = buf.subarray(start, end + 2);
  const outName = `scripts/extracted_img_${imgIndex}.jpg`;
  fs.writeFileSync(outName, imgData);
  console.log(`Extracted JPEG ${imgIndex} at [${start}, ${end + 2}], size: ${imgData.length} bytes -> ${outName}`);
  imgIndex++;
  pos = end + 2;
}

// Also check for PNG or Flate streams if no JPEGs found
console.log(`Total JPEGs extracted: ${imgIndex}`);
