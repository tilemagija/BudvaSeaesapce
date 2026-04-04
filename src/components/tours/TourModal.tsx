'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { urlFor } from '@/sanity/client'
import type { Tour } from '@/types/tour'

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
const WA_NUMBER = '38267087728'

interface Props {
  tour: Tour | null
  onClose: () => void
}

export default function TourModal({ tour, onClose }: Props) {
  const t = useTranslations('tours')
  const tCommon = useTranslations('common')
  const locale = useLocale() as 'me' | 'en' | 'ru'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (tour) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [tour])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const imageUrl = tour?.coverImage
    ? urlFor(tour.coverImage).width(800).height(500).fit('crop').url()
    : PLACEHOLDER

  const title = tour?.title?.[locale] ?? tour?.title?.en ?? ''
  const description = tour?.shortDescription?.[locale] ?? tour?.shortDescription?.en ?? ''

  const defaultMsg = `Hi! I'm interested in booking: ${tour?.title?.en ?? title}`
  const waMsg = tour?.whatsappMessage ?? defaultMsg
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`

  const mobileVariants = {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  }
  const desktopVariants = {
    initial: { opacity: 0, scale: 0.94, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.94, y: 16 },
  }

  return (
    <>
      <AnimatePresence>
        {tour && (
          <motion.div
            key="tour-backdrop"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tour && (
          <motion.div
            key="tour-modal"
            className={[
              'fixed z-50 bg-tamna overflow-y-auto',
              isMobile
                ? 'inset-x-0 bottom-0 rounded-t-3xl max-h-[90vh]'
                : 'inset-0 m-auto w-full max-w-lg max-h-[85vh] rounded-2xl h-fit',
            ].join(' ')}
            variants={isMobile ? mobileVariants : desktopVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-svetla backdrop-blur-sm text-xs font-bold"
              aria-label={tCommon('close')}
            >
              ✕
            </button>

            <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl md:rounded-t-2xl flex-shrink-0">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>

            <div className="h-[2px] bg-tirkizna flex-shrink-0" />

            <div className="px-6 py-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-display text-xl font-semibold text-koralna leading-tight flex-1">
                  {title}
                </h2>
                {tour.price && (
                  <span className="flex-shrink-0 px-3 py-1 bg-tirkizna text-tamna text-sm font-bold rounded-full">
                    €{tour.price}
                  </span>
                )}
              </div>

              {(tour.duration || tour.maxPeople) && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {tour.duration && (
                    <span className="px-3 py-1 bg-white/10 text-svetla/80 text-xs rounded-full">
                      ⏱ {tour.duration}
                    </span>
                  )}
                  {tour.maxPeople && (
                    <span className="px-3 py-1 bg-white/10 text-svetla/80 text-xs rounded-full">
                      👥 max {tour.maxPeople}
                    </span>
                  )}
                </div>
              )}

              <p className="text-svetla/75 text-sm leading-relaxed mb-6">
                {description}
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-koralna hover:bg-koralna/90 text-white font-bold tracking-widest uppercase py-4 rounded-xl text-sm transition-colors"
              >
                {t('bookNow')} →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
