"use client"

import Link from "next/link"
import type { Project } from "@/lib/projects"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group">
      <div className="flex flex-col gap-4">
        {/* Image area */}
        <div
          className="relative w-full overflow-hidden rounded-xl transition-all duration-300"
          style={{ aspectRatio: "4/3", backgroundColor: "var(--surface)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[14px] tracking-widest" style={{ color: "var(--border-color)" }}>
              {project.coverLabel}
            </span>
          </div>
          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: "rgba(147,51,234,0.08)" }}
          >
            <span
              className="text-xs font-medium tracking-widest uppercase transition-colors duration-200"
              style={{ color: "rgba(147,51,234,0.8)" }}
            >
              View →
            </span>
          </div>
        </div>

        {/* Text below image */}
        <div className="flex flex-col gap-2 px-1">
          {/* Tags + year */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[14px] tracking-wider uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="font-mono text-[14px]" style={{ color: "var(--text-muted)" }}>
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-semibold text-base leading-snug transition-colors duration-200 group-hover:text-purple-600"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-[14px] leading-relaxed line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
