"use client"

/**
 * EVEREST DENTAL — CASE STUDY LANDING PAGE
 * -----------------------------------------------------------------------
 * Drop this file in as: app/dental-clinic-case-study/page.tsx
 *
 * SETUP
 * 1. npm install gsap
 * 2. This file loads its own fonts via next/font/google for portability.
 *    If you'd rather share fonts with the rest of the site, move the
 *    Fraunces / Inter / JetBrains_Mono declarations into layout.tsx and
 *    apply them the same way you already do for your portfolio fonts.
 * 3. Every image below is a placeholder `src`. Search for "SWAP:" comments
 *    to find every spot where you drop in a real screenshot.
 * 4. Search for "YOUR_" to find the two links you need to fill in
 *    (WhatsApp number + Calendly link).
 * -----------------------------------------------------------------------
 */

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
})
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" })
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], display: "swap" })

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ---------------------------------------------------------------------
// CONTENT — edit copy/links here, JSX below rarely needs to change
// ---------------------------------------------------------------------

const WHATSAPP_LINK = "https://wa.link/aefz8l" // e.g. https://wa.me/9779800000000?text=...
const CALENDLY_LINK = "https://calendly.com/pragyanthapaliya027/web-design-consultation"

const proofCards = [
  {
    title: "The website",
    caption: "Built to convert, not just to look nice",
    // SWAP: replace with a real screenshot of the live site (browser mockup)
    src: "/everestdentalclinic.png",
    alt: "Everest Dental Clinic website homepage",
    frame: "browser" as const,
  },
  {
    title: "#1 organic ranking",
    caption: '"best implant center in Pokhara"',
    // SWAP: replace with a real Google search results screenshot
    src: "/testigg.png",
    alt: "Everest Dental ranked #1 on Google search",
    frame: "plain" as const,
  },
  {
    title: "Top 3 on Google Maps",
    caption: "83+ five-star reviews and climbing",
    // SWAP: replace with a real Google Maps / GMB screenshot
    src: "/mapsgg.png",
    alt: "Everest Dental Clinic in the Google Maps top 3",
    frame: "plain" as const,
  },
]

// ---------------------------------------------------------------------
// STORYTELLING PRIMITIVES
// Small, reusable pieces that carry the emotional arc: red = the pain of
// being invisible, teal = the payoff of being found. Every number here
// is a real figure from the brief — nothing here is decorative filler.
// ---------------------------------------------------------------------

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
    <path
      d="M2.5 6.3L4.8 8.6L9.5 3.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={direction === "left" ? "" : "rotate-180"}
  >
    <path
      d="M11 4L6 9L11 14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/** A "before" word gets struck through in red, then flips into a glowing
 *  teal "after" word once it scrolls into view. Used for the metrics we
 *  don't have two numbers for (rank, map placement). */
const StatFlip = ({
  before,
  after,
  caption,
  badge,
}: {
  before: string
  after: string
  caption: string
  badge: string
}) => {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const beforeEl = el.querySelector("[data-before]")
    const afterEl = el.querySelector("[data-after]")
    const badgeEl = el.querySelector("[data-badge]")

    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } })
    tl.to(beforeEl, { opacity: 0, scale: 0.85, filter: "blur(4px)", duration: 0.5, ease: "power2.in" })
      .to(afterEl, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.8)" }, "-=0.15")
      .from(badgeEl, { opacity: 0, y: 8, duration: 0.4, ease: "power2.out" }, "-=0.1")

    return () => { tl.kill() }
  }, [])

  return (
    <div ref={wrapRef} className="flex flex-col items-start">
      <div className="relative h-[1.2em] w-full">
        <span
          data-before
          className={`${mono.className} absolute left-0 top-0 text-3xl text-[#F43F5E] line-through decoration-2 sm:text-4xl`}
        >
          {before}
        </span>
        <span
          data-after
          className={`${mono.className} absolute left-0 top-0 text-3xl text-[#2FD8B4] opacity-0 drop-shadow-[0_0_25px_rgba(47,216,180,0.5)] sm:text-4xl -mt-2`}
        >
          {after}
        </span>
      </div>
      <p className="mt-3 text-sm text-white/50">{caption}</p>
      <span
        data-badge
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#2FD8B4]/30 bg-[#2FD8B4]/10 px-3 py-1 text-xs text-[#8FE3CE]"
      >
        <CheckIcon /> {badge}
      </span>
    </div>
  )
}

/** Counts up from a real "before" number to the real "after" number —
 *  used for reviews, where we actually have both data points (2 → 83+). */
