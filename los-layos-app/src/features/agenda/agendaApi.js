import { supabase } from "../../lib/supabaseClient.js";

export async function getBusyDates() {
  const { data, error } = await supabase
    .from("busy_dates")
    .select("event_date, title");

  if (error) throw error;
  return data;
}

export async function addBusyDate(eventDate, title = null) {
  const { error } = await supabase
    .from("busy_dates")
    .insert({ event_date: eventDate, title });

  if (error) throw error;
}

export async function removeBusyDate(eventDate) {
  const { error } = await supabase
    .from("busy_dates")
    .delete()
    .eq("event_date", eventDate);

  if (error) throw error;
}
