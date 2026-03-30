"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [active, setActive] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["work", "about", "contact"]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(id)
            return
          }
        }
      }
      setActive("")
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm text-zinc-50 hover:text-purple-400 transition-colors duration-200"
        >
          carlos.psd
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace("#", "")
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 relative ${
                  isActive
                    ? "text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-50"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-purple-500 rounded-full" />
                )}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
