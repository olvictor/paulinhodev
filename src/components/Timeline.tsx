import { useEffect, useRef, useState } from 'react'
import type { TimelineItem, TimelineKind } from '../data/timeline'

type Filter = 'all' | TimelineKind
const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'pro', label: 'Profissional' },
  { id: 'aca', label: 'Acadêmico' },
]

export function TimelineFilters({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <div className="filters" role="tablist" aria-label="Filtrar linha do tempo">
      {filters.map((f) => (
        <button key={f.id} role="tab" aria-selected={value === f.id} className={value === f.id ? 'on' : ''} onClick={() => onChange(f.id)}>
          {f.label}
        </button>
      ))}
    </div>
  )
}

export function Timeline({ items, filter }: { items: TimelineItem[]; filter: Filter }) {
  const wrap = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const head = useRef<HTMLSpanElement>(null)
  const [reached, setReached] = useState<Set<number>>(new Set())
  const [shown, setShown] = useState<Set<number>>(new Set())
  // ao trocar o filtro, os itens entram de novo
  useEffect(() => { setShown(new Set()) }, [filter])
  const visible = items.map((it, i) => ({ it, i })).filter(({ it }) => filter === 'all' || it.kind === filter)

  // Linha que "se desenha" conforme o scroll e marcos que acendem
  useEffect(() => {
    const el = wrap.current!
    const update = () => {
      const r = el.getBoundingClientRect()
      const mark = window.innerHeight * 0.6
      const h = Math.max(0, Math.min(r.height - 12, mark - r.top))
      fill.current!.style.height = `${h}px`
      head.current!.style.transform = `translateY(${h - 4}px)`
      head.current!.style.opacity = h > 0 && h < r.height - 14 ? '1' : '0'
      const next = new Set<number>()
      const enter: number[] = []
      el.querySelectorAll<HTMLElement>('.tl-item').forEach((node) => {
        const i = Number(node.dataset.i)
        const dot = node.querySelector('.tl-node')!.getBoundingClientRect()
        if (dot.top + 8 <= mark) next.add(i)
        // entrada suave: aparece quando chega a 90% da altura da tela
        if (dot.top < window.innerHeight * 0.9) enter.push(i)
      })
      const same = (a: Set<number>, b: Set<number>) => a.size === b.size && [...a].every((n) => b.has(n))
      setReached((prev) => (same(prev, next) ? prev : next))
      setShown((prev) => (enter.every((i) => prev.has(i)) ? prev : new Set([...prev, ...enter])))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [filter])


  return (
    <div className="timeline" ref={wrap}>
      <div className="tl-rail" aria-hidden="true">
        <span className="tl-fill" ref={fill} />
        <span className="tl-head" ref={head} />
      </div>
      <ol>
        {visible.map(({ it, i }) => (
          <li
            key={`${filter}-${i}`}
            data-i={i}
            className={`tl-item ${shown.has(i) ? 'in' : ''} ${reached.has(i) ? 'reached' : ''} ${it.current ? 'current' : ''}`}
          >
            <div className="tl-when">{it.period}</div>
            <div className="tl-node" aria-hidden="true" />
            <div className="tl-content">
              <div className={`tl-kind ${it.kind}`}>{it.label ?? (it.kind === 'pro' ? 'Profissional' : 'Acadêmico')}</div>
              <h3>{it.title}</h3>
              <div className="tl-org">{it.org}</div>
              <p>{it.description}</p>
              {it.stack && (
                <div className="chips">{it.stack.map((s) => <span key={s}>{s}</span>)}</div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
