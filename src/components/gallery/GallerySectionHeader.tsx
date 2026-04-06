'use client'

import { motion } from 'framer-motion'
import ScrollRevealWords from '../ScrollRevealWords'

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  title: string
  subtitle: string
}

export default function GallerySectionHeader({ title, subtitle }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-6 mb-10 md:mb-12 text-center">
      <motion.p
        className="text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_EXPO }}
      >
        Budva · Montenegro
      </motion.p>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-svetla leading-[1.1] tracking-tight">
        <ScrollRevealWords text={title} baseDelay={0.1} />
      </h2>
      <motion.p
        className="mt-4 text-svetla/50 text-base font-light"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE_EXPO }}
      >
        {subtitle}
      </motion.p>
    </div>
  )
}
