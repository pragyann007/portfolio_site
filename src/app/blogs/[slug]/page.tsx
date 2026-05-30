// src/app/blogs/[slug]/page.tsx
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
// import { getBlogBySlug, getAllBlogs } from '@/lib/blogData'
import type { Metadata } from 'next'
import { getAllBlogs, getBlogBySlug } from '@/lib/blogData'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const blogs = getAllBlogs()
  return blogs.map(blog => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const blog = getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${blog.title} | Pragyan Thapaliya`,
    description: blog.excerpt,
  }
}

// Very minimal Markdown-to-JSX renderer for the static content
function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.trimStart().startsWith('```')) {
      const lang = line.replace(/```/, '').trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <div key={i} className="my-6 rounded-xl overflow-hidden border border-white/[0.08]">
          {lang && (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-gray-500 font-mono text-xs">{lang}</span>
            </div>
          )}
          <pre className="bg-white/[0.03] px-5 py-4 overflow-x-auto">
            <code className="text-green-300/90 font-mono text-sm leading-relaxed">
              {codeLines.join('\n')}
            </code>
          </pre>
        </div>
      )
      i++
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-10 mb-4 leading-snug">
          {line.replace('## ', '')}
        </h2>
      )
      i++
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg md:text-xl font-bold text-green-300 mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
      i++
      continue
    }

    // HR
    if (line.trim() === '---') {
      elements.push(<hr key={i} className="border-white/[0.07] my-8" />)
      i++
      continue
    }

    // Inline code in paragraph — handled via dangerouslySetInnerHTML replacement
    if (line.trim().length > 0) {
      // Parse inline bold and code
      const parsed = line
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-white/[0.08] text-green-300 font-mono text-sm rounded">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')

      elements.push(
        <p
          key={i}
          className="text-gray-300 leading-[1.85] font-light text-base mb-4"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />
      )
      i++
      continue
    }

    i++
  }

  return elements
}

export default async  function BlogPost({ params }: Props) {
  const { slug } = await params

  const blog = getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const allBlogs = getAllBlogs()
  const currentIndex = allBlogs.findIndex(b => b.slug === blog.slug)
  const prev = currentIndex > 0 ? allBlogs[currentIndex - 1] : null
  const next = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-28">

        {/* Back */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-green-400 font-mono text-xs tracking-widest uppercase transition-colors mb-12 group"
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="group-hover:-translate-x-0.5 transition-transform duration-200">
            <path d="M10 6H2M6 2L2 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All articles
        </Link>

        {/* Article header */}
        <header className="mb-10 md:mb-14">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 bg-white/[0.05] border border-white/[0.10] rounded-full text-xs text-gray-400 font-mono tracking-wide">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {blog.title}
          </h1>

          <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-8">
            {blog.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 pb-8 border-b border-white/[0.07]">
            <div className="w-8 h-8 rounded-full bg-green-400/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-green-400 font-mono text-xs font-bold">P</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Pragyan Thapaliya</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-mono text-xs">{blog.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span className="text-gray-600 font-mono text-xs">{blog.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article content */}
        <article className="prose-custom">
          {renderContent(blog.content)}
        </article>

        {/* Prev / Next navigation */}
        <div className="mt-16 pt-10 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/blogs/${prev.slug}`} className="group block p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-green-500/30 rounded-xl transition-all duration-300">
              <div className="flex items-center gap-2 text-gray-600 font-mono text-xs mb-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 6H2M6 2L2 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous
              </div>
              <p className="text-gray-300 text-sm font-medium group-hover:text-green-300 transition-colors leading-snug">
                {prev.title}
              </p>
            </Link>
          ) : <div />}

          {next && (
            <Link href={`/blogs/${next.slug}`} className="group block p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-green-500/30 rounded-xl transition-all duration-300 text-right">
              <div className="flex items-center justify-end gap-2 text-gray-600 font-mono text-xs mb-2">
                Next
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 text-sm font-medium group-hover:text-green-300 transition-colors leading-snug">
                {next.title}
              </p>
            </Link>
          )}
        </div>

        {/* Back to blog list */}
        <div className="mt-10 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-400 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </div>
  )
}