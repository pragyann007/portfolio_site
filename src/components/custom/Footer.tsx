"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

const navLinks = [
  { label: 'About',    href: '/about' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog',     href: '/blogs' },
  { label: 'Contact',  href: '/#contact' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/pragyann007',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/not_pragyann/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@codeghar',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:pragyanthapaliya2007@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-black border-t border-white/[0.06] overflow-hidden">

      {/* Top green glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 w-full px-5 md:px-12 lg:px-20 max-w-7xl mx-auto">

        {/* ── Main footer body ── */}
        <div className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-48">

          {/* Brand col — wide */}
          <div className="md:col-span-5">
            {/* Logo / name */}
            <Link href="/" className="inline-block mb-5 group">
              <div className="flex items-center gap-3">
                {/* <div className="w-8 h-8 rounded-lg bg-green-400/10 border border-green-500/30 flex items-center justify-center group-hover:bg-green-400/20 transition-colors duration-200">
                  <span className="text-green-400 font-mono text-sm font-bold">P</span>
                </div> */}
                <span className="text-white font-bold text-lg tracking-tight">Pragyan<span className="text-green-400">.</span></span>
              </div>
            </Link>

            <p className="text-gray-300 font-light text-md leading-relaxed max-w-xs mb-7">
              Full-stack developer. Building products, teaching at CodeGhar, and making something that creates Impact. Based in Kathmandu, Nepal.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:border-green-500/40 hover:bg-green-500/[0.07] text-gray-500 hover:text-green-400 flex items-center justify-center transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Nav links */}
          <div className="md:col-span-3">
            <p className="text-gray-400 font-mono text-sm tracking-[0.2em] uppercase mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-green-400 font-light text-md transition-colors duration-200 flex items-center gap-2 group w-fit"
                  >
                    <span className="w-3 h-px bg-gray-700 group-hover:bg-green-400 group-hover:w-5 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects / Ventures */}
          {/* <div className="md:col-span-3">
            <p className="text-gray-600 font-mono text-xs tracking-[0.2em] uppercase mb-5">Ventures</p>
            <ul className="space-y-3">
              {[
                { label: 'CodeGhar',  sub: 'Dev community',       href: 'https://www.instagram.com/codeghar/' },
                { label: 'Zenera',    sub: 'AI automation',        href: '#' },
                { label: 'GitHub',    sub: '73+ repos',            href: 'https://github.com/pragyann007' },
                { label: 'Blogs',     sub: 'JS deep dives',        href: '/blogs' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2.5 w-fit"
                  >
                    <span className="w-3 h-px bg-gray-700 group-hover:bg-green-400 group-hover:w-5 transition-all duration-200 mt-2.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 group-hover:text-green-400 font-light text-sm transition-colors duration-200 block leading-tight">
                        {item.label}
                      </span>
                      <span className="text-gray-700 font-mono text-xs">{item.sub}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.05] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-200 font-mono text-sm">
            © {year} Pragyan Thapaliya. Built with Next.js 
          </p>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-200 font-mono text-sm">Available for work</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer