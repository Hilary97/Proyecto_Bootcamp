import { Hero } from "../components/Hero.jsx";
import { MusicSection } from "../components/MusicSection.jsx";
import { AboutSection } from "../components/AboutSection.jsx";
import { AvailabilitySection } from "../features/agenda/AvailabilitySection.jsx";
import { HireSection } from "../components/HireSection.jsx";
import { Footer } from "../components/Footer.jsx";

export function HomePage() {
  return (
    <>
      <Hero />
      <MusicSection />
      <AboutSection />
      <AvailabilitySection />
      <HireSection />
      <Footer />
    </>
  );
}
