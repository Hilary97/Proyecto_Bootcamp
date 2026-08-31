import { useState } from "react";
import { MonthCalendar } from "./MonthCalendar.jsx";
import { useAgenda } from "./useAgenda.js";
import { addBusyDate, removeBusyDate } from "./agendaApi.js";

export function AdminAgendaPanel() {
  const { busyDates, loading, error, refresh } = useAgenda();
  const [pendingDay, setPendingDay] = useState(null);

  const handleDayClick = async (dayKey) => {
    setPendingDay(dayKey);
    try {
      if (busyDates.has(dayKey)) {
        await removeBusyDate(dayKey);
      } else {
        await addBusyDate(dayKey);
      }
      await refresh();
    } finally {
      setPendingDay(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-24 px-6">
      <h1 className="text-3xl font-bold mb-2">Administrar agenda</h1>
      <p className="text-zinc-400 mb-8">
        Click en un día libre para marcarlo ocupado, o en uno ocupado para
        liberarlo.
      </p>

      {loading && <p className="text-zinc-400">Cargando...</p>}
      {error && <p className="text-red-400">Error al cargar la agenda.</p>}

      {!loading && !error && (
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-zinc-700/50">
          {pendingDay && (
            <p className="text-sm text-zinc-400 mb-2">
              Guardando {pendingDay}...
            </p>
          )}
          <MonthCalendar
            busyDates={busyDates}
            onDayClick={handleDayClick}
            allowBusyClick
          />
        </div>
      )}
    </div>
  );
}
