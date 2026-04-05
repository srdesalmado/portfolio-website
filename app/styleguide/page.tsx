"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/lib/projects"

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

function ColorChip({ varName, hex, usage, addBorder = false, dark = false }: {
  varName: string; hex: string; usage: string; addBorder?: boolean; dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <div style={{
        backgroundColor: `var(${varName})`,
        width: 80, height: 80, borderRadius: 8,
        border: addBorder ? "1px solid var(--border-color)" : undefined,
      }} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-mono" style={{ color: dark ? "var(--dark-text-primary)" : "var(--text-primary)" }}>{varName}</span>
        <span className="text-[14px] font-mono" style={{ color: dark ? "var(--dark-text-muted)" : "var(--text-muted)" }}>{hex}</span>
        <span className="text-[14px]" style={{ color: dark ? "var(--dark-text-muted)" : "var(--text-muted)" }}>{usage}</span>
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

function ShadowChip({ label, tokenName, chipStyle, note }: {
  label: string; tokenName?: string; chipStyle: React.CSSProperties; note: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div style={{ width: 80, height: 80, borderRadius: 8, backgroundColor: "var(--surface)", border: "1px solid var(--border-color)", ...chipStyle }} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>{label}</span>
        {tokenName && <span className="text-[14px] font-mono" style={{ color: "var(--accent)" }}>{tokenName}</span>}
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
        <div className="flex items-center gap-1 mb-14 p-1 w-fit rounded-full" style={{ backgroundColor: "var(--surface)" }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="text-[14px] font-medium px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                backgroundColor: active === tab ? "var(--bg)" : "transparent",
                color: active === tab ? "var(--text-primary)" : "var(--text-muted)",
                boxShadow: active === tab ? "var(--shadow-xs)" : undefined,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <Divider />

        {/* ── TYPOGRAPHY ─────────────────────────────────────── */}
        {active === "Typography" && (
          <section className="py-16">
            <div className="grid grid-cols-[200px_1fr_140px_60px_64px_160px] gap-4 pb-3 mb-1 border-b" style={{ borderColor: "var(--border-color)" }}>
              {["Role · used in", "Specimen", "Size token", "Line-h", "Weight", "Tracking"].map((h) => (
                <span key={h} className="text-badge font-mono" style={{ color: "var(--text-muted)" }}>{h}</span>
              ))}
            </div>
            {[
              { role: "Hero LG",  used: "Hero section · title",               sample: "Product Designer.",                                                      cls: "text-hero-lg font-semibold leading-hero tracking-tight-3",    size: "text-hero-lg",    lh: "1.04",                weight: "600", tracking: "tracking-tight-3"   },
              { role: "Hero SM",  used: "Hero title · mobile",                sample: "Product Designer.",                                                      cls: "text-hero-sm font-semibold leading-hero tracking-tight-3",    size: "text-hero-sm",    lh: "1.04",                weight: "600", tracking: "tracking-tight-3"   },
              { role: "Display",  used: "CTA · large section headings",       sample: "Let's work together.",                                                   cls: "text-display font-semibold leading-display tracking-tight-3", size: "text-display",    lh: "1.06",                weight: "600", tracking: "tracking-tight-3"   },
              { role: "H1",       used: "Section headings (About, Process)",  sample: "Let's work together.",                                                   cls: "text-h1 font-semibold leading-cta tracking-tight-25",         size: "text-h1",         lh: "1.05",                weight: "600", tracking: "tracking-tight-25"  },
              { role: "H2",       used: "Sub-headings · Featured Work",       sample: "Design System at Scale",                                                 cls: "text-h2 font-semibold leading-heading tracking-tight-2",      size: "text-h2",         lh: "1.1",                 weight: "600", tracking: "tracking-tight-2"   },
              { role: "Metric",   used: "Project card metrics",               sample: "40%",                                                                    cls: "text-metric font-semibold leading-hero tracking-tight-3",     size: "text-metric",     lh: "1.04",                weight: "600", tracking: "tracking-tight-3"   },
              { role: "Body",     used: "About section · long paragraphs",    sample: "Currently freelancing — helping startups craft intuitive digital products.", cls: "text-base leading-body",     size: "text-base",  lh: "leading-body · 1.75",    weight: "400", tracking: "—"                  },
              { role: "Body Alt", used: "Dark section copy",                  sample: "Currently freelancing — helping startups craft intuitive digital products.", cls: "text-base leading-body-alt", size: "text-base",  lh: "leading-body-alt · 1.7", weight: "400", tracking: "—"                  },
              { role: "Badge",    used: "Tags · captions · counter text",     sample: "Available for projects · Florianópolis, BR",                             cls: "text-badge",                                                  size: "text-badge",      lh: "1.5",                 weight: "400", tracking: "—"                  },
              { role: "Label",    used: "Section category labels",            sample: "AVAILABLE FOR WORK",                                                     cls: "text-badge uppercase tracking-label font-medium",             size: "text-badge",      lh: "1",                   weight: "500", tracking: "tracking-label"    },
              { role: "Nav",      used: "Navbar · footer links",              sample: "Work  About  Contact",                                                   cls: "text-badge font-medium",                                      size: "text-badge",      lh: "1",                   weight: "500", tracking: "0.01em"             },
              { role: "Mono",     used: "Logo mark · code references",        sample: "carlos.psd / EN · PT",                                                   cls: "font-mono text-badge",                                        size: "font-mono",       lh: "1",                   weight: "500", tracking: "—"                  },
            ].map((row) => (
              <div key={row.role} className="grid grid-cols-[200px_1fr_140px_60px_64px_160px] gap-4 items-start py-5 border-b" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <span className="text-badge font-mono block" style={{ color: "var(--text-muted)" }}>{row.role}</span>
                  <span className="text-badge block mt-0.5 opacity-60" style={{ color: "var(--text-muted)" }}>{row.used}</span>
                </div>
                <span className={row.cls} style={{ color: "var(--text-primary)" }}>{row.sample}</span>
                <span className="text-badge font-mono" style={{ color: "var(--text-secondary)" }}>{row.size}</span>
                <span className="text-badge font-mono" style={{ color: "var(--text-secondary)" }}>{row.lh}</span>
                <span className="text-badge font-mono" style={{ color: "var(--text-secondary)" }}>{row.weight}</span>
                <span className="text-badge font-mono" style={{ color: "var(--text-secondary)" }}>{row.tracking}</span>
              </div>
            ))}
          </section>
        )}

        {/* ── COLORS ─────────────────────────────────────────── */}
        {active === "Colors" && (
          <section className="py-16">
            <SubLabel>Neutral — Light context</SubLabel>
            <div className="flex flex-wrap gap-8 mb-14">
              <ColorChip varName="--bg" hex="#fafafa" usage="Page background" addBorder />
              <ColorChip varName="--surface" hex="#f0f0f0" usage="Surface" addBorder />
              <ColorChip varName="--border-color" hex="#e5e5e5" usage="Border" addBorder />
              <ColorChip varName="--text-primary" hex="#0f0f0f" usage="Heading" />
              <ColorChip varName="--text-secondary" hex="#3d3d3d" usage="Body" />
              <ColorChip varName="--text-muted" hex="#666666" usage="Caption" />
            </div>

            <SubLabel>Dark sections — palette</SubLabel>
            <div className="flex flex-wrap gap-8 p-8 mb-14" style={{ backgroundColor: "var(--dark-bg)", borderRadius: 12, border: "1px solid var(--dark-border)" }}>
              <ColorChip varName="--dark-bg" hex="#080808" usage="Hero background" dark />
              <ColorChip varName="--dark-section-bg" hex="#0f0f0f" usage="About / CTA bg" dark />
              <ColorChip varName="--dark-surface" hex="#1a1a1a" usage="Surface" dark />
              <ColorChip varName="--dark-border" hex="#2a2a2a" usage="Border" dark />
              <ColorChip varName="--dark-text-primary" hex="#f0f0f0" usage="Heading" dark />
              <ColorChip varName="--dark-text-secondary" hex="#c4c4c4" usage="Body" dark />
              <ColorChip varName="--dark-text-muted" hex="#999999" usage="Caption" dark />
            </div>

            <SubLabel>Accent</SubLabel>
            <div className="flex flex-wrap gap-8">
              <ColorChip varName="--accent" hex="#9333ea" usage="Hover / highlight — light bg" />
              <ColorChip varName="--accent-on-dark" hex="#c084fc" usage="Hover / highlight — dark bg" />
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
              <Row label="max-width-page">
                <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>1100px</span>
                <span className="text-badge ml-4 opacity-60" style={{ color: "var(--text-muted)" }}>All homepage sections</span>
              </Row>
              <Row label="max-width-case">
                <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>1200px</span>
                <span className="text-badge ml-4 opacity-60" style={{ color: "var(--text-muted)" }}>Case study pages</span>
              </Row>
              <Row label="px (desktop)">
                <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>32px</span>
                <span className="text-badge ml-4 opacity-60" style={{ color: "var(--text-muted)" }}>px-8 · all sections</span>
              </Row>
              <Row label="px (mobile)">
                <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>24px</span>
                <span className="text-badge ml-4 opacity-60" style={{ color: "var(--text-muted)" }}>px-6 · responsive</span>
              </Row>
              <Row label="Section py">
                <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>64px mobile / 80px desktop</span>
                <span className="text-badge ml-4 opacity-60" style={{ color: "var(--text-muted)" }}>All homepage sections</span>
              </Row>
            </div>

            <div className="pt-12">
              <SubLabel>Semantic tokens</SubLabel>
              <Row label="--spacing-metrics">
                <div className="flex items-center gap-4">
                  <div style={{ width: 48, height: 20, backgroundColor: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: 4 }} />
                  <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>3rem · 48px</span>
                  <span className="text-badge opacity-60" style={{ color: "var(--text-muted)" }}>Metrics row spacing · project cards</span>
                </div>
              </Row>
              <Row label="--height-hairline">
                <div className="flex items-center gap-4">
                  <div style={{ width: 80, height: "1.5px", backgroundColor: "var(--border-color)" }} />
                  <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>1.5px</span>
                  <span className="text-badge opacity-60" style={{ color: "var(--text-muted)" }}>Section dividers</span>
                </div>
              </Row>
              <Row label="--hero-min-height">
                <span className="text-badge font-mono" style={{ color: "var(--text-primary)" }}>600px</span>
                <span className="text-badge ml-4 opacity-60" style={{ color: "var(--text-muted)" }}>Hero component minimum height</span>
              </Row>
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
                <button
                  className="text-[14px] font-medium px-5 py-2 rounded-full transition-all duration-200 hover:opacity-80"
                  style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
                >
                  Get in touch
                </button>
              </div>
            </div>

            {/* Text links */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>Text links</p>
                <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>underline · hover:accent — light bg</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-8 items-center">
                  <a href="#" className="text-[14px] font-medium text-[color:var(--text-primary)] border-b border-[color:var(--border-color)] pb-px transition-colors duration-200 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]">
                    Get in touch →
                  </a>
                  <a href="#" className="text-[14px] text-[color:var(--text-muted)] transition-colors duration-200 hover:text-[color:var(--accent)]">
                    ← Work
                  </a>
                </div>
                <div className="flex flex-wrap gap-8 items-center px-6 py-4 rounded-xl" style={{ backgroundColor: "var(--dark-bg)", border: "1px solid var(--dark-border)" }}>
                  <a href="#" className="text-[14px] font-medium text-[color:var(--dark-text-primary)] border-b border-[color:var(--dark-border)] pb-px transition-colors duration-200 hover:text-[color:var(--accent-on-dark)] hover:border-[color:var(--accent-on-dark)]">
                    Get in touch →
                  </a>
                  <a href="#" className="text-[14px] text-[color:var(--dark-text-muted)] transition-colors duration-200 hover:text-[color:var(--accent-on-dark)]">
                    About me →
                  </a>
                  <span className="text-[12px] ml-auto font-mono" style={{ color: "var(--dark-border)" }}>dark bg</span>
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

            {/* Navbar — scrolled state snapshot */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>Navbar</p>
                <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>sticky · blur(--blur-navbar) · scrolled state</p>
              </div>
              <div
                className="flex items-center justify-between px-6 h-14 rounded-xl overflow-hidden"
                style={{
                  backgroundColor: "var(--navbar-bg)",
                  border: "1px solid var(--border-color)",
                  backdropFilter: `blur(var(--blur-navbar))`,
                }}
              >
                <span className="font-mono text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>carlos.psd</span>
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-medium px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)" }}>Work</span>
                  <span className="text-[14px] font-medium px-3 py-1.5 rounded-full bg-black/[0.06]" style={{ color: "var(--text-primary)" }}>About</span>
                  <span className="text-[14px] font-medium px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)" }}>Contact</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-[14px] font-mono">
                    <span className="px-2 py-1" style={{ color: "var(--text-primary)" }}>EN</span>
                    <span style={{ color: "var(--border-color)" }}>·</span>
                    <span className="px-2 py-1" style={{ color: "var(--text-muted)" }}>PT</span>
                  </div>
                  <span className="text-[14px] font-medium px-4 py-1.5 rounded-full" style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}>Get in touch</span>
                </div>
              </div>
            </div>

            {/* Project card — real component */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Project Card</p>
                <p className="text-badge" style={{ color: "var(--text-muted)" }}>hover state · aspect-card · gradient-card-overlay scrim · used in FeaturedWork</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ProjectCard project={projects[0]} />
                <ProjectCard project={projects[1] ?? projects[0]} />
              </div>
            </div>

            {/* Related Projects card variant */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div>
                <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Related Projects Card</p>
                <p className="text-badge" style={{ color: "var(--text-muted)" }}>hover state · title + description centered · overlay-card-bottom scrim · used in RelatedProjects section</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[projects[0], projects[1] ?? projects[0]].map((p) => (
                  <div key={p.slug} className="block group">
                    <div className="relative w-full overflow-hidden aspect-card rounded-xl" style={{ backgroundColor: "var(--dark-surface)" }}>
                      {p.coverImage && <img src={p.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-card-overlay)" }} />
                        <div className="absolute inset-0" style={{ backgroundColor: "var(--overlay-card-bottom)" }} />
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 gap-2 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="font-semibold text-lg leading-snug tracking-tight-2 text-center" style={{ color: "var(--dark-text-primary)" }}>{p.title}</p>
                        <p className="text-badge leading-snug line-clamp-2 text-center" style={{ color: "var(--dark-text-secondary)" }}>{p.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lightbox */}
            <div className="grid grid-cols-[200px_1fr] gap-12 py-10">
              <div>
                <p className="text-badge font-medium mb-1" style={{ color: "var(--text-primary)" }}>Lightbox</p>
                <p className="text-badge" style={{ color: "var(--text-muted)" }}>modal · overlay-backdrop · blur-lightbox · used in case study galleries</p>
              </div>
              <div className="relative rounded-xl overflow-hidden h-56 flex items-center justify-center" style={{ backgroundColor: "var(--overlay-backdrop)" }}>
                <div className="w-3/5 h-36 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--dark-surface)", border: "1px solid var(--dark-border)" }}>
                  <span className="text-badge font-mono text-center" style={{ color: "var(--dark-text-muted)" }}>image<br />max-w-lightbox · max-h-lightbox</span>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-badge" style={{ backgroundColor: "var(--dark-surface)", color: "var(--dark-text-primary)", border: "1px solid var(--dark-border)" }}>
                  ✕
                </button>
                <div className="absolute bottom-2 left-3">
                  <span className="text-badge font-mono" style={{ color: "var(--dark-border)" }}>--overlay-backdrop · rgba(0,0,0,0.85) · backdrop blur(--blur-lightbox)</span>
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
              <ShadowChip
                label="Navbar blur"
                tokenName="--blur-navbar"
                note="blur(12px)"
                chipStyle={{ backdropFilter: "blur(var(--blur-navbar))", boxShadow: "0 1px 0 var(--border-color)" }}
              />
              <ShadowChip
                label="Lightbox blur"
                tokenName="--blur-lightbox"
                note="blur(6px)"
                chipStyle={{ backdropFilter: "blur(var(--blur-lightbox))" }}
              />
              <ShadowChip
                label="shadow-xs"
                tokenName="--shadow-xs"
                note="0 1px 2px rgba(0,0,0,0.08)"
                chipStyle={{ boxShadow: "var(--shadow-xs)" }}
              />
              <ShadowChip
                label="Accent glow"
                tokenName="--shadow-accent-glow"
                note="0 0 24px accent/20"
                chipStyle={{ boxShadow: "var(--shadow-accent-glow)", border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)" }}
              />
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
          <a href="/" className="text-[14px] transition-colors duration-200 text-[color:var(--text-muted)] hover:text-[color:var(--accent)]">
            ← Back to site
          </a>
        </div>

      </div>
    </main>
  )
}
