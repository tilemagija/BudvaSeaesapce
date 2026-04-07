// src/app/layout.tsx
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "./globals.css";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
