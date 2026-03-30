"use client"

import { motion } from "framer-motion"

const skillGroups = [
  {
    label: "Product Design",
    skills: [
      "User Research",
      "Interaction Design",
      "Prototyping",
      "Usability Testing",
    ],
  },
  {
    label: "Design Systems",
    skills: [
      "Component Libraries",
      "Design Tokens",
      "Storybook",
      "Figma Variables",
    ],
  },
  {
    label: "Tooling",
    skills: ["Figma", "Framer", "React", "TypeScript", "Tailwind CSS"],
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-zinc-800/60">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-500 font-medium">
                About
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50">
                The designer behind the work.
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-zinc-400 leading-relaxed">
              <p>
                I&apos;m a Senior Product Designer with 5+ years shaping digital
                products in fintech, B2B SaaS, and complex data-heavy
                interfaces.
              </p>
              <p>
                I work at the intersection of systems thinking and craft —
                where design decisions have real business and regulatory weight.
              </p>
              <p>
                Currently at{" "}
                <span className="text-zinc-300 font-medium">AmFi</span>, a
                Brazilian fintech building the infrastructure for tokenized
                private credit.
              </p>
            </div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            {skillGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-zinc-800/60 text-zinc-300 text-sm rounded-md px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
