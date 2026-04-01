"use client"

import { motion, type Variants } from "framer-motion"
import dynamic from "next/dynamic"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ColorBends = dynamic(() => import("@/components/ColorBends"), { ssr: false }) as any

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
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ height: "90vh", minHeight: 600, backgroundColor: "var(--dark-bg)" }}
    >
      {/* ColorBends — full section background */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
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
          style={{ width: "100%", height: "100%" }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-[1]" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-[2]"
          style={{ background: "linear-gradient(to bottom, transparent, var(--dark-bg))" }}
        />
      </div>

      {/* Content — left-aligned, vertically centered */}
      <div className="absolute inset-0 z-[3] flex items-center">
        <div className="max-w-[1100px] w-full mx-auto px-8 flex flex-col gap-8">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[14px] tracking-[0.18em] uppercase font-medium"
            style={{ color: "var(--accent-on-dark)" }}
          >
            {t.greeting}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[36px] md:text-[80px] font-semibold leading-[1.04] max-w-4xl"
            style={{ color: "var(--dark-text-primary)", letterSpacing: "-0.03em" }}
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
              className="text-[16px] leading-[1.7]"
              style={{ color: "var(--dark-text-secondary)" }}
            >
              {t.description}
            </p>

            <div className="flex gap-6 items-center">
              <a
                href="#work"
                className="text-[14px] font-medium pb-px transition-colors duration-200 text-[color:var(--dark-text-primary)] hover:text-[color:var(--accent)] border-b border-[color:var(--dark-border)] hover:border-[color:var(--accent)]"
              >
                {t.cta_work}
              </a>
              <a
                href="#about"
                className="text-[14px] transition-colors duration-200 text-[color:var(--dark-text-muted)] hover:text-[color:var(--accent)]"
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
