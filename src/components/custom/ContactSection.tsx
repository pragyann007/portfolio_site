"use client"
import React, { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'project',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setFormState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setFormState('success')
      setForm({ name: '', email: '', type: 'project', message: '' })
    } catch (err: any) {
      setFormState('error')
      setErrorMsg(err.message || 'Failed to send. Try again.')
    }
  }

  const collaborationTypes = [
    { value: 'project', label: 'Project / Freelance' },
    { value: 'fulltime', label: 'Full-time Role' },
    { value: 'collab', label: 'Open Source / Collab' },
    { value: 'codeghar', label: 'CodeGhar / Teaching' },
    { value: 'other', label: 'Just saying hi' },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-black py-20 md:py-36 overflow-hidden"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial glow behind the big text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-green-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-5 md:px-12 lg:px-20 max-w-7xl mx-auto">

        {/* ── Section badge ── */}
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-green-400" />
          <span className="text-green-400 font-mono text-xs tracking-[0.22em] uppercase">
            Let's Work Together
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: copy ── */}
          <div>
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[0.95] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Let's
              <br />
              <span className="text-green-400">Collab</span>
              <span className="text-white">orate</span>
              <span className="text-green-400">.</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 font-light text-base md:text-lg leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Whether it's a freelance project, full-time role, content collab at CodeGhar, or just a conversation — I'm always open. Reach out and let's figure something out.
            </motion.p>

            {/* Quick links */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: 'pragyanthapaliya2007@gmail.com',
                  href: 'mailto:pragyanthapaliya2007@gmail.com',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  ),
                  label: 'github.com/pragyann007',
                  href: 'https://github.com/pragyann007',
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                  label: '@codeghar',
                  href: 'https://www.instagram.com/codeghar/',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-500 hover:text-green-400 transition-colors duration-200 group w-fit"
                >
                  <span className="text-gray-600 group-hover:text-green-400 transition-colors">{item.icon}</span>
                  <span className="font-mono text-xs tracking-wide">{item.label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {formState === 'success' ? (
              <motion.div
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 border border-green-500/30 rounded-2xl bg-green-500/[0.04]"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full border border-green-500/40 bg-green-500/10 flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Message sent!</h3>
                <p className="text-gray-400 font-light text-base leading-relaxed mb-8 max-w-xs">
                  Got it. I'll read it and get back to you as soon as I can.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="text-green-400/60 hover:text-green-400 font-mono text-xs tracking-widest uppercase transition-colors"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-gray-500 font-mono text-xs tracking-widest uppercase">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Pragyan"
                      className="w-full bg-white/[0.03] border border-white/[0.10] hover:border-white/20 focus:border-green-500/60 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 font-light text-sm outline-none transition-all duration-200 focus:bg-white/[0.05]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-500 font-mono text-xs tracking-widest uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className="w-full bg-white/[0.03] border border-white/[0.10] hover:border-white/20 focus:border-green-500/60 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 font-light text-sm outline-none transition-all duration-200 focus:bg-white/[0.05]"
                    />
                  </div>
                </div>

                {/* Collaboration type */}
                <div className="space-y-2">
                  <label className="text-gray-500 font-mono text-xs tracking-widest uppercase">What's this about?</label>
                  <div className="flex flex-wrap gap-2">
                    {collaborationTypes.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: t.value }))}
                        className={`px-3.5 py-1.5 rounded-full border font-mono text-xs tracking-wide transition-all duration-200
                          ${form.type === t.value
                            ? 'border-green-500/60 bg-green-500/10 text-green-400'
                            : 'border-white/[0.10] text-gray-500 hover:border-white/20 hover:text-gray-300'
                          }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-gray-500 font-mono text-xs tracking-widest uppercase">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me what you're working on, what you need, or just say hi..."
                    className="w-full bg-white/[0.03] border border-white/[0.10] hover:border-white/20 focus:border-green-500/60 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 font-light text-sm outline-none transition-all duration-200 focus:bg-white/[0.05] resize-none leading-relaxed"
                  />
                </div>

                {/* Error */}
                {formState === 'error' && (
                  <p className="text-red-400/80 font-mono text-xs flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full group relative flex items-center justify-center gap-3 py-4 px-6
                    bg-green-400 hover:bg-green-300 active:bg-green-500
                    text-black font-bold text-sm tracking-wide rounded-xl
                    transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                    overflow-hidden"
                >
                  {formState === 'loading' ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-gray-700 font-mono text-xs text-center">
                  No spam. No newsletters. Just a real reply.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection