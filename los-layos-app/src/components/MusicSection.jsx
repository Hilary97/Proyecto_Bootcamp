import { useState } from "react";
import { audioFiles } from "../data/audioFiles.js";

export function MusicSection() {
  const [currentAudio, setCurrentAudio] = useState(null);

  return (
    <section className="py-24 px-6 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          🎵 Nuestros Covers
        </h2>
        <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
          Disfruta de nuestras interpretaciones únicas de los clásicos
          norteños. Cada cover está lleno de nuestra pasión y estilo único.
        </p>

        <div className="space-y-4">
          {audioFiles.map((audio, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl transition-all cursor-pointer border-2 ${
                currentAudio === index
                  ? "bg-red-600/20 border-red-600"
                  : "bg-zinc-800/50 border-zinc-700 hover:border-zinc-500"
              }`}
              onClick={() =>
                setCurrentAudio(index === currentAudio ? null : index)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentAudio === index ? "bg-red-600" : "bg-zinc-700"
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
                    <p className="text-zinc-500 text-sm">
                      Click para reproducir
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-zinc-500 transition-transform ${currentAudio === index ? "rotate-180" : ""}`}
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
