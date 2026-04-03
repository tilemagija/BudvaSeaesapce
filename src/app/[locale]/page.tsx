

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A1628" }}>
      <div className="text-center">
        <LogoSVG />
        <p className="mt-6 text-lg" style={{ color: "#00C2C7" }}>
          Batch 0 — Foundation ready
        </p>
        <p className="mt-2 text-sm opacity-60" style={{ color: "#F0F8FF" }}>
          CMS + i18n + Stack configured
        </p>
      </div>
    </main>
  );
}

function LogoSVG() {
  return (
    <svg
      width="200"
      height="80"
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Budva Sea Escape"
    >
      {/* Anchor */}
      <g transform="translate(16, 8)">
        <circle cx="16" cy="10" r="4" stroke="#00C2C7" strokeWidth="2" fill="none" />
        <line x1="16" y1="14" x2="16" y2="40" stroke="#00C2C7" strokeWidth="2" />
        <line x1="6" y1="22" x2="26" y2="22" stroke="#00C2C7" strokeWidth="2" />
        <path d="M6 40 Q6 48 16 48 Q26 48 26 40" stroke="#00C2C7" strokeWidth="2" fill="none" />
        <circle cx="6" cy="40" r="2" fill="#00C2C7" />
        <circle cx="26" cy="40" r="2" fill="#00C2C7" />
        {/* Waves */}
        <path d="M2 54 Q6 50 10 54 Q14 58 18 54 Q22 50 26 54 Q30 58 34 54" stroke="#00C2C7" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M4 60 Q8 56 12 60 Q16 64 20 60 Q24 56 28 60 Q32 64 36 60" stroke="#00C2C7" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      </g>
      {/* Text: BUDVA */}
      <text x="64" y="30" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#F0F8FF" letterSpacing="3">BUDVA</text>
      {/* Text: SEA */}
      <text x="64" y="50" fontFamily="Georgia, serif" fontSize="14" fontWeight="400" fill="#00C2C7" letterSpacing="2">SEA</text>
      {/* Text: ESCAPE */}
      <text x="64" y="68" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill="#FF6B4A" letterSpacing="2">ESCAPE</text>
    </svg>
  );
}
