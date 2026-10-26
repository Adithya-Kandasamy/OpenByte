import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://openbyte-np.org/", lastModified: new Date("2026-10-26"), changeFrequency: "weekly", priority: 1 },
    { url: "https://openbyte-np.org/privacy/", lastModified: new Date("2026-10-26"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
