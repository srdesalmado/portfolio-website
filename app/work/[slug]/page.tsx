import { notFound } from "next/navigation"
import Link from "next/link"
import { projects } from "@/lib/projects"
import ContactCTA from "@/components/ContactCTA"
import LightboxImage from "@/components/LightboxImage"

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

  const fallbackSections: import("@/lib/projects").ProjectSection[] = [
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

  const sections = project.sections ?? fallbackSections

  const metaRows = [
    { label: "Role", value: project.role ?? "Senior Product Designer" },
    { label: "Year", value: project.year },
    { label: "Services", value: project.tags.join(", ") },
    { label: project.agency ? "Agency" : "Timeline", value: project.agency ?? (project.timeline ?? "Q1–Q2 2024") },
  ]
  const allMeta = [...metaRows, ...(project.team ? [{ label: "Team", value: project.team }] : [])]

  return (
    <main style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }} className="pt-14">

      <div className="max-w-[1200px] mx-auto px-8">

        {/* ─── Header: title left / meta table right ─── */}
        <div className="pt-16 pb-14">
          <Link
            href="/"
            className="text-[14px] uppercase tracking-[0.18em] w-fit block mb-10 text-[color:var(--text-muted)] hover:text-[color:var(--accent)] transition-colors duration-200"
          >
            ← Work
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            {/* Left: title + description */}
            <div className="flex flex-col gap-3">
              <h1
                className="text-[28px] md:text-[40px] font-semibold leading-[1.1]"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {project.title}
              </h1>
              <p className="leading-[1.75]" style={{ color: "var(--text-secondary)", fontSize: 16 }}>
                {project.description}
              </p>
            </div>

            {/* Right: meta table */}
            <div>
              {allMeta.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 py-3"
                  style={i < allMeta.length - 1 ? { borderBottom: "1px solid var(--border-color)" } : undefined}
                >
                  <span className="text-[14px] uppercase tracking-[0.18em] shrink-0" style={{ color: "var(--text-muted)" }}>
                    {item.label}
                  </span>
                  <span className="text-[14px] text-right" style={{ color: "var(--text-secondary)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Cover image ─── */}
        <div className="w-full rounded-2xl overflow-hidden flex items-center justify-center" style={{ aspectRatio: "16/9", backgroundColor: "var(--surface)" }}>
          {project.coverImage ? (
            <LightboxImage src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono" style={{ color: "var(--border-color)", fontSize: 14 }}>{project.coverLabel}</span>
          )}
        </div>

        {/* ─── Metrics ─── */}
        {project.metrics.length > 0 && (
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
                <span className="font-semibold leading-none" style={{ color: "var(--accent)", fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.03em" }}>
                  {m.value}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* ─── Quote ─── */}
        {project.quote && (
          <div className="py-14" style={{ borderBottom: "1px solid var(--border-color)" }}>
            <blockquote className="pl-6" style={{ borderLeft: "2px solid var(--accent)" }}>
              <p className="leading-relaxed italic" style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: "56rem" }}>
                &ldquo;{project.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        )}

        {/* ─── Sections ─── */}
        {sections.filter(s => !s.links?.length).map((section) => (
          <div key={section.title} className={`pt-14 ${section.links && section.links.length > 0 ? "pb-2" : "pb-6"}`} style={{ borderTop: "1px solid var(--border-color)" }}>
            <div
              className={`grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-4 md:gap-20 ${section.links && section.links.length > 0 ? "pb-5 mb-5" : "pb-10 mb-10"}`}
              style={section.links && section.links.length > 0 ? undefined : { borderBottom: "1px solid var(--border-color)" }}
            >
              <h2 className="font-semibold" style={{ color: "var(--text-primary)", fontSize: 18, letterSpacing: "-0.02em" }}>
                {section.title}
              </h2>
              {section.links && section.links.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 group w-fit transition-colors duration-200 text-[color:var(--text-secondary)] hover:text-purple-600"
                    >
                      <span className="text-[14px] leading-snug group-hover:underline underline-offset-2 decoration-1">
                        {link.label}
                      </span>
                      <span style={{ flexShrink: 0, fontSize: 11 }}>↗</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] md:text-[16px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
                  {section.body}
                </p>
              )}
            </div>

            {section.images.length === 1 ? (
              <div className="flex flex-col gap-3">
                <div className="w-full rounded-xl overflow-hidden flex items-center justify-center" style={{ aspectRatio: "16/9", backgroundColor: "var(--surface)" }}>
                  {section.images[0].src ? (
                    <LightboxImage src={section.images[0].src} alt={section.images[0].label} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-mono" style={{ color: "var(--border-color)", fontSize: 14 }}>{section.images[0].label}</span>
                  )}
                </div>
                {section.images[0].caption && (
                  <p className="text-center" style={{ color: "var(--text-muted)", fontSize: 14 }}>{section.images[0].caption}</p>
                )}
              </div>
            ) : section.images.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.images.map((img) => (
                  <div key={img.label} className="flex flex-col gap-2">
                    <div className="w-full rounded-xl overflow-hidden flex items-center justify-center" style={{ aspectRatio: "4/3", backgroundColor: "var(--surface)" }}>
                      {img.src ? (
                        <LightboxImage src={img.src} alt={img.label} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-mono" style={{ color: "var(--border-color)", fontSize: 14 }}>{img.label}</span>
                      )}
                    </div>
                    {img.caption && <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{img.caption}</p>}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        {/* ─── Gallery (stacked) ─── */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="pb-14 flex flex-col gap-6" style={{ paddingTop: "0" }}>
            {project.gallery.map((item, i) =>
              Array.isArray(item) ? (
                <div key={i} className="grid grid-cols-2 gap-6">
                  {item.map((src) => (
                    <div key={src} className="w-full rounded-xl overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
                      <LightboxImage src={src} className="w-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div key={item} className="w-full rounded-xl overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
                  <LightboxImage src={item} className="w-full object-cover" />
                </div>
              )
            )}
          </div>
        )}

        {/* ─── Highlight Sections (after gallery) ─── */}
        {sections.filter(s => s.links?.length).map((section) => (
          <div key={section.title} className="pt-14 pb-2" style={{ borderTop: "1px solid var(--border-color)" }}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-4 md:gap-20 pb-5 mb-5">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)", fontSize: 18, letterSpacing: "-0.02em" }}>
                {section.title}
              </h2>
              <div className="flex flex-col gap-2">
                {section.links!.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 group w-fit transition-colors duration-200 text-[color:var(--text-secondary)] hover:text-purple-600"
                  >
                    <span className="text-[14px] leading-snug group-hover:underline underline-offset-2 decoration-1">
                      {link.label}
                    </span>
                    <span style={{ flexShrink: 0, fontSize: 11 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* ─── Prev / Next ─── */}
      <div style={{ borderTop: "1px solid var(--border-color)", backgroundColor: "var(--bg)" }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2">
            {prev ? (
              <Link href={`/work/${prev.slug}`} className="py-10 flex flex-col gap-2 group" style={{ borderRight: "1px solid var(--border-color)" }}>
                <span className="text-[14px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">← Previous</span>
                <span className="text-[16px] font-medium text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors duration-200">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/work/${next.slug}`} className="py-10 flex flex-col gap-2 items-end group pl-8">
                <span className="text-[14px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">Next →</span>
                <span className="text-[16px] font-medium text-right text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors duration-200">
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