const StatCount = ({
  from,
  to,
  suffix = "",
  caption,
  badge,
}: {
  from: number
  to: number
  suffix?: string
  caption: string
  badge: string
}) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    const num = numRef.current
    if (!el || !num) return
    const counter = { val: from }
    const badgeEl = el.querySelector("[data-badge]")

    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } })
    tl.to(counter, {
      val: to,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => { num.textContent = Math.round(counter.val).toString() },
    }).from(badgeEl, { opacity: 0, y: 8, duration: 0.4, ease: "power2.out" }, "-=0.2")

    return () => { tl.kill() }
  }, [from, to])

  return (
    <div ref={wrapRef} className="flex flex-col items-start">
      <span className={`${mono.className} text-4xl mt- text-[#2FD8B4] drop-shadow-[0_0_25px_rgba(47,216,180,0.5)] sm:text-5xl`}>
        <span className="" ref={numRef}>{from}</span>
        {suffix}
      </span>
      <p className="mt-1 text-sm text-white/50">{caption}</p>
      <span
        data-badge
        className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#2FD8B4]/30 bg-[#2FD8B4]/10 px-3 py-1 text-xs text-[#8FE3CE]"
      >
        <CheckIcon /> {badge}
      </span>
    </div>
  )
}

/** The heartbeat line. Flat and red for "the clinic nobody could find."
 *  Alive, teal, and pulsing for "the clinic patients found." Same medical
 *  monitor line both times — it's the one visual that carries the whole
 *  before/after story on its own. */
const FlatlinePulse = ({ variant }: { variant: "flat" | "alive" }) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!wrap || !path) return
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: "top 82%", once: true } })
    tl.to(path, { strokeDashoffset: 0, duration: variant === "flat" ? 1.1 : 1.7, ease: "power1.inOut" })
    if (variant === "alive") {
      tl.to(path, { opacity: 0.5, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" })
    }
    return () => { tl.kill() }
  }, [variant])

  const d =
    variant === "flat"
      ? "M0,40 L820,40"
      : "M0,40 L90,40 L105,8 L120,72 L135,18 L150,40 L290,40 L305,8 L320,72 L335,18 L350,40 L490,40 L505,8 L520,72 L535,18 L550,40 L690,40 L705,8 L720,72 L735,18 L750,40 L820,40"

  return (
    <div ref={wrapRef} className="w-full">
      <svg viewBox="0 0 820 80" className="w-full" preserveAspectRatio="none" fill="none">
        <path
          ref={pathRef}
          d={d}
          stroke={variant === "flat" ? "#F43F5E" : "#2FD8B4"}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={variant === "alive" ? "drop-shadow-[0_0_12px_rgba(47,216,180,0.65)]" : "opacity-70"}
        />
      </svg>
    </div>
  )
}

/** The bridge between the red "problem" beat and the teal "result" beat.
 *  Its own background literally shifts color as you scroll through it —
 *  the one deliberately bigger motion moment on the page. */
