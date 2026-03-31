"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/* ─── helpers ─────────────────────────────────────────── */
function Divider() {
  return <hr style={{ borderColor: "#1a1a1a", borderTopWidth: 1, margin: "0" }} />
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[14px] uppercase tracking-[0.18em] font-medium mb-10"
      style={{ color: "rgba(168,85,247,0.7)" }}
    >
      {children}
    </h2>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-8 items-baseline py-5 border-b" style={{ borderColor: "#1a1a1a" }}>
      <span className="text-[14px] font-mono" style={{ color: "#444" }}>{label}</span>
      <div>{children}</div>
    </div>
  )
}

/* ─── color chip ──────────────────────────────────────── */
function ColorChip({
  hex,
  name,
  usage,
  border = false,
}: {
  hex: string
  name: string
  usage: string
  border?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        style={{
          backgroundColor: hex,
          width: 72,
          height: 72,
          borderRadius: 8,
          border: border ? "1px solid #333" : undefined,
        }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-mono" style={{ color: "#f0f0f0" }}>{name}</span>
        <span className="text-[14px] font-mono" style={{ color: "#555" }}>{hex}</span>
        <span className="text-[14px]" style={{ color: "#444" }}>{usage}</span>
      </div>
    </div>
  )
}

/* ─── radius chip ─────────────────────────────────────── */
function RadiusChip({ label, px, radius }: { label: string; px: string; radius: string }) {
  return (
    <div className="flex flex-col gap-3 items-start">
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: radius,
          backgroundColor: "#1a1a1a",
          border: "1px solid #2a2a2a",
        }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-mono" style={{ color: "#f0f0f0" }}>{label}</span>
        <span className="text-[14px] font-mono" style={{ color: "#555" }}>{px}</span>
      </div>
    </div>
  )
}

/* ─── spacing chip ────────────────────────────────────── */
function SpacingChip({ label, px, width }: { label: string; px: string; width: number }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div style={{ width, height: 32, backgroundColor: "#1f1f1f", border: "1px solid #2a2a2a", borderRadius: 4 }} />
      <span className="text-[14px] font-mono" style={{ color: "#555" }}>{label}</span>
      <span className="text-[14px] font-mono" style={{ color: "#333" }}>{px}</span>
    </div>
  )
}

/* ─── shadow chip ─────────────────────────────────────── */
function ShadowChip({ label, style, note }: { label: string; style: React.CSSProperties; note: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          backgroundColor: "#1a1a1a",
          ...style,
        }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px]" style={{ color: "#f0f0f0" }}>{label}</span>
        <span className="text-[14px] font-mono" style={{ color: "#444" }}>{note}</span>
      </div>
    </div>
  )
}

