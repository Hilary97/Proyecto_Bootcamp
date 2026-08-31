import { MonthCalendar } from "./MonthCalendar.jsx";
import { useAgenda } from "./useAgenda.js";

export function AvailabilitySection({ onSelectDate }) {
  const { busyDates, loading, error } = useAgenda();

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          📅 Disponibilidad
        </h2>
        <p className="text-zinc-400 text-center mb-10 max-w-xl mx-auto">
          Antes de contratarnos, mirá qué días ya tenemos comprometidos.
        </p>

        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-zinc-700/50">
          {loading && (
            <p className="text-center text-zinc-400">Cargando agenda...</p>
          )}
          {error && (
            <p className="text-center text-red-400">
              No pudimos cargar la agenda. Probá de nuevo más tarde.
            </p>
          )}
          {!loading && !error && (
            <MonthCalendar busyDates={busyDates} onDayClick={onSelectDate} />
          )}

          <div className="flex gap-6 justify-center mt-6 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
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
