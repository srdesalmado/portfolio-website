export type ProjectSection = {
  title: string
  body: string
  images: { label: string; caption: string }[]
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  metrics: { value: string; label: string }[]
  coverLabel: string
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
    subtitle: "Building a concept for a disruptive brand in a disruptive market",
    description:
      "Created Klavi's brand identity from scratch — a design built around connection as the key to transformation, differentiating an Open Finance platform in an emerging and competitive market.",
    tags: ["Branding", "Identity"],
    metrics: [
      { value: "6", label: "Team members" },
      { value: "2022", label: "Year" },
      { value: "Brand Gym", label: "Agency" },
    ],
    coverLabel: "Klavi Brand Identity",
    year: "2022",
    role: "Brand Designer",
    team: "Carol Saltoun, Grazi Shimizu, Maria Paula, Giovanni Ghilardi, Douglas Farias, Bruno Ribeiro",
    agency: "Brand Gym",
    timeline: "April 2022",
    quote:
      "Connection can be the key to transformation — this idea shaped every visual decision we made for Klavi.",
    sections: [
      {
        title: "The Challenge",
        body: "Klavi's challenge was to create a consistent concept for its brand, which would enhance the quality of its products and services and differentiate it from the players in the market — which are still few, but which have international experience or investments from large Brazilian banks. Distrust in data sharing is still a sensitive point for Brazilians, and few companies already see the value in opening up data sharing. Therefore, reliability, in its most diverse senses, is the attribute that Klavi needs to build every day, whether in brand strategies or in business operations — in addition to having a great challenge ahead, which is to generate value from OpenData.",
        images: [
          { label: "Market landscape", caption: "Mapping competitors and positioning opportunities in the Open Finance space" },
        ],
      },
      {
        title: "Design Strategy",
        body: "Based on the idea that connection can be the key to transformation, we created the entire Klavi design. The cubes with rounded edges — which never appear alone — represent the connection between people and data, between human intelligence and technology, between Klavi, its partners and customers. The proportion between the cubes brings the idea of Klavi as a support and as a brand that puts customer success first.",
        images: [
          { label: "Logo construction", caption: "The connected cubes — proportions and spatial relationships" },
          { label: "Visual elements", caption: "Outlined cubes representing windows into a new financial landscape" },
        ],
      },
      {
        title: "Visual Language",
        body: "The connected cubes, present both in the logo and in the visual elements, also appear outlined, representing the windows through which it is possible to see through — see a new scenario in the Brazilian financial system — as well as lines that connect people and the different paths that Klavi presents with its service. In the photographs, people interacting with technology, bringing once again the idea of connection as the key to a world transformed by the power of open finance.",
        images: [
          { label: "Typography — Space Grotesk + Inter", caption: "Space Grotesk for titles, Inter for interfaces and small texts" },
          { label: "Color palette", caption: "Brand colors with Klavi blue as the primary accent" },
        ],
      },
      {
        title: "Applied Design",
        body: "From the website and product UI to social media communication, the brand system was applied consistently across all touchpoints — reinforcing the concept of connection at every interaction. The visual identity was built to scale with the product as Klavi grew.",
        images: [
          { label: "Website — klavi.ai", caption: "Homepage with hero, partner logos, and key value propositions" },
          { label: "Social media content", caption: "Branded content system for Instagram and LinkedIn" },
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
