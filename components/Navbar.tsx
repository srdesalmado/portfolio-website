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
  const tContact = translations[lang].contact

  // isScrolled: transparent only on homepage before scrolling
  const isScrolled = !isHome || scrolled

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

  useEffect(() => { setMenuOpen(false) }, [pathname])

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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "[background-color:var(--navbar-bg-scroll-light)] border-b border-[var(--border-color)] backdrop-blur-[var(--blur-navbar)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-page mx-auto px-6 md:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className={`font-mono text-sm font-medium transition-colors duration-300 ${
              isScrolled
                ? "text-[color:var(--text-primary)] hover:text-[color:var(--accent)]"
                : "text-white/90 hover:text-[color:var(--accent-on-dark)]"
            }`}
          >
            carlos.psd
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              if (isScrolled) {
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-black/[0.06] text-[color:var(--text-primary)]"
                        : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] hover:bg-black/[0.04]"
                    }`}
                  >
                    {link.label}
                  </a>
                )
              }
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white/95"
                      : "text-white/50 hover:text-white/90 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Right: lang + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0 text-sm font-mono">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? lang === "en" ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)]"
                    : lang === "en" ? "text-white/90" : "text-white/40 hover:text-white/70"
                }`}
              >
                EN
              </button>
              <span className={isScrolled ? "text-[color:var(--border-color)]" : "text-white/20"}>·</span>
              <button
                onClick={() => setLang("pt")}
                className={`px-2 py-1 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? lang === "pt" ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)]"
                    : lang === "pt" ? "text-white/90" : "text-white/40 hover:text-white/70"
                }`}
              >
                PT
              </button>
            </div>

            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 hover:opacity-80 ${
                isScrolled
                  ? "bg-[var(--text-primary)] text-[color:var(--bg)]"
                  : "[background-color:var(--navbar-bg-scroll-alt)] text-[color:var(--color-dark-text)]"
              }`}
            >
              {tContact.cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {[
              { transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" },
              { opacity: menuOpen ? 0 : 1 },
              { transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" },
            ].map((s, i) => (
              <span
                key={i}
                className={`block w-5 h-[var(--height-hairline)] rounded transition-all duration-300 origin-center ${
                  isScrolled ? "bg-[var(--text-primary)]" : "bg-white/90"
                }`}
                style={s}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-40 flex flex-col pt-14 md:hidden backdrop-blur-[16px] ${
            isScrolled ? "[background-color:var(--navbar-bg-light)]" : "[background-color:var(--navbar-bg-dark)]"
          }`}
        >
          <div className="flex flex-col px-6 py-10 gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-2xl font-semibold tracking-tight-2 transition-colors duration-200 ${
                  isScrolled
                    ? "text-[color:var(--text-primary)] hover:text-[color:var(--accent)]"
                    : "text-white/90 hover:text-[color:var(--accent-on-dark)]"
                }`}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className={`self-start text-sm font-medium px-6 py-3 rounded-full transition-opacity duration-200 hover:opacity-80 ${
                isScrolled
                  ? "bg-[var(--text-primary)] text-[color:var(--bg)]"
                  : "[background-color:var(--navbar-bg-scroll-alt)] text-[color:var(--color-dark-text)]"
              }`}
            >
              {tContact.cta}
            </a>

            <div
              className={`flex items-center gap-3 pt-4 border-t ${
                isScrolled ? "border-[var(--border-color)]" : "border-[var(--glass-light)]"
              }`}
            >
              <button
                onClick={() => setLang("en")}
                className={`text-sm font-mono transition-colors ${
                  isScrolled
                    ? lang === "en" ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-muted)]"
                    : lang === "en" ? "text-white/90" : "text-white/35"
                }`}
              >EN</button>
              <span className={isScrolled ? "text-[color:var(--border-color)]" : "text-white/20"}>·</span>
              <button
                onClick={() => setLang("pt")}
                className={`text-sm font-mono transition-colors ${
                  isScrolled
                    ? lang === "pt" ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-muted)]"
                    : lang === "pt" ? "text-white/90" : "text-white/35"
                }`}
              >PT</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
