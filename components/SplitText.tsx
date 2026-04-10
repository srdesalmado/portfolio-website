"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView, type Variants } from "framer-motion"

interface SplitTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  // "auto" = animates on mount (hero); "scroll" = animates when in viewport
  trigger?: "auto" | "scroll"
  baseDelay?: number
}

// Each word is wrapped in overflow-hidden so characters "rise up" from below the clip edge.
// Characters within a word stagger at CHAR_STAGGER intervals.
// Uses useInView + useAnimation instead of whileInView-per-char to avoid
// StrictMode/hydration timing issues that can silently consume the once:true trigger.
export default function SplitText({
  text,
  className = "",
  as: Tag = "span",
  trigger = "auto",
  baseDelay = 0,
}: SplitTextProps) {
  const CHAR_DURATION = 0.55
  const CHAR_STAGGER = 0.025
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

  const ref = useRef<HTMLElement>(null)
  const controls = useAnimation()
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    if (trigger === "auto" || isInView) {
      controls.start("visible")
    }
  }, [isInView, trigger, controls])

  // Pre-compute per-word start indices for stagger delay
  const wordData = text.split(" ").map((word, wi, arr) => {
    const startIdx = arr.slice(0, wi).reduce((acc, w) => acc + w.length + 1, 0)
    return { word, startIdx }
  })

  const charVariants: Variants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: CHAR_DURATION,
        delay: baseDelay + i * CHAR_STAGGER,
        ease: EASE,
      },
    }),
  }

  return (
    <Tag ref={ref as React.Ref<never>} className={className} aria-label={text}>
      {wordData.map(({ word, startIdx }, wi) => (
        // Fragment: word wrapper + trailing space as plain text.
        // Plain spaces between inline-block elements collapse at line breaks.
        <span key={wi}>
          <span className="inline-block overflow-hidden align-top leading-[inherit]">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                custom={startIdx + ci}
                initial="hidden"
                animate={controls}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {wi < wordData.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
