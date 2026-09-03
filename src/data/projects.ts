// ─────────────────────────────────────────────────────────────────────────────
// data/projects.ts
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW PROJECT
// 1. Add an object to the array below — fill in slug, title, description, etc.
// 2. Drop a screenshot at /public/projects/<slug>.png (or set image: undefined
//    to use the animated green-glow fallback instead).
// 3. Done. No other files need touching.
// ─────────────────────────────────────────────────────────────────────────────

import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'baatchit',
    title: 'BaatChit Video Calling Platform',
    tagline: 'A platform where you can call with strangers randomly',
    description:
      'A full-stack learning platform designed for random starngers to come in platform and do video chating just like a omegle.',
    image: '/baatcit.png',
    category: 'Web App',
    tags: ['Education', 'Full Stack', 'MERN'],
    techStack: [
      { icon: 'react', label: 'React' },
      { icon: 'nodejs', label: 'Node.js' },
      { icon: 'express', label: 'Express' },
      { icon: 'mongodb', label: 'MongoDB' },
      {icon:"socketio",label:"SOcket IO"}
    ],
    demo: 'https://baattchitt.netlify.app/',
    status: 'Completed',
    featured: true,
    emoji: '⚛️',
    year: 2026,
  
  },

  {
    slug: 'dns-level-adblocker',
//     design.
//  (Nodejs,TypeScript,UDP,Socket.io,React,Docker)
    title: 'Real-Time DNS Sinkhole & Ad-Blocking Engine',
    tagline: 'A DNS level ad blocking and filtering system',
    description:
      `Built a custom UDP DNS server that intercepts DNS queries, evaluates domains against an optimized ~80K-domain
blocklist for O(1) lookups, and proxies allowed traffic to Cloudflare (1.1.1.1).`,
    image: '/dnsproj.png',
    category: 'Web App',
    tags: ['Nodejs', 'DNS', 'UDP',"React","SOcket io"],
    techStack: [
      { icon: 'react', label: 'React' },
      { icon: 'nodejs', label: 'Node.js' },
      { icon: 'udp', label: 'UDP' },
      { icon: 'dns', label: 'DNS' },
      {icon:"socketio",label:"SOcket IO"}
    ],
    demo: 'https://www.linkedin.com/feed/update/urn:li:activity:7500764692206731264/',
    status: 'Completed',
    featured: true,
    emoji: '⚛️',
    year: 2026,
  
  },

  {
    slug: 'durbar-physics',
    title: 'Durbar Physics',
    tagline: 'Educational platform for physics students',
    description:
      'A full-stack learning platform designed for physics education featuring interactive content, practice problems, and detailed study materials. Built with the MERN stack to provide a seamless learning experience for students preparing for competitive exams.',
    image: '/durbarphysics.png',
    category: 'Web App',
    tags: ['Education', 'Full Stack', 'MERN'],
    techStack: [
      { icon: 'react', label: 'React' },
      { icon: 'nodejs', label: 'Node.js' },
      { icon: 'express', label: 'Express' },
      { icon: 'mongodb', label: 'MongoDB' },
    ],
    demo: 'https://durbarphysics.com/',
    status: 'Completed',
    featured: true,
    emoji: '⚛️',
    year: 2025,
    stats: [
      { label: 'Active Users', value: '40+' },
      { label: 'Topics Covered', value: '100+' },
    ],
  },
 
  {
    slug: 'everest-dental',
    title: 'Everest Dental Clinic',
    tagline: 'Healthcare website with top-3 keyword SEO rankings',
    description:
      'A modern, responsive WordPress website for a dental clinic. Service showcase, appointment info, and patient resources — backed by strategic SEO that achieved top-3 rankings for all target keywords.',
    image: '/everestdentalclinic.png',
    category: 'Website & SEO',
    tags: ['Healthcare', 'SEO', 'WordPress'],
    techStack: [
      { icon: 'wordpress', label: 'WordPress' },
      { icon: 'seo', label: 'On-page SEO' },
    ],
    demo: 'https://myeverestdentalclinic.info/',
    status: 'Completed',
    emoji: '🦷',
    year: 2023,
    stats: [
      { label: 'SEO Rank', value: 'Top 3' },
      { label: 'Keywords Ranked', value: '100%' },
    ],
  },
  
  
  {
    slug: 'manage-my-tabs',
    title: 'Manage My Tabs Extension',
    tagline: 'A smart browser extension to organize, save, and manage tabs efficiently with one click.',
    demo: 'https://github.com/pragyann007/manage-my-tabs',
    description:
      'Manage My Tabs is a productivity-focused browser extension built to help users efficiently organize their browsing sessions. It allows users to save all open tabs, restore sessions later, and close cluttered windows with a single click. This project helped me deeply understand Chrome Extension APIs, especially tab management, storage handling, and background scripting. It also improved my skills in building lightweight, real-world productivity tools that run directly in the browser.',
    image: '/mmt1.png',
    category: 'Browser Extension',
    tags: ['JavaScript', 'Chrome Extension', 'HTML', 'CSS', 'Productivity Tool'],
    techStack: [
      { icon: 'javascript', label: 'JavaScript' },
      { icon: 'chrome', label: 'Chrome Extension API' },
      { icon: 'html', label: 'HTML' },
      { icon: 'css', label: 'CSS' }
    ],
    status: 'Completed',
    emoji: '🧠',
    year: 2026,
  },

  {
    slug: 'seal-editor',
    title: 'Seal Editor',
    tagline: 'Browser-based HTML / CSS / JS editor with live preview',
    description:
      'A browser-based code editor that lets users write and run HTML, CSS, and JavaScript with real-time preview. Includes syntax highlighting, live reload, and instant code execution for rapid web development prototyping.',
    image: '/sealeditor.png',
    category: 'Web App',
    tags: ['Code Editor', 'Full Stack', 'Dev Tool'],
    techStack: [
      { icon: 'react', label: 'React' },
      { icon: 'nodejs', label: 'Node.js' },
      { icon: 'express', label: 'Express' },
    ],
    github: 'https://github.com/pragyann007/backend_seal_editor_deploy',
    demo:"https://sealeditor.netlify.app/",
    status: 'Completed',
    emoji: '🖊️',
    year: 2023,
  },

  {
    slug: 'expresscreatepragyan',
    title: 'ExpressCreatePragyan',
    tagline: 'NPM CLI for instant Express.js project scaffolding',
    description:
      'A CLI tool that generates a ready-to-go Express backend starter with an organized folder structure, database support, and auto-installed dependencies. Built to understand npm package development and publishing workflow end-to-end.',
    image: '/expresscreatepragyan.png',
    category: 'NPM Package',
    tags: ['CLI', 'Node.js', 'Dev Tool'],
    techStack: [
      { icon: 'nodejs', label: 'Node.js' },
      { icon: 'express', label: 'Express' },
    ],
    demo: 'https://www.npmjs.com/package/expresscreatepragyan',
    status: 'Completed',
    emoji: '📦',
    year: 2023,
  },

  {
    slug: 'galaxio-ai-builder',
    title: 'Galaxio AI Builder',
    tagline: 'AI-powered website builder with intelligent design generation',
    description:
      'An innovative AI-driven platform that helps users create stunning websites with intelligent suggestions and automated design workflows. Built on the MERN stack and integrated with OpenAI for smart component generation. Backend currently under maintenance due to a Clerk instance migration.',
    image: '/galaxio.png',
    category: 'Web App',
    tags: ['AI', 'Full Stack', 'MERN'],
    techStack: [
      { icon: 'react', label: 'React' },
      { icon: 'nodejs', label: 'Node.js' },
      { icon: 'express', label: 'Express' },
      { icon: 'mongodb', label: 'MongoDB' },
      { icon: 'openai', label: 'OpenAI' },
    ],
    github: 'https://github.com/pragyann007/galaxio-ai-builder',
    demo: 'https://galaxioo-ai.onrender.com/',
    status: 'Maintenance',
    featured: false,
    emoji: '🤖',
    year: 2025,
  },
 
  {
    slug: 'anurag-silwal-channel',
    title: 'Anurag Silwal Channel',
    tagline: 'YouTube content research & creative design',
    description:
      'Comprehensive content research and creative design for Anurag Silwal\'s YouTube channel — engaging thumbnails in Canva, topic research, and strategic content plans to boost channel growth and audience engagement.',
    image: '/anurag.png',
    category: 'Content & Design',
    tags: ['Content Research', 'Design', 'YouTube'],
    techStack: [
      { icon: 'canva', label: 'Canva' },
      { icon: 'analytics', label: 'Analytics' },
    ],
    status: 'Completed',
    emoji: '🎬',
    year: 2023,
  },

  {
    slug: 'jarvis-fun',
    title: 'Jarvis Fun Project',
    tagline: 'This was my first project that i did after learning JS',
    demo:"https://jarvisum.netlify.app/",
    description:
      'This is the Jarvis that takes the voice command as an input and then according to that it does the work. It opens the website for the thing that you have asked for. Its basic project that i created at my lowest level. ',
    image: '/jarvis.png',
    category: 'Basic',
    tags: ['Begineer', 'Javascript'],
    techStack: [
      { icon: 'javascript', label: 'JS' },
      
    ],
    status: 'Completed',
    emoji: '🎬',
    year: 2024,
  },


  {
    slug: 'k72',
    title: 'Animation Clone of k72.ca',
    tagline: 'This is the frontend ui cloe project of k72.ca website that has great animations.',
    demo:"https://k72p.netlify.app/",
    description:
      'This is the lone project that i built with the help of youtube. The main tech stack is React js and Gsap. Through this project i got to learn about real animations handled in real application.It taught me how to organise the animations without breaking the ui. ',
    image: '/k72.png',
    category: 'Web Development',
    tags: ['Gsap',"React Js" ,'Javascript'],
    techStack: [
      { icon: 'javascript', label: 'GSAP' },
      
    ],
    status: 'Completed',
    emoji: '🎬',
    year: 2024,
  },
  

]

// ── helpers ───────────────────────────────────────────────────────────────────

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug) ?? null

export const getAdjacentProjects = (slug: string) => {
  const idx = projects.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}

export const CATEGORIES = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
]