"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

export default function Navbar() {
  const [active, setActive] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

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
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split("#")[1]
    if (!hash) return

    if (pathname === "/") {
      e.preventDefault()
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        setActive(hash)
      }
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: "rgba(22,20,18,0.85)", borderBottom: "1px solid var(--border-color)" }}
    >
      <div className="max-w-[1100px] mx-auto px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm transition-colors duration-200"
          style={{ color: "var(--text-primary)" }}
        >
          carlos.psd
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.split("#")[1] ?? ""
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm transition-colors duration-200 relative"
                style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
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
