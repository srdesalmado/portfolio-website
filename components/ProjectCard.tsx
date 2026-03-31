"use client"

import Link from "next/link"
import type { Project } from "@/lib/projects"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/3", borderRadius: 12, backgroundColor: "#1a1a1a" }}
      >
        {/* Placeholder — swap for <Image> when real photos are available */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[14px]" style={{ color: "#2a2a2a" }}>
            {project.coverLabel}
          </span>
        </div>

        {/* Dark scrim — always slightly present, deepens on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-400 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
        />

        {/* Info — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3">
          {/* Tags */}
          <div
            className="flex flex-wrap gap-2 transition-all duration-400 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[14px] font-medium px-3 py-1"
                style={{
                  color: "rgba(255,255,255,0.9)",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: 500,
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                {tag}
              </span>
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
              className="font-mono text-[14px] shrink-0"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
