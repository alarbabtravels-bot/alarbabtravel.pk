import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '..', 'public');

const imagesToCompress = [
  { name: 'hero_travel_lux.jpg', maxW: 1920 },
  { name: 'hero_panoramic_travel.jpg', maxW: 1920 },
  { name: 'hero_travel_montage.jpg', maxW: 1600 },
  { name: 'emerald_liquid_marble.jpg', maxW: 1920 },
  { name: 'neon_topographic_waves.jpg', maxW: 1920 },
  { name: 'cta_mountain_lake.jpg', maxW: 1600 },
  { name: 'dest_dubai.jpg', maxW: 1000 },
  { name: 'dest_madinah.jpg', maxW: 1000 },
  { name: 'dest_makkah.jpg', maxW: 1000 },
  { name: 'dest_malaysia.jpg', maxW: 1000 },
  { name: 'dest_turkey.jpg', maxW: 1000 }
];

async function run() {
  console.log('[Images] Compressing JPEG images to modern WebP...');
  let totalOrig = 0;
  let totalWebp = 0;

  for (const item of imagesToCompress) {
    const inputPath = path.join(publicDir, item.name);
    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    const origStat = fs.statSync(inputPath);
    totalOrig += origStat.size;

    const baseName = item.name.replace(/\.jpg$/, '');
    const outputPath = path.join(publicDir, `${baseName}.webp`);

    await sharp(inputPath)
      .resize({ width: item.maxW, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const webpStat = fs.statSync(outputPath);
    totalWebp += webpStat.size;

    const savedPercent = ((1 - webpStat.size / origStat.size) * 100).toFixed(1);
    console.log(`✓ ${item.name} (${Math.round(origStat.size / 1024)} KB) -> ${baseName}.webp (${Math.round(webpStat.size / 1024)} KB) [-${savedPercent}%]`);
  }

  const overallSaved = ((1 - totalWebp / totalOrig) * 100).toFixed(1);
  console.log(`\n[Summary] Original: ${Math.round(totalOrig / 1024)} KB | WebP: ${Math.round(totalWebp / 1024)} KB | Saved: ${overallSaved}% payload reduction!`);
}

run().catch(console.error);
