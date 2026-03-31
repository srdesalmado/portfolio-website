"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "Carlos has a rare ability to simplify complex systems without losing depth. He transformed our most confusing flow into something our users actually love.",
    name: "Ricardo M.",
    role: "CPO at AmFi",
  },
  {
    quote:
      "Working with Carlos is working with someone who genuinely understands both design and product strategy. His systems thinking changed how our whole team works.",
    name: "Ana P.",
    role: "Head of Product at NuBank (former)",
  },
  {
    quote:
      "He delivered a design system that our engineers actually adopted. That's not common. Carlos brought both precision and empathy to every component.",
    name: "Felipe T.",
    role: "Lead Engineer at Fintech Startup",
  },
]

export default function Testimonials() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "var(--dark-section-bg)", borderTop: "1px solid var(--dark-border)" }}
    >
      <div className="max-w-[1100px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 mb-16"
        >
          <span
            className="text-[14px] uppercase tracking-[0.18em] font-medium"
            style={{ color: "rgba(168,85,247,0.7)" }}
          >
            What people say
          </span>
          <h2
            className="text-[28px] md:text-[40px] font-semibold"
            style={{ color: "var(--dark-text-primary)", letterSpacing: "-0.025em" }}
          >
            From collaborators.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 rounded-2xl p-6"
              style={{
                backgroundColor: "var(--dark-surface)",
                border: "1px solid var(--dark-border)",
              }}
            >
              <p
                className="text-[14px] leading-relaxed italic flex-1"
                style={{ color: "var(--dark-text-secondary)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="flex flex-col gap-0.5 pt-4 border-t"
                style={{ borderColor: "var(--dark-border)" }}
              >
                <span className="text-[14px] font-medium" style={{ color: "var(--dark-text-primary)" }}>
                  {t.name}
                </span>
                <span className="text-[14px] font-mono" style={{ color: "var(--dark-text-muted)" }}>
                  {t.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
