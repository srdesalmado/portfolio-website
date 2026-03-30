"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/projects"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Cover image placeholder */}
      <div className="relative aspect-video bg-zinc-800 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
        <span className="relative font-mono text-zinc-500 text-sm tracking-wider">
          {project.coverLabel}
        </span>
        {/* Subtle purple accent in cover */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-purple-500/20" />
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-zinc-800 text-zinc-400 hover:bg-zinc-800 text-xs rounded-full px-2.5 py-0.5 font-normal border-0"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-zinc-50 text-lg leading-tight">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Metrics */}
        <div className="flex gap-6 pt-2">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="text-purple-400 font-semibold text-lg leading-none">
                {m.value}
              </span>
              <span className="text-zinc-500 text-xs">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-auto pt-4 border-t border-zinc-800/60">
          <a
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 group/link"
          >
            View case study
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
