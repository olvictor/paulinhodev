import photo from '../../public/perfil.jpeg';

export const about = {
  photo: photo as string | null,
  intro:
    'Atuo como Analista de Sistemas SAP ABAP CLOUD, onde venho desenvolvendo meus conhecimentos em SAP, ABAP, S/4HANA.',
  paragraphs: [
    'Acredito que tecnologia não se resume a escrever código, mas também envolve colaboração, criatividade, capacidade de adaptação e vontade de evoluir. Por isso, busco constantemente expandir meus conhecimentos, explorar novas ferramentas e construir uma carreira na qual eu possa contribuir, aprender e compartilhar experiências.',
    'Fora do ambiente profissional, gosto de jogos eletrônicos, música e de explorar novas possibilidades dentro do universo da tecnologia.',
  ],
  facts: [
    { value: 1, suffix: '+', label: 'anos de experiência' },
    { value: 10, suffix: '+', label: 'projetos entregues' },
    { value: 1, suffix: '', label: 'empresas' },
  ],
}
