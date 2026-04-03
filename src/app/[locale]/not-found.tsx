import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#0A1628",
      color: "#F0F8FF"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", color: "#00C2C7", marginBottom: "1rem" }}>404</h1>
        <p style={{ opacity: 0.7 }}>Page not found</p>
        <Link href="/me" style={{ color: "#FF6B4A", marginTop: "2rem", display: "block" }}>
          ← Back home
        </Link>
      </div>
    </div>
  );
}
