'use client'
// ─────────────────────────────────────────────────────────────────────────────
// components/works/ProjectCard.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { HiExternalLink, HiArrowRight, HiStar } from 'react-icons/hi'
import { BiGitBranch } from 'react-icons/bi'
import type { Project } from '@/types/project'
import TechIcon from './TechIcon'

// ── status pill ──────────────────────────────────────────────────────────────
const STATUS: Record<
  Project['status'],
  { dot: string; pill: string; label: string }
> = {
  Completed: {
    dot: 'bg-green-400',
    pill: 'bg-green-500/15 text-green-400 border-green-500/30',
    label: 'Completed',
  },
  'In Progress': {
    dot: 'bg-blue-400 animate-pulse',
    pill: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    label: 'In Progress',
  },
  Maintenance: {
    dot: 'bg-amber-400 animate-pulse',
    pill: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    label: 'Maintenance',
  },
}

// ── image / fallback panel ───────────────────────────────────────────────────
function MediaPanel({ project, hovered }: { project: Project; hovered: boolean }) {
  if (project.image) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-700 ${
            hovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {/* subtle gradient overlay so text below is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
    )
  }

  // ── no image: animated green-glow card ──────────────────────────────────
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
      {/* grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* pulsing orb */}
      <motion.div
        className="absolute w-48 h-48 bg-green-500/20 rounded-full blur-3xl"
        animate={
          hovered
            ? { scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }
            : { scale: 1, opacity: 0.2 }
        }
        transition={{ duration: 2, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* second orb offset */}
      <motion.div
        className="absolute w-32 h-32 bg-emerald-400/15 rounded-full blur-2xl"
        style={{ transform: 'translate(40px, -30px)' }}
        animate={
          hovered
            ? { scale: [1.2, 0.8, 1.2], opacity: [0.2, 0.5, 0.2] }
            : { scale: 1, opacity: 0.1 }
        }
        transition={{ duration: 2.5, repeat: hovered ? Infinity : 0, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* big emoji */}
      <motion.span
        className="relative z-10 text-7xl select-none drop-shadow-2xl"
        animate={hovered ? { scale: 1.15, rotate: [0, -4, 4, 0] } : { scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {project.emoji ?? '💻'}
      </motion.span>

      {/* corner rings */}
      <div className="absolute top-4 left-4 w-8 h-8 border border-green-400/20 rounded-full" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border border-green-400/10 rounded-full" />
      <div className="absolute top-8 left-8 w-4 h-4 border border-green-400/15 rounded-full" />
    </div>
  )
}

// ── main card ────────────────────────────────────────────────────────────────
interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false)
  const s = STATUS[project.status]

  return (
    <motion.article
      className="group relative flex flex-col md:flex-row bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/40 transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={project.title}
    >
      {/* ── left: media panel (50 %) ─────────────────────────────────────── */}
      <div className="relative md:w-1/2 h-56 md:h-auto min-h-[220px] shrink-0 overflow-hidden">
        <MediaPanel project={project} hovered={hovered} />

        {/* floating year badge */}
        {project.year && (
          <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-xs font-mono text-gray-400">
            {project.year}
          </span>
        )}

        {/* featured star */}
        {project.featured && (
          <motion.span
            className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-semibold text-yellow-400"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HiStar /> Featured
          </motion.span>
        )}
      </div>

      {/* ── right: content (50 %) ────────────────────────────────────────── */}
      <div className="flex flex-col justify-between p-7 md:p-9 md:w-1/2">
        <div>
          {/* status + category */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${s.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {s.label}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-gray-500 bg-white/5 border border-white/10">
              {project.category}
            </span>
          </div>

          {/* title */}
          <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-green-400 transition-colors leading-tight mb-2">
            {project.title}
          </h2>

          {/* tagline */}
          <p className="text-green-400/70 text-sm font-mono mb-4">{project.tagline}</p>

          {/* description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4">
            {project.description}
          </p>

          {/* stats */}
          {project.stats && project.stats.length > 0 && (
            <div className="flex gap-4 mb-6">
              {project.stats.map((stat, i) => (
                <div key={i} className="text-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 min-w-[80px]">
                  <div className="text-xl font-black text-green-400">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 font-mono mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* tech stack */}
          <div className="mb-5">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-2">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 hover:text-green-400 hover:border-green-500/30 transition-colors"
                >
                  <TechIcon icon={t.icon} className="text-sm leading-none" />
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* tags */}
          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[11px] font-mono text-gray-600 px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="flex flex-wrap items-center gap-3">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-black text-sm font-bold rounded-full hover:bg-green-400 transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`Live demo — ${project.title}`}
            >
              <HiExternalLink className="text-base" />
              Live Demo
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/15 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-green-500/40 transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`GitHub — ${project.title}`}
            >
              <BiGitBranch className="text-base" />
              Source Code
            </motion.a>
          )}
          <Link
            href={`/works/${project.slug}`}
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-green-400 transition-colors group/link"
          >
            Details
            <HiArrowRight className="group-hover/link:translate-x-1 transition-transform text-sm" />
          </Link>
        </div>
      </div>

      {/* hover shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            'linear-gradient(110deg, transparent 35%, rgba(0,255,136,0.04) 50%, transparent 65%)',
        }}
        animate={{ x: hovered ? ['-100%', '200%'] : '-100%' }}
        transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: 'linear' }}
      />
    </motion.article>
  )
}