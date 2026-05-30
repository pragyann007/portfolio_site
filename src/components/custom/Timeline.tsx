"use client"
import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'

interface TimelineEvent {
  period: string
  title: string
  description: string
  tags?: string[]
  type: 'milestone' | 'project' | 'learning' | 'founding' | 'pivot'
  emoji: string
}

const events: TimelineEvent[] = [
  {
    period: "Apr 2024",
    emoji: "🎓",
    title: "Cleared Grade 10 Boards",
    description: "Passed SEE with zero clue what programming even was. A blank slate — the best kind to start from.",
    tags: ["Fresh Start"],
    type: "milestone"
  },
  {
    period: "Apr – May 2024",
    emoji: "🐍",
    title: "First Code. No Laptop. No Excuses.",
    description: "Vacation hit. No laptop. Walked to Sanjay brother & Saajan brother's office just to learn Python. Grateful forever to both of them for that access.",
    tags: ["Python", "Borrowed PC"],
    type: "learning"
  },
  {
    period: "Jun 2024",
    emoji: "💻",
    title: "Got My First Laptop",
    description: "1.5 months in. Set it up, learned OS basics — then immediately opened a code editor. Zero days wasted.",
    tags: ["Own Setup", "Python"],
    type: "milestone"
  },
  {
    period: "Jul 2024",
    emoji: "🌐",
    title: "Dropped Python, Chose the Web",
    description: "Black terminal output got boring fast. Switched to HTML, CSS, JS — suddenly the screen had color and the browser reacted. Instantly hooked.",
    tags: ["HTML", "CSS", "JavaScript"],
    type: "pivot"
  },
  {
    period: "Aug 2024",
    emoji: "⚛️",
    title: "React Changed Everything",
    description: "Entered Grade 11. Spent two solid months just in React. Components clicked, state clicked, the whole mental model locked in.",
    tags: ["React", "Grade 11"],
    type: "learning"
  },
  {
    period: "Oct 2024",
    emoji: "🔧",
    title: "Went Full Stack",
    description: "Node.js, databases, REST APIs. The web stopped being a front — it became a full system. Front to back, I owned it.",
    tags: ["Node.js", "MongoDB", "Express"],
    type: "learning"
  },
  {
    period: "Nov 2024",
    emoji: "📈",
    title: "Explored SEO & Digital Marketing",
    description: "Took a detour into growth. WordPress, SEO, digital marketing — understood what gets users and what keeps them. Business side unlocked.",
    tags: ["SEO", "WordPress", "Marketing"],
    type: "learning"
  },
  {
    period: "Dec 2024",
    emoji: "🏢",
    title: "Joined GlowTech Agency",
    description: "Started working at GlowTech Agency. Real clients, real pressure, real deliverables. Worked with various clients — first taste of delivering under professional expectations.",
    tags: ["GlowTech", "Client Work", "Agency"],
    type: "project"
  },
  {
    period: "Jan – Mar 2025",
    emoji: "🔐",
    title: "Cybersecurity Phase",
    description: "Lost direction for a bit and jumped into cybersec. Learned a ton — networks, ethical hacking, vulnerabilities. But the pull to build kept winning.",
    tags: ["Cybersecurity", "Networking", "3 Months"],
    type: "pivot"
  },
  {
    period: "Apr 2025",
    emoji: "🔁",
    title: "Back to Full Stack — For Real",
    description: "Returned to web dev with total clarity. No more detours. Went deep into MERN, TypeScript, modern tooling. This time it stuck.",
    tags: ["MERN", "TypeScript", "Fullstack"],
    type: "milestone"
  },
  {
    period: "May 2025",
    emoji: "🎬",
    title: "Created Content — Then Deleted It All",
    description: "Made 2 videos. 3K+ views, 1K+ likes on first try. Then deleted everything — didn't feel right. Quality over vanity, always.",
    tags: ["YouTube", "3K+ Views", "1K+ Likes"],
    type: "project"
  },
  {
    period: "Jun 2025",
    emoji: "💼",
    title: "Shipped Freelance Projects",
    description: "Landed real paid work. Built web apps for clients. Shipped. Got feedback. Iterated. Repeated. 5+ projects delivered.",
    tags: ["Freelance", "5+ Projects", "Client Work"],
    type: "project"
  },
  {
    period: "Aug 2025",
    emoji: "🤖",
    title: "Built AI Agents at Zenera",
    description: "Worked at Zenera, an AI automation agency. Built AI agents and complex automation workflows using n8n. Turned repetitive business processes into intelligent pipelines.",
    tags: ["Zenera", "n8n", "AI Automation", "AI Agents"],
    type: "project"
  },
  {
    period: "Late 2025",
    emoji: "📚",
    title: "Teaching & Sharing at CodeGhar",
    description: "Joined CodeGhar — a developer community built for real skills and honest content. Started sharing everything I learned: full-stack, tooling, real-world workflows.",
    tags: ["CodeGhar", "Teaching", "Community"],
    type: "learning"
  },
  {
    period: "2026",
    emoji: "🚀",
    title: "Teaching, Building & Still Going",
    description: "Teaching full-stack at CodeGhar. 36+ videos shipped. A SaaS product in active development. Every single day something gets built or learned — but every day is not the same. Sometimes feels demotivated, full of insecurities, wanting to quit everything. But when I look back at how far I've come, all those thoughts are gone and it's back to work.",
    tags: ["CodeGhar", "36+ Videos", "SaaS"],
    type: "milestone"
  },
]

