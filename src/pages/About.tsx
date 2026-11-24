import { useState } from 'react'
import { site } from '../config/site'
import { about } from '../data/about'
import { timeline } from '../data/timeline'
import { CountUp } from '../components/CountUp'
import { SectionHeader } from '../components/SectionHeader'
import { Timeline, TimelineFilters } from '../components/Timeline'
import { useTitle } from '../hooks/useTitle'

export default function About() {
  useTitle('Sobre')
  const [filter, setFilter] = useState<'all' | 'pro' | 'aca'>('all')

  return (
    <>
      <section className="container about">
        <div>
          <div className="tag">// sobre</div>
          <h1>Oi, eu sou<br />{site.name}.</h1>
          <div className="photo">
            {about.photo ? <img src={about.photo} alt={`Foto de ${site.name}`} /> : <span className="mono">[ sua foto ]</span>}
          </div>
        </div>
        <div className="bio">
          <p className="bio-intro">{about.intro}</p>
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <div className="facts">
            {about.facts.map((f) => (
              <div key={f.label}><CountUp value={f.value} suffix={f.suffix} /><span>{f.label}</span></div>
            ))}
          </div>
          <div className="now">
            <span>♪ ouvindo <b>{site.now.music}</b></span>
            <span>◎ jogando <b>{site.now.game}</b></span>
            <span>✦ assistindo <b>{site.now.movie}</b></span>
          </div>
        </div>
      </section>

      <section className="container section">
        <SectionHeader tag="trajetória" title="Linha do tempo">
          <TimelineFilters value={filter} onChange={setFilter} />
        </SectionHeader>
        <Timeline items={timeline} filter={filter} />
      </section>
    </>
  )
}
