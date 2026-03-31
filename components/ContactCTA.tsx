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
      style={{ backgroundColor: "#0f0f0f", borderTop: "1px solid #2a2a2a" }}
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
            <span className="text-[14px] uppercase tracking-[0.18em] font-medium" style={{ color: "rgba(168,85,247,0.7)" }}>
              {t.label}
            </span>
            <h2
              className="text-[28px] md:text-[40px] font-semibold leading-[1.05]"
              style={{ color: "#f0f0f0", letterSpacing: "-0.03em" }}
            >
              {t.heading}
            </h2>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t" style={{ borderColor: "#2a2a2a" }}>
            <p className="text-[16px] leading-relaxed max-w-sm" style={{ color: "#666666" }}>
              {t.subheading}
            </p>

            <div className="flex flex-col gap-3 items-start md:items-end">
              <a
                href="mailto:carlos@studiohorizon.com.br"
                className="text-[14px] font-medium transition-colors duration-200 border-b pb-px hover:text-purple-400 hover:border-purple-400"
                style={{ color: "#f0f0f0", borderColor: "#2a2a2a" }}
              >
                {t.cta}
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="tel:+5548936186883"
                  className="text-[14px] transition-colors duration-200 hover:text-purple-400"
                  style={{ color: "#444444" }}
                >
                  +55 (48) 9 3618-6883
                </a>
                <span style={{ color: "#2a2a2a" }}>·</span>
                <a
                  href="mailto:carlos@studiohorizon.com.br"
                  className="text-[14px] transition-colors duration-200 hover:text-purple-400"
                  style={{ color: "#444444" }}
                >
                  carlos@studiohorizon.com.br
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Bottom bar */}
      <div
        className="max-w-[1100px] mx-auto px-8 pb-8 flex items-center justify-between"
      >
        <span className="text-[14px] font-mono" style={{ color: "#444444" }}>© {new Date().getFullYear()} carlos.psd</span>
        <a
          href="/styleguide"
          className="text-[14px] font-mono transition-colors duration-200 hover:text-purple-600"
          style={{ color: "#444444" }}
        >
          design system
        </a>
      </div>
    </section>
  )
}
