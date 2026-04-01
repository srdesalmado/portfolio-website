"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3", borderRadius: 12, backgroundColor: "var(--dark-surface)" }}
      >
        {/* Cover image or placeholder */}
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[14px]" style={{ color: "var(--dark-border)" }}>
              {project.coverLabel}
            </span>
          </div>
        )}

        {/* Scrim — hover only */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.18)" }} />
        </div>

        {/* Top row: badges left, year right — hover only */}
        <div className="absolute inset-x-0 top-0 p-5 flex items-start justify-between gap-2 transition-all duration-300 -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-[14px] shrink-0" style={{ color: "rgba(255,255,255,0.5)" }}>
            {project.year}
          </span>
        </div>

        {/* Bottom: title + description — hover only */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <h3
            className="font-semibold text-[18px] leading-snug"
            style={{ color: "#ffffff", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>
          <p
            className="text-[13px] leading-snug line-clamp-2"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
