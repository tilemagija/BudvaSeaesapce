'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { urlFor } from '@/sanity/client'
import type { GalleryItem } from '@/types/gallery'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Props {
  items: GalleryItem[]
}

function VideoItem({ url }: { url: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  return (
    <video
      ref={ref}
      src={url}
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.pause()
          ref.current.currentTime = 0
        }
      }}
    />
  )
}

export default function GalleryGrid({ items }: Props) {
  const locale = useLocale() as 'me' | 'en' | 'ru'

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3 px-4 md:px-8 max-w-7xl mx-auto">
      {items.map((item, i) => {
        const isVideo = item.mediaType === 'video' && item.videoUrl
        const imageUrl = item._placeholderUrl
          ?? (item.image ? urlFor(item.image).width(600).url() : PLACEHOLDER)
        const caption = item.caption?.[locale] ?? item.caption?.en

        return (
          <motion.div
            key={item._id}
            className="group relative break-inside-avoid mb-2 md:mb-3 overflow-hidden rounded-xl bg-tamna/60"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.55,
              delay: Math.min(i * 0.05, 0.4),
              ease: EASE_EXPO,
            }}
          >
            <div className="relative w-full overflow-hidden rounded-xl">
              {isVideo ? (
                <div className="relative aspect-[3/4]">
                  <VideoItem url={item.videoUrl!} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt={caption ?? ''}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-tamna/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              {caption && (
                <p className="absolute bottom-2 left-3 right-3 text-xs text-svetla/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                  {caption}
                </p>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
