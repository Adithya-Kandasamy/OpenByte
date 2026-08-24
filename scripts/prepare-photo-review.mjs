import path from "node:path";
import { mkdir, readFile } from "node:fs/promises";
import convertHeic from "heic-convert";
import sharp from "sharp";

const sourceRoot = "C:/Users/Aarush/Downloads";
const outputRoot = path.resolve("design-references/photo-review");

const sets = {
  workshop: [
    "IMG_2629.heic",
    "IMG_2630.heic",
    "IMG_2631.heic",
    "IMG_2632.heic",
    "IMG_2633.heic",
    "IMG_2634.heic",
    "IMG_2635.heic",
    "IMG_2636.heic",
    "IMG_2637.heic",
    "IMG_2638.heic",
    "IMG_2639.heic",
    "IMG_2640.heic",
    "IMG_2641.heic",
    "IMG_2642.heic",
    "IMG_2643.heic",
    "IMG_2644.heic",
    "IMG_2645.heic",
    "IMG_2646.heic",
  ],
  community: [
    "IMG_6532.HEIC",
    "IMG_6536.HEIC",
    "IMG_6539.HEIC",
    "IMG_6540.HEIC",
    "IMG_6541.HEIC",
    "IMG_6542.HEIC",
    "IMG_6543.HEIC",
    "IMG_6544.HEIC",
    "IMG_6551.HEIC",
    "IMG_6553.HEIC",
    "IMG_6595.HEIC",
    "IMG_6599.HEIC",
  ],
};

const columns = 4;
const cellWidth = 300;
const imageHeight = 210;
const labelHeight = 34;
const cellHeight = imageHeight + labelHeight;

function labelSvg(filename) {
  return Buffer.from(`
    <svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#07151d" />
      <text x="14" y="23" fill="#ffffff" font-family="Arial, sans-serif" font-size="15" font-weight="700">${filename}</text>
    </svg>
  `);
}

await mkdir(outputRoot, { recursive: true });

for (const [setName, filenames] of Object.entries(sets)) {
  const cells = [];

  for (const filename of filenames) {
    const sourcePath = path.join(sourceRoot, filename);
    const previewPath = path.join(outputRoot, `${path.parse(filename).name}.jpg`);
    const jpeg = await convertHeic({
      buffer: await readFile(sourcePath),
      format: "JPEG",
      quality: 0.9,
    });
    const photo = await sharp(jpeg)
      .resize({
        width: cellWidth,
        height: imageHeight,
        fit: "contain",
        background: { r: 232, g: 236, b: 235 },
      })
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer();

    await sharp(photo).toFile(previewPath);

    const cell = await sharp({
      create: {
        width: cellWidth,
        height: cellHeight,
        channels: 3,
        background: "#e8eceb",
      },
    })
      .composite([
        { input: photo, left: 0, top: 0 },
        { input: labelSvg(filename), left: 0, top: imageHeight },
      ])
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();

    cells.push(cell);
  }

  const rows = Math.ceil(cells.length / columns);
  const sheet = sharp({
    create: {
      width: columns * cellWidth,
      height: rows * cellHeight,
      channels: 3,
      background: "#f7f7f4",
    },
  });

  await sheet
    .composite(
      cells.map((input, index) => ({
        input,
        left: (index % columns) * cellWidth,
        top: Math.floor(index / columns) * cellHeight,
      })),
    )
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(outputRoot, `${setName}-contact-sheet.jpg`));
}

console.log(`Prepared ${Object.values(sets).flat().length} photo previews in ${outputRoot}`);
