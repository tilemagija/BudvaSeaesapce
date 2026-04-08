// src/app/layout.tsx
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  verification: {
    google: "W0egUUMOJjGBlbxwRL8zXsU4cdTU3J_JNWE54s8sark",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
