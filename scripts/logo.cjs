// חד-פעמי: מסיר את רקע המוקאפ מהלוגו (flood fill מהשוליים, כדי שהפטישים הלבנים יישארו)
const sharp = require('sharp');
(async () => {
  const { data, info } = await sharp('scripts/logo-original.png').raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const bg = [237, 232, 229];
  const dist = (p) => {
    const i = p * 3;
    return Math.max(Math.abs(data[i] - bg[0]), Math.abs(data[i + 1] - bg[1]), Math.abs(data[i + 2] - bg[2]));
  };
  const alpha = new Uint8Array(W * H).fill(255);
  const seen = new Uint8Array(W * H);
  const queue = [];
  for (let x = 0; x < W; x++) queue.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) queue.push(y * W, y * W + W - 1);
  while (queue.length) {
    const p = queue.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    const d = dist(p);
    if (d > 70) continue;
    alpha[p] = d < 30 ? 0 : Math.round(((d - 30) / 40) * 255);
    const x = p % W, y = (p / W) | 0;
    if (x > 0) queue.push(p - 1);
    if (x < W - 1) queue.push(p + 1);
    if (y > 0) queue.push(p - W);
    if (y < H - 1) queue.push(p + W);
  }
  const out = Buffer.alloc(W * H * 4);
  for (let p = 0; p < W * H; p++) {
    out[p * 4] = data[p * 3]; out[p * 4 + 1] = data[p * 3 + 1]; out[p * 4 + 2] = data[p * 3 + 2]; out[p * 4 + 3] = alpha[p];
  }
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toFile('scripts/_logo-alpha.png');
})();
