'use client'

/*
 * Animated wave EDGE between sections.
 * The wave IS the transition — the top section's color fills a
 * shape with a wavy bottom edge, overlapping the next section.
 * Two layers at different speeds create an organic, living feel.
 */

interface Props {
  /** Which direction the transition goes */
  variant?: 'light-to-dark' | 'dark-to-light'
}

// Filled shape: flat top, wavy bottom. 8 seamless periods across 2400 units.
// Wave center ~y=60, amplitude ±25, inside viewBox 0 0 2400 100.
const WAVE_FILL_1 =
  'M0,0 L2400,0 L2400,60 C2325,35 2175,85 2100,60 C2025,35 1875,85 1800,60 C1725,35 1575,85 1500,60 C1425,35 1275,85 1200,60 C1125,35 975,85 900,60 C825,35 675,85 600,60 C525,35 375,85 300,60 C225,35 75,85 0,60 Z'

const WAVE_FILL_2 =
  'M0,0 L2400,0 L2400,65 C2300,42 2200,88 2100,65 C2000,42 1900,88 1800,65 C1700,42 1600,88 1500,65 C1400,42 1300,88 1200,65 C1100,42 1000,88 900,65 C800,42 700,88 600,65 C500,42 400,88 300,65 C200,42 100,88 0,65 Z'

// Stroke-only edge for a subtle tirkizna glow highlight
const WAVE_EDGE =
  'M0,60 C75,35 225,85 300,60 C375,35 525,85 600,60 C675,35 825,85 900,60 C975,35 1125,85 1200,60 C1275,35 1425,85 1500,60 C1575,35 1725,85 1800,60 C1875,35 2025,85 2100,60 C2175,35 2325,85 2400,60'

export default function SectionDivider({ variant = 'light-to-dark' }: Props) {
  const isLightToDark = variant === 'light-to-dark'
  const fillColor = isLightToDark ? 'var(--svetla)' : 'var(--tamna)'
  const bgColor = isLightToDark ? 'var(--tamna)' : 'var(--svetla)'

  return (
    <div
      className="relative w-full h-20 md:h-24 overflow-hidden -mt-px"
      style={{ backgroundColor: bgColor }}
    >
      {/* Primary wave fill — slowest */}
      <svg
        className="absolute top-0 left-0 w-[200%] h-full"
        style={{ animation: 'wave-drift 14s linear infinite' }}
        viewBox="0 0 2400 100"
        preserveAspectRatio="none"
      >
        <path d={WAVE_FILL_1} fill={fillColor} />
      </svg>

      {/* Secondary wave fill — offset, reverse, semi-transparent for organic edge */}
      <svg
        className="absolute top-0 left-0 w-[200%] h-full"
        style={{ animation: 'wave-drift 10s linear infinite reverse' }}
        viewBox="0 0 2400 100"
        preserveAspectRatio="none"
      >
        <path d={WAVE_FILL_2} fill={fillColor} opacity="0.6" />
      </svg>

      {/* Tirkizna glow line along the wave edge */}
      <svg
        className="absolute top-0 left-0 w-[200%] h-full"
        style={{ animation: 'wave-drift 14s linear infinite' }}
        viewBox="0 0 2400 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={WAVE_EDGE}
          stroke="var(--tirkizna)"
          strokeWidth="2"
          opacity="0.25"
        />
      </svg>
    </div>
  )
}
