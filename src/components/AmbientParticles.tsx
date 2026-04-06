'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speedX: number
  speedY: number
  flickerSpeed: number
  flickerOffset: number
}

interface Props {
  /** Number of particles. Default 35 */
  count?: number
  /** Base color — 'tirkizna' | 'white'. Default 'tirkizna' */
  color?: 'tirkizna' | 'white'
}

/**
 * Subtle floating light particles — like sunlight reflecting
 * off the surface of the sea. Renders on <canvas> for performance.
 * Respects prefers-reduced-motion.
 */
export default function AmbientParticles({ count = 35, color = 'tirkizna' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.15 - 0.1, // slight upward drift
      flickerSpeed: Math.random() * 0.02 + 0.005,
      flickerOffset: Math.random() * Math.PI * 2,
    }))

    const rgb = color === 'tirkizna' ? '0, 194, 199' : '240, 248, 255'

    let time = 0
    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      for (const p of particlesRef.current) {
        // Move
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        // Flicker
        const flicker = Math.sin(time * p.flickerSpeed + p.flickerOffset) * 0.3 + 0.7
        const alpha = p.opacity * flicker

        // Draw glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`
        ctx.fill()

        // Outer glow halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.15})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [count, color])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[5]"
      aria-hidden="true"
    />
  )
}
