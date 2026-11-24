import { useEffect } from 'react'
import { site } from '../config/site'

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`
  }, [title])
}
