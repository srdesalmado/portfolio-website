"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import SplitText from "@/components/SplitText"

export default function ProcessSection() {
  const { lang } = useLang()
  const t = translations[lang].process

  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border-color)]">
      <div className="max-w-page mx-auto px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 mb-20"
        >
          <span className="text-sm uppercase tracking-label font-medium text-[color:var(--accent-on-dark)]">
            {t.label}
          </span>
          <SplitText
            as="h2"
            text={t.heading}
            trigger="scroll"
            className="text-h2 md:text-h1 font-semibold tracking-tight-25 text-[color:var(--text-primary)]"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {t.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm tracking-label text-[color:var(--accent-on-dark)]">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-[var(--border-color)]" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-base text-[color:var(--text-primary)]">{step.title}</h3>
                <p className="text-base leading-body-alt text-[color:var(--text-muted)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
