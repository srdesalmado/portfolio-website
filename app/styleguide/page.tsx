"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
        <span className="text-[14px] font-mono" style={{ color: dark ? "#555" : "var(--text-muted)" }}>
          {hex}
        </span>
        <span className="text-[14px]" style={{ color: dark ? "#444" : "var(--text-muted)" }}>
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
            Design System
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
              size: "40–88px",
              lh: "1.04",
              weight: "600",
              tracking: "−0.03em",
              cls: "text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.04]",
              ls: "-0.03em",
            },
            {
              role: "Heading 1",
              sample: "Let's work together.",
              size: "32–64px",
              lh: "1.05",
              weight: "600",
              tracking: "−0.03em",
              cls: "text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05]",
              ls: "-0.03em",
            },
            {
              role: "Heading 2",
              sample: "Selected Work",
              size: "40px",
              lh: "1.1",
              weight: "600",
              tracking: "−0.025em",
              cls: "text-[40px] font-semibold",
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
              size: "14px",
              lh: "1.7",
              weight: "400",
              tracking: "−0.005em",
              cls: "text-[14px] leading-[1.7]",
              ls: "-0.005em",
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
            <ColorChip hex="#999999" name="--text-muted" usage="Caption" />
          </div>

          {/* Neutral — Dark */}
          <SubLabel>Neutral — Dark context</SubLabel>
          <div
            className="flex flex-wrap gap-8 p-8 mb-14"
            style={{ backgroundColor: "#080808", borderRadius: 12, border: "1px solid #1a1a1a" }}
          >
            <ColorChip hex="#080808" name="--bg" usage="Page background" dark />
            <ColorChip hex="#1a1a1a" name="--surface" usage="Surface" dark />
            <ColorChip hex="#2a2a2a" name="--border-color" usage="Border" dark />
            <ColorChip hex="#f0f0f0" name="--text-primary" usage="Heading" dark />
            <ColorChip hex="#666666" name="--text-secondary" usage="Body" dark />
            <ColorChip hex="#444444" name="--text-muted" usage="Caption" dark />
          </div>

          {/* Highlight */}
          <SubLabel>Highlight — Accent</SubLabel>
          <div className="flex flex-wrap gap-8 mb-14">
            <ColorChip hex="#a855f7" name="purple-500" usage="Hover / Active" />
            <ColorChip hex="#c084fc" name="purple-400" usage="Hover on dark" />
            <ColorChip hex="#9333ea" name="purple-600" usage="Hover on light" />
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
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <SubLabel>Button — sizes</SubLabel>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
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
              style={{ backgroundColor: "#0f0f0f", borderRadius: 12, border: "1px solid #1a1a1a" }}
            >
              <a
                href="#"
                className="text-[14px] font-medium border-b pb-px transition-colors duration-200 hover:text-purple-400 hover:border-purple-400"
                style={{ color: "#f0f0f0", borderColor: "#333" }}
              >
                Get in touch →
              </a>
              <a
                href="#"
                className="text-[14px] transition-colors duration-200 hover:text-purple-400"
                style={{ color: "#666" }}
              >
                View all work →
              </a>
            </div>
          </div>

          {/* Project card specimen */}
          <div>
            <SubLabel>Project Card</SubLabel>
            <div className="max-w-sm">
              <div className="flex flex-col gap-4">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/3", backgroundColor: "var(--surface)", borderRadius: 12 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[14px]" style={{ color: "var(--border-color)" }}>
                      cover image
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(147,51,234,0.06)" }}
                  >
                    <span
                      className="text-[14px] font-medium tracking-widest uppercase"
                      style={{ color: "rgba(147,51,234,0.8)" }}
                    >
                      View →
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-1">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <span className="text-[14px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                        Fintech
                      </span>
                      <span className="text-[14px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                        Product Design
                      </span>
                    </div>
                    <span className="font-mono text-[14px]" style={{ color: "var(--text-muted)" }}>2024</span>
                  </div>
                  <h3
                    className="font-semibold text-[16px] leading-snug hover:text-purple-600 transition-colors"
                    style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
                  >
                    AmFi — Tokenized Credit Platform
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Redesigned the core investment flow for a Brazilian fintech tokenizing private credit assets.
                  </p>
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
            carlos.psd / design system
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
