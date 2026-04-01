"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function AboutSection() {
  const { lang } = useLang()
  const t = translations[lang].about

  return (
    <section
      id="about"
      className="py-16 md:py-20 bg-[var(--dark-section-bg)] border-t border-[var(--dark-border)]"
    >
      <div className="max-w-page mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="aspect-[4/5] w-full max-w-xs rounded-2xl overflow-hidden flex items-center justify-center bg-[var(--dark-surface)]"
            >
              <span className="font-mono text-sm text-[color:var(--dark-border)]">photo</span>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 md:pt-4"
          >
            <div className="flex flex-col gap-3">
              <span className="text-sm uppercase tracking-label font-medium text-[color:var(--accent-on-dark)]">
                {t.label}
              </span>
              <h2
                className="text-h2 md:text-h1 font-semibold leading-heading tracking-tight-25 whitespace-pre-line text-[color:var(--dark-text-primary)]"
              >
                {t.heading}
              </h2>
            </div>

            <div
              className="flex flex-col gap-4 text-base leading-body-alt text-[color:var(--dark-text-secondary)]"
            >
              <p>{t.p1}</p>
              <p>
                {t.p2}{" "}
                <span className="text-[color:var(--accent-on-dark)]">QuintoAndar</span>,{" "}
                <span className="text-[color:var(--accent-on-dark)]">Magazine Luiza</span>{" "}
                {lang === "en" ? "and" : "e"}{" "}
                <span className="text-[color:var(--accent-on-dark)]">SPC Brasil</span>.
              </p>
              <p>{t.p3}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
