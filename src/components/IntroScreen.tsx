'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LogoSVG from './LogoSVG'

const LOCALES = [
  { code: 'me', label: 'ME' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'РУ' },
]

export default function IntroScreen() {
  const t = useTranslations('intro')
  const locale = useLocale()
  // null = unknown (before hydration), true = show, false = hide
  const [show, setShow] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      setShow(!sessionStorage.getItem('hasSeenIntro'))
    } catch {
      setShow(true)
    }
  }, [])

  function handleEnter() {
    try {
      sessionStorage.setItem('hasSeenIntro', '1')
    } catch {}
    setShow(false)
  }

  if (show === null) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-tamna"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Sea glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-tirkizna opacity-[0.08] blur-3xl" />
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
          <div className="flex flex-col items-center gap-8 px-8 text-center">
            <LogoSVG size="lg" />

            <p className="text-xs font-light tracking-[0.3em] text-svetla/50 uppercase">
              {t('tagline')}
            </p>

            <button
              onClick={handleEnter}
              className="mt-2 border border-tirkizna/60 px-12 py-3 text-xs font-semibold tracking-[0.35em] text-tirkizna uppercase transition-all duration-300 hover:border-tirkizna hover:bg-tirkizna hover:text-tamna focus-visible:outline focus-visible:outline-2 focus-visible:outline-tirkizna"
            >
              {t('enter')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
