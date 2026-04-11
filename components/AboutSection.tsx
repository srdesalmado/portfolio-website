"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"
import SplitText from "@/components/SplitText"

export default function AboutSection() {
  const { lang } = useLang()
  const t = translations[lang].about

  return (
    <section
      id="about"
      className="bg-[var(--dark-section-bg)] border-t border-[var(--dark-border)]"
    >
      <div className="max-w-page mx-auto px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-start">

          {/* Left: title */}
          <SplitText
            as="h2"
            text={t.label}
            trigger="scroll"
            className="text-h2 md:text-h1 font-semibold tracking-tight-25 text-[color:var(--dark-text-primary)]"
          />

          {/* Right: photo + bio + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-h3 font-semibold leading-heading tracking-tight-2 text-[color:var(--dark-text-primary)]">
              {t.bio}
            </h3>

            <div className="flex flex-col gap-4 text-base leading-body-alt text-[color:var(--dark-text-secondary)]">
              <p>{t.p1}</p>
              <p>
                {t.p2}{" "}
                <span className="text-[color:var(--accent-on-dark)]">QuintoAndar</span>,{" "}
                <span className="text-[color:var(--accent-on-dark)]">Magazine Luiza</span>{" "}
                {lang === "en" ? "and" : "e"}{" "}
                <span className="text-[color:var(--accent-on-dark)]">SPC Brasil</span>.
              </p>
              <p>{t.p3}</p>
              <p>{t.p4}</p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
