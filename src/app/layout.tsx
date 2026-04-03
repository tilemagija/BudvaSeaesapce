import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Budva Sea Escape",
  description: "Premium sea experiences in Budva, Montenegro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="me" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
