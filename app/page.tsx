import Hero from "@/components/Hero"
import FeaturedWork from "@/components/FeaturedWork"
import AboutSection from "@/components/AboutSection"
import ProcessSection from "@/components/ProcessSection"
import ContactCTA from "@/components/ContactCTA"

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <AboutSection />
      <ProcessSection />
      <ContactCTA />
    </main>
  )
}
