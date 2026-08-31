import { useState } from "react";
import { Hero } from "../components/Hero.jsx";
import { MusicSection } from "../components/MusicSection.jsx";
import { AboutSection } from "../components/AboutSection.jsx";
import { AvailabilitySection } from "../features/agenda/AvailabilitySection.jsx";
import { HireSection } from "../components/HireSection.jsx";
import { Footer } from "../components/Footer.jsx";

export function HomePage() {
  const [selectedHireDate, setSelectedHireDate] = useState("");

  const handleSelectDate = (dayKey) => {
    setSelectedHireDate(dayKey);
    document.getElementById("contratar")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Hero />
      <MusicSection />
      <AboutSection />
      <AvailabilitySection onSelectDate={handleSelectDate} />
      <HireSection selectedDate={selectedHireDate} />
      <Footer />
    </>
  );
}
