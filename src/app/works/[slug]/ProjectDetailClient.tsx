'use client'
// ─────────────────────────────────────────────────────────────────────────────
// app/works/[slug]/ProjectDetailClient.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { HiExternalLink, HiArrowLeft, HiArrowRight, HiStar } from 'react-icons/hi'
import { BiGitBranch } from 'react-icons/bi'
import type { Project } from '@/types/project'
import TechIcon from '@/components/works/TechIcon'

// ── status config ─────────────────────────────────────────────────────────────
const STATUS: Record<Project['status'], { dot: string; pill: string }> = {
  Completed: { dot: 'bg-green-400', pill: 'bg-green-500/15 text-green-400 border-green-500/30' },
  'In Progress': { dot: 'bg-blue-400 animate-pulse', pill: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  Maintenance: { dot: 'bg-amber-400 animate-pulse', pill: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
}

// ── no-image fallback hero ────────────────────────────────────────────────────
function HeroFallback({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-green-500/25 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl"
        style={{ transform: 'translate(60px,-40px)' }}
        animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.span
        className="relative z-10 text-[120px] md:text-[160px] select-none drop-shadow-2xl leading-none"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      >
        {project.emoji ?? '💻'}
      </motion.span>
      {/* decorative rings */}
      <div className="absolute top-6 left-6 w-10 h-10 border border-green-400/20 rounded-full" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border border-green-400/10 rounded-full" />
      <div className="absolute top-1/2 right-10 w-6 h-6 border border-green-400/15 rounded-full" />
    </div>
  )
}

// ── adjacent project nav card ─────────────────────────────────────────────────
function NavCard({ project, dir }: { project: Project; dir: 'prev' | 'next' }) {
  return (
    <Link
      href={`/works/${project.slug}`}
      className="group flex items-center gap-3 px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-green-500/40 transition-colors max-w-xs"
    >
      {dir === 'prev' && <HiArrowLeft className="text-gray-500 group-hover:text-green-400 transition-colors shrink-0" />}
      <div className={dir === 'next' ? 'text-right flex-1' : 'flex-1'}>
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-0.5">
          {dir === 'prev' ? 'Previous' : 'Next'}
        </p>
        <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
          {project.title}
        </p>
      </div>
      {dir === 'next' && <HiArrowRight className="text-gray-500 group-hover:text-green-400 transition-colors shrink-0" />}
    </Link>
  )
}

// ── main detail client component ──────────────────────────────────────────────
interface Props {
  project: Project
  prev: Project | null
  next: Project | null
}

export default function ProjectDetailClient({ project, prev, next }: Props) {
  const s = STATUS[project.status]

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* bg grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <motion.div className="pointer-events-none absolute -top-32 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 lg:px-16 py-20 md:py-28">

        {/* ── back button ── */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-green-400 transition-colors mb-10 group"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            All Works
          </Link>
        </motion.div>

        {/* ── hero image / fallback ── */}
        <motion.div
          className="relative w-full h-64 md:h-[480px] rounded-3xl overflow-hidden mb-12 border border-white/10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          ) : (
            <HeroFallback project={project} />
          )}

          {/* badges over hero */}
          <div className="absolute top-5 left-5 flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${s.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {project.status}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-semibold text-yellow-400 backdrop-blur-sm">
                <HiStar /> Featured
              </span>
            )}
          </div>

          {project.year && (
            <span className="absolute top-5 right-5 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-xs font-mono text-gray-400">
              {project.year}
            </span>
          )}
        </motion.div>

        {/* ── two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── left: main content ── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{project.category}</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-2 mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-green-400/80 font-mono text-base mb-8">{project.tagline}</p>
            <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>

            {/* tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs font-mono text-gray-500 px-2.5 py-1 bg-white/[0.03] border border-white/[0.07] rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── right: sidebar ── */}
          <motion.aside
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {/* links */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Links</p>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-5 py-3 bg-green-500 text-black text-sm font-bold rounded-xl hover:bg-green-400 transition-colors"
                >
                  <HiExternalLink /> Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-5 py-3 bg-white/5 border border-white/15 text-white text-sm font-semibold rounded-xl hover:bg-white/10 hover:border-green-500/40 transition-colors"
                >
                  <BiGitBranch /> Source Code
                </a>
              )}
              {!project.demo && !project.github && (
                <p className="text-gray-600 text-xs font-mono">No public links available.</p>
              )}
            </div>

            {/* tech stack */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">Tech Stack</p>
              <div className="flex flex-col gap-2">
                {project.techStack.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl">
                    <TechIcon icon={t.icon} className="text-xl text-green-400 shrink-0" />
                    <span className="text-sm font-mono text-gray-300">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* stats */}
            {project.stats && project.stats.length > 0 && (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">Stats</p>
                <div className="grid grid-cols-2 gap-3">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="text-center bg-white/5 border border-white/10 rounded-xl px-3 py-3">
                      <div className="text-2xl font-black text-green-400">{stat.value}</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </div>

        {/* ── prev / next navigation ── */}
        {(prev || next) && (
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-20 pt-10 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {prev ? <NavCard project={prev} dir="prev" /> : <div />}
            {next ? <NavCard project={next} dir="next" /> : <div />}
          </motion.div>
        )}

      </div>
    </main>
  )
}