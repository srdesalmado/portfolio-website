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
    <section id="work" style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border-color)" }}>
      <div className="max-w-[1100px] mx-auto px-8 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-14 border-b pb-8"
          style={{ borderColor: "var(--border-color)" }}
        >
          <h2
            className="text-[28px] md:text-[40px] font-semibold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
          >
            {t.heading}
          </h2>
        </motion.div>

        {/* 2-col image-focused grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
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
