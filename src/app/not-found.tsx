import Link from "next/link";

export default function NotFound() {
  return (
    <html>
      <body style={{ margin: 0, backgroundColor: "#0A1628", color: "#F0F8FF", fontFamily: "sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "4rem", color: "#00C2C7" }}>404</h1>
            <p style={{ opacity: 0.7 }}>Page not found</p>
            <Link href="/me" style={{ color: "#FF6B4A", marginTop: "2rem", display: "block" }}>← Back home</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
