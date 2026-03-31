import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { LanguageProvider } from "@/context/LanguageContext"
import { cn } from "@/lib/utils";

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "carlos.psd — Senior Product Designer",
  description:
    "Carlos Henrique is a Senior Product Designer specializing in fintech, design systems, and complex B2B interfaces. Based in Florianópolis, Brazil.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", montserrat.variable)}
    >
      <body className="min-h-full">
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
