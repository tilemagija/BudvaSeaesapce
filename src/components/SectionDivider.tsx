'use client'

import { motion } from 'framer-motion'

/*
 * Each path tiles seamlessly: 8 wave peaks across 2400 units.
 * The SVG is set to 200% container width; the animation shifts
 * translateX(-50%) which loops perfectly back to the start.
 */

// Layer 1 — gentle, broad swells (center y=30, amplitude ±20)
const WAVE_1 =
  'M0,30 C75,10 225,50 300,30 C375,10 525,50 600,30 C675,10 825,50 900,30 C975,10 1125,50 1200,30 C1275,10 1425,50 1500,30 C1575,10 1725,50 1800,30 C1875,10 2025,50 2100,30 C2175,10 2325,50 2400,30'

// Layer 2 — slightly offset (center y=35, amplitude ±20, different control points)
const WAVE_2 =
  'M0,35 C100,15 200,55 300,35 C400,15 500,55 600,35 C700,15 800,55 900,35 C1000,15 1100,55 1200,35 C1300,15 1400,55 1500,35 C1600,15 1700,55 1800,35 C1900,15 2000,55 2100,35 C2200,15 2300,55 2400,35'

// Layer 3 — tighter ripples (center y=28, amplitude ±14)
const WAVE_3 =
  'M0,28 C50,42 150,14 300,28 C450,42 550,14 600,28 C650,42 750,14 900,28 C1050,42 1150,14 1200,28 C1250,42 1350,14 1500,28 C1650,42 1750,14 1800,28 C1850,42 1950,14 2100,28 C2250,42 2350,14 2400,28'

export default function SectionDivider() {
  return (
    <motion.div
      className="relative w-full overflow-hidden py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2 }}
    >
      {/* Wave layer 1 — slowest, most visible */}
      <svg
        className="block w-[200%] h-10"
        style={{ animation: 'wave-drift 12s linear infinite' }}
        viewBox="0 0 2400 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={WAVE_1} stroke="var(--tirkizna)" strokeWidth="1.5" opacity="0.3" />
      </svg>

      {/* Wave layer 2 — medium speed, reverse direction */}
      <svg
        className="absolute inset-0 w-[200%] h-10"
        style={{ animation: 'wave-drift 8s linear infinite reverse' }}
        viewBox="0 0 2400 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={WAVE_2} stroke="var(--tirkizna)" strokeWidth="1" opacity="0.18" />
      </svg>

      {/* Wave layer 3 — fastest, koralna accent */}
      <svg
        className="absolute inset-0 w-[200%] h-10"
        style={{ animation: 'wave-drift 6s linear infinite' }}
        viewBox="0 0 2400 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={WAVE_3} stroke="var(--koralna)" strokeWidth="0.8" opacity="0.12" />
      </svg>
    </motion.div>
  )
}
