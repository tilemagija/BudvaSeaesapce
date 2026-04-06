'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { urlFor } from '@/sanity/client'
import type { Tour } from '@/types/tour'

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'

interface Props {
  tour: Tour
  onOpen: (tour: Tour) => void
}

export default function TourCard({ tour, onOpen }: Props) {
  const t = useTranslations('tours')
  const locale = useLocale() as 'me' | 'en' | 'ru'

  const imageUrl = tour.coverImage
    ? urlFor(tour.coverImage).width(600).height(700).fit('crop').url()
    : PLACEHOLDER

  const title = tour.title?.[locale] ?? tour.title?.en ?? ''
  const description = tour.shortDescription?.[locale] ?? tour.shortDescription?.en ?? ''

  return (
    <motion.article
      className="group relative flex-shrink-0 w-[78vw] sm:w-72 md:w-80 cursor-pointer rounded-2xl overflow-hidden shadow-md [scroll-snap-align:start]"
      whileHover={{ y: -10, boxShadow: '0 28px 50px rgba(0,194,199,0.25)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={() => onOpen(tour)}
    >
      {/* Cover image */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 78vw, (max-width: 768px) 288px, 320px"
        />
      </div>

      {/* Tirkizna divider */}
      <div className="h-[2px] bg-tirkizna" />

      {/* Text panel */}
      <div className="bg-tamna px-4 pt-3 pb-4">
        <h3 className="font-display text-lg font-semibold text-koralna leading-snug line-clamp-1 mb-1">
          {title}
        </h3>
        <p className="text-sm text-svetla/65 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex justify-end">
          <span className="px-4 py-1.5 bg-tirkizna text-tamna text-[11px] font-bold tracking-widest uppercase rounded-full">
            {t('startAdventure')}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
