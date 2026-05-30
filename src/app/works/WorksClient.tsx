'use client'
// ─────────────────────────────────────────────────────────────────────────────
// app/works/WorksClient.tsx  — CLIENT component (filter state + animations)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/works/ProjectCard'
import CategoryFilter from '@/components/works/CategoryFilter'

export default function WorksClient() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ── bg grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── orbs ── */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-16 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.25, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-20 md:py-32">

        {/* ── header ── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-7"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-green-400" />
            <span className="text-green-400 font-mono text-xs tracking-[0.25em] uppercase">
              Portfolio
            </span>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-green-400" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.95] mb-6">
            My <span className="text-green-400">Works</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg font-light max-w-xl mx-auto">
            Everything I've built — full-stack apps, backend APIs, security tools,
            SEO sites, and open-source packages.
          </p>
        </motion.div>

        {/* ── filter ── */}
        <motion.div
          className="mb-14 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </motion.div>

        {/* ── project grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="flex flex-col gap-8 md:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}

            {filtered.length === 0 && (
              <p className="text-center py-24 text-gray-600 font-mono">
                No projects in this category yet.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── summary stats ── */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {[
            { label: 'Completed', value: `${projects.filter((p) => p.status === 'Completed').length}+` },
            { label: 'In Progress', value: `${projects.filter((p) => p.status === 'In Progress').length}` },
            { label: 'Open Source', value: `${projects.filter((p) => p.github).length}` },
            { label: 'Categories', value: `${new Set(projects.map((p) => p.category)).size}` },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="text-center p-5 md:p-7 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-green-500/30 transition-colors"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl md:text-4xl font-black text-green-400 mb-1">{s.value}</div>
              <div className="text-gray-500 text-xs font-mono">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── pulse footer ── */}
        <motion.p
          className="mt-16 text-center inline-flex items-center gap-2 text-gray-600 font-mono text-sm w-full justify-center"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          More projects coming soon…
        </motion.p>

      </div>
    </main>
  )
}