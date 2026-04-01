"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function ProcessSection() {
  const { lang } = useLang()
  const t = translations[lang].process

  return (
    <section style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border-color)" }}>
      <div className="max-w-[1100px] mx-auto px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 mb-20"
        >
          <span className="text-[14px] uppercase tracking-[0.18em] font-medium" style={{ color: "var(--accent-on-dark)" }}>
            {t.label}
          </span>
          <h2
            className="text-[28px] md:text-[40px] font-semibold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
          >
            {t.heading}
          </h2>
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
                <span className="font-mono text-[14px] tracking-[0.18em]" style={{ color: "var(--accent-on-dark)" }}>
                  {step.number}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border-color)" }} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-[16px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
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
