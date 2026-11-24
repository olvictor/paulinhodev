import { site } from '../config/site'
import { signature } from '../data/signature'

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

export function PostSignature() {
  return (
    <aside className="signature" aria-label="Sobre o autor">
      <div className="signature-head">
        {signature.photo ? (
          <img className="signature-avatar" src={signature.photo} alt={`Foto de ${site.name}`} />
        ) : (
          <span className="signature-avatar" aria-hidden="true">{initials(site.name)}</span>
        )}
        <div>
          <div className="signature-name">{site.name}</div>
          <div className="signature-role">{signature.role}</div>
        </div>
      </div>
      {signature.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      <div className="signature-cta">
        <span>{signature.cta}</span>
        <span className="signature-links">
          {site.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
          <a href={`mailto:${site.email}`}>E-mail</a>
        </span>
      </div>
    </aside>
  )
}
