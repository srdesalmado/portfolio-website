"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40" style={{ borderTop: "1px solid var(--border-color)" }}>
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="aspect-[4/5] w-full max-w-xs rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <span className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>photo</span>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 md:pt-4"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "rgba(168,85,247,0.8)" }}>
                About
              </span>
              <h2
                className="text-3xl md:text-4xl font-semibold leading-tight"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                Design and code,<br />from concept to product.
              </h2>
            </div>

            <div className="flex flex-col gap-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                I&apos;m a multidisciplinary designer living in Florianópolis,
                Brazil. With previous experience in Branding, today my focus is
                digital products — mainly UI.
              </p>
              <p>
                I have been working with design for 4 years and during this
                period I have carried out projects for brands such as{" "}
                <span style={{ color: "var(--text-primary)" }}>QuintoAndar</span>,{" "}
                <span style={{ color: "var(--text-primary)" }}>Magazine Luiza</span> and{" "}
                <span style={{ color: "var(--text-primary)" }}>SPC Brasil</span>.
              </p>
              <p>
                Since I was a child, I have always been curious, organized and
                self-taught. In my free time, I enjoy playing video games,
                hiking, taking photographs, reading and listening to rock music.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
