"use client"

import { useState } from "react"
import Lightbox from "@/components/Lightbox"

export default function LightboxImage({
  src,
  alt,
  className,
  style,
}: {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt ?? ""}
        className={`${className ?? ""} cursor-zoom-in`}
        style={style}
        onClick={() => setOpen(true)}
      />
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}
