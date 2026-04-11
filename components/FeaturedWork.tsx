"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import SplitText from "@/components/SplitText"

export default function FeaturedWork() {
  const { lang } = useLang()
  const t = translations[lang].work

  return (
    <section id="work" className="bg-[var(--bg)] border-t border-[var(--border-color)]">
      <div className="max-w-grid mx-auto py-16 md:py-20">
        {/* Header — constrained to standard page grid */}
        <div className="max-w-page mx-auto w-full px-8 mb-7 flex items-end justify-between gap-8">
          <SplitText
            as="h2"
            text={t.heading}
            trigger="scroll"
            className="text-h2 md:text-h1 font-semibold tracking-tight-25 text-[color:var(--text-primary)]"
          />
          <p className="text-sm leading-body text-[color:var(--text-secondary)] max-w-xs shrink-0 hidden md:block">
            {t.subheading}
          </p>
        </div>

        {/* 2-col image-focused grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-grid)] px-[var(--px-grid)]">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
