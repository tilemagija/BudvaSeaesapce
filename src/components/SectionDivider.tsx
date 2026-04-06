'use client'

import { motion } from 'framer-motion'

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function SectionDivider() {
  return (
    <motion.div
      className="w-full h-px max-w-4xl mx-auto"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, var(--tirkizna) 50%, transparent 100%)',
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
    />
  )
}
