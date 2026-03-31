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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: "rgba(250,250,250,0.95)",
          borderBottom: "1px solid var(--border-color)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-[14px] font-medium text-[color:var(--text-primary)] transition-colors duration-200 hover:text-purple-600"
          >
            carlos.psd
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
                      ? "bg-black/[0.06] text-[color:var(--text-primary)]"
                      : "text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)] hover:bg-black/[0.04]"
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
                  lang === "en"
                    ? "text-[color:var(--text-primary)]"
                    : "text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)]"
                }`}
              >
                EN
              </button>
              <span className="text-[color:var(--border-color)]">·</span>
              <button
                onClick={() => setLang("pt")}
                className={`px-2 py-1 rounded-full transition-colors duration-200 ${
                  lang === "pt"
                    ? "text-[color:var(--text-primary)]"
                    : "text-[color:var(--text-muted)] hover:text-[color:var(--text-secondary)]"
                }`}
              >
                PT
              </button>
            </div>

            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="text-[13px] font-medium px-4 py-1.5 rounded-full transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
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
              className="block w-5 h-[1.5px] rounded bg-[color:var(--text-primary)] transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-5 h-[1.5px] rounded bg-[color:var(--text-primary)] transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] rounded bg-[color:var(--text-primary)] transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-14 md:hidden"
          style={{ backgroundColor: "rgba(250,250,250,0.97)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex flex-col px-6 py-10 gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[24px] font-semibold text-[color:var(--text-primary)] transition-colors duration-200 hover:text-purple-600"
                style={{ letterSpacing: "-0.02em" }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="self-start text-[15px] font-medium px-6 py-3 rounded-full transition-opacity duration-200 hover:opacity-80"
              style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
            >
              {tContact.cta}
            </a>

            <div
              className="flex items-center gap-3 pt-4 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <button
                onClick={() => setLang("en")}
                className={`text-[14px] font-mono transition-colors ${
                  lang === "en" ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-muted)]"
                }`}
              >
                EN
              </button>
              <span className="text-[color:var(--border-color)]">·</span>
              <button
                onClick={() => setLang("pt")}
                className={`text-[14px] font-mono transition-colors ${
                  lang === "pt" ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-muted)]"
                }`}
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
