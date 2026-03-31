"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

export default function FeaturedWork() {
  return (
    <section id="work" className="py-32 md:py-40" style={{ borderTop: "1px solid var(--border-color)" }}>
      <div className="max-w-[1100px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 mb-20"
        >
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Selected Work
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            A few projects worth looking at.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
