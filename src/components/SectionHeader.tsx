import type { ReactNode } from 'react'

export function SectionHeader({ tag, title, children }: { tag: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-header">
      <div>
        <div className="tag">// {tag}</div>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}
