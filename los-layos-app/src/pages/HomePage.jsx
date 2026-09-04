import { useState } from "react";
import "lenis/dist/lenis.css";
import { Navbar } from "../components/Navbar.jsx";
import { Hero } from "../components/Hero.jsx";
import { Marquee } from "../components/Marquee.jsx";
import { MusicSection } from "../components/MusicSection.jsx";
import { AboutSection } from "../components/AboutSection.jsx";
import { AvailabilitySection } from "../features/agenda/AvailabilitySection.jsx";
import { HireSection } from "../components/HireSection.jsx";
import { Footer } from "../components/Footer.jsx";
import { useSmoothScroll } from "../hooks/useSmoothScroll.js";
import { scrollToElement } from "../lib/smoothScroll.js";

export function HomePage() {
  const [selectedHireDate, setSelectedHireDate] = useState("");
  useSmoothScroll();

  const handleSelectDate = (dayKey) => {
    setSelectedHireDate(dayKey);
    scrollToElement("#contratar");
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <MusicSection />
      <AboutSection />
      <AvailabilitySection onSelectDate={handleSelectDate} />
      <HireSection selectedDate={selectedHireDate} />
      <Footer />
    </>
  );
}
