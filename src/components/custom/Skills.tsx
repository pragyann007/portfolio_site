"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import LogoLoop from '../LogoLoop'
import { 
  SiReact, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiPrisma, 
  SiDocker, 
  SiNextdotjs, 
  SiFastify,
  SiJavascript, 
  SiTypescript, 
  SiC, 
  SiGit, 
  SiGithub, 
  SiTailwindcss,
  SiSap,
  SiLinux,
  SiExpo,
  SiPython,
  SiNestjs,
  SiShell,
  SiN8N
} from 'react-icons/si'
import { TbSeo } from 'react-icons/tb'

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

interface Skill {
  name: string
  icon: React.ReactNode
  category: string
  level: SkillLevel
  href?: string
}

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const MOBILE_LIMIT = 4

  const skills: Skill[] = [
    // Frontend
    { name: "React", icon: <SiReact />, category: "Frontend", level: "Advanced", href: "https://react.dev" },
    { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend", level: "Intermediate", href: "https://nextjs.org" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Frontend", level: "Intermediate", href: "https://tailwindcss.com" },
    { name: "Gsap", icon: <SiSap />, category: "Frontend", level: "Intermediate", href: "https://framer.com/motion" },
    
    // Backend
    { name: "Node.js", icon: <SiNodedotjs />, category: "Backend", level: "Advanced", href: "https://nodejs.org" },
    { name: "Express", icon: <SiExpress />, category: "Backend", level: "Advanced", href: "https://expressjs.com" },
    { name: "Nest", icon: <SiNestjs />, category: "Backend", level: "Intermediate", href: "https://fastify.io" },
    { name: "MongoDB", icon: <SiMongodb />, category: "Backend", level: "Advanced", href: "https://mongodb.com" },
    { name: "Prisma", icon: <SiPrisma />, category: "Backend", level: "Beginner", href: "https://prisma.io" },
    
    // DevOps
    { name: "Docker", icon: <SiDocker />, category: "DevOps", level: "Intermediate", href: "https://docker.com" },
    { name: "Git", icon: <SiGit />, category: "DevOps", level: "Intermediate", href: "https://git-scm.com" },
    { name: "GitHub", icon: <SiGithub />, category: "DevOps", level: "Intermediate", href: "https://github.com" },
    { name: "Linux", icon: <SiLinux />, category: "DevOps", level: "Advanced", href: "https://linux.org" },
    
    // Languages
    { name: "JavaScript", icon: <SiJavascript />, category: "Languages", level: "Advanced", href: "https://javascript.com" },
    { name: "TypeScript", icon: <SiTypescript />, category: "Languages", level: "Intermediate", href: "https://typescriptlang.org" },
    { name: "Shell", icon: <SiShell />, category: "Languages", level: "Intermediate", href: "" },
    { name: "C", icon: <SiC />, category: "Languages", level: "Intermediate", href: "https://cprogramming.com" },
    { name: "Python", icon: <SiPython />, category: "Languages", level: "Intermediate", href: "https://python.org" },
    
    // Mobile & Others
    { name: "Expo", icon: <SiExpo />, category: "Mobile", level: "Beginner", href: "https://expo.dev" },
    { name: "N8N", icon: <SiN8N />, category: "Automation", level: "Intermediate", href: ""},
    { name: "SEO", icon: <TbSeo />, category: "Others", level: "Intermediate" },
  ]

  const categories = [
    { name: 'All', count: skills.length },
    { name: 'Frontend', count: skills.filter(s => s.category === 'Frontend').length },
    { name: 'Backend', count: skills.filter(s => s.category === 'Backend').length },
    { name: 'DevOps', count: skills.filter(s => s.category === 'DevOps').length },
    { name: 'Mobile', count: skills.filter(s => s.category === 'Mobile').length },
    { name: 'Languages', count: skills.filter(s => s.category === 'Languages').length },
    { name: 'Automations', count: skills.filter(s => s.category === 'Automation').length },
    { name: 'Others', count: skills.filter(s => s.category === 'Others').length },
  ]

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  // Reset showAll when category changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setShowAll(false)
  }

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'Expert': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Advanced': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'Intermediate': return 'bg-teal-500/20 text-teal-400 border-teal-500/30'
      case 'Beginner': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  const techLogos = skills.filter(s => s.href).map(skill => ({
    node: skill.icon,
    title: skill.name,
    href: skill.href!
  }))

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
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase">Tech Stack</span>
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-green-400" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Skills & <span className="text-green-400">Expertise</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 mt-4 md:mt-6 max-w-2xl font-light text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A comprehensive toolkit for building modern, scalable, and performant web applications.
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
                onClick={() => handleCategoryChange(category.name)}
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

        {/* Skills Grid */}
        <div className="max-w-6xl mx-auto mb-24 md:mb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* On mobile show limited skills unless showAll; on sm+ always show all */}
              {filteredSkills.map((skill, index) => (
                <motion.a
                  key={skill.name}
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Hide on mobile if over limit and not expanded
                  className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-green-500/50 transition-all cursor-pointer overflow-hidden
                    ${!showAll && index >= MOBILE_LIMIT ? 'hidden sm:block' : 'block'}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-all duration-300 rounded-2xl" />
                  
                  <motion.div 
                    className="text-5xl mb-5 text-white/90 group-hover:text-green-400 transition-colors relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {skill.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-4 relative z-10">
                    {skill.category}
                  </p>

                  <motion.div 
                    className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border relative z-10 ${getLevelColor(skill.level)}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  >
                    {skill.level}
                  </motion.div>

                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-400/5 rounded-bl-[100px] group-hover:bg-green-400/10 transition-all" />
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Show More / Show Less button — mobile only */}
          {filteredSkills.length > MOBILE_LIMIT && (
            <motion.div
              className="flex justify-center mt-10 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.button
                onClick={() => setShowAll(prev => !prev)}
                className="flex items-center gap-2 px-8 py-3 rounded-full border border-green-500/40 text-green-400 font-mono text-sm hover:bg-green-500/10 transition-all"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {showAll ? (
                  <>Show Less <span className="text-lg leading-none">↑</span></>
                ) : (
                  <>Show All {filteredSkills.length} Skills <span className="text-lg leading-none">↓</span></>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Logo Marquee Section */}
        <motion.div
          className="max-w-[1650px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Technologies I Work With
            </h3>
            <p className="text-gray-500 font-mono text-sm">
              Hover to pause • Click to explore
            </p>
          </motion.div>

          <div className="relative h-32 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-black via-green-950/10 to-black">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              logoHeight={48}
              gap={80}
              hoverSpeed={0}
              scaleOnHover
              fadeOut={false}
              ariaLabel="Technology stack"
              useCustomRender={false}
            />
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.p 
            className="inline-flex items-center gap-3 text-gray-500 font-mono text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Always learning, always building
          </motion.p>
        </motion.div>

      </div>
    </div>
  )
}

export default Skills