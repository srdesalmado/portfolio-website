"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="py-32 md:py-40 relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border-color)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(168,85,247,0.06) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-8 max-w-lg mx-auto"
        >
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "rgba(168,85,247,0.7)" }}>
              Contact
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              Let&apos;s build something together.
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Open to freelance projects and senior positions.
            </p>
          </div>

          <a href="mailto:carlos@studiohorizon.com.br">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8 h-11 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(147,51,234,0.25)]">
              Get in touch
            </Button>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="tel:+5548936186883"
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              +55 (48) 9 3618-6883
            </a>
            <span style={{ color: "var(--border-color)" }}>·</span>
            <a
              href="mailto:carlos@studiohorizon.com.br"
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              carlos@studiohorizon.com.br
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
