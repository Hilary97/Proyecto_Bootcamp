import { useCallback, useEffect, useState } from "react";
import { getBusyDates } from "./agendaApi.js";

export function useAgenda() {
  const [busyDates, setBusyDates] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const rows = await getBusyDates();
      setBusyDates(new Set(rows.map((row) => row.event_date)));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { busyDates, loading, error, refresh };
}
