import { Link } from 'react-router-dom'
import { Wave } from '../components/Wave'
import { useTitle } from '../hooks/useTitle'

export default function ComingSoon() {
  useTitle('Blog')
  return (
    <section className="container soon-page">
      <div className="tag">// blog</div>
      <h1>Em breve.</h1>
      <p className="lead">O blog está sendo preparado. Logo vou publicar por aqui notas técnicas e ensaios curtos sobre código, música, jogos e ficção científica.</p>
      <div className="soon-wave"><Wave /></div>
      <Link to="/" className="btn">← Voltar ao início</Link>
    </section>
  )
}
