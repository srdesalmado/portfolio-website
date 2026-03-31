export default function Footer() {
  return (
    <footer
      className="py-6"
      style={{ borderTop: "1px solid var(--dark-border)", backgroundColor: "var(--dark-section-bg)" }}
    >
      <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-between">
        <span className="text-[14px] font-mono" style={{ color: "var(--dark-text-muted)" }}>
          © {new Date().getFullYear()} carlos.psd
        </span>
        <span className="text-[14px] font-mono" style={{ color: "var(--dark-text-muted)" }}>
          Made with intention
        </span>
      </div>
    </footer>
  )
}
