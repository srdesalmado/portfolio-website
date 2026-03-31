export type ProjectImage = {
  src?: string
  label: string
  caption?: string
}

export type ProjectSection = {
  title: string
  body: string
  images: ProjectImage[]
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  metrics: { value: string; label: string }[]
  coverLabel: string
  coverImage?: string
  year: string
  // Optional per-project overrides
  role?: string
  team?: string
  agency?: string
  timeline?: string
  quote?: string
  sections?: ProjectSection[]
}

export const projects: Project[] = [
  {
    slug: "branding-klavi",
    title: "Branding — Klavi",
    subtitle: "How to build a concept that differentiates a disruptive brand in a disruptive market by itself?",
    description:
      "How to build a concept that differentiates a disruptive brand in a disruptive market by itself?",
    tags: ["Branding", "Identity"],
    metrics: [
      { value: "6", label: "Team members" },
      { value: "2022", label: "Year" },
      { value: "Brand Gym", label: "Agency" },
    ],
    coverLabel: "Klavi Brand Identity",
    coverImage: "/klavi-cover.png",
    year: "2022",
    role: "Brand Designer",
    team: "Carol Saltoun, Grazi Shimizu, Maria Paula, Giovanni Ghilardi, Douglas Farias, Bruno Ribeiro",
    agency: "Brand Gym",
    timeline: "April 2022",
    sections: [
      {
        title: "The Challenge",
        body: "Klavi's challenge was to create a consistent concept for its brand, which would enhance the quality of its products and services and differentiate it from the players in the market — which are still few, but which have international experience or investments from large Brazilian banks. Distrust in data sharing is still a sensitive point for Brazilians, and few companies already see the value in opening up data sharing. Therefore, reliability, in its most diverse senses, is the attribute that Klavi needs to build every day, whether in brand strategies or in business operations, in addition to having a great challenge ahead, which is to generate value from OpenData.",
        images: [
          { src: "/klavi-logo-evolution.png", label: "Logo evolution" },
          { src: "/klavi-logo-mark.gif", label: "Logo mark" },
        ],
      },
      {
        title: "Design Strategy",
        body: "Based on the idea that connection can be the key to transformation, we created the entire Klavi design. The cubes with rounded edges and which never appear alone represent this connection between people and data, between human intelligence and technology, between Klavi, its partners and customers. The proportion between the cubes brings the idea of Klavi as a support and as a brand that puts customer success first.\n\nThe connected cubes, present both in the logo and in the visual elements, also appear outlined, representing the windows through which it is possible to see through, see a new scenario in the Brazilian financial system, as well as lines that connect people and the different paths that Klavi presents with his service.\n\nIn the photographs, people interacting with technology, bringing once again the idea of connection as the key to a world transformed by the power of open finance.",
        images: [
          { src: "/klavi-subway-mockup.jpg", label: "Subway mockup" },
          { src: "/klavi-social-media.png", label: "Social media" },
        ],
      },
    ],
  },
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
