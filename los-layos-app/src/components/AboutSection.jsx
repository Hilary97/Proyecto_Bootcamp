export function AboutSection() {
  return (
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
  );
}
