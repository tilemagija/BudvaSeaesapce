type Size = 'sm' | 'md' | 'lg'

const SIZES: Record<Size, [number, number]> = {
  sm: [160, 64],
  md: [200, 80],
  lg: [280, 112],
}

export default function LogoSVG({ size = 'md' }: { size?: Size }) {
  const [w, h] = SIZES[size]

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Budva Sea Escape"
    >
      {/* Anchor */}
      <g transform="translate(16, 4)">
        <circle cx="16" cy="10" r="4" stroke="#00C2C7" strokeWidth="2" fill="none" />
        <line x1="16" y1="14" x2="16" y2="40" stroke="#00C2C7" strokeWidth="2" />
        <line x1="6" y1="22" x2="26" y2="22" stroke="#00C2C7" strokeWidth="2" />
        <path d="M6 40 Q6 48 16 48 Q26 48 26 40" stroke="#00C2C7" strokeWidth="2" fill="none" />
        <circle cx="6" cy="40" r="2" fill="#00C2C7" />
        <circle cx="26" cy="40" r="2" fill="#00C2C7" />
        {/* Waves */}
        <path
          d="M2 56 Q6 52 10 56 Q14 60 18 56 Q22 52 26 56 Q30 60 34 56"
          stroke="#00C2C7"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M4 63 Q8 59 12 63 Q16 67 20 63 Q24 59 28 63 Q32 67 36 63"
          stroke="#00C2C7"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
      </g>
      {/* Text */}
      <text x="64" y="30" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#F0F8FF" letterSpacing="3">
        BUDVA
      </text>
      <text x="64" y="50" fontFamily="Georgia, serif" fontSize="14" fontWeight="400" fill="#00C2C7" letterSpacing="2">
        SEA
      </text>
      <text x="64" y="68" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" fill="#FF6B4A" letterSpacing="2">
        ESCAPE
      </text>
    </svg>
  )
}
