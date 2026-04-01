"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function FeaturedWork() {
  const { lang } = useLang()
  const t = translations[lang].work

  return (
    <section id="work" className="bg-[var(--bg)] border-t border-[var(--border-color)]">
      <div className="max-w-page mx-auto px-8 py-16 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-7"
        >
          <h2
            className="text-h2 md:text-h1 font-semibold tracking-tight-25 text-[color:var(--text-primary)]"
          >
            {t.heading}
          </h2>
        </motion.div>

        {/* 2-col image-focused grid */}
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
