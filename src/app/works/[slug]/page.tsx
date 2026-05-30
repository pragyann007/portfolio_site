// ─────────────────────────────────────────────────────────────────────────────
// app/works/[slug]/page.tsx  — individual project detail
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects, getProjectBySlug, getAdjacentProjects } from '@/data/projects'
import ProjectDetailClient from './ProjectDetailClient'

// ── static params (SSG) ───────────────────────────────────────────────────────
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

// ── per-page SEO ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project not found' }

  return {
    title: `${project.title} — Pragyan`,
    description: project.description,
    keywords: [project.title, ...project.tags, 'Pragyan', 'portfolio'],
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: 'article',
      url: `https://yoursite.com/works/${project.slug}`,
      ...(project.image ? { images: [{ url: project.image }] } : {}),
    },
    alternates: { canonical: `https://yoursite.com/works/${project.slug}` },
    robots: { index: true, follow: true },
  }
}

// ── server component shell ────────────────────────────────────────────────────
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return <ProjectDetailClient project={project} prev={prev} next={next} />
}