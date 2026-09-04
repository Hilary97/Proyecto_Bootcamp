import { useRef } from "react";
import {
  gsap,
  useGSAP,
  SplitText,
  prefersReducedMotion,
} from "../lib/gsap.js";
import { useMagnetic } from "../hooks/useMagnetic.js";

const FACEBOOK_URL = "https://www.facebook.com/adiccionnortena.loslayos.1";

export function Hero() {
  const root = useRef(null);
  const imgRef = useRef(null);
  const primaryCta = useMagnetic();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add({ fine: "(pointer: fine)" }, (ctx) => {
        const { fine } = ctx.conditions;

        const split = SplitText.create("[data-hero-title]", {
          type: "chars",
          charsClass: "inline-block",
          aria: "auto",
        });

        // Page-load sequence: image settles, then title, tagline and CTAs.
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });
        tl.fromTo(
          "[data-hero-img]",
          { autoAlpha: 0, scale: 1.12 },
          { autoAlpha: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        )
          .from(
            split.chars,
            { yPercent: 110, autoAlpha: 0, stagger: 0.03, duration: 0.7 },
            "-=0.9",
          )
          .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 12 }, "-=0.5")
          .from("[data-hero-sub]", { autoAlpha: 0, y: 20 }, "-=0.3")
          .from(
            "[data-hero-cta] > *",
            { autoAlpha: 0, y: 24, stagger: 0.1 },
            "-=0.4",
          );

        Promise.all([
          document.fonts?.ready,
          imgRef.current?.decode?.().catch(() => {}),
        ]).then(() => tl.play());

        // Scroll parallax: image drifts slower than the content above it.
        gsap.to("[data-hero-img]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to("[data-hero-content]", {
          yPercent: -30,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "70% top",
            scrub: true,
          },
        });

        // Pointer tilt on desktop; x/y compose with the yPercent parallax.
        let onMove;
        if (fine) {
          const xTo = gsap.quickTo("[data-hero-img]", "x", {
            duration: 0.9,
            ease: "power3",
          });
          const yTo = gsap.quickTo("[data-hero-img]", "y", {
            duration: 0.9,
            ease: "power3",
          });
          onMove = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            xTo(nx * -24);
            yTo(ny * -16);
          };
          root.current.addEventListener("mousemove", onMove);
        }

        return () => {
          if (onMove) root.current?.removeEventListener("mousemove", onMove);
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-svh min-h-[640px] overflow-hidden"
    >
      <div
        data-hero-img
        className="absolute inset-x-0 -inset-y-[18%] will-change-transform md:inset-y-0 md:left-auto md:right-0 md:w-[60%] [-webkit-mask-image:radial-gradient(ellipse_58%_60%_at_50%_50%,#000_55%,transparent_100%)] [mask-image:radial-gradient(ellipse_58%_60%_at_50%_50%,#000_55%,transparent_100%)]"
      >
        <picture>
          <source srcSet="/images/an-los-layos.webp" type="image/webp" />
          <img
            ref={imgRef}
            src="/images/an-los-layos.png"
            alt="Adicción Norteña Los Layos"
            className="h-full w-full object-contain object-[center_22%] md:object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen bg-[radial-gradient(60%_50%_at_50%_25%,rgba(20,163,106,0.38),transparent_70%)] md:bg-[radial-gradient(45%_55%_at_70%_40%,rgba(20,163,106,0.38),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen bg-[radial-gradient(35%_25%_at_50%_38%,rgba(212,175,55,0.18),transparent_70%)] md:bg-[radial-gradient(25%_30%_at_70%_60%,rgba(212,175,55,0.2),transparent_70%)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent md:h-[35%] md:via-ink-950/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-ink-950/60 to-transparent"
        aria-hidden="true"
      />

      <div
        data-hero-content
        className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 text-center md:max-w-[46%] md:items-start md:justify-center md:pb-0 md:pl-16 md:text-left lg:pl-24"
      >
        <p
          data-hero-eyebrow
          className="mb-4 text-xs font-semibold tracking-[0.35em] text-gold-500 md:text-sm"
        >
          Grupo norteño
        </p>
        <h1
          data-hero-title
          className="font-display text-[18vw] leading-[0.85] md:text-[8rem] lg:text-[9.5rem]"
        >
          <span className="block text-jade-400">ADICCIÓN</span>
          <span className="block text-ivory">NORTEÑA</span>
        </h1>
        <p
          data-hero-sub
          className="mt-4 font-display text-3xl tracking-[0.2em] md:text-5xl bg-gradient-to-b from-gold-300 via-gold-500 to-gold-600 bg-clip-text text-transparent pb-1"
        >
          Los Layos
        </p>

        <div data-hero-cta className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
          <a
            ref={primaryCta}
            href="#contratar"
            className="inline-block rounded-full bg-jade-600 px-10 py-4 font-bold text-ivory shadow-lg shadow-jade-600/40 transition-[box-shadow,background-color] hover:bg-jade-500 hover:ring-1 hover:ring-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Contrátanos
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-jade-700/60 px-8 py-4 font-semibold text-ivory transition-colors hover:border-gold-500 hover:text-jade-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Síguenos en Facebook
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-gold-500 to-transparent motion-safe:animate-pulse"
        aria-hidden="true"
      />
    </section>
  );
}