const typeConfig = {
  milestone: { color: "text-green-400",  border: "border-green-500/50",   dot: "bg-green-400",  glow: "shadow-green-500/30",  label: "Milestone" },
  project:   { color: "text-white",      border: "border-white/20",       dot: "bg-white",      glow: "shadow-white/10",      label: "Project"   },
  learning:  { color: "text-gray-200",   border: "border-gray-600/60",    dot: "bg-gray-400",   glow: "shadow-none",          label: "Learning"  },
  founding:  { color: "text-green-300",  border: "border-green-400/60",   dot: "bg-green-300",  glow: "shadow-green-400/40",  label: "Founded"   },
  pivot:     { color: "text-yellow-400", border: "border-yellow-500/40",  dot: "bg-yellow-400", glow: "shadow-yellow-500/20", label: "Pivot"     },
}

// ─── Reusable card inner ────────────────────────────────────────────────────
const CardInner = ({
  event, config, isInView, index, showArrow = false, arrowSide = 'right'
}: {
  event: TimelineEvent
  config: typeof typeConfig[keyof typeof typeConfig]
  isInView: boolean
  index: number
  showArrow?: boolean
  arrowSide?: 'left' | 'right'
}) => (
  <div className={`relative group bg-white/[0.03] hover:bg-white/[0.06] border ${config.border} rounded-2xl p-5 md:p-7 transition-all duration-300 shadow-lg ${config.glow}`}>
    {/* Top accent line */}
    <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent ${
      event.type === 'founding' ? 'via-green-400/60'
      : event.type === 'milestone' ? 'via-green-500/50'
      : event.type === 'pivot' ? 'via-yellow-400/40'
      : 'via-white/10'
    } to-transparent`} />

    {/* Emoji + Period */}
    <div className="flex items-center justify-between mb-4">
      <motion.span
        className="text-2xl md:text-3xl"
        initial={{ scale: 0, rotate: -20 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
      >
        {event.emoji}
      </motion.span>
      <span className="text-gray-500 font-mono text-xs tracking-widest uppercase">{event.period}</span>
    </div>

    {/* Type pill */}
    <div className={`inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full border text-xs font-mono tracking-wider ${config.border} ${config.color} bg-black/40`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </div>

    {/* Title */}
    <h3 className={`text-base md:text-xl font-bold mb-3 leading-snug ${config.color}`}>
      {event.title}
    </h3>

    {/* Description — bright, readable */}
    <p className="text-white/80 leading-relaxed text-sm md:text-base font-light mb-4">
      {event.description}
    </p>

    {/* Tags */}
    {event.tags && (
      <div className="flex flex-wrap gap-1.5">
        {event.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-white/[0.06] border border-white/[0.12] rounded text-xs text-gray-400 font-mono">
            {tag}
          </span>
        ))}
      </div>
    )}

    {/* Desktop connector arrow */}
    {showArrow && (
      <div
        className={`hidden md:block absolute top-8 ${arrowSide === 'right' ? '-right-[7px]' : '-left-[7px]'} w-3.5 h-3.5 border-t border-r ${config.border} bg-zinc-950`}
        style={{ transform: arrowSide === 'right' ? 'rotate(45deg)' : 'rotate(-135deg)' }}
      />
    )}
  </div>
)

// ─── Timeline item — handles mobile + desktop layouts separately ─────────────
const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const isLeft = index % 2 === 0
  const config = typeConfig[event.type]

  return (
    <div ref={ref} className="relative mb-10 md:mb-16 lg:mb-20">

      {/* ── MOBILE: dot on left, card on right ── */}
      <div className="flex md:hidden items-start gap-4">
        {/* Dot column */}
        <div className="flex flex-col items-center pt-5 flex-shrink-0">
          <motion.div
            className={`relative z-10 w-3.5 h-3.5 rounded-full ${config.dot} shadow-md ${config.glow}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2, type: "spring" }}
          >
            <motion.div
              className={`absolute inset-0 rounded-full ${config.dot} opacity-25`}
              animate={{ scale: [1, 2.2, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.15 }}
            />
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
        >
          <CardInner event={event} config={config} isInView={isInView} index={index} />
        </motion.div>
      </div>

      {/* ── DESKTOP: alternating left / right ── */}
      <div className={`hidden md:flex items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Card */}
        <motion.div
          className="w-[45%]"
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
        >
          <CardInner
            event={event} config={config} isInView={isInView} index={index}
            showArrow arrowSide={isLeft ? 'right' : 'left'}
          />
        </motion.div>

        {/* Centre column — dot */}
        <div className="w-[10%] flex justify-center">
          <motion.div
            className={`relative z-10 mt-7 w-4 h-4 rounded-full ${config.dot} flex-shrink-0 shadow-lg ${config.glow}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 300 }}
          >
            <motion.div
              className={`absolute inset-0 rounded-full ${config.dot} opacity-30`}
              animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
            />
          </motion.div>
        </div>

        {/* Spacer */}
        <div className="w-[45%]" />
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
const Timeline = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.85", "end 0.15"] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="min-h-screen bg-black py-16 md:py-32 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="w-full px-5 md:px-12 lg:px-20 relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="mb-16 md:mb-24 flex flex-col items-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-green-400" />
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase">My Journey</span>
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-green-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Coding <span className="text-green-400">Timeline</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 font-light text-base md:text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            From a kid who didn't know what a terminal was, to someone building products, automating systems and teaching a developer community.
          </motion.p>

          {/* Legend */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {Object.values(typeConfig).map((val) => (
              <div key={val.label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${val.dot}`} />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{val.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Timeline body ── */}
        <div className="max-w-5xl mx-auto relative" ref={containerRef}>

          {/* Mobile: left-side vertical track */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/[0.05]" />
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-[1px] overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-green-400 via-green-500/80 to-green-400/20 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Desktop: center vertical track */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/[0.05]" />
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-green-400 via-green-500/80 to-green-400/20 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Events */}
          {events.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}

          {/* ── End node ── */}
          <motion.div
            className="flex flex-col items-center md:items-center relative z-10 pt-4 pb-16 pl-8 md:pl-0"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="w-7 h-7 rounded-full border-2 border-green-400/60 bg-black flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>
            <p className="text-green-400/70 font-mono text-xs tracking-[0.25em] uppercase mt-5 mb-8 animate-pulse">
              Still Writing...
            </p>

            {/* Closing quote */}
            <motion.blockquote
              className="text-white/75 text-base md:text-xl italic text-center max-w-lg font-light leading-relaxed px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              "I wouldn't say I've learned a lot —<br className="hidden sm:block" /> I'm still learning, still growing, still figuring it out."
            </motion.blockquote>
            <p className="text-green-400/50 font-mono text-xs mt-4 tracking-wider">
              — Pragyan Thapaliya, 2026
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Timeline