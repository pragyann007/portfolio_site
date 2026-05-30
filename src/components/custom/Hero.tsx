"use client"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import React, { useEffect, useRef, useState } from 'react'
import RotatingText from "../RotatingText"
import TextType from "../TextType"
import Image from "next/image"

const Hero = () => {
  const [isHovering, setIsHovering] = useState(false)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const socials = [
    { name: 'GitHub',      url: "http://github.com/pragyann007/" },
    { name: 'LinkedIn',    url: 'https://np.linkedin.com/in/pragyan-thapaliya-26480731b' },
    { name: 'X (Twitter)', url: "https://x.com/pragyannn07" },
    { name: 'Instagram',   url: "https://www.instagram.com/not_pragyann/" },
  ]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const rightMouseX = useMotionValue(0)
  const rightMouseY = useMotionValue(0)
  const rightX = useSpring(rightMouseX, springConfig)
  const rightY = useSpring(rightMouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (leftRef.current) {
        const rect = leftRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - (rect.left + rect.width / 2)) * 0.02)
        mouseY.set((e.clientY - (rect.top + rect.height / 2)) * 0.02)
      }
      if (rightRef.current) {
        const rect = rightRef.current.getBoundingClientRect()
        rightMouseX.set((e.clientX - (rect.left + rect.width / 2)) * 0.015)
        rightMouseY.set((e.clientY - (rect.top + rect.height / 2)) * 0.015)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, rightMouseX, rightMouseY])

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen lg:-mt-40 -mt-20 relative overflow-hidden">


      {/* ── LEFT SECTION ── */}
      <motion.div
        ref={leftRef}
        className="w-full lg:w-[50%] h-auto lg:-mt-20 lg:h-screen relative overflow-hidden bg-black"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00ff41 0%, transparent 70%)', x, y, left: '10%', top: '20%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #39ff14 0%, transparent 70%)',
            x: useTransform(x, v => -v),
            y: useTransform(y, v => -v),
            right: '15%', bottom: '30%',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Content: top-aligned with safe padding on mobile, centered on desktop */}
        <motion.div
          className="relative z-10 flex flex-col justify-start
                     px-6 sm:px-10 lg:px-20
                     pt-24 sm:pt-28 pb-16
                     lg:h-screen lg:pt-[80px] lg:justify-center lg:pb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Label */}
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="h-[1px] bg-gradient-to-r from-green-400 to-transparent"
              animate={{ width: isHovering ? 60 : 48 }}
              transition={{ duration: 0.3 }}
            />
            <span className="text-green-400 text-xs font-mono tracking-[0.2em] uppercase">Portfolio 2026</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            className="mb-4 lg:mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl xl:text-7xl font-bold leading-[1.15] text-white">
              <TextType
                text={["Hi, I'm Pragyan Thapaliya", "I build rare and thoughtful digital experiences."]}
                typingSpeed={125}
                pauseDuration={1800}
                showCursor
                cursorCharacter="▎"
                deletingSpeed={65}
                cursorBlinkDuration={1}
              />
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="text-sm lg:text-lg text-gray-200 leading-relaxed max-w-2xl font-light">
              I am <span className="text-white font-medium">Pragyan Thapaliya</span>, a{" "}
              <span className="inline-block">
                <RotatingText
                  texts={["Frontend", "Backend", "Fullstack", "MERN"]}
                  mainClassName="inline-block min-w-[90px] font-mono font-bold px-2 py-0.5 text-xs bg-gradient-to-r from-green-500 to-emerald-500 rounded text-center text-black shadow-lg shadow-green-500/30"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>{" "}
              Developer. I love to create beautiful and functional web applications that solve real-world problems.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-3 mt-6 lg:mt-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.button
              className="group relative cursor-pointer
                         h-9 px-4 text-sm font-semibold
                         lg:h-11 lg:px-7 lg:text-base
                         bg-green-500 text-black rounded overflow-hidden"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-green-400"
                initial={{ x: "-100%" }} whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-1.5">
                View Projects
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.button>

            <motion.button
              className="group relative cursor-pointer
                         h-9 px-4 text-sm font-semibold
                         lg:h-11 lg:px-7 lg:text-base
                         border border-green-500/50 text-green-300 rounded overflow-hidden
                         hover:border-green-400 transition-colors"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-green-500/10"
                initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Contact Me</span>
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex flex-wrap gap-5 lg:gap-8 mt-6 lg:mt-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                className="text-gray-300 hover:text-green-400 transition-colors font-mono text-xs sm:text-sm relative group"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {social.name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[1px] bg-green-400"
                  initial={{ width: 0 }} whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator — desktop only */}
          <motion.div
            className="hidden lg:flex absolute bottom-16 left-20 flex-col items-center gap-3"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-3"
              animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-gray-400 text-xs font-mono uppercase tracking-[0.15em]">Scroll</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-green-400/50 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/20 rounded-full pointer-events-none"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </motion.div>

      {/* ── RIGHT SECTION — hidden on mobile, visible on desktop only ── */}
      <motion.div
        ref={rightRef}
        className="hidden lg:flex lg:w-[50%] lg:h-screen bg-zinc-950 relative overflow-hidden items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00ff41 0%, transparent 70%)', x: rightX, y: rightY, right: '10%', top: '15%' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Geometric accents — desktop only to avoid clutter */}
        <motion.div
          className="hidden lg:block absolute top-20 right-20 w-20 h-20 border border-green-500/20 rounded-lg"
          animate={{ rotate: [0, 90, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hidden lg:block absolute bottom-32 right-32 w-16 h-16 border border-green-400/30"
          animate={{ rotate: [0, -90, 0], borderRadius: ["0%", "50%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left divider line */}
        <motion.div
          className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-green-500/30 to-transparent"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Floating brackets — desktop only */}
        <motion.div
          className="hidden lg:block absolute top-1/4 right-1/4 text-green-500/20 font-mono text-6xl font-bold pointer-events-none"
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {'</>'}
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-2xl blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative rounded-2xl overflow-hidden border border-green-500/30 shadow-2xl shadow-green-500/20"
            whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
          >
            {/* FIX 5: Added smaller sizes for mobile (w-[240px]) */}
            <Image
              src="/apg.png"
              alt="pragyan photo"
              width={600} height={600}
              className="object-cover w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] xl:w-[420px] xl:h-[420px] 2xl:w-[500px] 2xl:h-[500px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
          <motion.div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-green-400"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
          <motion.div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-green-400"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
        </motion.div>

        {/* Status badge */}
        <motion.div
          className="absolute bottom-8 lg:bottom-24 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-green-500/40 rounded-full px-6 py-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-300 text-sm font-mono whitespace-nowrap">
              Aspiring <a target="_blank" href="https://www.instagram.com/not_pragyann/" className="hover:text-white transition-colors">@Developer</a>
            </span>
          </motion.div>
        </motion.div>

        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-400/15 rounded-full pointer-events-none"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.15, 0.4, 0.15], scale: [1, 1.8, 1] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </motion.div>

    </div>
  )
}

export default Hero