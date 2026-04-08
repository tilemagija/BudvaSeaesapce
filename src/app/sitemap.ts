// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { tourSlugsQuery } from "@/sanity/queries";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://budvaseaescape.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Home pages — one per locale
  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // Tour pages — locale × slug, with real lastModified from Sanity
  let tourEntries: MetadataRoute.Sitemap = [];
  try {
    const tours = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      tourSlugsQuery,
      {},
      { next: { revalidate: 3600 } }
    );
    tourEntries = tours.flatMap((tour) =>
      routing.locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/tours/${tour.slug}`,
        lastModified: new Date(tour._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    );
  } catch {
    // Sanity unavailable — skip tour entries, home pages still included
  }

  return [...homeEntries, ...tourEntries];
}
