"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

/* ─── helpers ─────────────────────────────────────────── */
function Divider() {
  return <hr style={{ borderColor: "var(--border-color)", borderTopWidth: 1, margin: "0" }} />
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[14px] uppercase tracking-[0.18em] font-medium mb-10"
      style={{ color: "rgba(147,51,234,0.7)" }}
    >
      {children}
    </h2>
  )
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
    <div
      className="grid grid-cols-[180px_1fr] gap-8 items-baseline py-5 border-b"
      style={{ borderColor: "var(--border-color)" }}
    >
      <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{label}</span>
      <div>{children}</div>
    </div>
  )
}

/* ─── color chip ──────────────────────────────────────── */
function ColorChip({
  hex,
  name,
  usage,
  dark = false,
}: {
  hex: string
  name: string
  usage: string
  dark?: boolean
}) {
  const isLight = parseInt(hex.replace("#", ""), 16) > 0xaaaaaa
  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          backgroundColor: hex,
          width: 80,
          height: 80,
          borderRadius: 8,
          border: isLight ? "1px solid var(--border-color)" : undefined,
        }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-mono" style={{ color: dark ? "#f0f0f0" : "var(--text-primary)" }}>
          {name}
        </span>
        <span className="text-[14px] font-mono" style={{ color: dark ? "#999999" : "var(--text-muted)" }}>
          {hex}
        </span>
        <span className="text-[14px]" style={{ color: dark ? "#666666" : "var(--text-muted)" }}>
          {usage}
        </span>
      </div>
    </div>
  )
}

/* ─── radius chip ─────────────────────────────────────── */
function RadiusChip({ label, px }: { label: string; px: number }) {
  const isFull = px >= 500
  return (
    <div className="flex flex-col gap-3 items-start">
      <div
        style={{
          width: isFull ? 96 : 64,
          height: 64,
          borderRadius: px,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-color)",
        }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px]" style={{ color: "var(--text-primary)" }}>{label}</span>
        <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>
          {isFull ? "500px" : `${px}px`}
        </span>
      </div>
    </div>
  )
}

/* ─── spacing chip ────────────────────────────────────── */
function SpacingChip({ label, px }: { label: string; px: number }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div
        style={{
          width: px,
          height: 32,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: 4,
          minWidth: 4,
        }}
      />
      <span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>{label}</span>
      <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{px}px</span>
    </div>
  )
}

/* ─── shadow chip ─────────────────────────────────────── */
function ShadowChip({ label, chipStyle, note }: { label: string; chipStyle: React.CSSProperties; note: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border-color)",
          ...chipStyle,
        }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>{label}</span>
        <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{note}</span>
      </div>
    </div>
  )
}

