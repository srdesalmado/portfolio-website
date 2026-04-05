"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function ContactCTA() {
  const { lang } = useLang()
  const t = translations[lang].contact

  return (
    <section
      id="contact"
      className="bg-[var(--dark-section-bg)] border-t border-[var(--dark-border)]"
    >
      <div className="max-w-page mx-auto px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-12"
        >
          {/* Big heading */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-sm uppercase tracking-label font-medium text-[color:var(--accent-on-dark)]">
              {t.label}
            </span>
            <h2
              className="text-h2 md:text-h1 font-semibold leading-cta tracking-tight-3 text-[color:var(--dark-text-primary)]"
            >
              {t.heading}
            </h2>
          </div>

          {/* Bottom row */}
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-[var(--dark-border)]"
          >
            <p className="text-base leading-relaxed max-w-sm text-[color:var(--dark-text-secondary)]">
              {t.subheading}
            </p>

            <div className="flex flex-col gap-3 items-start md:items-end">
              <a
                href="mailto:carlos@studiohorizon.com.br"
                className="text-sm font-medium text-[color:var(--dark-text-primary)] border-b border-[color:var(--dark-border)] pb-px transition-colors duration-200 hover:text-[color:var(--accent-on-dark)] hover:border-[color:var(--accent-on-dark)]"
              >
                {t.cta}
              </a>
              <a
                href="mailto:carlos@studiohorizon.com.br"
                className="text-sm text-[color:var(--dark-text-muted)] transition-colors duration-200 hover:text-[color:var(--accent-on-dark)]"
              >
                carlos@studiohorizon.com.br
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Bottom bar */}
      <div className="max-w-page mx-auto px-8 pb-8 flex items-center justify-between">
        <span className="text-sm font-mono text-[color:var(--dark-text-muted)]">
          © {new Date().getFullYear()} carlos.psd
        </span>
        <a
          href="/styleguide"
          className="text-sm font-mono transition-colors duration-200 hover:text-[color:var(--accent-on-dark)] text-[color:var(--dark-text-muted)]"
        >
          styleguide
        </a>
      </div>
    </section>
  )
}
