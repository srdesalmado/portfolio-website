import { notFound } from "next/navigation"
import Link from "next/link"
import { projects } from "@/lib/projects"
import ContactCTA from "@/components/ContactCTA"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projectIndex = projects.findIndex((p) => p.slug === slug)
  if (projectIndex === -1) notFound()

  const project = projects[projectIndex]
  const prev = projects[projectIndex - 1] ?? null
  const next = projects[projectIndex + 1] ?? null

  const sections = [
    {
      title: "The Challenge",
      body: "The existing product had accumulated years of technical and design debt. Users were struggling to complete core tasks, and the onboarding funnel had significant drop-off at every step. Stakeholders needed clarity, and the engineering team needed a system they could build on.",
      images: [{ label: "User research synthesis", caption: "Mapping friction points across the existing flow" }],
    },
    {
      title: "Research & Discovery",
      body: "We conducted 12 user interviews across different customer segments, analyzed behavioral data from session recordings, and mapped the existing flow to identify friction points. The research revealed three primary pain points: unclear information hierarchy, inconsistent interaction patterns, and missing feedback states.",
      images: [
        { label: "Interview insights board", caption: "Key themes from 12 user interviews" },
        { label: "Journey map", caption: "Current state user journey with identified drop-offs" },
      ],
    },
    {
      title: "Design Process",
      body: "Starting from a blank slate, I mapped the ideal user journey before touching the interface. I built low-fidelity wireframes to validate the information architecture, iterated with the product team, and then moved into high-fidelity design using the existing brand system as a foundation.",
      images: [{ label: "Wireframes", caption: "Low-fidelity wireframes for key flows" }],
    },
    {
      title: "Solution & Impact",
      body: "The redesigned flow reduced the number of steps by 40%, consolidated redundant screens, and introduced progressive disclosure to simplify the initial experience. Post-launch data confirmed a significant improvement in task completion rates and user satisfaction scores.",
      images: [
        { label: "Final design — Dashboard", caption: "The redesigned main dashboard" },
        { label: "Final design — Onboarding", caption: "Streamlined onboarding flow" },
      ],
    },
  ]

  return (
    <main style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }} className="pt-14">

      {/* ─── Sub-nav ─── */}
      <div
        className="sticky top-14 z-40"
        style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "rgba(250,250,250,0.94)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-[1200px] mx-auto px-8 h-11 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest transition-colors duration-200 hover:text-purple-600"
            style={{ color: "var(--text-muted)" }}
          >
            ← Work
          </Link>
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {project.year}
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8">

        {/* ─── Title + Description ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-16 pb-14" style={{ borderBottom: "1px solid var(--border-color)" }}>
          {/* Left: title */}
          <div className="flex flex-col justify-between gap-8">
            <div className="flex gap-3 flex-wrap">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.0]"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
            >
              {project.title}
            </h1>
          </div>

          {/* Right: description */}
          <div className="flex flex-col justify-end gap-6">
            <p
              className="text-base leading-[1.75]"
              style={{ color: "var(--text-secondary)", fontSize: 16 }}
            >
              {project.description}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "Role", value: "Senior Product Designer" },
                { label: "Year", value: project.year },
                { label: "Services", value: project.tags.join(", ") },
                { label: "Timeline", value: "Q1–Q2 2024" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontSize: 12 }}>
                    {item.label}
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Cover image ─── */}
        <div className="py-10">
          <div
            className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ aspectRatio: "16/9", backgroundColor: "var(--surface)" }}
          >
            <span className="text-sm font-mono" style={{ color: "var(--border-color)", fontSize: 13 }}>
              {project.coverLabel}
            </span>
          </div>
        </div>

        {/* ─── Metrics ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 py-10" style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
          {project.metrics.map((m, i) => (
            <div
              key={m.label}
              className="py-8 flex flex-col gap-2"
              style={{
                borderRight: i < project.metrics.length - 1 ? "1px solid var(--border-color)" : "none",
                paddingRight: i < project.metrics.length - 1 ? "3rem" : 0,
                paddingLeft: i > 0 ? "3rem" : 0,
              }}
            >
              <span
                className="font-semibold leading-none"
                style={{ color: "rgb(147,51,234)", fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.03em" }}
              >
                {m.value}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* ─── Key insight callout ─── */}
        <div className="py-14" style={{ borderBottom: "1px solid var(--border-color)" }}>
          <blockquote
            className="pl-6"
            style={{ borderLeft: "2px solid rgb(147,51,234)" }}
          >
            <p
              className="leading-relaxed italic"
              style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: "56rem" }}
            >
              The key insight was that users weren&apos;t confused by the complexity — they were confused by inconsistency. Fixing the patterns was more impactful than reducing features.
            </p>
          </blockquote>
        </div>

        {/* ─── Sections with images ─── */}
        {sections.map((section, si) => (
          <div key={section.title} className="py-14" style={{ borderBottom: "1px solid var(--border-color)" }}>
            {/* Title left / body right */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-10 md:gap-20 mb-10">
              <h2
                className="font-semibold"
                style={{ color: "var(--text-primary)", fontSize: 18, letterSpacing: "-0.02em" }}
              >
                {section.title}
              </h2>
              <p className="leading-[1.75]" style={{ color: "var(--text-secondary)", fontSize: 16 }}>
                {section.body}
              </p>
            </div>

            {/* Images between sections */}
            {section.images.length === 1 ? (
              <div className="flex flex-col gap-3">
                <div
                  className="w-full rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ aspectRatio: "16/9", backgroundColor: "var(--surface)" }}
                >
                  <span className="font-mono" style={{ color: "var(--border-color)", fontSize: 13 }}>
                    {section.images[0].label}
                  </span>
                </div>
                <p className="text-center" style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  {section.images[0].caption}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.images.map((img) => (
                  <div key={img.label} className="flex flex-col gap-2">
                    <div
                      className="w-full rounded-xl overflow-hidden flex items-center justify-center"
                      style={{ aspectRatio: "4/3", backgroundColor: "var(--surface)" }}
                    >
                      <span className="font-mono" style={{ color: "var(--border-color)", fontSize: 13 }}>
                        {img.label}
                      </span>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: 13 }}>{img.caption}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

      </div>

      {/* ─── Prev / Next ─── */}
      <div style={{ borderTop: "1px solid var(--border-color)", backgroundColor: "var(--bg)" }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="py-10 flex flex-col gap-2 group"
                style={{ borderRight: "1px solid var(--border-color)" }}
              >
                <span className="uppercase tracking-widest" style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  ← Previous
                </span>
                <span
                  className="font-medium transition-colors duration-200 group-hover:text-purple-600"
                  style={{ color: "var(--text-primary)", fontSize: 15 }}
                >
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="py-10 flex flex-col gap-2 items-end group pl-8"
              >
                <span className="uppercase tracking-widest" style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  Next →
                </span>
                <span
                  className="font-medium transition-colors duration-200 group-hover:text-purple-600 text-right"
                  style={{ color: "var(--text-primary)", fontSize: 15 }}
                >
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>

      <ContactCTA />
    </main>
  )
}
