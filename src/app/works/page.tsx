// ─────────────────────────────────────────────────────────────────────────────
// app/works/page.tsx  — SERVER component (metadata + shell)
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next'
import WorksClient from './WorksClient'

export const metadata: Metadata = {
  title: 'Works — Pragyan | Full-Stack Developer',
  description:
    'Explore my full portfolio of web apps, backend APIs, security tools, SEO projects, and open-source packages.',
  keywords: ['Pragyan', 'portfolio', 'full stack', 'MERN', 'React', 'Node.js', 'projects'],
  openGraph: {
    title: 'Works — Pragyan',
    description: 'Browse all projects — web apps, backends, security tools, and more.',
    type: 'website',
    url: 'https://yoursite.com/works',
  },
  alternates: { canonical: 'https://yoursite.com/works' },
  robots: { index: true, follow: true },
}

export default function WorksPage() {
  return <WorksClient />
}