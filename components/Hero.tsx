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
      style={{ height: "90vh", minHeight: 600, backgroundColor: "#080808" }}
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
          style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
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
            className="text-[14px] tracking-[0.2em] uppercase font-medium"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t.greeting}
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.08] max-w-4xl"
            style={{ color: "#f0f0f0", letterSpacing: "-0.03em" }}
          >
            {lang === "en"
              ? "Hi, I'm Carlos Henrique, a Multidisciplinary Product Designer."
              : "Oi, sou Carlos Henrique, Designer de Produto Multidisciplinar."}
          </motion.h1>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col gap-5 max-w-sm"
          >
            <p
              className="text-[14px] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "-0.005em" }}
            >
              {t.description}
            </p>

            <div className="flex gap-6 items-center">
              <a
                href="#work"
                className="text-[14px] font-medium border-b pb-px transition-colors duration-200 hover:text-purple-400 hover:border-purple-400"
                style={{ color: "#f0f0f0", borderColor: "rgba(255,255,255,0.3)" }}
              >
                {t.cta_work}
              </a>
              <a
                href="#about"
                className="text-[14px] transition-colors duration-200 hover:text-purple-400"
                style={{ color: "rgba(255,255,255,0.35)" }}
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
