"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import BlogCard from '@/components/custom/BlogCard'
import { getAllBlogs } from '@/lib/blogData'

const BlogsSection = () => {
  const blogs = getAllBlogs()
  const featured = blogs[0]
  const rest = blogs.slice(1, 4)

  return (
    <div className="min-h-screen bg-black py-16 md:py-32 relative overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="w-full px-5 md:px-12 lg:px-20 relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 flex flex-col items-center text-center max-w-3xl mx-auto"
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
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase">Writings</span>
            <div className="w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-green-400" />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Blog & <span className="text-green-400">Thoughts</span>
          </motion.h2>

          <motion.p
            className="text-gray-300 font-light text-base md:text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Real talk on JavaScript internals, frameworks, and the honest parts of being a developer nobody writes about.
          </motion.p>
        </motion.div>

        {/* Blog Grid — Featured + 3 */}
        <div className="max-w-6xl mx-auto">

          {/* Featured blog — full width */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href={`/blogs/${featured.slug}`} className="group block">
              <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden p-7 md:p-10
                transition-all duration-300 hover:border-green-500/40 hover:bg-white/[0.06]">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/0 to-transparent group-hover:via-green-400/60 transition-all duration-500" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    {/* Tags + Featured badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="px-2.5 py-0.5 bg-green-400/10 border border-green-500/30 rounded-full text-xs text-green-400 font-mono tracking-wide">
                        ✦ Featured
                      </span>
                      {featured.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 bg-white/[0.06] border border-white/[0.10] rounded-full text-xs text-gray-400 font-mono tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-green-300 transition-colors duration-200 leading-snug mb-4 max-w-2xl">
                      {featured.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed font-light mb-6 max-w-2xl">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 font-mono text-xs">{featured.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" />
                      <span className="text-gray-600 font-mono text-xs">{featured.readTime}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center md:items-end">
                    <span className="inline-flex items-center gap-2 text-green-400/60 group-hover:text-green-400 font-mono text-sm transition-colors duration-200">
                      Read article
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {rest.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i + 1} />
            ))}
          </div>

          {/* View all */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-white/[0.12] hover:border-green-500/50 rounded-full text-gray-400 hover:text-green-400 font-mono text-sm transition-all duration-300"
            >
              View all articles
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BlogsSection