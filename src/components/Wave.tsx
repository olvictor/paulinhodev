import { useEffect, useRef } from 'react'

/**
 * A "onda sonora" da identidade visual.
 * Linha fina em cobalto que ganha amplitude perto do cursor.
 */
export function Wave({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const host = canvas.parentElement!
    // Com "reduzir movimento" ativo (ex.: animações desligadas no Windows),
    // a onda continua visível e reagindo ao mouse, só que mais lenta.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speed = reduced ? 0.25 : 1
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2F4BFF'

    let w = 0, h = 0, mx = 0, hover = 0, energy = 0, raf = 0

    const fit = () => {
      const r = canvas.getBoundingClientRect()
      const d = window.devicePixelRatio || 1
      w = r.width; h = r.height
      canvas.width = w * d; canvas.height = h * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
    }
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)
    fit()

    const onMove = (e: PointerEvent) => { mx = e.clientX - canvas.getBoundingClientRect().left; hover = 1 }
    const onLeave = () => { hover = 0 }
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)

    const draw = (ms: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible || document.hidden) return // pausa fora da tela
      const t = (ms / 1000) * speed
      ctx.clearRect(0, 0, w, h)
      energy += (hover - energy) * 0.05
      const base = h * 0.5
      for (let k = 0; k < 2; k++) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 3) {
          const u = x / w
          const env = Math.sin(u * Math.PI)
          const near = hover ? Math.exp(-(((x - mx) / (w * 0.12)) ** 2)) : 0
          const a = Math.min(h, 220) * (0.09 + 0.26 * energy * near + 0.04 * k)
          const y = base + env * (Math.sin(u * 22 - t * 2.2 + k) * a + Math.sin(u * 7 + t * 1.3) * a * 0.6)
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.globalAlpha = k ? 0.22 : 1
        ctx.strokeStyle = accent
        ctx.lineWidth = k ? 1 : 1.6
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={`wave ${className}`} aria-hidden="true" />
}
