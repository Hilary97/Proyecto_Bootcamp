import { useReveal } from "../hooks/useReveal.js";
import { useCountUp } from "../hooks/useCountUp.js";
import { SectionDivider } from "./SectionDivider.jsx";

function Stat({ value, label }) {
  const ref = useCountUp({ to: value, suffix: "+" });
  return (
    <div>
      <p ref={ref} className="font-display text-5xl text-jade-400">
        {value}+
      </p>
      <span className="mt-1 block h-px w-8 bg-gold-500/60" aria-hidden="true" />
      <p className="mt-2 text-sm text-ivory-muted">{label}</p>
    </div>
  );
}

export function AboutSection() {
  const root = useReveal({ selector: "[data-reveal]" });

  return (
    <section id="nosotros" ref={root} className="scroll-mt-[72px] px-6 py-24">
      <SectionDivider />
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div data-reveal>
            <img
              src="/images/IMG_2755.PNG"
              alt="Adicción Norteña Los Layos en escena"
              className="rounded-2xl shadow-2xl ring-1 ring-gold-500/20"
              loading="lazy"
            />
          </div>
          <div data-reveal>
            <p className="text-sm font-semibold tracking-[0.3em] text-gold-500">
              Sobre nosotros
            </p>
            <h2 className="mb-6 mt-2 text-4xl">La música que mueve tu mundo</h2>
            <p className="mb-4 leading-relaxed text-ivory-muted">
              Somos un grupo comprometido con la excelencia musical y la
              conexión genuina con nuestro público. Cada presentación es una
              experiencia única llena de pasión, tradición y el ritmo que nos
              caracteriza.
            </p>
            <p className="mb-8 leading-relaxed text-ivory-muted">
              Tu próxima canción favorita está a punto de sonar. Descubre el
              ritmo que te hará vibrar con AN Los Layos.
            </p>
            <div className="flex gap-10">
              <Stat value={10} label="Años de experiencia" />
              <Stat value={500} label="Fans" />
              <Stat value={300} label="Canciones" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
