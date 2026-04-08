// src/app/[locale]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const alt = "Budva Sea Escape — Premium Sea Experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        }}
      >
        <div
          style={{
            color: "#00c2c7",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          Budva Sea Escape
        </div>
        <div
          style={{
            color: "#f0f8ff",
            fontSize: 32,
            marginTop: 24,
            opacity: 0.8,
          }}
        >
          Premium Sea Experiences · Montenegro
        </div>
        <div
          style={{
            width: 80,
            height: 4,
            background: "#ff6b4a",
            marginTop: 32,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
