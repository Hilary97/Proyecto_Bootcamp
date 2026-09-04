import { useScrolledPastHero } from "../hooks/useScrolledPastHero.js";

const LINKS = [
  { href: "#musica", label: "Música" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#agenda", label: "Agenda" },
];

export function Navbar() {
  const visible = useScrolledPastHero();

  return (
    <nav
      data-visible={visible ? "true" : "false"}
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-[opacity,transform,background-color] duration-500 ${
        visible
          ? "translate-y-0 opacity-100 border-gold-500/20 bg-ink-950/80 backdrop-blur"
          : "-translate-y-full opacity-0 border-transparent bg-transparent pointer-events-none"
      }`}
      aria-label="Principal"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a
          href="#hero"
          className="font-display text-2xl tracking-[0.15em] text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <span className="text-jade-400">AN</span> Los Layos
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-ivory/80 transition-colors hover:text-jade-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contratar"
            className="rounded-full bg-jade-600 px-5 py-2 text-sm font-bold text-ivory transition-colors hover:bg-jade-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Contrátanos
          </a>
        </div>
      </div>
    </nav>
  );
}
