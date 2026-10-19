// מייבא תמונות מ-raw/ לגלריה: ממיין לפי עבודות, ממיר ל-WebP ומכווץ.
// הרצה: node scripts/import-photos.cjs
// המספרים הם לפי raw/index.json (סדר השליחה בוואטסאפ). התמונה הראשונה בכל עבודה היא תמונת השער.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const RAW = 'raw/_unzipped';
const OUT = 'src/assets/projects';
const HERO_OUT = 'src/assets/hero';

const projects = {
  'wood-gates': [4, 7, 5, 2, 1, 6, 3],
  'pergola-balcony': [13, 10, 14, 15, 16, 20, 19, 11, 12, 9, 8],
  'garden-shed': [18, 17],
  'flower-shop': [47, 42, 52, 56, 51, 43, 38, 41, 35, 30, 32, 27, 31, 33, 34, 37, 39, 40, 44, 36, 28, 29, 21, 22, 23, 24, 25, 26],
  'therapy-room': [57, 62, 59, 58, 54, 55, 61, 48, 49, 50, 53, 45, 46],
  'focus-clinic': [63, 67, 68, 69, 64, 65, 66],
};
const HERO = 13;

const index = JSON.parse(fs.readFileSync('raw/index.json', 'utf8'));
const fileOf = (n) => path.join(RAW, index.find((x) => x.n === n).file);

const convert = (n, file, width = 1600) =>
  sharp(fileOf(n))
    .rotate()
    .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(file);

(async () => {
  let total = 0;
  for (const [folder, nums] of Object.entries(projects)) {
    const dir = path.join(OUT, folder);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    for (const [i, n] of nums.entries()) {
      await convert(n, path.join(dir, `${String(i + 1).padStart(2, '0')}.webp`));
    }
    total += nums.length;
    console.log(`✓ ${folder}: ${nums.length}`);
  }

  fs.mkdirSync(HERO_OUT, { recursive: true });
  for (const f of fs.readdirSync(HERO_OUT)) if (f !== '.gitkeep') fs.rmSync(path.join(HERO_OUT, f));
  await convert(HERO, path.join(HERO_OUT, 'hero.webp'), 1600);

  console.log(`סה"כ ${total} תמונות + תמונת hero`);
})();
