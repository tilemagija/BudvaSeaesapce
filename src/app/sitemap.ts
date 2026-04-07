// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://budvaseaescape.com";
const locales = ["me", "en", "ru"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));
}
