import { useState } from 'react'
import { site } from '../config/site'
import { useTitle } from '../hooks/useTitle'
import { Wave } from '../components/Wave'

export default function Contact() {
  useTitle('Contato')
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignora */ }
  }

  return (
    <section className="container contact">
      <div className="page-head">
        <div className="tag">// contato</div>
        <h1>Vamos conversar.</h1>
        <p className="lead">Aberto a projetos, vagas e boas conversas sobre código, música, jogos ou sci-fi.</p>
      </div>
      <div className="contact-mail">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <button className="btn" onClick={copy}>{copied ? 'Copiado ✓' : 'Copiar'}</button>
      </div>
      <div className="contact-wave"><Wave /></div>
      <ul className="contact-links">
        {site.links.map((l) => (
          <li key={l.href}><a href={l.href} target="_blank" rel="noreferrer"><span>{l.label}</span><span className="mono muted">↗</span></a></li>
        ))}
      </ul>
    </section>
  )
}
