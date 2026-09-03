"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiWordpress,
  SiOpenai,
  SiCanva,
  SiSocketdotio,
  SiJavascript,
  SiGooglechrome,
  SiHtml5,
  SiCss3,
} from 'react-icons/si'
import { HiExternalLink, HiStar, HiCode } from 'react-icons/hi'
import { HiArrowRight } from 'react-icons/hi2'
import { BiGitBranch } from 'react-icons/bi'
import { TbSeo, TbBrandGoogleAnalytics, TbServer, TbNetwork } from 'react-icons/tb'

import { projects } from '@/data/projects'
import type { Project } from '@/types/project'

// ── icon lookup ───────────────────────────────────────────────────────────
// techStack items store an icon *key* (string), not JSX — this is the only
// place that needs to know how a key maps to a rendered icon.
const iconMap: Record<string, React.ReactNode> = {
  react: <SiReact />,
  nodejs: <SiNodedotjs />,
  express: <SiExpress />,
  mongodb: <SiMongodb />,
  socketio: <SiSocketdotio />,
  wordpress: <SiWordpress />,
  javascript: <SiJavascript />,
  chrome: <SiGooglechrome />,
  html: <SiHtml5 />,
  css: <SiCss3 />,
  openai: <SiOpenai />,
  canva: <SiCanva />,
  seo: <TbSeo />,
  analytics: <TbBrandGoogleAnalytics />,
  udp: <TbNetwork />,
  dns: <TbServer />,
}
const getIcon = (key: string) => iconMap[key] ?? <HiCode />

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'In Progress':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'Maintenance':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    default:
      return 'bg-green-500/20 text-green-400 border-green-500/30'
  }
}

// Featured projects first (in the order they're declared), then fill any
// remaining slots with the rest of the list — always exactly 4 on the
// homepage. Add/reorder `featured: true` in data/projects.ts to control
// what shows up here.
const homeProjects: Project[] = [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
].slice(0, 4)

const totalCompleted = projects.filter((p) => p.status === 'Completed').length
const totalInProgress = projects.filter((p) => p.status !== 'Completed').length

const bottomStats = [
  { label: 'Projects Completed', value: `${totalCompleted}+` },
  { label: 'Tech Stack', value: 'MERN+' },
  { label: 'Open Source', value: 'Active' },
  { label: 'Currently Building', value: `${totalInProgress}` },
]

const Projects = () => {
  return (
    <div className="min-h-screen bg-black py-16 md:py-32 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 md:mb-20 flex justify-center items-center flex-col text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8 md:mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-green-400" />
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase">Portfolio</span>
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-green-400" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Featured <span className="text-green-400">Projects</span>
          </motion.h2>

          <motion.p
            className="text-gray-400 mt-4 md:mt-6 max-w-2xl font-light text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A few of the projects I&apos;m proudest of. Full case studies, write-ups, and the
            rest of the work live on the projects page.
          </motion.p>
        </motion.div>

        {/* Projects grid — best 4 only */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {homeProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/50 hover:-translate-y-2 transition-all duration-300 ${
                  project.featured ? 'lg:col-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-all duration-500 rounded-3xl pointer-events-none" />

                <div className={`flex flex-col ${project.featured ? 'lg:flex-row' : ''}`}>
                  {/* Screenshot — falls back to an emoji + glow if no image is set */}
                  <div
                    className={`relative w-full ${
                      project.featured ? 'lg:w-2/5 aspect-video lg:aspect-auto' : 'aspect-video'
                    } bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-500/10 to-emerald-500/5">
                        <span className="text-6xl">{project.emoji ?? '💻'}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {project.featured && (
                      <motion.div
                        className="absolute top-4 right-4"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <HiStar className="text-yellow-400 text-2xl drop-shadow" />
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-8 md:p-10 flex-1 flex flex-col ${project.featured ? 'lg:flex-row lg:gap-10' : ''}`}>
                    <div className={`flex-1 ${project.featured ? 'lg:w-2/3' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                        {project.year && (
                          <span className="text-xs text-gray-500 font-mono">{project.year}</span>
                        )}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="text-green-400/80 text-sm mb-4">{project.tagline}</p>
                      )}

                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech.icon}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:text-green-400 hover:border-green-500/30 transition-colors"
                            >
                              <span className="text-base">{getIcon(tech.icon)}</span>
                              {tech.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 relative z-10">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400 transition-all group/btn"
                          >
                            <HiExternalLink className="text-lg group-hover/btn:rotate-45 transition-transform" />
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-green-500/50 transition-all group/btn"
                          >
                            <BiGitBranch className="text-lg group-hover/btn:rotate-12 transition-transform" />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Stats panel — only for featured projects that have stats */}
                    {project.featured && project.stats && (
                      <div className="mt-8 lg:mt-0 lg:w-1/3">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                          <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-6">
                            Project Stats
                          </p>
                          <div className="space-y-6">
                            {project.stats.map((stat) => (
                              <div key={stat.label}>
                                <div className="flex items-baseline justify-between mb-2">
                                  <span className="text-gray-400 text-sm">{stat.label}</span>
                                  <span className="text-2xl font-bold text-green-400">{stat.value}</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1 }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-24 h-24 bg-green-400/5 rounded-bl-[100px] group-hover:bg-green-400/10 transition-all pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* Everything else lives on the works page */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/works"
              className="group px-8 py-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 text-green-400 font-semibold rounded-full hover:border-green-500 hover:bg-green-500/20 transition-all flex items-center gap-3"
            >
              View All Projects ({projects.length})
              <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {bottomStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(0, 255, 136, 0.5)' }}
              >
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects