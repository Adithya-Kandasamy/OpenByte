import path from "node:path";
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const sourceRoot = "C:/Users/Aarush/Downloads";
const outputRoot = path.resolve("design-references/video-review");
const filenames = [
  "IMG_6597.MOV",
  "IMG_6594.MOV",
  "IMG_6593.MOV",
  "IMG_6562.MOV",
  "IMG_6561.MOV",
  "IMG_6550.MOV",
  "IMG_6545.MOV",
  "IMG_6537.MOV",
  "IMG_6538.MOV",
];

const columns = 3;
const cellWidth = 400;
const imageHeight = 260;
const labelHeight = 38;

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr));
    });
  });
}

function labelSvg(filename) {
  return Buffer.from(`
    <svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#07151d" />
      <text x="15" y="26" fill="#ffffff" font-family="Arial, sans-serif" font-size="17" font-weight="700">${filename}</text>
    </svg>
  `);
}

await mkdir(outputRoot, { recursive: true });
const cells = [];

for (const filename of filenames) {
  const framePath = path.join(outputRoot, `${path.parse(filename).name}.jpg`);
  await runFfmpeg([
    "-ss",
    "1",
    "-i",
    path.join(sourceRoot, filename),
    "-frames:v",
    "1",
    "-vf",
    `scale=${cellWidth}:${imageHeight}:force_original_aspect_ratio=decrease,pad=${cellWidth}:${imageHeight}:(ow-iw)/2:(oh-ih)/2:color=0xe8eceb`,
    "-q:v",
    "3",
    "-y",
    framePath,
  ]);

  const frame = await sharp(framePath).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
  const cell = await sharp({
    create: {
      width: cellWidth,
      height: imageHeight + labelHeight,
      channels: 3,
      background: "#e8eceb",
    },
  })
    .composite([
      { input: frame, left: 0, top: 0 },
      { input: labelSvg(filename), left: 0, top: imageHeight },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  cells.push(cell);
}

const rows = Math.ceil(cells.length / columns);
await sharp({
  create: {
    width: columns * cellWidth,
    height: rows * (imageHeight + labelHeight),
    channels: 3,
    background: "#f7f7f4",
  },
})
  .composite(
    cells.map((input, index) => ({
      input,
      left: (index % columns) * cellWidth,
      top: Math.floor(index / columns) * (imageHeight + labelHeight),
    })),
  )
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(outputRoot, "video-contact-sheet.jpg"));

console.log(`Prepared ${filenames.length} video stills in ${outputRoot}`);
