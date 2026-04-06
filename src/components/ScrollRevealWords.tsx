'use client'

import { motion } from 'framer-motion'

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  text: string
  /** Extra Tailwind classes on the wrapper span */
  className?: string
  /** Delay between each word (seconds). Default 0.055 */
  stagger?: number
  /** Base delay before first word (seconds). Default 0 */
  baseDelay?: number
}

/**
 * Reveals text word-by-word when scrolled into view.
 * Each word slides up from below with a staggered delay.
 */
export default function ScrollRevealWords({
  text,
  className,
  stagger = 0.055,
  baseDelay = 0,
}: Props) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.5,
              delay: baseDelay + i * stagger,
              ease: EASE_EXPO,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
