"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 border-t border-zinc-800/60 relative overflow-hidden"
    >
      {/* Radial purple glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(168,85,247,0.07) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto"
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-50">
              Let&apos;s build something together.
            </h2>
            <p className="text-zinc-400 text-lg">
              Open to freelance work and senior roles.
            </p>
          </div>

          <a href="mailto:carlos@example.com">
            <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-8 h-12 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]">
              Get in touch
            </Button>
          </a>

          <div className="flex items-center gap-6 pt-2">
            {["LinkedIn", "GitHub", "Dribbble"].map((link, i, arr) => (
              <div key={link} className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                >
                  {link}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-zinc-700">·</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
