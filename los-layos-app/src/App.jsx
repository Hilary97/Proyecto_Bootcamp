import { useState } from "react";

const audioFiles = [
  { name: "Cover - Mix Norteño", src: "/audio/AUDIO-2024-04-13-02-22-38.mp3" },

  { name: "Cover -Tu", src: "/audio/AUDIO-2024-04-13-02-22-38.mp3" },

  {
    name: "Cover - Ritmo Varonil",
    src: "/audio/AUDIO-2024-03-14-19-21-31.mp3",
  },
  { name: "Cover - Recordando", src: "/audio/AUDIO-2024-03-28-19-00-22.mp3" },
  {
    name: "Cover - Pasión Norteña",
    src: "/audio/AUDIO-2024-03-29-14-29-47.mp3",
  },
  { name: "Cover - Tradición", src: "/audio/AUDIO-2024-03-29-14-40-55.mp3" },
];

function App() {
  const [email, setEmail] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState(() => {
    const saved = localStorage.getItem("emails");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentAudio, setCurrentAudio] = useState(null);

  // Estados para formulario de contratación
  const [nombreContratante, setNombreContratante] = useState("");
  const [diaContratacion, setDiaContratacion] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [horasRequeridas, setHorasRequeridas] = useState("");

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const [year, month, day] = fecha.split("-");
    const meses = [
      "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return `${day}/${meses[parseInt(month)]}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("No has ingresado tu correo");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    alert("¡Gracias por suscribirte! Pronto recibirás novedades.");

    const newEmails = [...submittedEmails, email];
    setSubmittedEmails(newEmails);
    localStorage.setItem("emails", JSON.stringify(newEmails));
    setEmail("");
  };

  // Función para enviar datos a WhatsApp
  const handleContratacionSubmit = (e) => {
    e.preventDefault();

    if (
      !nombreContratante ||
      !diaContratacion ||
      !fechaContratacion ||
      !horasRequeridas
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const mensaje = `🎵 *SOLICITUD DE CONTRATACIÓN* 🎵

*Nombre:* ${nombreContratante}
*Día:* ${diaContratacion}
*Fecha:* ${formatearFecha(fechaContratacion)}
*Horas requeridas:* ${horasRequeridas} hora(s)

¡Espero su confirmación!`;

    const whatsappUrl = `https://wa.me/523313023706?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");

    // Limpiar formulario
    setNombreContratante("");
    setDiaContratacion("");
    setFechaContratacion("");
    setHorasRequeridas("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 via-zinc-950 to-zinc-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-6">
          <div className="mb-8">
            <img
              src="/images/IMG_2755.PNG"
              alt="Adiccion Norteña Los Layos"
              className="w-56 h-56 mx-auto rounded-full object-cover border-4 border-red-600 shadow-2xl shadow-red-600/30"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            <span className="text-red-600">ADICCIÓN</span> NORTEÑA
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-400 font-light tracking-widest uppercase">
            Los Layos
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="https://www.facebook.com/adiccionnortena.loslayos.1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-red-600/30"
            >
              Síguenos en Facebook
            </a>
            <a
              href="#contratar"
              className="px-8 py-3 border-2 border-zinc-600 hover:border-green-500 text-white font-bold rounded-full transition-all"
            >
              Contrátanos
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Music Section */}
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

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/IMG_2755.PNG"
                alt="Sobre nosotros"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <span className="text-red-600 font-bold tracking-wider uppercase">
                Sobre Nosotros
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                La Música que Mueve Tu Mundo
              </h2>
              <p className="text-zinc-400 mb-4 leading-relaxed">
                Somos una empresa comprometida con la excelencia musical y la
                conexión genuina con nuestro público. Cada presentación es una
                experiencia única llena de pasión, tradición y el ritmo que nos
                caracteriza.
              </p>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                "Tu próxima canción favorita está a punto de sonar. Descubre el
                ritmo que te hará vibrar con 'AN Los Layos'. ¡La música que
                mueve tu mundo!"
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-red-600">10+</p>
                  <p className="text-zinc-500 text-sm">Años de experiencia</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">500+</p>
                  <p className="text-zinc-500 text-sm">Fans</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">300+</p>
                  <p className="text-zinc-500 text-sm">Canciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contratar Sección */}
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
            {/* Nombre de quien contrata */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Nombre de quien contrata
              </label>
              <input
                type="text"
                value={nombreContratante}
                onChange={(e) => setNombreContratante(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full px-5 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none transition-colors placeholder-zinc-500"
                required
              />
            </div>

            {/* Día de contratación */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Día de contratación
              </label>
              <select
                value={diaContratacion}
                onChange={(e) => setDiaContratacion(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-zinc-800">
                  Selecciona un día
                </option>
                <option value="Lunes" className="bg-zinc-800">
                  Lunes
                </option>
                <option value="Martes" className="bg-zinc-800">
                  Martes
                </option>
                <option value="Miércoles" className="bg-zinc-800">
                  Miércoles
                </option>
                <option value="Jueves" className="bg-zinc-800">
                  Jueves
                </option>
                <option value="Viernes" className="bg-zinc-800">
                  Viernes
                </option>
                <option value="Sábado" className="bg-zinc-800">
                  Sábado
                </option>
                <option value="Domingo" className="bg-zinc-800">
                  Domingo
                </option>
              </select>
            </div>

            {/* Fecha de contratación */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Fecha de contratación
              </label>
              <input
                type="date"
                value={fechaContratacion}
                onChange={(e) => setFechaContratacion(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-zinc-900 text-white border border-zinc-600 focus:border-red-500 focus:outline-none transition-colors cursor-pointer"
                required
              />
            </div>

            {/* Horas requeridas */}
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

            {/* Botón Solicitar fecha */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-green-600/30 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar fecha
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/images/IMG_2755.PNG"
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">Adiccion Norteña Los Layos</p>
                <p className="text-zinc-500 text-sm">Música que conecta</p>
              </div>
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/adiccionnortena.loslayos.1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/message/EW4LOCEM23ERM1"
                href="https://wa.me/3313023706"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-green-500 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
            © 2024 Adiccion Norteña Los Layos. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
