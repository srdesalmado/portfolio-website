"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

/* ─── helpers ─────────────────────────────────────────── */
function Divider() {
  return <hr style={{ borderColor: "var(--border-color)", borderTopWidth: 1, margin: "0" }} />
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] font-medium mb-6" style={{ color: "var(--text-secondary)" }}>
      {children}
    </p>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-8 items-baseline py-5 border-b" style={{ borderColor: "var(--border-color)" }}>
      <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{label}</span>
      <div>{children}</div>
    </div>
  )
}

function ColorChip({ hex, name, usage, dark = false }: { hex: string; name: string; usage: string; dark?: boolean }) {
  const isLight = parseInt(hex.replace("#", ""), 16) > 0xaaaaaa
  return (
    <div className="flex flex-col gap-2">
      <div style={{ backgroundColor: hex, width: 80, height: 80, borderRadius: 8, border: isLight ? "1px solid var(--border-color)" : undefined }} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-mono" style={{ color: dark ? "#f0f0f0" : "var(--text-primary)" }}>{name}</span>
        <span className="text-[14px] font-mono" style={{ color: dark ? "#999" : "var(--text-muted)" }}>{hex}</span>
        <span className="text-[14px]" style={{ color: dark ? "#666" : "var(--text-muted)" }}>{usage}</span>
      </div>
    </div>
  )
}

function RadiusChip({ label, px }: { label: string; px: number }) {
  const isFull = px >= 500
  return (
    <div className="flex flex-col gap-3 items-start">
      <div style={{ width: isFull ? 96 : 64, height: 64, borderRadius: px, backgroundColor: "var(--surface)", border: "1px solid var(--border-color)" }} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px]" style={{ color: "var(--text-primary)" }}>{label}</span>
        <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{isFull ? "500px" : `${px}px`}</span>
      </div>
    </div>
  )
}

function SpacingChip({ label, px }: { label: string; px: number }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div style={{ width: px, height: 32, backgroundColor: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: 4, minWidth: 4 }} />
      <span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>{label}</span>
      <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{px}px</span>
    </div>
  )
}

function ShadowChip({ label, chipStyle, note }: { label: string; chipStyle: React.CSSProperties; note: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: "var(--surface)", border: "1px solid var(--border-color)", ...chipStyle }} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>{label}</span>
        <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{note}</span>
      </div>
    </div>
  )
}

const TABS = ["Typography", "Colors", "Spacing", "Components", "Effects"] as const
type Tab = typeof TABS[number]

