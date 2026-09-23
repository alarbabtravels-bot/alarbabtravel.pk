const sharp = require('sharp');
const fs = require('fs');

async function makeTransparent() {
  const image = sharp('scripts/couple_cropped_whitebg.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Let's create an alpha mask buffer (0 = fully transparent, 255 = fully opaque)
  const alpha = new Uint8Array(w * h);
  alpha.fill(255); // start with fully opaque

  // Helper to check if pixel is "white background"
  function isBg(x, y) {
    const idx = (y * w + x) * info.channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background in PDF is pure white (255, 255, 255) or extremely close (> 248)
    // and low saturation (max(r,g,b) - min(r,g,b) < 15)
    const diff = Math.max(r, g, b) - Math.min(r, g, b);
    return r > 245 && g > 245 && b > 245 && diff < 12;
  }

  // Flood fill from border pixels
  const visited = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let qHead = 0;
  let qTail = 0;

  function push(x, y) {
    const pos = y * w + x;
    if (!visited[pos]) {
      visited[pos] = 1;
      queue[qTail++] = pos;
    }
  }

  // Add all edge pixels that are background
  for (let x = 0; x < w; x++) {
    if (isBg(x, 0)) push(x, 0);
    // Don't do bottom edge because the couple is cut off at the bottom!
    // Wait, let's check left and right of the couple at the bottom:
    if (isBg(x, 0)) push(x, 0);
  }
  for (let y = 0; y < h; y++) {
    if (isBg(0, y)) push(0, y);
    if (isBg(w - 1, y)) push(w - 1, y);
  }

  // Also check top-left and top-right of bottom row (before the suitcase and after the woman's hips)
  for (let x = 0; x < 200; x++) {
    if (isBg(x, h - 1)) push(x, h - 1);
  }
  for (let x = w - 200; x < w; x++) {
    if (isBg(x, h - 1)) push(x, h - 1);
  }

  // Flood fill
  while (qHead < qTail) {
    const pos = queue[qHead++];
    const x = pos % w;
    const y = Math.floor(pos / w);

    alpha[pos] = 0; // Mark background as transparent

    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const npos = ny * w + nx;
        if (!visited[npos] && isBg(nx, ny)) {
          visited[npos] = 1;
          queue[qTail++] = npos;
        }
      }
    }
  }

  // Also check inside hole of suitcase handle:
  // Let's find handle gap: around x: 400 to 550, y: 1100 to 1250
  for (let y = 1100; y < 1250; y++) {
    for (let x = 400; x < 600; x++) {
      if (!visited[y * w + x] && isBg(x, y)) {
        // Check if it's white inside
        const idx = (y * w + x) * info.channels;
        if (data[idx] > 250 && data[idx+1] > 250 && data[idx+2] > 250) {
          push(x, y);
          // run flood fill for this hole
          while (qHead < qTail) {
            const pos = queue[qHead++];
            const hx = pos % w;
            const hy = Math.floor(pos / w);
            alpha[pos] = 0;
            const nb = [[hx - 1, hy], [hx + 1, hy], [hx, hy - 1], [hx, hy + 1]];
            for (const [nx, ny] of nb) {
              if (nx >= 350 && nx < 650 && ny >= 1050 && ny < 1300) {
                const npos = ny * w + nx;
                if (!visited[npos] && isBg(nx, ny)) {
                  visited[npos] = 1;
                  queue[qTail++] = npos;
                }
              }
            }
          }
        }
      }
    }
  }

  // Smooth edge / anti-aliasing on alpha mask:
  // For pixels on the boundary (alpha = 255 but having neighbor with alpha = 0):
  // Set alpha proportional to color distance from white
  const finalAlpha = new Uint8Array(alpha);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const pos = y * w + x;
      if (alpha[pos] === 255) {
        // Check if adjacent to transparent pixel
        const hasTransparentNeighbor = 
          alpha[pos - 1] === 0 || alpha[pos + 1] === 0 || 
          alpha[pos - w] === 0 || alpha[pos + w] === 0;
          
        if (hasTransparentNeighbor) {
          const idx = pos * info.channels;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          // calculate distance from pure white (255, 255, 255)
          const dist = Math.min(255 - r, 255 - g, 255 - b);
          // If very close to white, make semi-transparent
          if (dist < 30) {
            finalAlpha[pos] = Math.max(0, Math.min(255, Math.round((dist / 30) * 255)));
          }
        }
      }
    }
  }

  // Create RGBA image
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4 + 0] = data[i * info.channels + 0];
    rgba[i * 4 + 1] = data[i * info.channels + 1];
    rgba[i * 4 + 2] = data[i * info.channels + 2];
    rgba[i * 4 + 3] = finalAlpha[i];
  }

  // Save as PNG
  await sharp(rgba, {
    raw: { width: w, height: h, channels: 4 }
  })
  .trim()
  .toFile('public/hero_couple_travelers.png');

  // Also WebP
  await sharp('public/hero_couple_travelers.png')
    .webp({ quality: 92 })
    .toFile('public/hero_couple_travelers.webp');

  console.log('Saved transparent images to public/hero_couple_travelers.png and .webp');
}

makeTransparent().catch(console.error);
