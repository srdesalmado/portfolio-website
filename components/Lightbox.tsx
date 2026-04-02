"use client"

import { useEffect, useRef } from "react"

export default function Lightbox({ src, alt, onClose }: { src: string; alt?: string; onClose: () => void }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const didDragRef = useRef(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    let scale = 1
    let translateX = 0
    let translateY = 0
    let dragging = false
    let startX = 0
    let startY = 0

    const applyTransform = () => {
      el.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scale = Math.min(5, Math.max(1, scale - e.deltaY * 0.005))
      if (scale === 1) { translateX = 0; translateY = 0 }
      applyTransform()
      el.style.cursor = scale > 1 ? "grab" : "default"
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (scale <= 1) return
      e.preventDefault()
      dragging = true
      didDragRef.current = false
      startX = e.clientX - translateX
      startY = e.clientY - translateY
      el.style.cursor = "grabbing"
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return
      didDragRef.current = true
      translateX = e.clientX - startX
      translateY = e.clientY - startY
      applyTransform()
    }

    const handleMouseUp = () => {
      if (!dragging) return
      dragging = false
      el.style.cursor = scale > 1 ? "grab" : "default"
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    el.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      el.removeEventListener("wheel", handleWheel)
      el.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  const handleOverlayClick = () => {
    if (didDragRef.current) { didDragRef.current = false; return }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center [background-color:var(--overlay-backdrop)] backdrop-blur-[var(--blur-lightbox)]"
      onClick={handleOverlayClick}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 [background-color:var(--glass-light)] text-[color:var(--color-white)]"
        aria-label="Fechar"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <img
        ref={imgRef}
        src={src}
        alt={alt ?? ""}
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl object-contain max-w-[var(--max-w-lightbox)] max-h-[var(--max-h-lightbox)] w-auto h-auto lightbox-img"
      />
    </div>
  )
}
