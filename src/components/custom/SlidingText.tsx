"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, animate } from "motion/react"

const segments = [
  { text: "OBSESSION", accent: false },
  { text: "ALWAYS", accent: true },
  { text: "BEATS", accent: false },
  { text: "TALENT", accent: true },
  { text: "·", dot: true },
  { text: "JUST", accent: false },
  { text: "OBSESSED", accent: true },
  { text: "OF BUILDING", accent: false },
  { text: ".", dot: true },
]

export default function SlidingText() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)

  const [bounds, setBounds] = useState({ min: 0, max: 0 })
  const [progress, setProgress] = useState(0)
  const [sectionHeight, setSectionHeight] = useState("100vh")

  // ===== Measure horizontal travel & sync section height =====
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return

      const raw = trackRef.current.scrollWidth - window.innerWidth
      const maxScroll = Math.max(raw, 0)

      setBounds({
        min: -maxScroll,
        max: 0,
      })

      setSectionHeight(`${maxScroll + window.innerHeight}px`)
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // ===== Progress tracking =====
  useEffect(() => {
    return x.on("change", (val) => {
      if (bounds.min === 0) return
      setProgress(Math.min(Math.abs(val) / Math.abs(bounds.min), 1))
    })
  }, [x, bounds])

  // ===== Wheel hijack =====
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const pinned =
        rect.top <= 1 && rect.bottom >= window.innerHeight - 1

      if (!pinned) return

      const cur = x.get()

      const atEnd =
        e.deltaY > 0 && cur <= bounds.min + 2
      const atStart =
        e.deltaY < 0 && cur >= bounds.max - 2

      if (atEnd || atStart) return

      e.preventDefault()

      const next = Math.max(
        bounds.min,
        Math.min(bounds.max, cur - e.deltaY * 4)
      )

      animate(x, next, {
        type: "spring",
        stiffness: 250,
        damping: 35,
        mass: 0.7,
      })
    }

    window.addEventListener("wheel", onWheel, {
      passive: false,
    })

    return () =>
      window.removeEventListener("wheel", onWheel)
  }, [bounds, x])

  // ===== Touch swipe =====
  useEffect(() => {
    let startX = 0
    let startVal = 0

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startVal = x.get()
    }

    const onMove = (e: TouchEvent) => {
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const pinned =
        rect.top <= 1 && rect.bottom >= window.innerHeight - 1

      if (!pinned) return

      const dx = e.touches[0].clientX - startX

      x.set(
        Math.max(
          bounds.min,
          Math.min(bounds.max, startVal + dx * 1.8)
        )
      )

      e.preventDefault()
    }

    window.addEventListener("touchstart", onStart, {
      passive: true,
    })
    window.addEventListener("touchmove", onMove, {
      passive: false,
    })

    return () => {
      window.removeEventListener("touchstart", onStart)
      window.removeEventListener("touchmove", onMove)
    }
  }, [bounds, x])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        {/* TEXT STRIP */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          <div className="flex-shrink-0 w-[6vw]" />

          {segments.map((seg, i) => (
            <span key={i} className="flex-shrink-0 flex items-center">
              {seg.dot ? (
                <span className="text-white/20 font-black text-[18vw] mx-6">
                  {seg.text}
                </span>
              ) : (
                <span
                  className={`font-black leading-[0.9] tracking-tighter select-none ${
                    seg.accent
                      ? "text-[#00ff88]"
                      : "text-white"
                  }`}
                  style={{
                    fontSize: "clamp(80px, 18vw, 260px)",
                  }}
                >
                  {seg.text}
                </span>
              )}

              {!seg.dot &&
                i < segments.length - 1 &&
                !segments[i + 1]?.dot && (
                  <span
                    className="flex-shrink-0"
                    style={{
                      width:
                        "clamp(16px, 2.5vw, 48px)",
                    }}
                  />
                )}
            </span>
          ))}

          <div className="flex-shrink-0 w-[25vw]" />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
          <motion.div
            className="h-full bg-green-400"
            style={{
              width: `${progress * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  )
}
