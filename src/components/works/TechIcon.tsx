// ─────────────────────────────────────────────────────────────────────────────
// components/works/TechIcon.tsx
// ─────────────────────────────────────────────────────────────────────────────
// To add a new tech: import its icon and add it to the map below.

import {
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiExpress,
    SiPrisma,
    SiOpenai,
    SiGithub,
    SiPython,
    SiWordpress,
    SiCanva,
    SiPostgresql,
    SiRedis,
    SiDocker,
    SiVercel,
    SiFirebase,
    SiSupabase,
  } from 'react-icons/si'
  import { TbSeo, TbBrandGoogleAnalytics } from 'react-icons/tb'
  import { AiOutlineLineChart } from 'react-icons/ai'
  import { HiCode } from 'react-icons/hi'
  
  const ICON_MAP: Record<string, React.ReactNode> = {
    react: <SiReact />,
    nodejs: <SiNodedotjs />,
    mongodb: <SiMongodb />,
    nextjs: <SiNextdotjs />,
    tailwind: <SiTailwindcss />,
    typescript: <SiTypescript />,
    express: <SiExpress />,
    prisma: <SiPrisma />,
    openai: <SiOpenai />,
    github: <SiGithub />,
    python: <SiPython />,
    wordpress: <SiWordpress />,
    canva: <SiCanva />,
    postgresql: <SiPostgresql />,
    redis: <SiRedis />,
    docker: <SiDocker />,
    vercel: <SiVercel />,
    firebase: <SiFirebase />,
    supabase: <SiSupabase />,
    seo: <TbSeo />,
    analytics: <AiOutlineLineChart />,
  }
  
  interface Props {
    icon: string
    className?: string
  }
  
  export default function TechIcon({ icon, className = '' }: Props) {
    return (
      <span className={className}>
        {ICON_MAP[icon.toLowerCase()] ?? <HiCode />}
      </span>
    )
  }