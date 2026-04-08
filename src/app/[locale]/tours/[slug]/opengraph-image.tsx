// src/app/[locale]/tours/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { client } from "@/sanity/client";
import { tourBySlugQuery } from "@/sanity/queries";
import type { TourDetail } from "@/types/tour";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Locale = "me" | "en" | "ru";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let title = "Book a Tour";
  try {
    const tour = await client.fetch<TourDetail | null>(
      tourBySlugQuery,
      { slug },
      { next: { revalidate: 3600 } }
    );
    const l = locale as Locale;
    title = tour?.title?.[l] ?? tour?.title?.en ?? "Book a Tour";
  } catch {
    // Sanity unavailable — use fallback title
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a1628",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            color: "#f0f8ff",
            fontSize: 22,
            opacity: 0.5,
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Budva Sea Escape
        </div>
        <div
          style={{
            color: "#ff6b4a",
            fontSize: 68,
            fontWeight: 700,
            marginTop: 20,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#00c2c7",
            fontSize: 28,
            marginTop: 28,
          }}
        >
          Premium Sea Experience · Montenegro
        </div>
        <div
          style={{
            width: 60,
            height: 3,
            background: "#ff6b4a",
            marginTop: 28,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
