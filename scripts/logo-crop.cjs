const sharp = require('sharp');
(async () => {
  const img = sharp('scripts/_logo-alpha.png');
  const trimCrop = async (top, bottom, file, width) => {
    const buf = await sharp('scripts/_logo-alpha.png').extract({ left: 0, top, width: 640, height: bottom - top }).png().toBuffer();
    await sharp(buf).trim({ threshold: 1 }).resize({ width }).png({ compressionLevel: 9 }).toFile(file);
    console.log(file, (await sharp(file).metadata()).width, (await sharp(file).metadata()).height);
  };
  await trimCrop(14, 568, 'src/assets/logo.png', 480);
  await trimCrop(14, 432, 'src/assets/logo-mark.webp', 160);
  await trimCrop(14, 432, 'public/favicon.png', 64);
  await trimCrop(14, 432, 'public/apple-touch-icon.png', 180);
})();
