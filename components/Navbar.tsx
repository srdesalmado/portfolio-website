"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Navbar() {
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { lang, setLang } = useLang()
  const t = translations[lang].nav

  const navLinks = [
    { label: t.work, href: "/#work", id: "work" },
    { label: t.about, href: "/#about", id: "about" },
    { label: t.contact, href: "/#contact", id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      if (pathname !== "/") return
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
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
      setActive(hash)
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid #e5e5e5" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium transition-colors duration-300"
          style={{ color: scrolled ? "var(--text-primary)" : "rgba(255,255,255,0.9)" }}
        >
          carlos.psd
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = active === link.id
            const baseColor = scrolled
              ? (isActive ? "var(--text-primary)" : "var(--text-muted)")
              : (isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)")
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm transition-colors duration-300 relative"
                style={{ color: baseColor }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-purple-500 rounded-full" />
                )}
              </a>
            )
          })}

          <div className="flex items-center gap-1 text-xs font-mono">
            <button
              onClick={() => setLang("en")}
              className="transition-colors duration-300 px-1 py-0.5"
              style={{ color: scrolled ? (lang === "en" ? "var(--text-primary)" : "var(--text-muted)") : (lang === "en" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)") }}
            >
              EN
            </button>
            <span style={{ color: scrolled ? "var(--border-color)" : "rgba(255,255,255,0.2)" }}>·</span>
            <button
              onClick={() => setLang("pt")}
              className="transition-colors duration-300 px-1 py-0.5"
              style={{ color: scrolled ? (lang === "pt" ? "var(--text-primary)" : "var(--text-muted)") : (lang === "pt" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)") }}
            >
              PT
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
