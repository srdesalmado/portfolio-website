"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useLang } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Navbar() {
  const [active, setActive] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { lang, setLang } = useLang()
  const t = translations[lang].nav
  const tContact = translations[lang].contact

  const navLinks = [
    { label: t.work, href: "/#work", id: "work" },
    { label: t.about, href: "/#about", id: "about" },
    { label: t.contact, href: "/#contact", id: "contact" },
  ]

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
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "var(--dark-bg)",
          borderBottom: "1px solid var(--dark-border)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-6 h-6 rounded-md shrink-0 flex items-center justify-center"
              style={{ backgroundColor: "var(--dark-text-primary)" }}
            >
              <span
                className="text-[11px] font-bold font-mono"
                style={{ color: "var(--dark-bg)" }}
              >
                c
              </span>
            </div>
            <span
              className="font-mono text-[14px] font-medium transition-colors duration-200 group-hover:text-purple-400"
              style={{ color: "var(--dark-text-primary)" }}
            >
              carlos.psd
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[14px] px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white/95 bg-white/10"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Right: lang + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0 text-[13px] font-mono">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded-full transition-colors duration-200 ${
                  lang === "en" ? "text-white/88" : "text-white/30 hover:text-white/55"
                }`}
              >
                EN
              </button>
              <span style={{ color: "var(--dark-border)" }}>·</span>
              <button
                onClick={() => setLang("pt")}
                className={`px-2 py-1 rounded-full transition-colors duration-200 ${
                  lang === "pt" ? "text-white/88" : "text-white/30 hover:text-white/55"
                }`}
              >
                PT
              </button>
            </div>

            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="text-[13px] font-medium px-4 py-1.5 rounded-full transition-colors duration-200 hover:bg-white/90"
              style={{ backgroundColor: "var(--dark-text-primary)", color: "var(--dark-bg)" }}
            >
              {tContact.cta}
            </a>
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
                backgroundColor: "var(--dark-text-primary)",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded transition-all duration-300"
              style={{
                backgroundColor: "var(--dark-text-primary)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded transition-all duration-300 origin-center"
              style={{
                backgroundColor: "var(--dark-text-primary)",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-14 md:hidden"
          style={{ backgroundColor: "var(--dark-bg)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex flex-col px-6 py-10 gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[24px] font-semibold transition-colors duration-200 hover:text-purple-400"
                style={{ color: "var(--dark-text-primary)", letterSpacing: "-0.02em" }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="self-start text-[15px] font-medium px-6 py-3 rounded-full transition-colors duration-200 hover:bg-white/90"
              style={{ backgroundColor: "var(--dark-text-primary)", color: "var(--dark-bg)" }}
            >
              {tContact.cta}
            </a>

            <div
              className="flex items-center gap-3 pt-4 border-t"
              style={{ borderColor: "var(--dark-border)" }}
            >
              <button
                onClick={() => setLang("en")}
                className="text-[14px] font-mono transition-colors"
                style={{ color: lang === "en" ? "var(--dark-text-primary)" : "var(--dark-text-muted)" }}
              >
                EN
              </button>
              <span style={{ color: "var(--dark-border)" }}>·</span>
              <button
                onClick={() => setLang("pt")}
                className="text-[14px] font-mono transition-colors"
                style={{ color: lang === "pt" ? "var(--dark-text-primary)" : "var(--dark-text-muted)" }}
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
