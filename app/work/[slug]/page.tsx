import { notFound } from "next/navigation"
import Link from "next/link"
import { projects } from "@/lib/projects"

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

  const meta = [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Services", value: project.tags.join(", ") },
    { label: "Timeline", value: "Q1–Q2 2024" },
    { label: "Year", value: project.year },
  ]

  return (
    <main style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Back nav */}
      <div
        className="fixed top-14 left-0 right-0 z-40 hidden md:block"
        style={{ borderBottom: "1px solid var(--border-color)", backgroundColor: "rgba(250,250,250,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-[1100px] mx-auto px-8 h-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-widest transition-colors duration-200 hover:text-purple-600"
            style={{ color: "var(--text-muted)" }}
          >
            ← Work
          </Link>
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {project.coverLabel}
          </span>
        </div>
      </div>

      <div className="pt-24 md:pt-28">
        {/* ─── Hero ─── */}
        <div className="max-w-[1100px] mx-auto px-8 pt-16 pb-12">
          {/* Tags */}
          <div className="flex gap-3 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Giant title */}
          <h1
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.0] mb-6"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.035em" }}
          >
            {project.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg max-w-xl leading-relaxed"
            style={{ color: "var(--text-secondary)", letterSpacing: "-0.01em" }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* ─── Cover image ─── */}
        <div className="max-w-[1100px] mx-auto px-8 mb-0">
          <div
            className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ aspectRatio: "16/9", backgroundColor: "var(--surface)" }}
          >
            <span className="font-mono text-sm" style={{ color: "var(--border-color)" }}>
              {project.coverLabel}
            </span>
          </div>
        </div>

        {/* ─── Meta strip ─── */}
        <div
          className="border-y"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="max-w-[1100px] mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {meta.map((item, i) => (
                <div
                  key={item.label}
                  className="py-8 flex flex-col gap-1"
                  style={{
                    borderRight: i < meta.length - 1 ? "1px solid var(--border-color)" : "none",
                    paddingRight: i < meta.length - 1 ? "2rem" : 0,
                    paddingLeft: i > 0 ? "2rem" : 0,
                  }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Description + Metrics ─── */}
        <div className="max-w-[1100px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-16">
          <div className="flex flex-col gap-4">
            <span
              className="text-[10px] uppercase tracking-[0.15em]"
              style={{ color: "var(--text-muted)" }}
            >
              Overview
            </span>
            <p
              className="text-[15px] leading-[1.8]"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-1 pb-5"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <span
                  className="text-3xl font-semibold"
                  style={{ color: "rgb(147,51,234)", letterSpacing: "-0.02em" }}
                >
                  {m.value}
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Case study body ─── */}
        <div
          className="border-t"
          style={{ borderColor: "var(--border-color)", backgroundColor: "#0f0f0f" }}
        >
          <div className="max-w-[1100px] mx-auto px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
              {/* Sticky label column */}
              <div className="hidden md:block">
                <span
                  className="text-[10px] uppercase tracking-[0.15em] sticky top-32"
                  style={{ color: "#444444" }}
                >
                  Case study
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-14">
                {[
                  {
                    title: "The Challenge",
                    body: "The existing product had accumulated years of technical and design debt. Users were struggling to complete core tasks, and the onboarding funnel had significant drop-off at every step. Stakeholders needed clarity, and the engineering team needed a system they could build on.",
                  },
                  {
                    title: "Research & Discovery",
                    body: "We conducted 12 user interviews across different customer segments, analyzed behavioral data from session recordings, and mapped the existing flow to identify friction points. The research revealed three primary pain points: unclear information hierarchy, inconsistent interaction patterns, and missing feedback states.",
                  },
                  {
                    title: "Design Process",
                    body: "Starting from a blank slate, I mapped the ideal user journey before touching the interface. I built low-fidelity wireframes to validate the information architecture, iterated with the product team, and then moved into high-fidelity design using the existing brand system as a foundation.",
                  },
                  {
                    title: "Solution & Impact",
                    body: "The redesigned flow reduced the number of steps by 40%, consolidated redundant screens, and introduced progressive disclosure to simplify the initial experience. Post-launch data confirmed a significant improvement in task completion rates and user satisfaction scores.",
                  },
                ].map((section, i) => (
                  <div
                    key={section.title}
                    className="flex flex-col gap-4 pt-8"
                    style={{ borderTop: i > 0 ? "1px solid #1f1f1f" : "none" }}
                  >
                    <h2
                      className="text-base font-semibold"
                      style={{ color: "#c8c8c8" }}
                    >
                      {section.title}
                    </h2>
                    <p
                      className="text-[15px] leading-[1.8]"
                      style={{ color: "#666666" }}
                    >
                      {section.body}
                    </p>
                  </div>
                ))}

                {/* Callout */}
                <blockquote
                  className="pl-6 py-1"
                  style={{ borderLeft: "2px solid rgb(147,51,234)" }}
                >
                  <p className="text-[15px] leading-relaxed italic" style={{ color: "#888888" }}>
                    The key insight was that users weren&apos;t confused by the complexity — they were confused by inconsistency. Fixing the patterns was more impactful than reducing features.
                  </p>
                </blockquote>

                {/* Process image */}
                <div className="flex flex-col gap-3">
                  <div
                    className="w-full rounded-xl overflow-hidden flex items-center justify-center"
                    style={{ aspectRatio: "16/9", backgroundColor: "#161616" }}
                  >
                    <span className="font-mono text-sm" style={{ color: "#2a2a2a" }}>
                      Process screenshot
                    </span>
                  </div>
                  <p className="text-xs text-center" style={{ color: "#444444" }}>
                    Early wireframes mapping the redesigned investment flow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Prev / Next ─── */}
        <div style={{ borderTop: "1px solid var(--border-color)", backgroundColor: "var(--bg)" }}>
          <div className="max-w-[1100px] mx-auto px-8">
            <div className="grid grid-cols-2">
              {prev ? (
                <Link
                  href={`/work/${prev.slug}`}
                  className="py-10 flex flex-col gap-2 group transition-colors duration-200"
                  style={{ borderRight: "1px solid var(--border-color)" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ← Previous
                  </span>
                  <span
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-purple-600"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}

              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className="py-10 flex flex-col gap-2 items-end group pl-8 transition-colors duration-200"
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Next →
                  </span>
                  <span
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-purple-600 text-right"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {next.title}
                  </span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
