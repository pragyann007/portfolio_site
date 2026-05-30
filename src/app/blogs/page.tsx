// src/app/blogs/page.tsx
import React from 'react'
import Link from 'next/link'
import { getAllBlogs } from '@/lib/blogData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Pragyan Thapaliya',
  description: 'Writings on JavaScript internals, full-stack development, mobile with Expo, and the honest side of being a developer.',
}

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-12 py-16 md:py-28">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-400 font-mono text-xs tracking-widest uppercase transition-colors mb-12">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M6 2L2 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-green-400" />
            <span className="text-green-400 font-mono text-xs tracking-[0.2em] uppercase">All Articles</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Blog & <span className="text-green-400">Thoughts</span>
          </h1>
          <p className="text-gray-400 font-light text-base md:text-lg max-w-xl leading-relaxed">
            Real talk on JavaScript, frameworks, and the parts of developer life nobody writes about.
          </p>
        </div>

        {/* All blogs list */}
        <div className="space-y-5">
          {blogs.map((blog, i) => (
            <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group block">
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 md:p-8
                bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-green-500/30
                rounded-2xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-400/0 to-transparent group-hover:via-green-400/40 transition-all duration-500 rounded-t-2xl" />

                <div className="flex-1">
                  {/* Number + Tags row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-700 font-mono text-xs w-6">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-white/[0.05] border border-white/[0.08] rounded text-xs text-gray-500 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-200 leading-snug mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-sm font-light line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <span className="text-gray-600 font-mono text-xs">{blog.readTime}</span>
                    <span className="text-gray-700 font-mono text-xs">{blog.date}</span>
                  </div>
                  <span className="text-green-400/40 group-hover:text-green-400 transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}