/* ─── page ────────────────────────────────────────────── */
export default function StyleguidePage() {
  return (
    <main style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "#f0f0f0" }}>
      <div className="max-w-[1100px] mx-auto px-8 py-24 md:py-32">

        {/* Header */}
        <div className="mb-20">
          <p className="text-[14px] font-mono mb-4" style={{ color: "#444" }}>internal / reference</p>
          <h1
            className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Design System
          </h1>
          <p className="text-[14px]" style={{ color: "#666" }}>
            Tokens, type scale, components and visual patterns for carlos.psd
          </p>
        </div>

        <Divider />

        {/* ── 1. TYPOGRAPHY ─────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>01 — Typography</SectionTitle>

          {/* meta row */}
          <div className="grid grid-cols-[180px_1fr_100px_100px_100px_120px] gap-4 pb-4 mb-2 border-b" style={{ borderColor: "#1f1f1f" }}>
            {["Role", "Specimen", "Size", "Line-h", "Weight", "Tracking"].map(h => (
              <span key={h} className="text-[14px] font-mono" style={{ color: "#333" }}>{h}</span>
            ))}
          </div>

          {[
            { role: "Display", sample: "Product Designer.", size: "clamp(2.5–5.5rem)", lh: "1.04", weight: "600", tracking: "−0.03em", cls: "text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.04]", ls: "-0.03em" },
            { role: "Heading 1", sample: "Let's work together.", size: "clamp(2–4rem)", lh: "1.05", weight: "600", tracking: "−0.03em", cls: "text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05]", ls: "-0.03em" },
            { role: "Heading 2", sample: "Selected Work", size: "2.5rem / 40px", lh: "1.1", weight: "600", tracking: "−0.025em", cls: "text-[2.5rem] font-semibold", ls: "-0.025em" },
            { role: "Heading 3", sample: "Design System at Scale", size: "1rem / 16px", lh: "1.4", weight: "600", tracking: "−0.02em", cls: "text-base font-semibold", ls: "-0.02em" },
            { role: "Body", sample: "Currently freelancing — helping startups and scale-ups craft intuitive digital products.", size: "14px", lh: "1.7", weight: "400", tracking: "−0.005em", cls: "text-[14px] leading-[1.7]", ls: "-0.005em" },
            { role: "Caption", sample: "Available for new projects · Florianópolis, BR", size: "14px", lh: "1.5", weight: "400", tracking: "default", cls: "text-[14px]", ls: "0" },
            { role: "Label", sample: "AVAILABLE FOR WORK", size: "14px", lh: "1", weight: "500", tracking: "0.18em", cls: "text-[14px] uppercase tracking-[0.18em] font-medium", ls: "0.18em" },
            { role: "Mono", sample: "carlos.psd / EN · PT", size: "14px", lh: "1", weight: "400", tracking: "default", cls: "font-mono text-[14px]", ls: "0" },
          ].map((row) => (
            <div
              key={row.role}
              className="grid grid-cols-[180px_1fr_100px_100px_100px_120px] gap-4 items-baseline py-5 border-b"
              style={{ borderColor: "#1a1a1a" }}
            >
              <span className="text-[14px] font-mono" style={{ color: "#444" }}>{row.role}</span>
              <span className={row.cls} style={{ color: "#f0f0f0", letterSpacing: row.ls, lineHeight: row.lh }}>
                {row.sample}
              </span>
              <span className="text-[14px] font-mono" style={{ color: "#555" }}>{row.size}</span>
              <span className="text-[14px] font-mono" style={{ color: "#555" }}>{row.lh}</span>
              <span className="text-[14px] font-mono" style={{ color: "#555" }}>{row.weight}</span>
              <span className="text-[14px] font-mono" style={{ color: "#555" }}>{row.tracking}</span>
            </div>
          ))}
        </section>

        <Divider />

        {/* ── 2. COLORS ─────────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>02 — Colors</SectionTitle>

          <p className="text-[14px] mb-8" style={{ color: "#555" }}>Neutral</p>
          <div className="flex flex-wrap gap-8 mb-14">
            <ColorChip hex="#0f0f0f" name="--text-primary" usage="Heading / Dark bg" />
            <ColorChip hex="#3d3d3d" name="--text-secondary" usage="Body" />
            <ColorChip hex="#999999" name="--text-muted" usage="Caption" />
            <ColorChip hex="#fafafa" name="--bg" usage="Page background" border />
            <ColorChip hex="#f0f0f0" name="--surface" usage="Surface / Title dark" border />
            <ColorChip hex="#e5e5e5" name="--border-color" usage="Border" border />
            <ColorChip hex="#1a1a1a" name="border-dark" usage="Border on dark" />
            <ColorChip hex="#666666" name="body-dark" usage="Body on dark" />
            <ColorChip hex="#444444" name="secondary-dark" usage="Secondary on dark" />
            <ColorChip hex="#080808" name="hero-bg" usage="Hero background" />
          </div>

          <p className="text-[14px] mb-8" style={{ color: "#555" }}>Highlight</p>
          <div className="flex flex-wrap gap-8">
            <ColorChip hex="#a855f7" name="purple-500" usage="Hover / Active" />
            <ColorChip hex="#c084fc" name="purple-400" usage="Hover on dark" />
            <ColorChip hex="#9333ea" name="purple-600" usage="Hover on light" />
            <ColorChip hex="#8a5cff" name="colorbends-purple" usage="Hero animation" />
            <ColorChip hex="#ff5c7a" name="colorbends-pink" usage="Hero animation" />
            <ColorChip hex="#00ffd1" name="colorbends-teal" usage="Hero animation" />
          </div>
        </section>

        <Divider />

        {/* ── 3. BORDER RADIUS ──────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>03 — Border Radius</SectionTitle>
          <p className="text-[14px] mb-10" style={{ color: "#555" }}>
            Base <code className="font-mono" style={{ color: "#666" }}>--radius: 0.45rem</code> (~7px). All values derived.
          </p>
          <div className="flex flex-wrap gap-10">
            <RadiusChip label="radius-sm" px="~4px" radius="4px" />
            <RadiusChip label="radius-md" px="~6px" radius="6px" />
            <RadiusChip label="radius-lg" px="~7px" radius="7px" />
            <RadiusChip label="radius-xl" px="~10px" radius="10px" />
            <RadiusChip label="radius-2xl" px="~13px" radius="13px" />
            <RadiusChip label="radius-3xl" px="~16px" radius="16px" />
            <RadiusChip label="rounded-xl" px="12px" radius="12px" />
            <RadiusChip label="explicit-8" px="8px" radius="8px" />
          </div>
        </section>

        <Divider />

        {/* ── 4. SPACING ────────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>04 — Spacing</SectionTitle>
          <p className="text-[14px] mb-10" style={{ color: "#555" }}>Core scale used across padding, gap and margin.</p>
          <div className="flex flex-wrap items-end gap-6">
            <SpacingChip label="4" px="16px" width={16} />
            <SpacingChip label="5" px="20px" width={20} />
            <SpacingChip label="6" px="24px" width={24} />
            <SpacingChip label="8" px="32px" width={32} />
            <SpacingChip label="10" px="40px" width={40} />
            <SpacingChip label="12" px="48px" width={48} />
            <SpacingChip label="14" px="56px" width={56} />
            <SpacingChip label="16" px="64px" width={64} />
            <SpacingChip label="24" px="96px" width={96} />
            <SpacingChip label="32" px="128px" width={128} />
          </div>

          <div className="mt-12 pt-8 border-t" style={{ borderColor: "#1a1a1a" }}>
            <p className="text-[14px] mb-6" style={{ color: "#555" }}>Container</p>
            <Row label="max-width">
              <span className="text-[14px] font-mono" style={{ color: "#f0f0f0" }}>1100px</span>
            </Row>
            <Row label="px (desktop)">
              <span className="text-[14px] font-mono" style={{ color: "#f0f0f0" }}>32px (px-8)</span>
            </Row>
            <Row label="px (mobile)">
              <span className="text-[14px] font-mono" style={{ color: "#f0f0f0" }}>24px (px-6)</span>
            </Row>
          </div>
        </section>

        <Divider />

        {/* ── 5. COMPONENTS ─────────────────────────────────── */}
        <section className="py-16">
          <SectionTitle>05 — Components</SectionTitle>

          {/* Buttons */}
          <div className="mb-14">
            <p className="text-[14px] mb-6" style={{ color: "#555" }}>Button</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center mt-4">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-14">
            <p className="text-[14px] mb-6" style={{ color: "#555" }}>Badge</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="ghost">Ghost</Badge>
            </div>
          </div>

          {/* Inline text links */}
          <div className="mb-14">
            <p className="text-[14px] mb-6" style={{ color: "#555" }}>Text links</p>
            <div className="flex flex-wrap gap-8 items-center">
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
              <a
                href="#"
                className="text-[14px] font-medium transition-colors duration-200 hover:text-purple-500"
                style={{ color: "#999" }}
              >
                About me →
              </a>
            </div>
          </div>

          {/* Project card specimen */}
          <div>
            <p className="text-[14px] mb-6" style={{ color: "#555" }}>Project Card</p>
            <div className="max-w-sm">
              <div className="flex flex-col gap-4">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/3", backgroundColor: "#1a1a1a", borderRadius: 12 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[14px]" style={{ color: "#2a2a2a" }}>cover image</span>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(147,51,234,0.08)" }}
                  >
                    <span className="text-[14px] font-medium tracking-widest uppercase" style={{ color: "rgba(147,51,234,0.8)" }}>
                      View →
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-1">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <span className="text-[14px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Fintech</span>
                      <span className="text-[14px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Product Design</span>
                    </div>
                    <span className="font-mono text-[14px]" style={{ color: "var(--text-muted)" }}>2024</span>
                  </div>
                  <h3
                    className="font-semibold text-base leading-snug"
                    style={{ color: "#0f0f0f", letterSpacing: "-0.02em" }}
                  >
                    AmFi — Tokenized Credit Platform
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "#999" }}>
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
          <div className="flex flex-wrap gap-12">
            <ShadowChip
              label="Navbar blur"
              note="backdrop-filter: blur(12px)"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.5)", backdropFilter: "blur(12px)" }}
            />
            <ShadowChip
              label="Mobile menu blur"
              note="backdrop-filter: blur(16px)"
              style={{ backdropFilter: "blur(16px)", backgroundColor: "rgba(8,8,8,0.97)" }}
            />
            <ShadowChip
              label="Hero overlay"
              note="rgba(0,0,0,0.55)"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", border: "1px solid #1f1f1f" }}
            />
            <ShadowChip
              label="shadow-xs"
              note="0 1px 2px rgba(0,0,0,0.5)"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
            />
            <ShadowChip
              label="Purple glow"
              note="0 0 24px rgba(147,51,234,0.25)"
              style={{ boxShadow: "0 0 24px rgba(147,51,234,0.25)", border: "1px solid rgba(147,51,234,0.2)" }}
            />
          </div>

          <div className="mt-14 pt-8 border-t" style={{ borderColor: "#1a1a1a" }}>
            <p className="text-[14px] mb-6" style={{ color: "#555" }}>Motion</p>
            <Row label="Ease">
              <span className="font-mono text-[14px]" style={{ color: "#f0f0f0" }}>[0.16, 1, 0.3, 1]</span>
            </Row>
            <Row label="Duration">
              <span className="font-mono text-[14px]" style={{ color: "#f0f0f0" }}>0.7s – 0.9s</span>
            </Row>
            <Row label="Stagger">
              <span className="font-mono text-[14px]" style={{ color: "#f0f0f0" }}>delay × 0.08 – 0.12</span>
            </Row>
            <Row label="Entrance">
              <span className="font-mono text-[14px]" style={{ color: "#f0f0f0" }}>opacity 0→1 · y +20px→0</span>
            </Row>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t flex items-center justify-between" style={{ borderColor: "#1a1a1a" }}>
          <span className="font-mono text-[14px]" style={{ color: "#333" }}>carlos.psd / design system</span>
          <a href="/" className="text-[14px] hover:text-purple-400 transition-colors" style={{ color: "#333" }}>
            ← Back to site
          </a>
        </div>
      </div>
    </main>
  )
}
