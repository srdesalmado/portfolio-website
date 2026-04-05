"use client"

import Link from "next/link"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import type { Project } from "@/lib/projects"

export default function RelatedProjects({ project }: { project: Project }) {
  const { lang } = useLang()
  const t = translations[lang].related

  return (
    <section className="py-16 border-t border-[var(--border-color)] bg-[var(--bg)]">
      <div className="max-w-case mx-auto px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-h2 font-semibold leading-heading tracking-tight-2 text-[color:var(--text-primary)]">
            {t.heading}
          </h2>

          <Link href={`/work/${project.slug}`} className="block group w-full max-w-sm">
            <div className="relative w-full overflow-hidden aspect-card rounded-xl bg-[var(--dark-surface)]">
              {project.coverImage && (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Overlay — hover only */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 [background-image:var(--gradient-card-overlay)]" />
                <div className="absolute inset-0 [background-color:var(--overlay-card-bottom)]" />
              </div>

              {/* Title + description — centered, hover only */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 gap-2 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="font-semibold text-lg leading-snug tracking-tight-2 text-center text-[color:var(--dark-text-primary)]">
                  {project.title}
                </h3>
                <p className="text-badge leading-snug line-clamp-2 text-center text-[color:var(--dark-text-secondary)]">
                  {project.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
