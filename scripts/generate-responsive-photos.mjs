// Pre-generated sources keep responsive photos compatible with static export.
import sharp from "sharp";

for (const width of [480, 800, 1200]) {
  await sharp("public/media/student-project.webp")
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(`public/media/student-project-${width}.webp`);
}
