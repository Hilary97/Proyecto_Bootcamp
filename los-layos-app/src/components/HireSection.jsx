import { useState } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useAgenda } from "../features/agenda/useAgenda.js";

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const today = format(new Date(), "yyyy-MM-dd");

export function HireSection() {
  const { busyDates } = useAgenda();
  const [nombreContratante, setNombreContratante] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [horasRequeridas, setHorasRequeridas] = useState("");

  const isBusy = Boolean(fechaContratacion) && busyDates.has(fechaContratacion);

  const handleContratacionSubmit = (e) => {
    e.preventDefault();

    if (!nombreContratante || !fechaContratacion || !horasRequeridas) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (busyDates.has(fechaContratacion)) {
      alert(
        "Esa fecha ya está ocupada. Elegí otro día en el calendario de disponibilidad.",
      );
      return;
    }

    const fecha = parseISO(fechaContratacion);
    const diaSemana = capitalize(format(fecha, "EEEE", { locale: es }));
    const fechaFormateada = `${format(fecha, "dd")}/${capitalize(format(fecha, "MMMM", { locale: es }))}/${format(fecha, "yyyy")}`;

    const mensaje = `📅 *SOLICITUD DE CONTRATACIÓN* 📅

*Nombre:* ${nombreContratante}
*Día:* ${diaSemana}
*Fecha:* ${fechaFormateada}
*Horas requeridas:* ${horasRequeridas} hora(s)

¡Espero su confirmación!`;

    const whatsappUrl = `https://wa.me/523313023706?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");

    setNombreContratante("");
    setFechaContratacion("");
    setHorasRequeridas("");
  };

  return (
    <section
      id="contratar"
      className="py-24 px-6 bg-gradient-to-r from-red-900/30 via-zinc-900 to-red-900/30"
    >
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-4">¡Contrátanos!</h2>
          <p className="text-zinc-400">
            Llena el formulario y nos pondremos en contacto contigo para
            agendar tu evento. ¡La mejor música norteña te espera!
          </p>
        </div>

        <form
          onSubmit={handleContratacionSubmit}
          className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-zinc-700/50"
        >
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Nombre de quien contrata
            </label>
            <input
              type="text"
              value={nombreContratante}
              onChange={(e) => setNombreContratante(e.target.value)}
              placeholder="Su Nombre porfavor"
              className="w-full px-5 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none transition-colors placeholder-zinc-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Fecha de contratación
            </label>
            <input
              type="date"
              value={fechaContratacion}
              onChange={(e) => setFechaContratacion(e.target.value)}
              min={today}
              className="w-full px-5 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none transition-colors cursor-pointer"
              required
            />
            {isBusy && (
              <p className="text-red-400 text-sm mt-2">
                Esa fecha ya está ocupada. Elegí otra en el calendario de
                arriba.
              </p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-white font-semibold mb-2">
              ¿Cuántas horas requiere?
            </label>
            <input
              type="number"
              value={horasRequeridas}
              onChange={(e) => setHorasRequeridas(e.target.value)}
              placeholder="Ej: 4"
              min="1"
              max="12"
              className="w-full px-5 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none transition-colors placeholder-zinc-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-green-600/30 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar fecha
          </button>
        </form>
      </div>
    </section>
  );
}
