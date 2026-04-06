'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  src: string
}

export default function AudioPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)

  // Start music on 'budva:enter' event (brodicbutton click on intro screen)
  useEffect(() => {
    function onEnter() {
      setVisible(true)
      if (!audioRef.current) return
      audioRef.current.volume = 0.35
      if (!audioRef.current.paused) {
        // Already playing (started directly from IntroScreen click)
        setPlaying(true)
      } else {
        audioRef.current.play()
          .then(() => setPlaying(true))
          .catch(() => {})
      }
    }
    window.addEventListener('budva:enter', onEnter)
    return () => window.removeEventListener('budva:enter', onEnter)
  }, [])

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }

  // Show button even if user skips intro (revisit)
  useEffect(() => {
    try {
      if (sessionStorage.getItem('hasSeenIntro')) setVisible(true)
    } catch {}
  }, [])

  if (!visible) return null

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />

      <motion.button
        onClick={toggle}
        className="fixed bottom-20 right-4 z-40 md:bottom-6 md:right-6 w-10 h-10 rounded-full bg-tamna/80 backdrop-blur-sm border border-tirkizna/30 flex items-center justify-center text-tirkizna hover:border-tirkizna transition-colors shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        aria-label={playing ? 'Pauziraj muziku' : 'Pusti muziku'}
        title={playing ? 'Mute' : 'Play music'}
      >
        {playing ? (
          /* Animated equalizer bars */
          <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-tirkizna rounded-full"
                style={{ originY: 1 }}
                animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        ) : (
          /* Music note icon */
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          </svg>
        )}
      </motion.button>
    </>
  )
}
