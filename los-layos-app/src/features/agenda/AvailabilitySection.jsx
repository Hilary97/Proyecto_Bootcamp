import { useEffect } from "react";
import { MonthCalendar } from "./MonthCalendar.jsx";
import { useAgenda } from "./useAgenda.js";
import { ScrollTrigger } from "../../lib/gsap.js";
import { useReveal } from "../../hooks/useReveal.js";
import { SectionDivider } from "../../components/SectionDivider.jsx";

export function AvailabilitySection({ onSelectDate }) {
  const { busyDates, loading, error } = useAgenda();
  const root = useReveal();

  // The calendar replaces the loading text and changes the section height.
  useEffect(() => {
    if (!loading) ScrollTrigger.refresh();
  }, [loading]);

  return (
    <section id="agenda" ref={root} className="scroll-mt-[72px] py-24 px-6">
      <SectionDivider />
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-sm font-semibold tracking-[0.3em] text-gold-500">
          Agenda
        </p>
        <h2 className="mt-2 mb-4 text-center text-4xl">Disponibilidad</h2>
        <p className="text-ivory-muted text-center mb-2 max-w-xl mx-auto">
          Antes de contratarnos, mirá qué días ya tenemos comprometidos.
        </p>
        <p className="text-gold-400 text-center font-semibold mb-10 max-w-xl mx-auto">
          👉 Tocá el día que quieras agendar
        </p>

        <div className="bg-ink-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-jade-700/40">
          {loading && (
            <p className="text-center text-ivory-muted">Cargando agenda...</p>
          )}
          {error && (
            <p className="text-center text-gold-300">
              No pudimos cargar la agenda. Probá de nuevo más tarde.
            </p>
          )}
          {!loading && !error && (
            <MonthCalendar busyDates={busyDates} onDayClick={onSelectDate} />
          )}

          <div className="flex gap-6 justify-center mt-6 text-sm text-ivory-muted">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-jade-500 inline-block" />
              Libre
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              Ocupado
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
