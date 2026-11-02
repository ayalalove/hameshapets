// יוצר את תמונות ה-hero (הרקע המתחלף בראש הדף) מהמקור ברזולוציה מלאה.
// הרצה: node scripts/make-hero.cjs
// התמונות נחתכות ל-4:3 – במחשב רואים רצועה רחבה מהמרכז, בטלפון את האמצע.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = 'src/assets/hero';
const drive = JSON.parse(fs.readFileSync('raw/drive-index.json', 'utf8'));
const fromDrive = (folder, n) => drive[folder].find((x) => x.n === n).file;

// הסדר כאן הוא סדר ההחלפה. focus = איפה למרכז את החיתוך לגובה (0 = למעלה, 0.5 = אמצע, 1 = למטה)
const HERO = [
  { file: fromDrive('פרגולה עם הצללה ותאורת לד שקועה', 3), focus: 0.5 },
  { file: fromDrive('התקנת קרניזים לבית בעיצוב מלכותי', 4), focus: 0.45 },
  { file: fromDrive('פרגולה עוצמתית עם סנטף Bh', 4), focus: 0.5 },
  { file: fromDrive('התקנת קרניזים לבית בעיצוב מלכותי', 10), focus: 0.5 },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) if (f !== '.gitkeep') fs.rmSync(path.join(OUT, f));

  for (const [i, { file, focus }] of HERO.entries()) {
    const img = sharp(file).rotate();
    const { width, height } = await sharp(await img.clone().toBuffer()).metadata();
    const cropH = Math.min(height, Math.round((width * 3) / 4));
    const top = Math.round((height - cropH) * focus);
    const out = path.join(OUT, `${String(i + 1).padStart(2, '0')}.webp`);
    await img
      .extract({ left: 0, top, width, height: cropH })
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    console.log(`✓ ${out} (${(fs.statSync(out).size / 1024).toFixed(0)}KB)`);
  }
})();
