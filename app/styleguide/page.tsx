"use client"

import { Badge } from "@/components/ui/badge"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

/* ─── helpers ─────────────────────────────────────────────────────── */

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <p className="text-badge uppercase tracking-label font-medium mb-3" style={{ color: "var(--text-muted)" }}>
      {number} / {title}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-h1 font-semibold leading-cta tracking-tight-25 mb-12" style={{ color: "var(--text-primary)" }}>
      {children}
    </h2>
  )
}

function Divider() {
  return <hr className="border-t my-0" style={{ borderColor: "var(--border-color)" }} />
}

function SpecLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-badge font-mono mt-2" style={{ color: "var(--text-muted)" }}>
      {children}
    </p>
  )
}

function ColorChip({
  varName, hex, usage, dark = false, addBorder = false,
}: {
  varName: string; hex: string; usage: string; dark?: boolean; addBorder?: boolean
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${dark ? "var(--dark-border)" : "var(--border-color)"}` }}
    >
      <div
        className="h-20"
        style={{
          backgroundColor: `var(${varName})`,
          borderBottom: addBorder ? `1px solid var(--border-color)` : undefined,
        }}
      />
      <div className="p-3" style={{ backgroundColor: dark ? "var(--dark-surface)" : "var(--surface)" }}>
        <p className="text-badge font-mono font-medium" style={{ color: dark ? "var(--dark-text-primary)" : "var(--text-primary)" }}>
          {varName}
        </p>
        <p className="text-badge font-mono mt-0.5" style={{ color: dark ? "var(--dark-text-muted)" : "var(--text-muted)" }}>
          {hex}
        </p>
        <p className="text-badge mt-1 leading-snug" style={{ color: dark ? "var(--dark-text-muted)" : "var(--text-muted)" }}>
          {usage}
        </p>
      </div>
    </div>
  )
}

function TypeSpecimen({
  sample, spec, cls, style,
}: {
  sample: string; spec: string; cls?: string; style?: React.CSSProperties
}) {
  return (
    <div className="py-8 border-b" style={{ borderColor: "var(--border-color)" }}>
      <p className={cls ?? "text-base"} style={{ color: "var(--text-primary)", ...style }}>
        {sample}
      </p>
      <SpecLabel>{spec}</SpecLabel>
    </div>
  )
}

function RadiusSwatch({ label, px }: { label: string; px: number }) {
  const isFull = px >= 500
  return (
    <div className="flex flex-col gap-2 items-start">
      <div
        style={{
          width: isFull ? 96 : 64,
          height: 64,
          borderRadius: px,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-color)",
        }}
      />
      <p className="text-badge" style={{ color: "var(--text-primary)" }}>{label}</p>
      <p className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>{isFull ? "full" : `${px}px`}</p>
    </div>
  )
}

function SpacingSwatch({ step, px }: { step: string; px: number }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div
        style={{
          width: Math.max(px, 4),
          height: 32,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: 4,
        }}
      />
      <p className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>{step}</p>
      <p className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>{px}px</p>
    </div>
  )
}

function EffectChip({
  label, tokenName, note, chipStyle,
}: {
  label: string; tokenName?: string; note: string; chipStyle?: React.CSSProperties
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="w-20 h-20 rounded-xl"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-color)",
          ...chipStyle,
        }}
      />
      <div>
        <p className="text-badge font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
        {tokenName && (
          <p className="text-badge font-mono mt-0.5" style={{ color: "var(--accent)" }}>{tokenName}</p>
        )}
        <p className="text-badge font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>{note}</p>
      </div>
    </div>
  )
}

/* ─── nav links ────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#colors",     label: "Colors"     },
  { href: "#typography", label: "Typography" },
  { href: "#spacing",    label: "Spacing"    },
  { href: "#components", label: "Components" },
  { href: "#effects",    label: "Effects"    },
]

/* ─── page ─────────────────────────────────────────────────────────── */

export default function StyleguidePage() {
  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>

      {/* ── Sticky nav ─────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 h-14 border-b"
        style={{
          backgroundColor: "var(--navbar-bg)",
          backdropFilter: "blur(var(--blur-navbar))",
          borderColor: "var(--border-color)",
        }}
      >
        <span className="font-mono text-badge font-medium" style={{ color: "var(--text-primary)" }}>
          carlos.psd / styleguide
        </span>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-badge font-medium transition-colors duration-200 text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="/"
          className="text-badge font-medium transition-colors duration-200 text-[color:var(--text-muted)] hover:text-[color:var(--accent)]"
        >
          Back to site
        </a>
      </nav>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="px-8 py-24"
        style={{ backgroundColor: "var(--dark-bg)", borderBottom: "1px solid var(--dark-border)" }}
      >
        <div className="max-w-[var(--max-width-page)] mx-auto">
          <p className="text-badge uppercase tracking-label font-medium mb-4" style={{ color: "var(--dark-text-muted)" }}>
            internal / reference
          </p>
          <h1
            className="text-hero-sm md:text-hero-lg font-semibold leading-hero tracking-tight-3 mb-4"
            style={{ color: "var(--dark-text-primary)" }}
          >
            Styleguide
          </h1>
          <p className="text-base leading-body" style={{ color: "var(--dark-text-secondary)" }}>
            Tokens, type scale, components and visual patterns for carlos.psd
          </p>
        </div>
      </header>

      <div className="max-w-[var(--max-width-page)] mx-auto px-6 md:px-8">

        {/* ── 01 COLORS ──────────────────────────────────────────── */}
        <section id="colors" className="py-20">
          <SectionLabel number="01" title="Color Palette" />
          <SectionHeading>Color Palette and Roles</SectionHeading>

          {/* Light context */}
          <p className="text-badge uppercase tracking-label font-medium mb-4" style={{ color: "var(--text-muted)" }}>
            Neutral — Light context
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            <ColorChip varName="--bg"           hex="#fafafa" usage="Page background"  addBorder />
            <ColorChip varName="--surface"      hex="#f0f0f0" usage="Surface"          addBorder />
            <ColorChip varName="--border-color" hex="#e5e5e5" usage="Border"           addBorder />
            <ColorChip varName="--text-primary"   hex="#0f0f0f" usage="Heading" />
            <ColorChip varName="--text-secondary" hex="#3d3d3d" usage="Body" />
            <ColorChip varName="--text-muted"     hex="#666666" usage="Caption" />
          </div>

          {/* Dark context */}
          <p className="text-badge uppercase tracking-label font-medium mb-4" style={{ color: "var(--text-muted)" }}>
            Dark sections
          </p>
          <div
            className="rounded-2xl p-6 mb-12"
            style={{ backgroundColor: "var(--dark-bg)", border: "1px solid var(--dark-border)" }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              <ColorChip varName="--dark-bg"           hex="#080808" usage="Hero bg"      dark />
              <ColorChip varName="--dark-section-bg"   hex="#0f0f0f" usage="About / CTA"  dark />
              <ColorChip varName="--dark-surface"      hex="#1a1a1a" usage="Surface"       dark />
              <ColorChip varName="--dark-border"       hex="#2a2a2a" usage="Border"        dark />
              <ColorChip varName="--dark-text-primary"   hex="#f0f0f0" usage="Heading"   dark />
              <ColorChip varName="--dark-text-secondary" hex="#c4c4c4" usage="Body"      dark />
              <ColorChip varName="--dark-text-muted"     hex="#999999" usage="Caption"   dark />
            </div>
          </div>

          {/* Accent */}
          <p className="text-badge uppercase tracking-label font-medium mb-4" style={{ color: "var(--text-muted)" }}>
            Accent
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <ColorChip varName="--accent"         hex="#9333ea" usage="Hover / highlight — light bg" />
            <ColorChip varName="--accent-on-dark" hex="#c084fc" usage="Hover / highlight — dark bg" />
          </div>

          {/* Overlays */}
          <p className="text-badge uppercase tracking-label font-medium mb-4" style={{ color: "var(--text-muted)" }}>
            Overlays and glass
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            <ColorChip varName="--overlay-backdrop"   hex="rgba(0,0,0,0.85)"  usage="Lightbox backdrop" />
            <ColorChip varName="--overlay-hero"       hex="rgba(0,0,0,0.55)"  usage="Hero overlay"      addBorder />
            <ColorChip varName="--overlay-card-bottom" hex="rgba(0,0,0,0.72)" usage="Card scrim bottom"  addBorder />
            <ColorChip varName="--glass-light"        hex="rgba(255,255,255,0.1)" usage="Glass light"   addBorder />
            <ColorChip varName="--glass-medium"       hex="rgba(255,255,255,0.2)" usage="Glass medium"  addBorder />
          </div>

          {/* Hero particles */}
          <p className="text-badge uppercase tracking-label font-medium mb-4" style={{ color: "var(--text-muted)" }}>
            Hero particles
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
            <ColorChip varName="--color-particle-1" hex="#ff5c7a" usage="Three.js particle 1" />
            <ColorChip varName="--color-particle-2" hex="#8a5cff" usage="Three.js particle 2" />
            <ColorChip varName="--color-particle-3" hex="#00ffd1" usage="Three.js particle 3" />
          </div>
        </section>

        <Divider />

        {/* ── 02 TYPOGRAPHY ──────────────────────────────────────── */}
        <section id="typography" className="py-20">
          <SectionLabel number="02" title="Typography Scale" />
          <SectionHeading>Typography Rules</SectionHeading>

          <TypeSpecimen
            sample="Product Designer."
            spec="Hero LG — text-hero-lg / 80px / wt 600 / lh 1.04 / tracking-tight-3 -0.03em"
            cls="text-hero-lg font-semibold leading-hero tracking-tight-3"
          />
          <TypeSpecimen
            sample="Product Designer."
            spec="Hero SM — text-hero-sm / 36px / wt 600 / lh 1.04 / tracking-tight-3 -0.03em"
            cls="text-hero-sm font-semibold leading-hero tracking-tight-3"
          />
          <TypeSpecimen
            sample="Let's work together."
            spec="Display — text-display / clamp(2rem, 5vw, 3.5rem) / wt 600 / lh 1.06 / tracking-tight-3 -0.03em"
            cls="text-display font-semibold leading-display tracking-tight-3"
          />
          <TypeSpecimen
            sample="Design-led, from concept to product."
            spec="H1 — text-h1 / 40px / wt 600 / lh 1.05 / tracking-tight-25 -0.025em"
            cls="text-h1 font-semibold leading-cta tracking-tight-25"
          />
          <TypeSpecimen
            sample="Design System at Scale"
            spec="H2 — text-h2 / 28px / wt 600 / lh 1.1 / tracking-tight-2 -0.02em"
            cls="text-h2 font-semibold leading-heading tracking-tight-2"
          />
          <TypeSpecimen
            sample="40%"
            spec="Metric — text-metric / clamp(2rem, 4vw, 3rem) / wt 600 / lh 1.04 / tracking-tight-3 -0.03em"
            cls="text-metric font-semibold leading-hero tracking-tight-3"
          />
          <TypeSpecimen
            sample="Currently freelancing — helping startups and scale-ups craft intuitive digital products, from early concepts to polished interfaces."
            spec="Body — text-base / 16px / wt 400 / lh 1.75 (leading-body) / tracking none"
            cls="text-base leading-body"
          />
          <TypeSpecimen
            sample="Currently freelancing — helping startups and scale-ups craft intuitive digital products."
            spec="Body Alt — text-base / 16px / wt 400 / lh 1.7 (leading-body-alt) / used in dark sections"
            cls="text-base leading-body-alt"
          />
          <TypeSpecimen
            sample="Available for projects · Florianópolis, BR"
            spec="Badge — text-badge / 13px / wt 400 / lh 1.5 / tracking none"
            cls="text-badge"
          />
          <TypeSpecimen
            sample="AVAILABLE FOR WORK"
            spec="Label — text-badge uppercase / 13px / wt 500 / lh 1 / tracking-label 0.18em"
            cls="text-badge uppercase tracking-label font-medium"
          />
          <TypeSpecimen
            sample="Work  About  Contact"
            spec="Nav — text-badge / 13px / wt 500 / tracking 0.01em (global base)"
            cls="text-badge font-medium"
          />
          <div className="py-8">
            <p className="font-mono text-badge" style={{ color: "var(--text-primary)" }}>
              carlos.psd / EN · PT
            </p>
            <SpecLabel>Mono — font-mono + text-badge / 13px / wt 500 (via .font-mono) / tracking none</SpecLabel>
          </div>
        </section>

        <Divider />

        {/* ── 03 SPACING ─────────────────────────────────────────── */}
        <section id="spacing" className="py-20">
          <SectionLabel number="03" title="Spacing and Layout" />
          <SectionHeading>Spacing and Layout</SectionHeading>

          {/* Scale */}
          <p className="text-badge uppercase tracking-label font-medium mb-6" style={{ color: "var(--text-muted)" }}>
            Scale
          </p>
          <div className="flex flex-wrap items-end gap-6 mb-16">
            {([["1",4],["2",8],["3",12],["4",16],["5",20],["6",24],["8",32],["10",40],["12",48],["14",56],["16",64],["20",80],["24",96],["32",128]] as [string,number][]).map(([l,px]) => (
              <SpacingSwatch key={l} step={l} px={px} />
            ))}
          </div>

          {/* Containers */}
          <p className="text-badge uppercase tracking-label font-medium mb-6" style={{ color: "var(--text-muted)" }}>
            Container tokens
          </p>
          <div className="flex flex-col gap-0 mb-16 border-t" style={{ borderColor: "var(--border-color)" }}>
            {[
              { token: "--max-width-page", value: "68.75rem / 1100px", note: "All homepage sections" },
              { token: "--max-width-case", value: "75rem / 1200px",    note: "Case study pages" },
              { token: "px desktop",       value: "32px (px-8)",        note: "All sections" },
              { token: "px mobile",        value: "24px (px-6)",        note: "Responsive" },
              { token: "Section py",       value: "64px mobile / 80px desktop", note: "All homepage sections" },
              { token: "--spacing-metrics", value: "3rem / 48px",       note: "Metrics row · project cards" },
              { token: "--height-hairline", value: "1.5px",             note: "Section dividers" },
              { token: "--hero-min-height", value: "600px",             note: "Hero component" },
            ].map(({ token, value, note }) => (
              <div key={token} className="grid grid-cols-[10rem_1fr_1fr] gap-6 py-4 border-b items-baseline" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>{token}</span>
                <span className="text-badge font-mono font-medium" style={{ color: "var(--text-primary)" }}>{value}</span>
                <span className="text-badge opacity-60" style={{ color: "var(--text-muted)" }}>{note}</span>
              </div>
            ))}
          </div>

          {/* Border radius */}
          <p className="text-badge uppercase tracking-label font-medium mb-6" style={{ color: "var(--text-muted)" }}>
            Border radius
          </p>
          <div className="flex flex-wrap gap-10 mb-16">
            <RadiusSwatch label="sm"  px={4}   />
            <RadiusSwatch label="md"  px={8}   />
            <RadiusSwatch label="lg"  px={12}  />
            <RadiusSwatch label="xl"  px={16}  />
            <RadiusSwatch label="full" px={500} />
          </div>

          {/* Borders */}
          <p className="text-badge uppercase tracking-label font-medium mb-6" style={{ color: "var(--text-muted)" }}>
            Borders
          </p>
          <div className="flex flex-col gap-0 border-t" style={{ borderColor: "var(--border-color)" }}>
            {[
              { token: "--border-1",      value: "1px solid var(--border-color)", note: "Light sections" },
              { token: "--border-dark-1", value: "1px solid var(--dark-border)",  note: "Dark sections" },
              { token: "--border-accent", value: "2px solid var(--accent)",        note: "Focused / highlighted" },
            ].map(({ token, value, note }) => (
              <div key={token} className="grid grid-cols-[10rem_1fr_1fr] gap-6 py-4 border-b items-center" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>{token}</span>
                <span className="text-badge font-mono font-medium" style={{ color: "var(--text-primary)" }}>{value}</span>
                <span className="text-badge opacity-60" style={{ color: "var(--text-muted)" }}>{note}</span>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── 04 COMPONENTS ──────────────────────────────────────── */}
        <section id="components" className="py-20">
          <SectionLabel number="04" title="Components" />
          <SectionHeading>Components</SectionHeading>

          {/* CTA Button */}
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>CTA Button</p>
              <p className="text-badge leading-snug" style={{ color: "var(--text-muted)" }}>pill · hover:opacity-80 · used in Navbar and Contact</p>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="text-badge font-medium px-5 py-2 rounded-full transition-all duration-200 hover:opacity-80"
                style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
              >
                Get in touch
              </button>
              <p className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>
                bg: --text-primary · color: --bg · rounded-full · px-5 py-2
              </p>
            </div>
          </div>

          {/* Text links */}
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Text links</p>
              <p className="text-badge leading-snug" style={{ color: "var(--text-muted)" }}>underline via border-b · hover:accent on light bg · hover:accent-on-dark on dark bg</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-8 items-center">
                <a href="#" className="text-badge font-medium text-[color:var(--text-primary)] border-b border-[color:var(--border-color)] pb-px transition-colors duration-200 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]">
                  Get in touch →
                </a>
                <a href="#" className="text-badge text-[color:var(--text-muted)] transition-colors duration-200 hover:text-[color:var(--accent)]">
                  Back to work ←
                </a>
                <p className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>light bg</p>
              </div>
              <div className="flex flex-wrap gap-8 items-center px-5 py-4 rounded-xl" style={{ backgroundColor: "var(--dark-bg)", border: "1px solid var(--dark-border)" }}>
                <a href="#" className="text-badge font-medium text-[color:var(--dark-text-primary)] border-b border-[color:var(--dark-border)] pb-px transition-colors duration-200 hover:text-[color:var(--accent-on-dark)] hover:border-[color:var(--accent-on-dark)]">
                  Get in touch →
                </a>
                <a href="#" className="text-badge text-[color:var(--dark-text-muted)] transition-colors duration-200 hover:text-[color:var(--accent-on-dark)]">
                  About me →
                </a>
                <p className="text-badge font-mono ml-auto" style={{ color: "var(--dark-border)" }}>dark bg</p>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Badge</p>
              <p className="text-badge leading-snug" style={{ color: "var(--text-muted)" }}>outline variant · always on dark backgrounds · project card overlay</p>
            </div>
            <div className="flex flex-wrap gap-3 items-center px-5 py-4 rounded-xl" style={{ backgroundColor: "var(--dark-bg)" }}>
              <Badge variant="outline" className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">Brand Design</Badge>
              <Badge variant="outline" className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">UI Design</Badge>
              <Badge variant="outline" className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">Fintech</Badge>
            </div>
          </div>

          {/* Navbar */}
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Navbar</p>
              <p className="text-badge leading-snug" style={{ color: "var(--text-muted)" }}>sticky · blur(--blur-navbar) · adapts bg on scroll</p>
            </div>
            <div
              className="flex items-center justify-between px-6 h-14 rounded-xl overflow-hidden"
              style={{
                backgroundColor: "var(--navbar-bg)",
                border: "1px solid var(--border-color)",
                backdropFilter: "blur(var(--blur-navbar))",
              }}
            >
              <span className="font-mono text-badge font-medium" style={{ color: "var(--text-primary)" }}>carlos.psd</span>
              <div className="flex items-center gap-1">
                <span className="text-badge font-medium px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)" }}>Work</span>
                <span className="text-badge font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.06)", color: "var(--text-primary)" }}>About</span>
                <span className="text-badge font-medium px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)" }}>Contact</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center text-badge font-mono">
                  <span className="px-2 py-1" style={{ color: "var(--text-primary)" }}>EN</span>
                  <span style={{ color: "var(--border-color)" }}>·</span>
                  <span className="px-2 py-1" style={{ color: "var(--text-muted)" }}>PT</span>
                </div>
                <span className="text-badge font-medium px-4 py-1.5 rounded-full" style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}>Get in touch</span>
              </div>
            </div>
          </div>

          {/* Project Card */}
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Project Card</p>
              <p className="text-badge leading-snug" style={{ color: "var(--text-muted)" }}>aspect-card 4/3 · gradient-card-overlay scrim · used in FeaturedWork</p>
            </div>
            <div className="w-56">
              <ProjectCard project={projects[0]} />
            </div>
          </div>

          {/* Lightbox */}
          <div className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 py-10" style={{ borderColor: "var(--border-color)" }}>
            <div>
              <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Lightbox</p>
              <p className="text-badge leading-snug" style={{ color: "var(--text-muted)" }}>modal · overlay-backdrop · blur-lightbox · case study galleries</p>
            </div>
            <div
              className="relative rounded-xl overflow-hidden h-56 flex items-center justify-center"
              style={{ backgroundColor: "var(--overlay-backdrop)" }}
            >
              <div
                className="w-3/5 h-36 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--dark-surface)", border: "1px solid var(--dark-border)" }}
              >
                <span className="text-badge font-mono text-center" style={{ color: "var(--dark-text-muted)" }}>
                  image<br />max-w-lightbox · max-h-lightbox
                </span>
              </div>
              <button
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-badge"
                style={{ backgroundColor: "var(--dark-surface)", color: "var(--dark-text-primary)", border: "1px solid var(--dark-border)" }}
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4">
                <span className="text-badge font-mono" style={{ color: "var(--dark-border)" }}>
                  --overlay-backdrop · rgba(0,0,0,0.85) · blur(--blur-lightbox)
                </span>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 05 EFFECTS ─────────────────────────────────────────── */}
        <section id="effects" className="py-20">
          <SectionLabel number="05" title="Effects and Motion" />
          <SectionHeading>Effects and Motion</SectionHeading>

          {/* Shadows and blurs */}
          <p className="text-badge uppercase tracking-label font-medium mb-6" style={{ color: "var(--text-muted)" }}>
            Shadows and blur
          </p>
          <div className="flex flex-wrap gap-12 mb-16">
            <EffectChip
              label="Navbar blur"
              tokenName="--blur-navbar"
              note="blur(12px)"
              chipStyle={{ backdropFilter: "blur(var(--blur-navbar))", boxShadow: "0 1px 0 var(--border-color)" }}
            />
            <EffectChip
              label="Lightbox blur"
              tokenName="--blur-lightbox"
              note="blur(6px)"
              chipStyle={{ backdropFilter: "blur(var(--blur-lightbox))" }}
            />
            <EffectChip
              label="shadow-xs"
              tokenName="--shadow-xs"
              note="0 1px 2px rgba(0,0,0,0.08)"
              chipStyle={{ boxShadow: "var(--shadow-xs)" }}
            />
            <EffectChip
              label="Accent glow"
              tokenName="--shadow-accent-glow"
              note="0 0 24px accent/20"
              chipStyle={{
                boxShadow: "var(--shadow-accent-glow)",
                border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)",
              }}
            />
          </div>

          {/* Gradients */}
          <p className="text-badge uppercase tracking-label font-medium mb-6" style={{ color: "var(--text-muted)" }}>
            Gradients
          </p>
          <div className="flex flex-col gap-4 mb-16">
            <div className="rounded-xl overflow-hidden h-16" style={{ background: "var(--gradient-hero-fade)", backgroundColor: "var(--dark-bg)" }}>
              <div className="h-full w-full" style={{ backgroundImage: "var(--gradient-hero-fade)" }} />
            </div>
            <SpecLabel>--gradient-hero-fade — linear-gradient(to bottom, transparent, var(--dark-bg))</SpecLabel>
            <div className="rounded-xl overflow-hidden h-16 mt-4" style={{ backgroundImage: "var(--gradient-card-overlay)" }} />
            <SpecLabel>--gradient-card-overlay — linear-gradient(to top, overlay-card-bottom 0%, overlay-card-fade 50%, transparent 100%)</SpecLabel>
          </div>

          {/* Motion */}
          <p className="text-badge uppercase tracking-label font-medium mb-6" style={{ color: "var(--text-muted)" }}>
            Motion
          </p>
          <div className="flex flex-col gap-0 border-t" style={{ borderColor: "var(--border-color)" }}>
            {[
              { label: "Ease",            value: "[0.16, 1, 0.3, 1]" },
              { label: "Duration",        value: "700ms to 900ms" },
              { label: "Stagger",         value: "delay x 0.08 to 0.12" },
              { label: "Entrance",        value: "opacity 0 to 1 · y +20px to 0" },
              { label: "Hover transition", value: "200ms ease (CSS)" },
              { label: "Marquee",         value: "25s linear infinite" },
            ].map(({ label, value }) => (
              <div key={label} className="grid grid-cols-[10rem_1fr] gap-6 py-4 border-b items-baseline" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>{label}</span>
                <span className="text-badge font-mono font-medium" style={{ color: "var(--text-primary)" }}>{value}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        className="border-t mt-0 px-8 py-8 flex items-center justify-between"
        style={{ borderColor: "var(--border-color)" }}
      >
        <span className="font-mono text-badge" style={{ color: "var(--text-muted)" }}>carlos.psd / styleguide</span>
        <a href="/" className="text-badge transition-colors duration-200 text-[color:var(--text-muted)] hover:text-[color:var(--accent)]">
          Back to site →
        </a>
      </footer>

    </div>
  )
}
