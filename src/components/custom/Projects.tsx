"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiNextdotjs, 
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiPrisma,
  SiOpenai,
  SiGithub,
  SiPython,
  SiWordpress,
  SiCanva
} from 'react-icons/si'
import { HiExternalLink, HiCode, HiStar } from 'react-icons/hi'
import { BiGitBranch } from 'react-icons/bi'
import { TbSeo, TbBrandGoogleAnalytics } from 'react-icons/tb'
import { AiOutlineLineChart } from 'react-icons/ai'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  category: string
  tags: string[]
  techStack: React.ReactNode[]
  github?: string
  demo?: string
  status: 'Completed' | 'In Progress' | 'Maintenance'
  featured?: boolean
  stats?: {
    label: string
    value: string
  }[]
}

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false)
  }, [selectedCategory])

  const projects: Project[] = [
    {
      id: 1,
      title: "Galaxio AI Builder",
      description: "AI-powered website builder with intelligent design generation",
      longDescription: "An innovative AI-driven platform that helps users create stunning websites with intelligent suggestions and automated design workflows. Built with MERN stack and integrated with AI for smart component generation. Backend currently under maintenance due to Clerk instance migration.",
      category: "Web App",
      tags: ["AI", "Full Stack", "MERN"],
      techStack: [<SiReact key="react" />, <SiNodedotjs key="node" />, <SiExpress key="express" />, <SiMongodb key="mongo" />, <SiOpenai key="ai" />],
      github: "https://github.com/pragyann007/galaxio-ai-builder",
      demo: "https://galaxioo-ai.onrender.com/",
      status: 'Maintenance',
      featured: true
    },
    {
      id: 2,
      title: "Durbar Physics",
      description: "Educational platform for physics students with comprehensive resources",
      longDescription: "A full-stack learning platform designed for physics education featuring interactive content, practice problems, and detailed study materials. Built with MERN stack to provide seamless learning experience for students.",
      category: "Web App",
      tags: ["Education", "Full Stack", "MERN"],
      techStack: [<SiReact key="react" />, <SiNodedotjs key="node" />, <SiExpress key="express" />, <SiMongodb key="mongo" />],
      demo: "https://durbarphysics.com/",
      status: 'Completed',
      featured: true,
      stats: [
        { label: "Active Users", value: "40+" },
        { label: "Physics Topics", value: "100+" }
      ]
    },
    {
      id: 3,
      title: "Ashwothama",
      description: "Advanced reconnaissance tool for bug hunters and security researchers",
      longDescription: "A powerful reconnaissance toolkit built with Shell scripting. Integrates multiple security tools including subfinder, httpx, eyewitness, and whois for comprehensive information gathering and vulnerability assessment. Designed for efficient bug bounty hunting workflows.",
      category: "Security Tool",
      tags: ["Security", "CLI", "Shell"],
      techStack: [<SiGithub key="github" />],
      github: "https://github.com/pragyann007/ashwothama",
      status: 'Completed',
      featured: true
    },
    {
      id: 4,
      title: "TradeNest",
      description: "Production-grade trading platform backend with real-time features",
      longDescription: "A robust backend system for trading applications built with Node.js and Express. Features include real-time data processing, secure authentication, and scalable architecture designed to handle high-frequency trading operations.",
      category: "Backend",
      tags: ["Trading", "Backend", "API"],
      techStack: [<SiNodedotjs key="node" />, <SiExpress key="express" />, <SiMongodb key="mongo" />],
      github: "https://github.com/pragyann007/tradenest",
      status: 'Completed'
    },
    {
      id: 5,
      title: "YouTube Backend API",
      description: "Production-grade YouTube-like backend with advanced features",
      longDescription: "A comprehensive backend system mimicking YouTube's core functionality. Includes video upload, streaming, user authentication, comments, likes, and subscription management. Built following industry best practices and production-ready architecture.",
      category: "Backend",
      tags: ["Video", "Backend", "API"],
      techStack: [<SiNodedotjs key="node" />, <SiExpress key="express" />, <SiMongodb key="mongo" />],
      github: "https://github.com/pragyann007/youtube-prodction-grade-api",
      status: 'Completed'
    },
    {
      id: 6,
      title: "Seal Editor",
      description: "Online code editor for HTML, CSS, and JavaScript with live preview",
      longDescription: "A browser-based code editor platform that allows users to write and run HTML, CSS, and JavaScript code with real-time preview. Features include syntax highlighting, live reload, and instant code execution for rapid web development prototyping.",
      category: "Web App",
      tags: ["Code Editor", "Full Stack", "Developer Tool"],
      techStack: [<SiReact key="react" />, <SiNodedotjs key="node" />, <SiExpress key="express" />],
      github: "https://github.com/pragyann007/backend_seal_editor_deploy",
      status: 'Completed'
    },
    {
      id: 7,
      title: "ExpressCreatePragyan",
      description: "NPM package for Express.js project scaffolding and setup automation",
      longDescription: "A CLI tool to quickly generate a ready-to-go Express backend starter project with organized folder structure, database support, and auto-installed dependencies. Created as a learning project to understand npm package development and publishing workflow.",
      category: "NPM Package",
      tags: ["CLI", "Node.js", "Developer Tool"],
      techStack: [<SiNodedotjs key="node" />, <SiExpress key="express" />, <SiGithub key="github" />],
      demo: "https://www.npmjs.com/package/expresscreatepragyan",
      status: 'Completed'
    },
    {
      id: 8,
      title: "Everest Dental Clinic",
      description: "Professional dental clinic website with SEO optimization",
      longDescription: "Modern, responsive WordPress website for a dental clinic featuring service showcase, appointment information, and patient resources. Successfully achieved top rankings for target keywords through strategic SEO implementation and content optimization.",
      category: "Website & SEO",
      tags: ["Healthcare", "SEO", "WordPress"],
      techStack: [<SiWordpress key="wp" />, <TbSeo key="seo" />],
      demo: "https://myeverestdentalclinic.info/",
      status: 'Completed',
      stats: [
        { label: "SEO Rank", value: "Top 3" },
        { label: "Target Keywords", value: "Ranked" }
      ]
    },
    {
      id: 9,
      title: "Anurag Silwal Channel",
      description: "Content research and creative design for YouTube channel",
      longDescription: "Comprehensive content research and creative design work for Anurag Silwal's YouTube channel. Developed engaging visual content using Canva, conducted topic research, and created strategic content plans to enhance channel growth and audience engagement.",
      category: "Content & Design",
      tags: ["Content Research", "Design", "YouTube"],
      techStack: [<SiCanva key="canva" />, <AiOutlineLineChart key="analytics" />],
      status: 'Completed'
    },
  
  ]

  const categories = [
    { name: 'All', count: projects.length },
    { name: 'Web App', count: projects.filter(p => p.category === 'Web App').length },
    { name: 'Backend', count: projects.filter(p => p.category === 'Backend').length },
    { name: 'Security Tool', count: projects.filter(p => p.category === 'Security Tool').length },
    { name: 'Website & SEO', count: projects.filter(p => p.category === 'Website & SEO').length },
    { name: 'NPM Package', count: projects.filter(p => p.category === 'NPM Package').length },
    { name: 'Content & Design', count: projects.filter(p => p.category === 'Content & Design').length },
  ]

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  // Show only 4 projects initially
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4)

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Maintenance': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      default: return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-black py-16 md:py-32 relative overflow-hidden">
      {/* Background effects */}
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

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header */}
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
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase">
              Portfolio
            </span>
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
            A collection of projects that showcase my expertise in full-stack development, AI integration, and creative problem-solving.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="max-w-5xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-mono text-sm transition-all relative overflow-hidden group ${
                  selectedCategory === category.name
                    ? 'bg-green-500 text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCategory === category.name && (
                  <motion.div
                    className="absolute inset-0 bg-green-400"
                    layoutId="activeCategory"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {category.name}
                  <span className={`text-xs font-bold ${
                    selectedCategory === category.name ? 'text-black/70' : 'text-green-400'
                  }`}>
                    ({category.count})
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto mb-24 md:mb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  // ✅ FIX 1: Removed whileHover={{ y: -5 }} and replaced with CSS hover class
                  // to prevent Framer Motion from intercepting pointer events on child <a> tags
                  className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/50 hover:-translate-y-2 transition-all duration-300 ${
                    project.featured ? 'lg:col-span-2' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-all duration-500 rounded-3xl pointer-events-none" />
                  
                  {/* Content Container */}
                  <div className={`p-8 md:p-10 flex flex-col ${project.featured ? 'lg:flex-row lg:gap-10' : ''}`}>
                    
                    {/* Left Side - Main Info */}
                    <div className={`flex-1 ${project.featured ? 'lg:w-2/3' : ''}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <motion.div 
                            className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border mb-4 ${getStatusColor(project.status)}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                          >
                            {project.status}
                          </motion.div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-400 text-sm md:text-base mb-4">
                            {project.description}
                          </p>
                        </div>

                        {project.featured && (
                          <motion.div
                            className="ml-4"
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <HiStar className="text-yellow-400 text-3xl" />
                          </motion.div>
                        )}
                      </div>

                      {/* Long Description */}
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {project.longDescription}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {project.techStack.map((tech, i) => (
                            <motion.div
                              key={i}
                              className="text-3xl text-white/70 hover:text-green-400 transition-colors"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {tech}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* ✅ FIX 2: Added relative z-10 so links sit above all absolute overlay divs */}
                      <div className="flex flex-wrap gap-4 relative z-10">
                        {project.demo && (
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-400 transition-all group/btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <HiExternalLink className="text-lg group-hover/btn:rotate-45 transition-transform" />
                            Live Demo
                          </motion.a>
                        )}
                        
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-green-500/50 transition-all group/btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <BiGitBranch className="text-lg group-hover/btn:rotate-12 transition-transform" />
                            Source Code
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {/* Right Side - Stats (for featured projects) */}
                    {project.featured && project.stats && (
                      <div className="mt-8 lg:mt-0 lg:w-1/3">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                          <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-6">
                            Project Stats
                          </p>
                          <div className="space-y-6">
                            {project.stats.map((stat, i) => (
                              <motion.div
                                key={i}
                                className="relative"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + i * 0.1 }}
                              >
                                <div className="flex items-baseline justify-between mb-2">
                                  <span className="text-gray-400 text-sm">{stat.label}</span>
                                  <span className="text-2xl font-bold text-green-400">{stat.value}</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-400/5 rounded-bl-[100px] group-hover:bg-green-400/10 transition-all pointer-events-none" />
                  
                  {/* ✅ FIX 3: Already had pointer-events-none — kept as-is */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent)',
                    }}
                    animate={{
                      x: hoveredProject === project.id ? [-100, 500] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredProject === project.id ? Infinity : 0,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View More Button */}
          {filteredProjects.length > 4 && (
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="group px-8 py-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 text-green-400 font-semibold rounded-full hover:border-green-500 hover:bg-green-500/20 transition-all flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAll ? (
                  <>
                    Show Less
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↑
                    </motion.span>
                  </>
                ) : (
                  <>
                    View More Projects ({filteredProjects.length - 4} more)
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ↓
                    </motion.span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {[
              { label: 'Projects Completed', value: '11+' },
              { label: 'Tech Stack', value: 'MERN+' },
              { label: 'Open Source', value: 'Active' },
              { label: 'Currently Building', value: '2' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(0, 255, 136, 0.5)' }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold text-green-400 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p 
            className="inline-flex items-center gap-3 text-gray-500 font-mono text-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            More projects coming soon...
          </motion.p>
        </motion.div>

      </div>
    </div>
  )
}

export default Projects