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
    <section className="py-24 md:py-32 border-t border-zinc-800/60">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-2 mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-purple-500 font-medium">
            What people say
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50">
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
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4"
            >
              <p className="text-zinc-300 text-sm leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex flex-col gap-0.5 pt-4 border-t border-zinc-800/60">
                <span className="text-zinc-50 text-sm font-medium">
                  {t.name}
                </span>
                <span className="text-zinc-500 text-xs">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
