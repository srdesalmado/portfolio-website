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
      className="py-24 md:py-32"
      style={{ backgroundColor: "#0f0f0f", borderTop: "1px solid #2a2a2a" }}
    >
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="aspect-[4/5] w-full max-w-xs rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              <span className="font-mono text-[14px]" style={{ color: "#444444" }}>photo</span>
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
              <span className="text-[14px] uppercase tracking-[0.18em] font-medium" style={{ color: "rgba(147,51,234,0.8)" }}>
                {t.label}
              </span>
              <h2
                className="text-[28px] md:text-[40px] font-semibold leading-[1.1] whitespace-pre-line"
                style={{ color: "#f0f0f0", letterSpacing: "-0.025em" }}
              >
                {t.heading}
              </h2>
            </div>

            <div
              className="flex flex-col gap-4 text-[16px] leading-[1.7]"
              style={{ color: "#999999" }}
            >
              <p>{t.p1}</p>
              <p>
                {t.p2}{" "}
                <span style={{ color: "#f0f0f0" }}>QuintoAndar</span>,{" "}
                <span style={{ color: "#f0f0f0" }}>Magazine Luiza</span>{" "}
                {lang === "en" ? "and" : "e"}{" "}
                <span style={{ color: "#f0f0f0" }}>SPC Brasil</span>.
              </p>
              <p>{t.p3}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
