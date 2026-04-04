'use client'

import { motion } from 'framer-motion'

interface BoatButtonProps {
  label: string
  onClick: () => void
}

export default function BoatButton({ label, onClick }: BoatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 focus-visible:outline-none"
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      aria-label={label}
    >
      {/* Boat SVG */}
      <motion.div
        variants={{
          rest: { x: 0 },
          hover: { x: 8 },
          tap: { x: 24, opacity: 0 },
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <svg
          width="90"
          height="48"
          viewBox="0 0 90 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Hull */}
          <path
            d="M8 32 Q45 44 82 32 L76 40 Q45 50 14 40 Z"
            fill="#00C2C7"
            opacity="0.9"
          />
          {/* Cabin */}
          <rect x="28" y="20" width="28" height="14" rx="3" fill="#F0F8FF" opacity="0.85" />
          {/* Windshield */}
          <rect x="44" y="22" width="10" height="8" rx="1" fill="#00C2C7" opacity="0.5" />
          {/* Deck front */}
          <path d="M56 34 L72 34 L68 28 L56 28 Z" fill="#F0F8FF" opacity="0.6" />
          {/* Mast */}
          <line x1="36" y1="4" x2="36" y2="22" stroke="#F0F8FF" strokeWidth="1.5" opacity="0.6" />
          {/* Flag */}
          <path d="M36 4 L46 9 L36 14 Z" fill="#FF6B4A" opacity="0.8" />
          {/* Water line ripple */}
          <path
            d="M4 38 Q14 36 24 38 Q34 40 44 38 Q54 36 64 38 Q74 40 84 38"
            stroke="#00C2C7"
            strokeWidth="1"
            fill="none"
            opacity="0.35"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-xs font-semibold tracking-[0.35em] text-tirkizna uppercase"
        variants={{
          rest: { opacity: 1 },
          hover: { opacity: 0.7 },
          tap: { opacity: 0 },
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  )
}
