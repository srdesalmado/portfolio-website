import Hero from "@/components/Hero"
import FeaturedWork from "@/components/FeaturedWork"
import AboutSection from "@/components/AboutSection"
import ProcessSection from "@/components/ProcessSection"
import Testimonials from "@/components/Testimonials"
import ContactCTA from "@/components/ContactCTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <AboutSection />
      <ProcessSection />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  )
}
