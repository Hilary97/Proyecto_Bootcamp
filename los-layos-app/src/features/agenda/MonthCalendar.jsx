import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function MonthCalendar({ busyDates, onDayClick }) {
  const [month, setMonth] = useState(startOfMonth(new Date()));
  const today = startOfToday();
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setMonth((m) => subMonths(m, 1))}
          className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
        >
          ‹
        </button>
        <p className="font-bold capitalize">
          {format(month, "MMMM yyyy", { locale: es })}
        </p>
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-500 mb-2 uppercase tracking-wide">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const inMonth = isSameMonth(day, month);
          const isPast = isBefore(day, today);
          const isBusy = busyDates.has(dayKey);
          const clickable = Boolean(onDayClick) && inMonth && !isPast;

          return (
            <button
              key={dayKey}
              type="button"
              disabled={!clickable}
              onClick={clickable ? () => onDayClick(dayKey) : undefined}
              className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-colors ${
                !inMonth
                  ? "text-zinc-700"
                  : isPast
                    ? "text-zinc-600 bg-zinc-900/40"
                    : isBusy
                      ? "bg-red-600/30 text-red-300 border border-red-600/50"
                      : "bg-green-600/20 text-green-300 border border-green-600/40 hover:bg-green-600/30"
              } ${clickable ? "cursor-pointer" : "cursor-default"}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
