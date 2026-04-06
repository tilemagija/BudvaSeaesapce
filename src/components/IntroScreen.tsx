'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LogoSVG from './LogoSVG'
import BoatButton from './BoatButton'

const LOCALES = [
  { code: 'me', label: 'ME' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'РУ' },
]

export default function IntroScreen() {
  const t = useTranslations('intro')
  const locale = useLocale()
  const [show, setShow] = useState(true)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('hasSeenIntro')) {
        setShow(false)
      }
    } catch {}
  }, [])

  function handleEnter() {
    try {
      sessionStorage.setItem('hasSeenIntro', '1')
    } catch {}
    // Play audio directly within user gesture — browser allows this
    const audio = document.querySelector('audio[loop]') as HTMLAudioElement | null
    if (audio) {
      audio.volume = 0.35
      audio.play().catch(() => {})
    }
    setShow(false)
    // Signal AudioPlayer to update UI state
    window.dispatchEvent(new CustomEvent('budva:enter'))
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-tamna"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Sea glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-tirkizna opacity-[0.07] blur-3xl" />
            <div className="absolute top-1/3 right-1/3 h-48 w-48 rounded-full bg-koralna opacity-[0.04] blur-2xl" />
          </div>

          {/* Language picker */}
          <div className="absolute top-6 right-6 flex items-center gap-4">
            {LOCALES.map(({ code, label }) => (
              <Link
                key={code}
                href="/"
                locale={code}
                className={`text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${
                  code === locale
                    ? 'text-tirkizna'
                    : 'text-svetla/40 hover:text-svetla/80'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Center content */}
          <motion.div
            className="flex flex-col items-center gap-10 px-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <LogoSVG size="lg" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-xs font-light tracking-[0.3em] text-svetla/45 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t('tagline')}
            </motion.p>

            {/* Boat enter button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <BoatButton label={t('enter')} onClick={handleEnter} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
