'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  title: string
  name: string
  imageUrl: string
  tagline: string
  bio: string
}

export default function CaptainSectionClient({ title, name, imageUrl, tagline, bio }: Props) {
  return (
    <section id="about" className="bg-svetla py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section label */}
        <motion.p
          className="text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase mb-8 md:mb-10 text-center md:text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        >
          {title}
        </motion.p>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          {/* Left — photo, slides from left */}
          <motion.div
            className="relative flex-shrink-0 w-56 sm:w-64 md:w-72 lg:w-80"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-tirkizna" />
            </div>
            {/* Floating name badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-tamna px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
              <span className="text-xs font-bold tracking-[0.2em] text-tirkizna uppercase">
                {name}
              </span>
            </div>
          </motion.div>

          {/* Right — text, slides from right */}
          <motion.div
            className="flex-1 pt-6 md:pt-0 text-center md:text-left"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-tamna leading-[1.1] tracking-tight mb-3">
              {tagline}
            </h2>

            {/* Koralna linija — scaleX reveal */}
            <motion.div
              className="h-[2px] w-12 bg-koralna mb-6 mx-auto md:mx-0"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_EXPO }}
            />

            <p className="text-tamna/70 text-base leading-relaxed max-w-lg mx-auto md:mx-0">
              {bio}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
