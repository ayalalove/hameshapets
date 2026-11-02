// מייבא את העבודות מהדרייב (raw/drive-index.json) לגלריה: ממיין, ממיר ל-WebP ומכווץ סרטונים.
// הרצה: FFMPEG=<נתיב ל-ffmpeg.exe> node scripts/import-drive.cjs
// המספרים הם לפי לוחות התצוגה של כל תיקייה. התמונה הראשונה בכל עבודה היא תמונת השער.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const OUT = 'src/assets/projects';
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

const projects = {
  'aron-kodesh': { source: 'בניית ארון קודש מפואר', order: [11, 2, 5, 10, 3, 9, 6, 8, 7, 4, 1] },
  'royal-cornices': { source: 'התקנת קרניזים לבית בעיצוב מלכותי', order: [4, 9, 10, 11, 2, 13, 12, 14, 3, 7, 5, 6, 1, 8] },
  'storage-to-studio': { source: 'ממחסן נטוש ליחדת סטודיו מפנקת', order: [6, 7, 2, 1, 10, 11, 9, 5, 3, 4, 8] },
  'pergola-sunroof': { source: 'פרגולה עוצמתית עם סנטף Bh', order: [8, 4, 6, 5, 9, 10, 3, 2, 1, 7] },
  'pergola-led': { source: 'פרגולה עם הצללה ותאורת לד שקועה', order: [3, 1, 7, 4, 8, 5, 10, 9, 6, 2] },
};

const index = JSON.parse(fs.readFileSync('raw/drive-index.json', 'utf8'));

function convertVideo(src, dest) {
  // 720p, H.264, faststart – כדי שיתחיל להתנגן לפני שכל הקובץ ירד
  execFileSync(FFMPEG, [
    '-y', '-loglevel', 'error', '-i', src,
    '-vf', "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)'",
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', dest,
  ]);
}

(async () => {
  for (const [folder, { source, order }] of Object.entries(projects)) {
    const items = index[source];
    if (!items) throw new Error(`לא נמצאה תיקייה: ${source}`);
    if (order.length !== items.length) console.warn(`⚠ ${folder}: ${order.length} בסדר מתוך ${items.length} קבצים`);

    const dir = path.join(OUT, folder);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    for (const [i, n] of order.entries()) {
      const item = items.find((x) => x.n === n);
      const name = String(i + 1).padStart(2, '0');
      if (item.type === 'image') {
        await sharp(item.file)
          .rotate()
          .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(path.join(dir, `${name}.webp`));
      } else if (item.mb > 15) {
        convertVideo(item.file, path.join(dir, `${name}.mp4`));
      } else {
        fs.copyFileSync(item.file, path.join(dir, `${name}.mp4`));
      }
    }
    const size = fs.readdirSync(dir).reduce((s, f) => s + fs.statSync(path.join(dir, f)).size, 0);
    console.log(`✓ ${folder}: ${order.length} קבצים, ${(size / 1e6).toFixed(1)}MB`);
  }
})();
