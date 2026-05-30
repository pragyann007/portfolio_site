"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Blog } from '@/lib/blogData'

interface BlogCardProps {
  blog: Blog
  index: number
  featured?: boolean
}

const BlogCard = ({ blog, index, featured = false }: BlogCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blogs/${blog.slug}`} className="group block h-full">
        <div className={`relative h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden
          transition-all duration-300 hover:border-green-500/40 hover:bg-white/[0.06]
          ${featured ? 'p-7 md:p-9' : 'p-6 md:p-7'}
        `}>
          {/* Top glow line on hover */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/0 to-transparent group-hover:via-green-400/60 transition-all duration-500" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-0.5 bg-white/[0.06] border border-white/[0.10] rounded-full text-xs text-gray-400 font-mono tracking-wide">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-white group-hover:text-green-300 transition-colors duration-200 leading-snug mb-3
            ${featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
          `}>
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed font-light mb-6 line-clamp-3">
            {blog.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-mono text-xs">{blog.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="text-gray-600 font-mono text-xs">{blog.readTime}</span>
            </div>
            <span className="text-green-400/60 font-mono text-xs group-hover:text-green-400 transition-colors duration-200 flex items-center gap-1.5">
              Read
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BlogCard