import { useEffect, useState } from "react";
import { audioFiles } from "../data/audioFiles.js";
import { ScrollTrigger } from "../lib/gsap.js";
import { useReveal } from "../hooks/useReveal.js";
import { SectionDivider } from "./SectionDivider.jsx";

export function MusicSection() {
  const [currentAudio, setCurrentAudio] = useState(null);
  const root = useReveal({ selector: "[data-reveal]", stagger: 0.08 });

  // Expanding a card changes the page height; keep scroll positions accurate.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [currentAudio]);

  return (
    <section
      id="musica"
      ref={root}
      className="scroll-mt-[72px] px-6 py-24 bg-ink-900/70"
    >
      <SectionDivider />
      <div className="max-w-4xl mx-auto">
        <p
          data-reveal
          className="text-center text-sm font-semibold tracking-[0.3em] text-gold-500"
        >
          Escúchanos
        </p>
        <h2 data-reveal className="mt-2 mb-4 text-center text-4xl">
          Nuestros covers
        </h2>
        <p data-reveal className="text-ivory-muted text-center mb-12 max-w-xl mx-auto">
          Disfruta de nuestras interpretaciones únicas de los clásicos
          norteños. Cada cover está lleno de nuestra pasión y estilo único.
        </p>

        <div className="space-y-4">
          {audioFiles.map((audio, index) => (
            <div
              key={index}
              data-reveal
              className={`p-6 rounded-2xl transition-[transform,border-color,background-color] cursor-pointer border-2 hover:-translate-y-1 ${
                currentAudio === index
                  ? "bg-jade-600/20 border-jade-500"
                  : "bg-ink-800/60 border-jade-700/40 hover:border-gold-500/60"
              }`}
              onClick={() =>
                setCurrentAudio(index === currentAudio ? null : index)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentAudio === index ? "bg-jade-600" : "bg-ink-700"
                    }`}
                  >
                    {currentAudio === index ? (
                      <svg
                        className="w-6 h-6 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{audio.name}</h3>
                    <p className="text-ivory-muted text-sm">
                      Click para reproducir
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-ivory-muted transition-transform ${currentAudio === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {currentAudio === index && (
                <div className="mt-4">
                  <audio
                    src={audio.src}
                    controls
                    className="w-full h-10"
                    autoPlay
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
