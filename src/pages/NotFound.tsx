import { Link } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'

export default function NotFound() {
  useTitle('Página não encontrada')
  return (
    <section className="container soon-page">
      <div className="tag">// erro 404</div>
      <h1>Sinal perdido.</h1>
      <p className="lead">Essa página não existe ou mudou de endereço.</p>
      <Link to="/" className="btn">← Voltar ao início</Link>
    </section>
  )
}