const ShiftSection = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tween = gsap.fromTo(
      el,
      { backgroundColor: "#170907" },
      {
        backgroundColor: "#0B1512",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      }
    )
    return () => { tween.kill() }
  }, [])

  return (
    <div
      ref={ref}
      className="border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:py-28"
      style={{ backgroundColor: "#170907" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className={`${fraunces.className} text-2xl leading-snug text-white/85 sm:text-3xl lg:text-4xl`}>
          We didn&apos;t just build a website. We built a front door patients could actually find.
        </p>
        <p className="mt-4 text-sm text-white/40">
          New site. Local SEO rebuilt from zero. Google Business Profile optimized end to end.
        </p>
      </div>
    </div>
  )
}

/** Big single-image "stage" with a tab strip up top and thumbnails below.
 *  This replaces the old 3-up grid — each screenshot now renders at a
 *  much larger size (object-contain, not cover) so nothing gets cropped
 *  or upscaled into blurriness, plus arrow + swipe navigation. */
const ProofShowcase = () => {
  const [active, setActive] = useState(0)
  const card = proofCards[active]

  const goTo = (i: number) => setActive((i + proofCards.length) % proofCards.length)

  // basic touch-swipe support for mobile
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) goTo(active + (delta < 0 ? 1 : -1))
    touchStartX.current = null
  }

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {proofCards.map((c, i) => (
          <button
            key={c.title}
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              i === active
                ? "border-[#2FD8B4]/40 bg-[#2FD8B4]/10 text-[#8FE3CE]"
                : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Big stage */}
      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {card.frame === "browser" && (
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
        )}

        <div className="relative aspect-[16/10] bg-[#0D1211] sm:aspect-[16/9]">
          {/* SWAP: point src at the real screenshot for this card (see "src" in proofCards above).
              Use the highest-res screenshot you have — this box now renders it
              far larger than the old grid, so source quality matters. */}
          <Image
            key={card.src}
            src={card.src}
            alt={card.alt}
            fill
            quality={95}
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-contain"
            priority={active === 0}
          />
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[#2FD8B4]/30 bg-black/50 px-2.5 py-1 text-[10px] text-[#8FE3CE] backdrop-blur">
            <CheckIcon /> Verified
          </span>

          {/* Arrow nav */}
          <button
            aria-label="Previous screenshot"
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            aria-label="Next screenshot"
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm font-medium">{card.title}</p>
          <p className="mt-1 text-xs text-white/40">{card.caption}</p>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {proofCards.map((c, i) => (
          <button
            key={c.title}
            onClick={() => setActive(i)}
            aria-label={`Show ${c.title}`}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition-opacity ${
              i === active
                ? "border-[#2FD8B4]/60 opacity-100"
                : "border-white/10 opacity-45 hover:opacity-80"
            }`}
          >
            <Image src={c.src} alt={c.alt} fill quality={90} className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------

const DentalCaseStudy = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // One orchestrated entrance for the hero — this is the single
      // "big moment" of motion on the page.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from("[data-hero-tag]", { opacity: 0, y: 10, duration: 0.5 })
        .from("[data-hero-headline]", { opacity: 0, y: 22, duration: 0.8 }, "-=0.25")
        .from("[data-hero-sub]", { opacity: 0, y: 14, duration: 0.6 }, "-=0.45")
        .from("[data-hero-ticker]", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3")
        .from("[data-hero-cta]", { opacity: 0, y: 10, duration: 0.5 }, "-=0.25")

      // Everything below the fold answers scrolling — a quiet, consistent
      // reveal per section rather than animating every element separately.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${inter.className} w-full bg-[#070A09] text-[#F2F5F3] selection:bg-[#2FD8B4] selection:text-black`}
    >
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full bg-[#2FD8B4]/[0.08] blur-[130px]" />
          <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-[#E8B94B]/[0.05] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 sm:px-10 lg:pt-32 lg:pb-28">
          <p data-hero-tag className="mb-6 text-sm font-medium text-[#8FE3CE]">
            Case study — Everest Dental Clinic &amp; Implant Center, Pokhara
          </p>

          <h1
            data-hero-headline
            className={`${fraunces.className} max-w-3xl text-[2.75rem] font-medium leading-[1.08] sm:text-6xl lg:text-7xl`}
          >
            <span className="text-[#F43F5E]/90">Zero website. Zero rankings.</span>{" "}
            Now the{" "}
            <span className="text-[#2FD8B4] drop-shadow-[0_0_30px_rgba(47,216,180,0.45)]">
              #1 implant center
            </span>{" "}
            in Pokhara.
          </h1>

          <p data-hero-sub className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Dr. Suresh Bhandari had no digital presence at all — no site, no rankings, barely a
            map listing. Six months later, Everest Dental owns page one of Google and a waiting
            room full of new implant patients.
          </p>

          {/* Quick teaser — the full, dramatic before/after lives further down the page */}
          <div
            data-hero-ticker
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40"
          >
            <span>
              <span className="text-[#F43F5E]">Unranked</span> <span className="text-white/20">→</span>{" "}
              <span className="text-[#2FD8B4]">#1 on Google</span>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span>
              <span className="text-[#F43F5E]">2 reviews</span> <span className="text-white/20">→</span>{" "}
              <span className="text-[#2FD8B4]">83+</span>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span>
              <span className="text-[#F43F5E]">Invisible</span> <span className="text-white/20">→</span>{" "}
              <span className="text-[#2FD8B4]">Top 3 on Maps</span>
            </span>
          </div>

          <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#2FD8B4] px-7 py-3.5 font-medium text-black transition-colors hover:bg-[#5EE8C9]"
            >
              Get Your Free 5-Min Local Audit
            </a>
            <span className="text-sm text-white/40">No pitch. Just what&apos;s fixable.</span>
          </div>
        </div>
      </section>

      {/* ============================ THE STORY ============================ */}
      {/* Three beats: the pain of being invisible (red), the turning point
          (color itself shifts as you scroll), then the payoff (teal, alive,
          with real before/after numbers). This replaces a plain comparison
          table with something that's felt, not just read. */}

      {/* Beat 1 — the problem */}
      <section
        data-reveal
        className="border-t border-white/[0.06] bg-gradient-to-b from-[#1A0908] to-[#070A09] px-6 py-24 sm:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-sm font-medium text-[#FCA5A5]">Six months ago</p>
          <p className={`${fraunces.className} text-3xl leading-[1.15] text-white/70 sm:text-4xl lg:text-5xl`}>
            Dr. Bhandari built one of Pokhara&apos;s best implant clinics.
          </p>
          <p className={`${fraunces.className} mt-2 text-4xl leading-[1.15] text-[#F43F5E] sm:text-5xl lg:text-6xl`}>
            Almost nobody could find it.
          </p>

          <div className="mt-16">
            <FlatlinePulse variant="flat" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <p className={`${mono.className} text-2xl text-[#F43F5E]`}>0</p>
              <p className="mt-1 text-sm text-white/40">patients found them on Google</p>
            </div>
            <div>
              <p className={`${mono.className} text-2xl text-[#F43F5E]`}>2</p>
              <p className="mt-1 text-sm text-white/40">reviews, after years in business</p>
            </div>
            <div>
              <p className={`${mono.className} text-2xl text-[#F43F5E]`}>0</p>
              <p className="mt-1 text-sm text-white/40">rankings for any search that mattered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beat 2 — the shift */}
      <ShiftSection />

      {/* Beat 3 — the result */}
      <section
        data-reveal
        className="border-t border-white/[0.06] bg-gradient-to-b from-[#070A09] to-[#0B1512] px-6 py-24 sm:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-sm font-medium text-[#8FE3CE]">Six months later</p>
          <p className={`${fraunces.className} text-3xl leading-[1.15] sm:text-4xl lg:text-5xl`}>
            Now Everest Dental is the clinic Pokhara finds first.
          </p>

          <div className="mt-16">
            <FlatlinePulse variant="alive" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-17 gap-y-18 sm:grid-cols-2">
            <StatFlip
              before="Unranked"
              after="#1"
              caption='Ranking for "best implant center in Pokhara"'
              badge="Verified on Google Search"
            />
            <StatCount
              from={2}
              to={83}
              suffix="+"
              caption="Five-star reviews — and still climbing"
              badge="Verified on Google Business"
            />
            <StatFlip
              before="Not listed"
              after="Top 3"
              caption="Placement in the Google Maps pack"
              badge="Verified on Google Maps"
            />
            <StatFlip
              before="Unranked"
              after="Top 5"
              caption="Across every major dental search in Pokhara"
              badge="Verified on Google Search"
            />
          </div>
        </div>
      </section>

      {/* ========================= VISUAL PROOF ========================= */}
      <section
        data-reveal
        className="mx-auto max-w-5xl border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:py-28"
      >
        <h2 className={`${fraunces.className} mb-2 text-3xl sm:text-4xl`}>The proof</h2>
        <p className="mb-10 max-w-lg text-white/50">Screenshots, not promises.</p>

        <ProofShowcase />
      </section>

      {/* ========================== TESTIMONIAL ========================== */}
      <section
        data-reveal
        className="mx-auto max-w-5xl border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:py-28"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p
              className={`${fraunces.className} text-3xl italic leading-snug text-white/90 sm:text-4xl`}
            >
              &ldquo;Before this, people didn&apos;t even know we existed online. Now my phone
              doesn&apos;t stop ringing with patients who found us on Google.&rdquo;
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium">Dr. Suresh Bhandari</p>
              <p className="text-xs text-white/40">Founder, Everest Dental Clinic &amp; Implant Center</p>
            </div>
          </div>

          <div>
            {!showVideo ? (
              <button
                onClick={() => setShowVideo(true)}
                className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                {/* SWAP: optional poster image sitting behind the play button */}
                {/* <Image src="/case-study/testimonial-poster.jpg" alt="" fill className="object-cover opacity-40" /> */}
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#2FD8B4] text-black transition-transform group-hover:scale-105">
                  ▶
                </span>
                <span className="absolute bottom-4 left-4 text-xs text-white/40">
                  Watch the testimonial
                </span>
              </button>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
                {/* SWAP: replace with your real video — a raw <video src> or an embedded iframe both work here */}
                <video controls className="h-full w-full object-cover" src="/case-study/testimonial.mp4" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================ CLOSING CTA ============================ */}
      <section data-reveal className="mx-auto max-w-5xl border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:py-28">
        <div className="rounded-3xl border border-[#2FD8B4]/20 bg-gradient-to-b from-[#2FD8B4]/[0.06] to-transparent p-10 text-center lg:p-16">
          <h2 className={`${fraunces.className} mx-auto max-w-xl text-3xl leading-tight sm:text-4xl`}>
            Patients are searching for a clinic like yours right now.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/50">
            If your clinic isn&apos;t showing up, they&apos;re calling someone else instead.
            I&apos;ll show you exactly where you stand — free, in five minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#2FD8B4] px-8 py-4 font-medium text-black transition-colors hover:bg-[#5EE8C9]"
            >
              Get Your Free 5-Min Local Audit
            </a>
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-8 py-4 text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Or book a call
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DentalCaseStudy