/* ─── page ────────────────────────────────────────────── */
export default function StyleguidePage() {
  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <div className="max-w-[1100px] mx-auto px-8 py-24 md:py-32">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[14px] font-mono mb-4" style={{ color: "var(--text-muted)" }}>
            internal / reference
          </p>
          <h1
            className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
          >
            Styleguide
          </h1>
          <p className="text-[14px]" style={{ color: "var(--text-muted)" }}>
            Tokens, type scale, components and visual patterns for carlos.psd
          </p>
        </div>

        <Divider />

        {/* ── 1. TYPOGRAPHY ─────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>01 — Typography</SectionTitle>

          {/* header row */}
          <div
            className="grid grid-cols-[160px_1fr_80px_60px_64px_120px] gap-4 pb-3 mb-1 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            {["Role", "Specimen", "Size", "Line-h", "Weight", "Tracking"].map((h) => (
              <span key={h} className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{h}</span>
            ))}
          </div>

          {[
            {
              role: "Display",
              sample: "Product Designer.",
              size: "80px",
              lh: "1.04",
              weight: "600",
              tracking: "−0.03em",
              cls: "text-[80px] font-semibold leading-[1.04]",
              ls: "-0.03em",
            },
            {
              role: "Heading",
              sample: "Let's work together.",
              size: "40px",
              lh: "1.05",
              weight: "600",
              tracking: "−0.025em",
              cls: "text-[40px] font-semibold leading-[1.05]",
              ls: "-0.025em",
            },
            {
              role: "Heading 3",
              sample: "Design System at Scale",
              size: "16px",
              lh: "1.4",
              weight: "600",
              tracking: "−0.02em",
              cls: "text-[16px] font-semibold",
              ls: "-0.02em",
            },
            {
              role: "Body",
              sample: "Currently freelancing — helping startups craft intuitive digital products.",
              size: "16px",
              lh: "1.7",
              weight: "400",
              tracking: "0.005em",
              cls: "text-[16px] leading-[1.7]",
              ls: "0.005em",
            },
            {
              role: "Caption",
              sample: "Available for projects · Florianópolis, BR",
              size: "14px",
              lh: "1.5",
              weight: "400",
              tracking: "0",
              cls: "text-[14px]",
              ls: "0",
            },
            {
              role: "Label",
              sample: "AVAILABLE FOR WORK",
              size: "14px",
              lh: "1",
              weight: "500",
              tracking: "0.18em",
              cls: "text-[14px] uppercase tracking-[0.18em] font-medium",
              ls: "0.18em",
            },
            {
              role: "Mono",
              sample: "carlos.psd / EN · PT",
              size: "14px",
              lh: "1",
              weight: "400",
              tracking: "0",
              cls: "font-mono text-[14px]",
              ls: "0",
            },
          ].map((row) => (
            <div
              key={row.role}
              className="grid grid-cols-[160px_1fr_80px_60px_64px_120px] gap-4 items-baseline py-5 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>{row.role}</span>
              <span className={row.cls} style={{ color: "var(--text-primary)", letterSpacing: row.ls, lineHeight: row.lh }}>
                {row.sample}
              </span>
              <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.size}</span>
              <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.lh}</span>
              <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.weight}</span>
              <span className="text-[14px] font-mono" style={{ color: "var(--text-secondary)" }}>{row.tracking}</span>
            </div>
          ))}
        </section>

        <Divider />

        {/* ── 2. COLORS ─────────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>02 — Colors</SectionTitle>

          {/* Neutral — Light */}
          <SubLabel>Neutral — Light context</SubLabel>
          <div className="flex flex-wrap gap-8 mb-14">
            <ColorChip hex="#fafafa" name="--bg" usage="Page background" />
            <ColorChip hex="#f0f0f0" name="--surface" usage="Surface" />
            <ColorChip hex="#e5e5e5" name="--border-color" usage="Border" />
            <ColorChip hex="#0f0f0f" name="--text-primary" usage="Heading" />
            <ColorChip hex="#3d3d3d" name="--text-secondary" usage="Body" />
            <ColorChip hex="#666666" name="--text-muted" usage="Caption" />
          </div>

          {/* Dark sections */}
          <SubLabel>Dark sections — palette</SubLabel>
          <div
            className="flex flex-wrap gap-8 p-8 mb-14"
            style={{ backgroundColor: "#080808", borderRadius: 12, border: "1px solid #1a1a1a" }}
          >
            <ColorChip hex="#080808" name="--dark-bg" usage="Hero background" dark />
            <ColorChip hex="#0f0f0f" name="--dark-section-bg" usage="Dark sections" dark />
            <ColorChip hex="#1a1a1a" name="--dark-surface" usage="Surface" dark />
            <ColorChip hex="#2a2a2a" name="--dark-border" usage="Border" dark />
            <ColorChip hex="#f0f0f0" name="--dark-text-primary" usage="Heading" dark />
            <ColorChip hex="#c4c4c4" name="--dark-text-secondary" usage="Body" dark />
            <ColorChip hex="#999999" name="--dark-text-muted" usage="Caption" dark />
          </div>

          {/* Highlight */}
          <SubLabel>Highlight — Accent</SubLabel>
          <div className="flex flex-wrap gap-8 mb-14">
            <ColorChip hex="#9333ea" name="--accent" usage="Primary accent (light)" />
            <ColorChip hex="#a855f7" name="--accent-on-dark" usage="Accent on dark" />
            <ColorChip hex="#c084fc" name="purple-400" usage="Hover on dark" />
          </div>

          {/* Brand animation */}
          <SubLabel>Highlight — Hero animation</SubLabel>
          <div className="flex flex-wrap gap-8">
            <ColorChip hex="#8a5cff" name="colorbends-purple" usage="ColorBends" />
            <ColorChip hex="#ff5c7a" name="colorbends-pink" usage="ColorBends" />
            <ColorChip hex="#00ffd1" name="colorbends-teal" usage="ColorBends" />
          </div>
        </section>

        <Divider />

        {/* ── 3. BORDER RADIUS ──────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>03 — Border Radius</SectionTitle>
          <div className="flex flex-wrap gap-10">
            <RadiusChip label="sm" px={4} />
            <RadiusChip label="md" px={8} />
            <RadiusChip label="lg" px={12} />
            <RadiusChip label="xl" px={16} />
            <RadiusChip label="full" px={500} />
          </div>
        </section>

        <Divider />

        {/* ── 4. SPACING ────────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>04 — Spacing</SectionTitle>
          <div className="flex flex-wrap items-end gap-6 mb-12">
            <SpacingChip label="1" px={4} />
            <SpacingChip label="2" px={8} />
            <SpacingChip label="3" px={12} />
            <SpacingChip label="4" px={16} />
            <SpacingChip label="5" px={20} />
            <SpacingChip label="6" px={24} />
            <SpacingChip label="8" px={32} />
            <SpacingChip label="10" px={40} />
            <SpacingChip label="12" px={48} />
            <SpacingChip label="14" px={56} />
            <SpacingChip label="16" px={64} />
            <SpacingChip label="24" px={96} />
            <SpacingChip label="32" px={128} />
          </div>

          <div className="pt-8 border-t" style={{ borderColor: "var(--border-color)" }}>
            <SubLabel>Container</SubLabel>
            <Row label="max-width">
              <span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>1100px</span>
            </Row>
            <Row label="px (desktop)">
              <span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>32px</span>
            </Row>
            <Row label="px (mobile)">
              <span className="text-[14px] font-mono" style={{ color: "var(--text-primary)" }}>24px</span>
            </Row>
          </div>
        </section>

        <Divider />

        {/* ── 5. COMPONENTS ─────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>05 — Components</SectionTitle>

          {/* Buttons */}
          <div className="mb-14">
            <SubLabel>Button — variants</SubLabel>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-14">
            <SubLabel>Badge</SubLabel>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="ghost">Ghost</Badge>
            </div>
          </div>

          {/* Navbar */}
          <div className="mb-14">
            <SubLabel>Navbar — scrolled (light) state</SubLabel>
            <div
              className="flex items-center justify-between px-6 h-14 rounded-lg mb-4"
              style={{
                backgroundColor: "rgba(250,250,250,0.92)",
                border: "1px solid var(--border-color)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="font-mono text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
                carlos.psd
              </span>
              <div className="flex items-center gap-8">
                {["Work", "About", "Contact"].map((l) => (
                  <span key={l} className="text-[14px]" style={{ color: "var(--text-muted)" }}>{l}</span>
                ))}
                <span className="text-[14px] font-mono" style={{ color: "var(--text-muted)" }}>EN · PT</span>
              </div>
            </div>

            <SubLabel>Navbar — transparent (dark / on-hero) state</SubLabel>
            <div
              className="flex items-center justify-between px-6 h-14 rounded-lg"
              style={{ backgroundColor: "var(--dark-bg)", border: "1px solid var(--dark-border)" }}
            >
              <span className="font-mono text-[14px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                carlos.psd
              </span>
              <div className="flex items-center gap-8">
                {["Work", "About", "Contact"].map((l) => (
                  <span key={l} className="text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</span>
                ))}
                <span className="text-[14px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>EN · PT</span>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="mb-14">
            <SubLabel>Card</SubLabel>
            <div className="max-w-sm">
              <Card>
                <CardHeader>
                  <CardTitle>Card title</CardTitle>
                  <CardDescription>Supporting description text goes here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    This is the card body content area. Use it for any supporting information.
                  </p>
                </CardContent>
                <CardFooter className="gap-3">
                  <Button variant="default">Confirm</Button>
                  <Button variant="ghost">Cancel</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Text links */}
          <div className="mb-14">
            <SubLabel>Text links — light context</SubLabel>
            <div className="flex flex-wrap gap-8 items-center mb-8">
              <a
                href="#"
                className="text-[14px] font-medium border-b pb-px transition-colors duration-200 hover:text-purple-600 hover:border-purple-600"
                style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}
              >
                Get in touch →
              </a>
              <a
                href="#"
                className="text-[14px] transition-colors duration-200 hover:text-purple-600"
                style={{ color: "var(--text-muted)" }}
              >
                View all work →
              </a>
              <a
                href="#"
                className="text-[14px] font-medium transition-colors duration-200 hover:text-purple-600"
                style={{ color: "var(--text-secondary)" }}
              >
                About me →
              </a>
            </div>

            <SubLabel>Text links — dark context</SubLabel>
            <div
              className="flex flex-wrap gap-8 items-center p-8"
              style={{ backgroundColor: "#080808", borderRadius: 12, border: "1px solid #2a2a2a" }}
            >
              <a
                href="#"
                className="text-[14px] font-medium border-b pb-px transition-colors duration-200 hover:text-purple-400 hover:border-purple-400"
                style={{ color: "#f0f0f0", borderColor: "#2a2a2a" }}
              >
                Get in touch →
              </a>
              <a
                href="#"
                className="text-[14px] transition-colors duration-200 hover:text-purple-400"
                style={{ color: "#c4c4c4" }}
              >
                View all work →
              </a>
            </div>
          </div>

          {/* Project card specimen */}
          <div>
            <SubLabel>Project Card — hover state shown</SubLabel>
            <div className="max-w-sm">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4/3", borderRadius: 12, backgroundColor: "var(--dark-surface)" }}
              >
                {/* Placeholder label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[14px]" style={{ color: "var(--dark-border)" }}>
                    cover image
                  </span>
                </div>
                {/* Base scrim */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
                  }}
                />
                {/* Extra hover overlay */}
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.38)" }} />
                {/* Info overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3">
                  {/* Badges (hover-revealed) */}
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm"
                    >
                      Fintech
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/80 bg-white/10 backdrop-blur-sm"
                    >
                      Product Design
                    </Badge>
                  </div>
                  {/* Title + year */}
                  <div className="flex items-end justify-between gap-4">
                    <h3
                      className="font-semibold text-[18px] leading-snug"
                      style={{ color: "#ffffff", letterSpacing: "-0.02em" }}
                    >
                      AmFi — Tokenized Credit Platform
                    </h3>
                    <span
                      className="font-mono text-[14px] shrink-0 pb-0.5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      2024
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 6. SHADOWS & EFFECTS ──────────────────────────── */}
        <section className="py-16">
          <SectionTitle>06 — Shadows & Effects</SectionTitle>
          <div className="flex flex-wrap gap-12 mb-14">
            <ShadowChip
              label="Navbar blur"
              note="blur(12px)"
              chipStyle={{ backdropFilter: "blur(12px)", boxShadow: "0 1px 0 var(--border-color)" }}
            />
            <ShadowChip
              label="Mobile blur"
              note="blur(16px)"
              chipStyle={{ backdropFilter: "blur(16px)" }}
            />
            <ShadowChip
              label="shadow-xs"
              note="0 1px 2px rgba(0,0,0,0.08)"
              chipStyle={{ boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}
            />
            <ShadowChip
              label="Purple glow"
              note="0 0 24px rgba(147,51,234,0.2)"
              chipStyle={{ boxShadow: "0 0 24px rgba(147,51,234,0.2)", border: "1px solid rgba(147,51,234,0.2)" }}
            />
          </div>

          <SubLabel>Motion</SubLabel>
          <Row label="Ease">
            <span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>[0.16, 1, 0.3, 1]</span>
          </Row>
          <Row label="Duration">
            <span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>700ms – 900ms</span>
          </Row>
          <Row label="Stagger">
            <span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>delay × 0.08 – 0.12</span>
          </Row>
          <Row label="Entrance">
            <span className="font-mono text-[14px]" style={{ color: "var(--text-primary)" }}>
              opacity 0→1 · y +20px→0
            </span>
          </Row>
        </section>

        {/* Footer */}
        <div
          className="pt-8 border-t flex items-center justify-between"
          style={{ borderColor: "var(--border-color)" }}
        >
          <span className="font-mono text-[14px]" style={{ color: "var(--text-muted)" }}>
            carlos.psd / styleguide
          </span>
          <a
            href="/"
            className="text-[14px] transition-colors hover:text-purple-600"
            style={{ color: "var(--text-muted)" }}
          >
            ← Back to site
          </a>
        </div>
      </div>
    </main>
  )
}
