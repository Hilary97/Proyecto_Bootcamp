export function Hero() {
  return (
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
            className="px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold rounded-full transition-all transform hover:scale-110 shadow-lg shadow-green-500/50 animate-wiggle"
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
  );
}
