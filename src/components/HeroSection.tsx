'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const WA_LINK = `https://wa.me/38267087728?text=${encodeURIComponent("Hi! I'm interested in booking a sea experience.")}`
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80'

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  heroImageUrl: string | null
}

function WordReveal({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: baseDelay + i * 0.08,
              ease: EASE_EXPO,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

export default function HeroSection({ heroImageUrl }: Props) {
  const t = useTranslations('hero')
  const imageSrc = heroImageUrl ?? PLACEHOLDER_IMAGE

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-tamna"
    >
      {/* Background image — subtle Ken Burns scale */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE_EXPO }}
      >
        <Image
          src={imageSrc}
          alt="Budva sea experience"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tamna/70 via-tamna/50 to-tamna/80" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#FF6B4A]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-tamna to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center md:py-48">
        {/* Eyebrow */}
        <motion.p
          className="mb-5 text-xs font-semibold tracking-[0.45em] text-tirkizna uppercase"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_EXPO }}
        >
          Budva · Montenegro
        </motion.p>

        {/* Headline — word by word reveal */}
        <h1 className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-svetla md:text-7xl lg:text-8xl">
          <WordReveal text={t('headline')} baseDelay={0.35} />
        </h1>

        {/* Subheadline */}
        <motion.p
          className="mx-auto mb-10 max-w-lg text-base font-light leading-relaxed text-svetla/70 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE_EXPO }}
        >
          {t('subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: EASE_EXPO }}
        >
          <a
            href="#tours"
            className="w-full bg-tirkizna px-8 py-4 text-xs font-bold tracking-[0.25em] text-tamna uppercase transition-all hover:opacity-90 sm:w-auto"
          >
            {t('cta')}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-svetla/30 px-8 py-4 text-xs font-semibold tracking-[0.25em] text-svetla/80 uppercase transition-all hover:border-svetla hover:text-svetla sm:w-auto"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — infinite bounce */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-transparent to-tirkizna/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
