export type Project = {
  slug: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  metrics: { value: string; label: string }[]
  coverLabel: string
  year: string
}

export const projects: Project[] = [
  {
    slug: "amfi-tokenized-credit",
    title: "AmFi — Tokenized Credit Platform",
    subtitle: "Core investment flow redesign",
    description:
      "Redesigned the core investment flow for a Brazilian fintech tokenizing private credit assets, reducing friction and increasing conversion across onboarding.",
    tags: ["Fintech", "Product Design"],
    metrics: [
      { value: "40% ↑", label: "Task completion" },
      { value: "3x", label: "Faster onboarding" },
      { value: "92%", label: "User satisfaction" },
    ],
    coverLabel: "AmFi",
    year: "2024",
  },
  {
    slug: "design-system-b2b-saas",
    title: "Design System at Scale — B2B SaaS",
    subtitle: "Component library for 12+ product squads",
    description:
      "Built a component library from scratch for a B2B SaaS platform used by 12+ product squads, establishing a single source of truth for UI patterns.",
    tags: ["Design System", "Tokens"],
    metrics: [
      { value: "60% ↑", label: "Dev velocity" },
      { value: "200+", label: "Components" },
      { value: "4", label: "Product teams" },
    ],
    coverLabel: "Design System",
    year: "2024",
  },
  {
    slug: "dashboard-data-platform",
    title: "Dashboard Redesign — Data Platform",
    subtitle: "Analytics for financial analysts",
    description:
      "Rebuilt a complex analytics dashboard used by financial analysts, reducing cognitive load and dramatically improving time-to-insight on key metrics.",
    tags: ["Data", "B2B"],
    metrics: [
      { value: "35% ↓", label: "Time-to-insight" },
      { value: "50+", label: "Charts redesigned" },
      { value: "98%", label: "Retention" },
    ],
    coverLabel: "Data Platform",
    year: "2023",
  },
]
