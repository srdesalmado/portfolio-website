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
        {/* Placeholder — swap for <Image> when real photos are available */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[14px]" style={{ color: "var(--dark-border)" }}>
            {project.coverLabel}
          </span>
        </div>

        {/* Base scrim — always present at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
          }}
        />

        {/* Extra overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
        />

        {/* Info overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3">
          {/* Badges — slide up on hover */}
          <div className="flex flex-wrap gap-2 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title + year */}
          <div className="flex items-end justify-between gap-4">
            <h3
              className="font-semibold text-[18px] leading-snug"
              style={{ color: "#ffffff", letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h3>
            <span
              className="font-mono text-[14px] shrink-0 pb-0.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
