"use client"

import { motion } from "framer-motion"

// template.tsx re-mounts on every App Router navigation — no keys needed.
// A curtain covers the new page on enter, then slides away upward, revealing
// content from bottom to top. Simple, no layout side-effects.

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <motion.div
        className="fixed inset-0 z-[var(--z-page-transition)] bg-[color:var(--bg)] pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}