/* ─── page ────────────────────────────────────────────── */
export default function StyleguidePage() {
  const [active, setActive] = useState<Tab>("Typography")

  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <div className="max-w-[1100px] mx-auto px-8 pt-24 pb-32">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[14px] font-mono mb-4" style={{ color: "var(--text-muted)" }}>internal / reference</p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Styleguide
          </h1>
          <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>
            Tokens, type scale, components and visual patterns for carlos.psd
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex items-center gap-1 mb-6 p-1 w-fit rounded-full" style={{ backgroundColor: "var(--surface)" }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="text-[14px] font-medium px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                backgroundColor: active === tab ? "var(--bg)" : "transparent",
                color: active === tab ? "var(--text-primary)" : "var(--text-muted)",
                boxShadow: active === tab ? "0 1px 3px rgba(0,0,0,0.08)" : undefined,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── TYPOGRAPHY ─────────────────────────────────────── */}
        {active === "Typography" && (
          <section className="py-16">
            <div className="grid grid-cols-[160px_1fr_80px_60px_64px_120px] gap-4 pb-3 mb-1 border-b" style={{ borderColor: "var(--border-color)" }}>
              {["Role", "Specimen", "Size", "Line-h", "Weight", "Tracking"].map((h) => (
                <span key={h} className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{h}</span>
              ))}
            </div>
            {[
              { role: "Display", sample: "Product Designer.", size: "80px", lh: "1.04", weight: "600", tracking: "−0.03em", cls: "text-[80px] font-semibold leading-[1.04]", ls: "-0.03em" },
              { role: "Heading", sample: "Let's work together.", size: "40px", lh: "1.05", weight: "600", tracking: "−0.025em", cls: "text-[40px] font-semibold leading-[1.05]", ls: "-0.025em" },
              { role: "Heading 3", sample: "Design System at Scale", size: "18px", lh: "1.4", weight: "600", tracking: "−0.02em", cls: "text-[18px] font-semibold", ls: "-0.02em" },
              { role: "Body", sample: "Currently freelancing — helping startups craft intuitive digital products.", size: "16px", lh: "1.7", weight: "400", tracking: "0.005em", cls: "text-[16px] leading-[1.7]", ls: "0.005em" },
              { role: "Caption", sample: "Available for projects · Florianópolis, BR", size: "14px", lh: "1.5", weight: "400", tracking: "0", cls: "text-[14px]", ls: "0" },
              { role: "Label", sample: "AVAILABLE FOR WORK", size: "14px", lh: "1", weight: "500", tracking: "0.18em", cls: "text-[14px] uppercase tracking-[0.18em] font-medium", ls: "0.18em" },
              { role: "Nav link", sample: "Work  About  Contact", size: "14px", lh: "1", weight: "500", tracking: "0.01em", cls: "text-[14px] font-medium", ls: "0.01em" },
              { role: "Mono", sample: "carlos.psd / EN · PT", size: "14px", lh: "1", weight: "500", tracking: "0", cls: "font-mono text-[14px]", ls: "0" },
            ].map((row) => (
              <div key={row.role} className="grid grid-cols-[160px_1fr_80px_60px_64px_120px] gap-4 items-baseline py-5 border-b" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{row.role}</span>
                <span className={row.cls} style={{ color: "var(--text-primary)", letterSpacing: row.ls, lineHeight: row.lh }}>{row.sample}</span>
                <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.size}</span>
                <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.lh}</span>
                <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.weight}</span>
                <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.tracking}</span>
              </div>
            ))}
          </section>
        )}

        {/* ── COLORS ─────────────────────────────────────────── */}
        {active === "Colors" && (
          <section className="py-16">
            <SubLabel>Neutral — Light context</SubLabel>
            <div className="flex flex-wrap gap-8 mb-14">
              <ColorChip hex="#fafafa" name="--bg" usage="Page background" />
              <ColorChip hex="#f0f0f0" name="--surface" usage="Surface" />
              <ColorChip hex="#e5e5e5" name="--border-color" usage="Border" />
              <ColorChip hex="#0f0f0f" name="--text-primary" usage="Heading" />
              <ColorChip hex="#3d3d3d" name="--text-secondary" usage="Body" />
              <ColorChip hex="#666666" name="--text-muted" usage="Caption" />
            </div>

            <SubLabel>Dark sections — palette</SubLabel>
            <div className="flex flex-wrap gap-8 p-8 mb-14" style={{ backgroundColor: "#080808", borderRadius: 12, border: "1px solid #1a1a1a" }}>
              <ColorChip hex="#080808" name="--dark-bg" usage="Hero background" dark />
              <ColorChip hex="#1a1a1a" name="--dark-surface" usage="Surface" dark />
              <ColorChip hex="#2a2a2a" name="--dark-border" usage="Border" dark />
              <ColorChip hex="#f0f0f0" name="--dark-text-primary" usage="Heading" dark />
              <ColorChip hex="#c4c4c4" name="--dark-text-secondary" usage="Body" dark />
              <ColorChip hex="#999999" name="--dark-text-muted" usage="Caption" dark />
            </div>

            <SubLabel>Accent</SubLabel>
            <div className="flex flex-wrap gap-8 mb-10">
              <ColorChip hex="#9333ea" name="--accent" usage="Light context hover" />
              <ColorChip hex="#a855f7" name="--accent-on-dark" usage="Dark context hover" />
            </div>
            <SubLabel>Hero animation</SubLabel>
            <div className="flex flex-wrap gap-8">
              <ColorChip hex="#8a5cff" name="colorbends-purple" usage="Hero animation" />
              <ColorChip hex="#ff5c7a" name="colorbends-pink" usage="Hero animation" />
              <ColorChip hex="#00ffd1" name="colorbends-teal" usage="Hero animation" />
            </div>
          </section>
        )}

        {/* ── SPACING ────────────────────────────────────────── */}
        {active === "Spacing" && (
          <section className="py-16">
            <SubLabel>Scale</SubLabel>
            <div className="flex flex-wrap items-end gap-6 mb-14">
              {[["1",4],["2",8],["3",12],["4",16],["5",20],["6",24],["8",32],["10",40],["12",48],["14",56],["16",64],["20",80],["24",96],["32",128]].map(([l, px]) => (
                <SpacingChip key={l} label={String(l)} px={Number(px)} />
              ))}
            </div>

            <Divider />

            <div className="pt-12">
              <SubLabel>Container</SubLabel>
              <Row label="max-width"><span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>1100px</span></Row>
              <Row label="px (desktop)"><span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>32px</span></Row>
              <Row label="px (mobile)"><span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>24px</span></Row>
              <Row label="Section py"><span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>64px mobile / 80px desktop</span></Row>
            </div>

            <div className="pt-12">
              <SubLabel>Border radius</SubLabel>
              <div className="flex flex-wrap gap-10">
                <RadiusChip label="sm — 4px" px={4} />
                <RadiusChip label="md — 8px" px={8} />
                <RadiusChip label="lg — 12px" px={12} />
                <RadiusChip label="xl — 16px" px={16} />
                <RadiusChip label="full" px={500} />
              </div>
            </div>
          </section>
        )}

        {/* ── COMPONENTS ─────────────────────────────────────── */}
        {active === "Components" && (
          <section className="py-16 flex flex-col gap-0">

            {/* CTA Button */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>CTA Button</p>
                <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>pill · hover:opacity-80 · used in Navbar</p>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="text-[14px] font-medium px-5 py-2 rounded-full transition-all duration-200 hover:opacity-80" style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}>
                  Get in touch
                </button>
              </div>
            </div>

            {/* Text links */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>Text links</p>
                <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>hover:accent · light + dark contexts</p>
              </div>
              <div className="flex flex-col gap-6">
                {/* Light */}
                <div className="flex flex-wrap gap-8 items-center px-5 py-4 rounded-xl" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-color)" }}>
                  <a href="#" className="text-[14px] font-medium text-[color:var(--text-primary)] border-b border-[color:var(--border-color)] pb-px transition-colors duration-200 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]">
                    Get in touch →
                  </a>
                  <a href="#" className="text-[14px] text-[color:var(--text-muted)] transition-colors duration-200 hover:text-[color:var(--accent)]">
                    About me →
                  </a>
                </div>
                {/* Dark — same pattern, accent on hover */}
                <div className="flex flex-wrap gap-8 items-center px-5 py-4 rounded-xl" style={{ backgroundColor: "var(--dark-bg)", border: "1px solid var(--dark-border)" }}>
                  <a href="#" className="text-[14px] font-medium text-[color:var(--dark-text-primary)] border-b border-[color:var(--dark-border)] pb-px transition-colors duration-200 hover:text-[color:var(--accent-on-dark)] hover:border-[color:var(--accent-on-dark)]">
                    Get in touch →
                  </a>
                  <a href="#" className="text-[14px] text-[color:var(--dark-text-muted)] transition-colors duration-200 hover:text-[color:var(--accent-on-dark)]">
                    About me →
                  </a>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>Badge</p>
                <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>outline · used in project card overlay</p>
              </div>
              <div className="flex flex-wrap gap-3 items-center px-5 py-4 rounded-xl" style={{ backgroundColor: "var(--dark-bg)" }}>
                <Badge variant="outline" className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">Brand Design</Badge>
                <Badge variant="outline" className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">UI Design</Badge>
                <Badge variant="outline" className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">Fintech</Badge>
              </div>
            </div>

            {/* Navbar */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>Navbar</p>
                <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>sticky · blur · pill active + hover</p>
              </div>
              <div className="flex flex-col gap-3">
                {/* Desktop */}
                <div className="flex items-center justify-between px-6 h-14 rounded-xl overflow-hidden" style={{ backgroundColor: "rgba(250,250,250,0.95)", border: "1px solid var(--border-color)", backdropFilter: "blur(12px)" }}>
                  <span className="font-mono text-[14px] font-medium text-[color:var(--text-primary)]">carlos.psd</span>
                  <div className="flex items-center gap-1">
                    {["Work","About","Contact"].map((l, i) => (
                      <span key={l} className={`text-[14px] font-medium px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:bg-black/[0.04] hover:text-[color:var(--text-primary)] ${i === 1 ? "bg-black/[0.06] text-[color:var(--text-primary)]" : "text-[color:var(--text-muted)]"}`}>{l}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-[14px] font-mono">
                      <span className="px-2 py-1 cursor-pointer rounded-full transition-colors duration-200 hover:bg-black/[0.04] text-[color:var(--text-primary)]">EN</span>
                      <span style={{ color: "var(--border-color)" }}>·</span>
                      <span className="px-2 py-1 cursor-pointer rounded-full transition-colors duration-200 hover:bg-black/[0.04] text-[color:var(--text-muted)]">PT</span>
                    </div>
                    <span className="text-[14px] font-medium px-4 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80" style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}>Get in touch</span>
                  </div>
                </div>
                {/* Mobile */}
                <div className="flex items-center justify-between px-5 h-12 rounded-xl overflow-hidden" style={{ backgroundColor: "rgba(250,250,250,0.95)", border: "1px solid var(--border-color)", backdropFilter: "blur(12px)" }}>
                  <span className="font-mono text-[14px] font-medium text-[color:var(--text-primary)]">carlos.psd</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[14px] text-[color:var(--text-muted)]">EN</span>
                    <span className="text-[14px] font-medium px-4 py-1.5 rounded-full cursor-pointer transition-all duration-200 hover:opacity-80" style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}>Get in touch</span>
                    <span className="text-[14px] font-medium px-2 py-1.5 rounded-md cursor-pointer transition-all duration-200 hover:bg-black/[0.04] text-[color:var(--text-muted)]">☰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project card */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>Project Card</p>
                <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>hover state · 4:3 · scrim overlay</p>
              </div>
              <div className="w-56">
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: 12, backgroundColor: "var(--dark-surface)" }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)" }} />
                  <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.18)" }} />
                  <div className="absolute inset-x-0 top-0 p-5 flex items-start justify-between gap-2">
                    <Badge variant="outline" className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm">Brand Design</Badge>
                    <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>2022</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                    <h3 className="font-semibold text-[18px] leading-snug" style={{ color: "#fff", letterSpacing: "-0.02em" }}>Branding — Klavi</h3>
                    <p className="text-[13px] leading-snug line-clamp-2" style={{ color: "rgba(255,255,255,0.6)" }}>How to build a concept that differentiates a disruptive brand.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── EFFECTS ────────────────────────────────────────── */}
        {active === "Effects" && (
          <section className="py-16">
            <SubLabel>Shadows & Blur</SubLabel>
            <div className="flex flex-wrap gap-12 mb-14">
              <ShadowChip label="Navbar blur" note="blur(12px)" chipStyle={{ backdropFilter: "blur(12px)", boxShadow: "0 1px 0 var(--border-color)" }} />
              <ShadowChip label="Lightbox blur" note="blur(6px)" chipStyle={{ backdropFilter: "blur(6px)" }} />
              <ShadowChip label="shadow-xs" note="0 1px 2px rgba(0,0,0,0.08)" chipStyle={{ boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }} />
              <ShadowChip label="Purple glow" note="0 0 24px rgba(147,51,234,0.2)" chipStyle={{ boxShadow: "0 0 24px rgba(147,51,234,0.2)", border: "1px solid rgba(147,51,234,0.2)" }} />
            </div>

            <Divider />

            <div className="pt-12">
              <SubLabel>Motion</SubLabel>
              <Row label="Ease"><span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>[0.16, 1, 0.3, 1]</span></Row>
              <Row label="Duration"><span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>700ms – 900ms</span></Row>
              <Row label="Stagger"><span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>delay × 0.08 – 0.12</span></Row>
              <Row label="Entrance"><span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>opacity 0→1 · y +20px→0</span></Row>
              <Row label="Hover transition"><span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>200ms ease</span></Row>
            </div>
          </section>
        )}

        {/* Footer */}
        <Divider />
        <div className="pt-8 flex items-center justify-between">
          <span className="font-mono text-[14px]" style={{ color: "var(--text-muted)" }}>carlos.psd / styleguide</span>
          <a href="/" className="text-[14px] text-[color:var(--text-muted)] hover:text-[color:var(--accent)] transition-colors duration-200">
            ← Back to site
          </a>
        </div>
      </div>
    </main>
  )
}
