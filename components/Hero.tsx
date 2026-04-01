"use client"

import { motion, type Variants } from "framer-motion"
import dynamic from "next/dynamic"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColorBends = dynamic(() => import("@/components/ColorBends"), { ssr: false }) as any

// Three.js requires hex values; tokens --color-particle-1/2/3 in globals.css
const PARTICLE_COLORS = ["#ff5c7a", "#8a5cff", "#00ffd1"] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const { lang } = useLang()
  const t = translations[lang].hero

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden h-[90vh] min-h-[var(--hero-min-height)] bg-[var(--dark-bg)]"
    >
      {/* ColorBends — full section background */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          colors={PARTICLE_COLORS}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0}
          parallax={0.5}
          noise={0.1}
          transparent={false}
          autoRotate={0}
          className="w-full h-full"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-[1] [background-color:var(--overlay-hero)]" />
        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-[2] bg-gradient-to-b from-transparent to-[var(--dark-bg)]"
        />
      </div>

      {/* Content — left-aligned, vertically centered */}
      <div className="absolute inset-0 z-[3] flex items-center">
        <div className="max-w-page w-full mx-auto px-8 flex flex-col gap-8">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-sm tracking-label uppercase font-medium text-[color:var(--accent-on-dark)]"
          >
            {t.greeting}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-hero-sm md:text-hero-lg font-semibold leading-hero tracking-tight-3 max-w-4xl text-[color:var(--dark-text-primary)]"
          >
            {lang === "en"
              ? "I'm Carlos, a Multidisciplinary Product Designer."
              : "Sou Carlos, Designer de Produto Multidisciplinar."}
          </motion.h1>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col gap-5 max-w-sm"
          >
            <p
              className="text-base leading-body-alt text-[color:var(--dark-text-secondary)]"
            >
              {t.description}
            </p>

            <div className="flex gap-6 items-center">
              <a
                href="#work"
                className="text-sm font-medium pb-px transition-colors duration-200 text-[color:var(--dark-text-primary)] hover:text-[color:var(--accent-on-dark)] border-b border-[color:var(--dark-border)] hover:border-[color:var(--accent-on-dark)]"
              >
                {t.cta_work}
              </a>
              <a
                href="#about"
                className="text-sm transition-colors duration-200 text-[color:var(--dark-text-muted)] hover:text-[color:var(--accent-on-dark)]"
              >
                {t.cta_about} →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
