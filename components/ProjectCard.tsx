"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Project } from "@/lib/projects"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group">
      <div
        className="rounded-2xl overflow-hidden flex flex-col transition-colors duration-500"
        style={{ backgroundColor: "var(--surface)" }}
      >
        {/* Cover */}
        <div
          className="relative aspect-video overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "var(--border-color)" }}
        >
          <span
            className="relative font-mono text-sm tracking-wider transition-colors duration-500"
            style={{ color: "var(--text-muted)" }}
          >
            {project.coverLabel}
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-purple-500/15" />
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-3">
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                className="text-xs rounded-full px-2.5 py-0.5 font-normal border-0"
                style={{ backgroundColor: "var(--border-color)", color: "var(--text-secondary)" }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h3
            className="font-semibold text-lg leading-tight transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed line-clamp-2 transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
