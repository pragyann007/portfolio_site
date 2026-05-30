// ─────────────────────────────────────────────────────────────────────────────
// types/project.ts
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectStatus = 'Completed' | 'In Progress' | 'Maintenance'

export interface TechItem {
  /** display name shown in badges */
  label: string
  /** icon key — maps to the icon map in components/TechIcon.tsx */
  icon: string
}

export interface ProjectStat {
  label: string
  value: string
}

export interface Project {
  /** unique url-safe slug — used for /works/[slug] routing */
  slug: string
  title: string
  tagline: string
  description: string
  /** relative path under /public OR an external URL; undefined = no image */
  image?: string
  category: string
  tags: string[]
  techStack: TechItem[]
  github?: string
  demo?: string
  status: ProjectStatus
  featured?: boolean
  stats?: ProjectStat[]
  /** emoji or single character shown as fallback icon */
  emoji?: string
  year?: number
}