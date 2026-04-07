export type ProjectImage = {
  src?: string
  label: string
  caption?: string
}

export type ProjectSection = {
  title: string
  body: string
  images: ProjectImage[]
  links?: { label: string; url: string }[]
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
  gallery?: (string | [string, string] | { stack: string[] })[]
  galleryGap?: boolean
}

export const projects: Project[] = [
  {
    slug: "brickup-saas",
    title: "UI/UX — Brickup SaaS",
    subtitle: "Restructuring a construction management SaaS to improve navigation, planning and the overall user experience.",
    description: "Restructuring a construction management SaaS to improve navigation, planning and the overall user experience.",
    tags: ["UI Design", "UX Design", "SaaS"],
    metrics: [],
    coverLabel: "Brickup SaaS",
    coverImage: "/brickup1/brickup-01.png",
    year: "2025",
    role: "Product Designer",
    timeline: "2025",
    team: "Carlos Henrique (Lead Designer), Samuel Leão (Co-designer)",
    sections: [
      {
        title: "The Challenge",
        body: "We aimed to improve the user experience by restructuring the application interface through three key enhancements: hierarchical menus for improved navigation and information architecture, a new home screen and dashboard with a clearer overview of key features, and an improved planning screen for easier organization and visualization.",
        images: [
          { src: "/brickup1/brickup-02.png", label: "Brickup screen 02" },
          { src: "/brickup1/brickup-03.png", label: "Brickup screen 03" },
          { src: "/brickup1/brickup-04.png", label: "Brickup screen 04" },
          { src: "/brickup1/brickup-05.png", label: "Brickup screen 05" },
          { src: "/brickup1/brickup-06.png", label: "Brickup screen 06" },
          { src: "/brickup1/brickup-07.png", label: "Brickup screen 07" },
          { src: "/brickup1/brickup-08.png", label: "Brickup screen 08" },
          { src: "/brickup1/brickup-09.png", label: "Brickup screen 09" },
          { src: "/brickup1/brickup-10.png", label: "Brickup screen 10" },
          { src: "/brickup1/brickup-11.png", label: "Brickup screen 11" },
        ],
      },
    ],
    gallery: [],
  },
  {
    slug: "quintoandar-landing-pages",
    title: "QuintoAndar — Landing Pages",
    subtitle: "Building 2 landing pages for QuintoAndar's real estate company vertical, from teaser to direct conversion.",
    description: "Building 2 landing pages for QuintoAndar's real estate company vertical, from teaser to direct conversion.",
    tags: ["UI Design", "Landing Page"],
    metrics: [],
    coverLabel: "QuintoAndar Landing Pages",
    coverImage: "/quintoandar/quintoandar-cover.png",
    year: "2022",
    role: "UI Designer",
    team: "Carlos Henrique (Designer), Victor Maués (Copywriting), André Souza (Operations)",
    agency: "Brand Gym",
    sections: [
      {
        title: "The Challenge",
        body: "QuintoAndar is the largest housing platform in Latin America, having its business model based on renting, buying and selling real estate, in a digital way. Thus, the company is today the second largest startup in Latin America.\n\nFor this project, the challenge was to build 2 landing pages for QuintoAndar's vertical aimed at real estate companies. The first is a teaser LP, aimed at attracting real estate companies interested in partnering with QuintoAndar. The second is a direct conversion page, presenting what the product is, its differentials, advantages, etc.",
        images: [],
      },
    ],
    gallery: [
      "/quintoandar/quintoandar-01.png",
      { stack: ["/quintoandar/quintoandar-02.png", "/quintoandar/quintoandar-03.png"] },
      "/quintoandar/quintoandar-04.png",
      "/quintoandar/quintoandar-05.png",
    ],
  },
  {
    slug: "branding-klavi",
    title: "Branding — Klavi",
    subtitle: "How to build a concept that differentiates a disruptive brand in a disruptive market by itself?",
    description:
      "How to build a concept that differentiates a disruptive brand in a disruptive market by itself?",
    tags: ["Brand Design", "UI Design"],
    metrics: [],
    coverLabel: "Klavi Brand Identity",
    coverImage: "/klavi/klavi-cover.png",
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
          { src: "/klavi/klavi-logo-mark.gif", label: "Logo mark" },
        ],
      },
      {
        title: "Design Strategy",
        body: "Based on the idea that connection can be the key to transformation, we created the entire Klavi design. The cubes with rounded edges and which never appear alone represent this connection between people and data, between human intelligence and technology, between Klavi, its partners and customers. The proportion between the cubes brings the idea of Klavi as a support and as a brand that puts customer success first.\n\nThe connected cubes, present both in the logo and in the visual elements, also appear outlined, representing the windows through which it is possible to see through, see a new scenario in the Brazilian financial system, as well as lines that connect people and the different paths that Klavi presents with his service.\n\nIn the photographs, people interacting with technology, bringing once again the idea of connection as the key to a world transformed by the power of open finance.",
        images: [],
      },
      {
        title: "Highlights",
        body: "",
        images: [],
        links: [
          {
            label: "Startup que leva o Open Finance às fintechs, capta US$ 15 milhões",
            url: "https://exame.com/negocios/klavi-startup-open-finance-capta-15-milhoes-dolares/",
          },
          {
            label: "100 Startups to Watch 2022",
            url: "https://revistapegn.globo.com/Startups-to-Watch/noticia/2022/09/conheca-100-startups-watch-2022.html",
          },
        ],
      },
    ],
    gallery: [
      "/klavi/klavi-logo-evolution.png",
      ["/klavi/side2left.png", "/klavi/side2right.png"],
      "/klavi/klavi-brand-grid-1.png",
      "/klavi/klavi-subway-mockup.jpg",
      "/klavi/klavi-social-media.png",
      "/klavi/klavi-typography.png",
      "/klavi/klavi-brand-grid-3.png",
      "/klavi/klavi-brand-grid-2.png",
    ],
  },
]
