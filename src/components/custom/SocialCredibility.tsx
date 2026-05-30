"use client"
import React, { useEffect, useRef, useState } from 'react'
import SpotlightCard from '../SpotlightCard'
import ShinyText from '../ShinyText'
import { motion, useInView } from 'motion/react'

// Counter animation component
const AnimatedCounter = ({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    
    let startTime: number
    let animationFrame: number
    const duration = 2000 // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [inView, value])

  return <span>{count}{suffix}</span>
}

const SocialCredibility = () => {
  const counterRef = useRef(null)
  const isCounterInView = useInView(counterRef, { once: true, margin: "-100px" })

  const achievements = [
    {
      number: 73,
      displayNumber: "73+",
      title: "Code Repos @ GitHub",
      description: "Open source contributions and projects showcasing diverse technical expertise across full-stack, automation, and more.",
      year: "2024-2026",
      link: "https://github.com/pragyann007"
    },
    {
      number: 1,
      displayNumber: "01",
      title: "n8n Automation at Zenera",
      description: "Built AI agents and automation workflows using n8n at Zenera. Turned complex business processes into intelligent, self-running pipelines.",
      year: "2025",
      highlight: true
    },
    {
      number: 1,
      displayNumber: "01",
      title: "Teaching at CodeGhar",
      description: "Sharing everything learned — full-stack development, real-world tooling, and honest content for developers who want to actually build.",
      year: "2025-Present",
      highlight: true,
      link: "https://www.instagram.com/codeghar/"
    },
    {
      number: 1,
      displayNumber: "01",
      title: "Product in Development",
      description: "Crafting an innovative SaaS product solving real industry problems.",
      year: "Started 2025",
      highlight: true
    },
    {
      number: 36,
      displayNumber: "36+",
      title: "Videos Made for CodeGhar",
      description: "Created over 36 engaging videos on full stack web development and industry insights for the CodeGhar YouTube channel.",
      year: "2025-2026"
    },
    {
      number: 5,
      displayNumber: "5+",
      title: "Freelance Projects Delivered",
      description: "Successfully completed over 5 freelance projects for clients, from web apps to custom solutions.",
      year: "2024-2026"
    }
  ]

  return (
    <div className="min-h-screen -mt-120 lg:-mt-0 bg-black py- relative">
      <div className="w-full px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-24 flex justify-center items-center flex-col text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-3 mb-6 md:mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-green-400" />
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase">
              Track Record
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-green-400" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6">
              <ShinyText
                text="Social Credibility"
                speed={2}
                delay={0}
                color="#ffffff"
                shineColor="#00ff88"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-400 mt-4 md:mt-6 max-w-2xl font-light text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            From building AI agents to teaching developers — a journey of creating value and solving real problems.
          </motion.p>
        </motion.div>

        {/* Achievement Grid */}
        <div className="max-w-[1650px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10" ref={counterRef}>
            {achievements.map((achievement, index) => {
              const CardWrapper = achievement.link ? motion.a : motion.div
              const cardProps = achievement.link 
                ? { href: achievement.link, target: "_blank", rel: "noopener noreferrer" }
                : {}

              return (
                <CardWrapper
                  key={index}
                  {...cardProps}
                  className="block cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SpotlightCard 
                    className="h-full" 
                    spotlightColor={achievement.highlight ? "rgba(0, 255, 136, 0.15)" : "rgba(255, 255, 255, 0.1)"}
                  >
                    <div className="p-6 md:p-8 h-full flex flex-col">
                      
                      {/* Number */}
                      <div className="flex items-start justify-between mb-4 md:mb-6">
                        <motion.div 
                          className={`text-5xl md:text-7xl font-bold tracking-tighter ${
                            achievement.highlight 
                              ? 'text-[#00ff88]' 
                              : 'text-white/10'
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        >
                          <AnimatedCounter 
                            value={achievement.number} 
                            suffix={achievement.number === 73 || achievement.number === 36 || achievement.number === 5 ? "+" : ""}
                            inView={isCounterInView}
                          />
                        </motion.div>
                        
                        <div className={`text-xs font-mono tracking-wider ${
                          achievement.highlight 
                            ? 'text-[#00ff88]/60' 
                            : 'text-gray-600'
                        }`}>
                          {achievement.year}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <motion.h3 
                          className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3 tracking-tight"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        >
                          {achievement.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-gray-400 leading-relaxed font-light text-sm md:text-base"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                        >
                          {achievement.description}
                        </motion.p>
                      </div>

                      {/* Bottom accent line */}
                      {achievement.highlight && (
                        <motion.div 
                          className="h-[2px] bg-gradient-to-r from-[#00ff88] to-transparent mt-4 md:mt-6"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                        />
                      )}
                    </div>
                  </SpotlightCard>
                </CardWrapper>
              )
            })}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/5 max-w-[1650px] mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Years Experience", value: 2 },
              { label: "GitHub Repos", value: 73 },
              { label: "Lines of Code", value: 100 },
              { label: "Coffee Consumed", value: null, display: "∞" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              >
                <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {stat.value !== null ? (
                    <>
                      <AnimatedCounter value={stat.value} inView={isCounterInView} />
                      {stat.label === "GitHub Repos" && "+"}
                      {stat.label === "Years Experience" && "+"}
                      {stat.label === "Lines of Code" && "K+"}
                    </>
                  ) : (
                    stat.display
                  )}
                </div>
                <div className="text-xs font-mono text-gray-600 tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default SocialCredibility