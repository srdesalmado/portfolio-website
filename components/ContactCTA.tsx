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
      style={{ backgroundColor: "var(--dark-section-bg)", borderTop: "1px solid var(--dark-border)" }}
    >
      <div className="max-w-[1100px] mx-auto px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-12"
        >
          {/* Big heading */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-[14px] uppercase tracking-[0.18em] font-medium" style={{ color: "var(--accent-on-dark)" }}>
              {t.label}
            </span>
            <h2
              className="text-[28px] md:text-[40px] font-semibold leading-[1.05]"
              style={{ color: "var(--dark-text-primary)", letterSpacing: "-0.03em" }}
            >
              {t.heading}
            </h2>
          </div>

          {/* Bottom row */}
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t"
            style={{ borderColor: "var(--dark-border)" }}
          >
            <p className="text-[16px] leading-relaxed max-w-sm" style={{ color: "var(--dark-text-secondary)" }}>
              {t.subheading}
            </p>

            <div className="flex flex-col gap-3 items-start md:items-end">
              <a
                href="mailto:carlos@studiohorizon.com.br"
                className="text-[14px] font-medium text-[color:var(--dark-text-primary)] border-b border-[color:var(--dark-border)] pb-px transition-colors duration-200 hover:text-[color:var(--accent-on-dark)] hover:border-[color:var(--accent-on-dark)]"
              >
                {t.cta}
              </a>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                <a
                  href="tel:+5548936186883"
                  className="text-[14px] text-[color:var(--dark-text-muted)] transition-colors duration-200 hover:text-[color:var(--accent-on-dark)]"
                >
                  +55 (48) 9 3618-6883
                </a>
                <span className="hidden md:inline text-[color:var(--dark-border)]">·</span>
                <a
                  href="mailto:carlos@studiohorizon.com.br"
                  className="text-[14px] text-[color:var(--dark-text-muted)] transition-colors duration-200 hover:text-[color:var(--accent-on-dark)]"
                >
                  carlos@studiohorizon.com.br
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Bottom bar */}
      <div className="max-w-[1100px] mx-auto px-8 pb-8 flex items-center justify-between">
        <span className="text-[14px] font-mono" style={{ color: "var(--dark-text-muted)" }}>
          © {new Date().getFullYear()} carlos.psd
        </span>
        <a
          href="/styleguide"
          className="text-[14px] font-mono transition-colors duration-200 hover:text-[color:var(--accent-on-dark)]"
          style={{ color: "var(--dark-text-muted)" }}
        >
          styleguide
        </a>
      </div>
    </section>
  )
}
