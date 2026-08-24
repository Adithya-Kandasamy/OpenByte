import path from "node:path";
import { mkdir, readFile } from "node:fs/promises";
import convertHeic from "heic-convert";
import sharp from "sharp";

const sourceRoot = "C:/Users/Aarush/Downloads";
const outputRoot = path.resolve("public/media");

const selections = [
  ["IMG_6595.HEIC", "demo-day-team.webp"],
  ["IMG_6543.HEIC", "student-project.webp"],
  ["IMG_2634.heic", "student-presenters.webp"],
  ["IMG_2629.heic", "workshop-room.webp"],
  ["IMG_2643.heic", "recognition-moment.webp"],
  ["IMG_2637.heic", "coding-demo.webp"],
];

await mkdir(outputRoot, { recursive: true });

for (const [sourceName, outputName] of selections) {
  const jpeg = await convertHeic({
    buffer: await readFile(path.join(sourceRoot, sourceName)),
    format: "JPEG",
    quality: 0.94,
  });

  await sharp(jpeg)
    .resize({
      width: 1800,
      height: 1350,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(outputRoot, outputName));
}

console.log(`Exported ${selections.length} optimized site photos to ${outputRoot}`);
