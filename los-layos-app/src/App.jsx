import { Particulas } from "./components/Particulas.jsx";
import { Hero } from "./components/Hero.jsx";
import { MusicSection } from "./components/MusicSection.jsx";
import { AboutSection } from "./components/AboutSection.jsx";
import { HireSection } from "./components/HireSection.jsx";
import { Footer } from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Particulas />
      <div className="relative z-10 min-h-screen text-white font-sans">
        <Hero />
        <MusicSection />
        <AboutSection />
        <HireSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
