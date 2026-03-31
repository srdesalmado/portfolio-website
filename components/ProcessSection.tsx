"use client"

import { motion } from "framer-motion"
import { Search, Layers, Zap } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Immersion",
    description:
      "I dive deep into the project context, analyze the current landscape, identify opportunities and collect references to define ideal interaction flows.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Visual Ideation",
    description:
      "I explore solutions visually through wireframes and navigable prototypes that demonstrate the essential flows in an intuitive and efficient way.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Build & Ship",
    description:
      "I produce the final high-fidelity visual and technical documentation, preparing the product for launch and continuous evolution.",
  },
]

export default function ProcessSection() {
  return (
    <section className="py-32 md:py-40" style={{ backgroundColor: "#f5f2ee" }}>
      <div className="max-w-[1100px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "rgba(168,85,247,0.7)" }}>
            Approach
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: "#1a1714", letterSpacing: "-0.02em" }}>
            How I work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(168,85,247,0.6)" }}>
                    {step.number}
                  </span>
                  <div className="h-px flex-1" style={{ backgroundColor: "#ddd9d4" }} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold text-lg" style={{ color: "#1a1714" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>
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
