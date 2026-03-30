"use client"

import { motion } from "framer-motion"
import { Search, Layers, Zap } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discovery & Research",
    description:
      "I start by understanding the problem space through user interviews, data analysis, and stakeholder alignment.",
  },
  {
    icon: Layers,
    title: "System Thinking",
    description:
      "Every design decision considers the full system — patterns, edge cases, and how components evolve over time.",
  },
  {
    icon: Zap,
    title: "Ship & Iterate",
    description:
      "I work closely with engineers to ship real products, then refine based on data and user feedback.",
  },
]

export default function ProcessSection() {
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
            Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50">
            How I work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-800/60 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-400 stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-zinc-50">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
