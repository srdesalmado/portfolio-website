"use client"

import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ColorBends = require("@/components/ColorBends").default

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden">
      {/* ColorBends background — warm dark purples */}
      <div className="absolute inset-0 z-0">
        <ColorBends
          colors={["#161412", "#1c1018", "#2d0a4e", "#3b1278", "#161412", "#120e10"]}
          speed={0.1}
          rotation={25}
          scale={1.3}
          frequency={0.75}
          warpStrength={0.5}
          mouseInfluence={0.25}
          parallax={0.2}
          noise={0.03}
          transparent={false}
          style={{ width: "100%", height: "100%" }}
        />
        {/* Gradient overlays for readability */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(22,20,18,0.6) 0%, rgba(22,20,18,0.35) 50%, rgba(22,20,18,0.75) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 w-full flex flex-col items-start gap-8">

        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-sm tracking-widest uppercase font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Hi there
        </motion.p>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12]"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.025em" }}
          >
            I&apos;m Carlos Henrique,<br />
            a Multidisciplinary<br />
            Product Designer.
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Currently freelancing — helping startups and scale-ups craft intuitive digital products, from early concepts to polished interfaces.
          </p>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex gap-3 flex-wrap"
        >
          <a href="#work">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-7 h-11 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_32px_rgba(147,51,234,0.3)]">
              View Work
            </Button>
          </a>
          <a href="#about">
            <Button
              variant="ghost"
              className="rounded-lg px-7 h-11 text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
            >
              About me
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />
    </section>
  )
}
