export type TimelineKind = 'pro' | 'aca'

export interface TimelineItem {
  period: string
  kind: TimelineKind
  label?: string
  title: string
  org: string
  description: string
  stack?: string[]
  current?: boolean
}

export const timeline: TimelineItem[] = [
  {
    period: '2025 — hoje',
    kind: 'pro',
    title: 'Desenvolvedor ABAP CLOOUD',
    org: 'Numen · Remoto',
    description:
    'Desenvolvedor ABAP CLOUD ( Developer Extensibility, Side By Side, Key User',
    stack: ['ABAP CLOUD'],
    current: true,
  },
  {
    period: 'Maio de 2022',
    label: 'Início',
    kind: 'aca',
    title: 'HTML e CSS: praticando HTML/CSS',
    org: 'Alura',
    description: 'Html, css',
  },
  {
    period: 'Maio de 2022',
    kind: 'aca',
    title: 'JavaScript: explorando a linguagem.',
    org: 'Alura',
    description: ' Javascript.',
  },
  {
    period: 'Outubro de 2022',
    kind: 'aca',
    title: 'TypeScript parte 1: evoluindo seu JavaScript',
    org: 'Alura',
    description: 'TypeScript.'
  },
  {
    period: 'Abril de 2023',
    kind: 'aca',
    title: 'React Completo',
    org: 'Origamid',
    description:
      'Como você entrou na programação. Talvez um mod de jogo, um bot de Discord ou um site para a sua banda.',
  },
  {
    period: 'Julho de 2023 - Nov de 2023',
    kind: 'aca',
    title: 'Desenvolvimento de Software - Foco em Backend - iFood',
    org: 'CubosAcademy',
    description:
      'NodeJS, JavaScript, PostgreeSql.',
  },
  {
    period: 'Janeiro de 2024 - Jul de 2024',
    kind: 'aca',
    title: 'Oracle Next Education F2 T6 Back-end',
    org: 'Oracle',
    description:
      'Java, Spring boot, Mysql.',
  },
]
