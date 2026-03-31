"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Navbar() {
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
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

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // On non-home pages, always treat as scrolled
  const isScrolled = !isHome || scrolled
  const menuBg = isScrolled ? "rgba(250,250,250,0.97)" : "rgba(8,8,8,0.97)"

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false)
    const hash = href.split("#")[1]
    if (!hash) return
    if (pathname === "/") {
      e.preventDefault()
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
      setActive(hash)
    }
  }

  const iconColor = isScrolled ? "var(--text-primary)" : "rgba(255,255,255,0.9)"

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? "rgba(250,250,250,0.92)" : "transparent",
          borderBottom: isScrolled ? "1px solid #e5e5e5" : "1px solid transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[14px] font-medium transition-colors duration-300 hover:text-purple-500"
            style={{ color: isScrolled ? "var(--text-primary)" : "rgba(255,255,255,0.9)" }}
          >
            carlos.psd
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = active === link.id
              const baseColor = isScrolled
                ? (isActive ? "var(--text-primary)" : "var(--text-muted)")
                : (isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)")
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[14px] transition-colors duration-300 relative hover:text-purple-500"
                  style={{ color: baseColor }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-purple-500 rounded-full" />
                  )}
                </a>
              )
            })}

            <div className="flex items-center gap-1 text-[14px] font-mono">
              <button
                onClick={() => setLang("en")}
                className="transition-colors duration-300 px-1 py-0.5 hover:text-purple-500"
                style={{ color: isScrolled ? (lang === "en" ? "var(--text-primary)" : "var(--text-muted)") : (lang === "en" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)") }}
              >
                EN
              </button>
              <span style={{ color: isScrolled ? "var(--border-color)" : "rgba(255,255,255,0.2)" }}>·</span>
              <button
                onClick={() => setLang("pt")}
                className="transition-colors duration-300 px-1 py-0.5 hover:text-purple-500"
                style={{ color: isScrolled ? (lang === "pt" ? "var(--text-primary)" : "var(--text-muted)") : (lang === "pt" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)") }}
              >
                PT
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1.5px] rounded transition-all duration-300 origin-center"
              style={{
                backgroundColor: iconColor,
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded transition-all duration-300"
              style={{
                backgroundColor: iconColor,
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded transition-all duration-300 origin-center"
              style={{
                backgroundColor: iconColor,
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-14 md:hidden"
          style={{ backgroundColor: menuBg, backdropFilter: "blur(16px)" }}
        >
          <div className="flex flex-col px-6 py-10 gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[24px] font-semibold transition-colors duration-200 hover:text-purple-500"
                style={{
                  color: isScrolled ? "var(--text-primary)" : "rgba(255,255,255,0.9)",
                  letterSpacing: "-0.02em",
                }}
              >
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: isScrolled ? "var(--border-color)" : "rgba(255,255,255,0.1)" }}>
              <button
                onClick={() => setLang("en")}
                className="text-[14px] font-mono transition-colors hover:text-purple-500"
                style={{ color: isScrolled ? (lang === "en" ? "var(--text-primary)" : "var(--text-muted)") : (lang === "en" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)") }}
              >
                EN
              </button>
              <span style={{ color: isScrolled ? "var(--border-color)" : "rgba(255,255,255,0.2)" }}>·</span>
              <button
                onClick={() => setLang("pt")}
                className="text-[14px] font-mono transition-colors hover:text-purple-500"
                style={{ color: isScrolled ? (lang === "pt" ? "var(--text-primary)" : "var(--text-muted)") : (lang === "pt" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)") }}
              >
                PT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
