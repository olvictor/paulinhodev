import type { ReactNode, CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>()
  const style = { '--delay': `${delay}ms` } as CSSProperties
  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  )
}
