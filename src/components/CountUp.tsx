import { useEffect, useRef, useState } from 'react'

export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      let start: number | undefined
      const step = (t: number) => {
        start ??= t
        const p = Math.min(1, (t - start) / 1200)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [value])
  return <b ref={ref}>{n}{suffix}</b>
}
