const sharp = require('sharp');
const fs = require('fs');

async function findPage() {
  const { data, info } = await sharp('scripts/rendered_pdf.png').raw().toBuffer({ resolveWithObject: true });
  console.log('Image dimensions:', info.width, info.height);

  // In rendered_pdf.png, let's find the white page boundary:
  // The background around the PDF is dark gray (around rgb(40,40,40) or rgb(50,50,50)).
  // Inside the PDF page, it is pure white (255,255,255) except where the couple is.
  let pageLeft = 0;
  for (let x = 600; x < info.width; x++) {
    const idx = (300 * info.width + x) * 3;
    if (data[idx] > 250 && data[idx+1] > 250 && data[idx+2] > 250) {
      pageLeft = x;
      break;
    }
  }

  let pageRight = info.width - 1;
  for (let x = info.width - 1; x > 1000; x--) {
    const idx = (300 * info.width + x) * 3;
    if (data[idx] > 250 && data[idx+1] > 250 && data[idx+2] > 250) {
      pageRight = x;
      break;
    }
  }

  let pageTop = 0;
  for (let y = 50; y < 500; y++) {
    const idx = (y * info.width + Math.floor((pageLeft + pageRight)/2)) * 3;
    if (data[idx] > 250 && data[idx+1] > 250 && data[idx+2] > 250) {
      pageTop = y;
      break;
    }
  }

  console.log('Page bounds:', { pageLeft, pageRight, pageTop });

  // Now within the page, find the couple bounding box!
  let minX = pageRight, maxX = pageLeft, minY = info.height, maxY = pageTop;
  for (let y = pageTop; y < 2500; y++) {
    for (let x = pageLeft; x <= pageRight; x++) {
      const idx = (y * info.width + x) * 3;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      // If it is NOT white page (e.g. r < 240 or g < 240 or b < 240)
      if (r < 240 || g < 240 || b < 240) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log('Couple bounds within page:', { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY });

  // Now, let's extract the couple with a transparent background!
  // Notice the background of the couple is pure white (r > 248 && g > 248 && b > 248)
  const cropW = maxX - minX + 20;
  const cropH = maxY - minY + 20;
  const cropX = Math.max(0, minX - 10);
  const cropY = Math.max(0, minY - 10);

  const cropped = await sharp('scripts/rendered_pdf.png')
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .toBuffer();

  fs.writeFileSync('scripts/couple_cropped_whitebg.png', cropped);
  console.log('Saved scripts/couple_cropped_whitebg.png');
}

findPage().catch(console.error);
