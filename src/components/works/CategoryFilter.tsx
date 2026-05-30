'use client'
// ─────────────────────────────────────────────────────────────────────────────
// components/works/CategoryFilter.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'motion/react'
import { projects, CATEGORIES } from '@/data/projects'

interface Props {
  active: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ active, onChange }: Props) {
  const counts = CATEGORIES.map((c) => ({
    name: c,
    count: c === 'All' ? projects.length : projects.filter((p) => p.category === c).length,
  }))

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {counts.map((cat, i) => (
        <motion.button
          key={cat.name}
          onClick={() => onChange(cat.name)}
          className={`relative px-5 py-2.5 rounded-full font-mono text-sm overflow-hidden transition-colors ${
            active === cat.name
              ? 'text-black'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10'
          }`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-pressed={active === cat.name}
        >
          {active === cat.name && (
            <motion.span
              className="absolute inset-0 bg-green-400"
              layoutId="activePill"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {cat.name}
            <span
              className={`text-[11px] font-bold ${
                active === cat.name ? 'text-black/60' : 'text-green-400'
              }`}
            >
              ({cat.count})
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  )
}