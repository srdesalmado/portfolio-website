"use client"

import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const tools = [
  "Figma",
  "AmFi",
  "Notion",
  "Framer",
  "React",
  "TypeScript",
  "Vercel",
  "Linear",
  "Tailwind CSS",
  "Storybook",
]

export default function Hero() {
  const marqueeItems = [...tools, ...tools]

  return (
    <section className="min-h-screen flex flex-col justify-center pt-14">
      <div className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-16 items-center py-32">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-xs uppercase tracking-widest text-purple-500 font-medium"
            >
              Senior Product Designer
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-50 leading-[1.1]"
            >
              Designing fintech products
              <br />
              that feel inevitable.
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-zinc-400 text-lg leading-relaxed max-w-lg"
            >
              I help companies turn complex financial systems into intuitive,
              elegant digital products. Based in Florianópolis, BR.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex gap-3 flex-wrap"
            >
              <a href="#work">
                <Button
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-6 h-11 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                >
                  View Work
                </Button>
              </a>
              <a href="#about">
                <Button
                  variant="outline"
                  className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 rounded-lg px-6 h-11 text-sm font-medium"
                >
                  About me
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: Avatar placeholder */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-zinc-800 flex items-center justify-center ring-2 ring-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.1)]">
                <span className="font-mono text-zinc-500 text-sm">photo</span>
              </div>
              {/* Subtle glow behind avatar */}
              <div className="absolute inset-0 rounded-full bg-purple-500/5 blur-2xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-t border-zinc-800/50 py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="text-zinc-600 text-sm font-mono mx-8 shrink-0"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
