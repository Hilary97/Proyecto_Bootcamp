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

export function MonthCalendar({ busyDates, onDayClick, allowBusyClick = false }) {
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
          className="px-3 py-1 rounded-lg bg-ink-800 hover:bg-ink-700 text-ivory/80"
        >
          ‹
        </button>
        <p className="font-bold capitalize">
          {format(month, "MMMM yyyy", { locale: es })}
        </p>
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          className="px-3 py-1 rounded-lg bg-ink-800 hover:bg-ink-700 text-ivory/80"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-ivory-muted mb-2 uppercase tracking-wide">
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
          const clickable =
            Boolean(onDayClick) &&
            inMonth &&
            !isPast &&
            (allowBusyClick || !isBusy);

          return (
            <button
              key={dayKey}
              type="button"
              disabled={!clickable}
              onClick={clickable ? () => onDayClick(dayKey) : undefined}
              className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-colors ${
                !inMonth
                  ? "text-ivory-muted/30"
                  : isPast
                    ? "text-ivory-muted/40 bg-ink-900/70"
                    : isBusy
                      ? "bg-red-600/25 text-red-300 border border-red-500/50"
                      : "bg-jade-600/20 text-jade-300 border border-jade-600/40 hover:bg-jade-600/40"
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
