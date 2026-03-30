import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
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

  return (
    <main className="pt-14">
      <div className="max-w-[1100px] mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-12">
          <Link
            href="/"
            className="hover:text-zinc-300 transition-colors duration-200 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Work
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{project.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-zinc-800 text-zinc-400 text-xs rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-50 leading-tight">
            {project.title}
          </h1>
          <p className="text-zinc-400 text-xl">{project.subtitle}</p>
        </div>

        {/* Cover image */}
        <div className="aspect-video bg-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
          <span className="relative font-mono text-zinc-500 text-sm tracking-wider">
            {project.coverLabel} — Cover
          </span>
        </div>

        {/* Summary grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-zinc-800">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Role", value: "Senior Product Designer" },
              { label: "Timeline", value: "Q1–Q2 2024" },
              { label: "Company", value: project.coverLabel },
              { label: "Services", value: project.tags.join(", ") },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {item.label}
                </span>
                <span className="text-zinc-300 text-sm">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-zinc-500">
              Outcome
            </span>
            <p className="text-zinc-300 leading-relaxed text-sm">
              {project.description}
            </p>
          </div>
        </div>

        {/* Impact metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-1"
            >
              <span className="text-3xl font-semibold text-purple-400">
                {m.value}
              </span>
              <span className="text-zinc-400 text-sm">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Case study body */}
        <article className="max-w-2xl flex flex-col gap-12">
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
          ].map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-zinc-50 pb-3 border-b border-zinc-800">
                {section.title}
              </h2>
              <p className="text-zinc-300 leading-relaxed">{section.body}</p>
            </div>
          ))}

          {/* Callout block */}
          <div className="bg-zinc-900 border-l-4 border-purple-500 pl-6 py-4 rounded-r-xl">
            <p className="text-zinc-300 text-sm leading-relaxed italic">
              The key insight was that users weren&apos;t confused by the
              complexity — they were confused by inconsistency. Fixing the
              patterns was more impactful than reducing features.
            </p>
          </div>

          {/* Image placeholder */}
          <div className="flex flex-col gap-2">
            <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden flex items-center justify-center">
              <span className="font-mono text-zinc-600 text-sm">
                Process screenshot
              </span>
            </div>
            <p className="text-zinc-500 text-sm text-center">
              Early wireframes mapping the redesigned investment flow
            </p>
          </div>
        </article>

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between mt-24 pt-8 border-t border-zinc-800">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="flex flex-col gap-1 group"
            >
              <span className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                Previous
              </span>
              <span className="text-zinc-300 text-sm group-hover:text-zinc-50 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="flex flex-col gap-1 items-end group"
            >
              <span className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                Next
                <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-zinc-300 text-sm group-hover:text-zinc-50 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  )
}
