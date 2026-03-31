"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function ProcessSection() {
  const { lang } = useLang()
  const t = translations[lang].process

  return (
    <section style={{ backgroundColor: "#141414", borderTop: "1px solid #1f1f1f" }}>
      <div className="max-w-[1100px] mx-auto px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 mb-20"
        >
          <span className="text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: "rgba(168,85,247,0.7)" }}>
            {t.label}
          </span>
          <h2
            className="text-3xl md:text-[2.5rem] font-semibold"
            style={{ color: "#f0f0f0", letterSpacing: "-0.025em" }}
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
                <span className="font-mono text-[11px] tracking-widest" style={{ color: "rgba(168,85,247,0.5)" }}>
                  {step.number}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: "#232323" }} />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-base" style={{ color: "#c8c8c8" }}>{step.title}</h3>
                <p className="text-sm leading-[1.7]" style={{ color: "#666666" }}>
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
