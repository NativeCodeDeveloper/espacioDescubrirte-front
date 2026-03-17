"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RESERVA_HREF = "/agendaProfesionales";

const defaultHeroSlides = [
  {
    id: "hero-1",
    image: "/lota2.webp",
    alt: "Box profesional para terapia",
    badge: "Espacio Descubrirte",
    title: "Arriendo de boxes de atencion terapeutica.",
    text: "Un entorno calido y profesional para psicologos y terapeutas, listo para cuidar el proceso terapeutico.",
  },
  {
    id: "hero-2",
    image: "/lota1.webp",
    alt: "Sala de espera moderna",
    badge: "Que ofrecemos",
    title: "Boxes equipados con flexibilidad por horas.",
    text: "Espacios pensados para psicoterapia individual, de pareja y familiar, con privacidad y comodidad.",
  },
  {
    id: "hero-3",
    image: "/lota3.webp",
    alt: "Espacio de terapia iluminado",
    badge: "Sucursales",
    title: "Providencia y Antofagasta, accesibles y acogedoras.",
    text: "Sedes con sala de espera, te y cafe, Wi-Fi gratuita y espacios privados para tus sesiones.",
  },
];

export default function Portada({ slides = defaultHeroSlides }) {
  const safeSlides = useMemo(
    () => (slides.length > 0 ? slides : defaultHeroSlides),
    [slides]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const normalizeImageSrc = (src) => {
    if (!src) return "/fondo1.png";
    if (src.startsWith("http") || src.startsWith("/")) return src;
    return `/${src}`;
  };

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined;

    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, 5200);

    return () => clearInterval(intervalId);
  }, [safeSlides.length]);

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + safeSlides.length) % safeSlides.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % safeSlides.length);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        goPrev();
      } else {
        goNext();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[calc(100svh-6rem)] scroll-mt-24 overflow-hidden bg-[#f7f2ea] md:min-h-[calc(100svh-7rem)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.85),transparent_55%),radial-gradient(circle_at_88%_8%,rgba(226,232,240,0.55),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(15,23,42,0.65)_0%,rgba(15,23,42,0.0)_100%)]" />

      <div className="mx-auto flex w-full max-w-none items-start px-0 pt-0 pb-0">
        <div className="relative h-[calc(100svh-6rem)] w-full overflow-hidden rounded-none border-0 bg-white shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] md:h-[calc(100svh-7rem)]">
          <div
            className="relative h-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {safeSlides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={slide.id}
                  className={[
                    "absolute inset-0 bg-[#0f172a] transition-opacity duration-700 ease-out",
                    isActive ? "opacity-100" : "pointer-events-none opacity-0",
                  ].join(" ")}
                >
                  <Image
                    src={normalizeImageSrc(slide.image)}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-container w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,23,42,0.7)_0%,rgba(15,23,42,0.35)_45%,rgba(15,23,42,0.2)_100%)]" />

                  <div className="absolute inset-0 flex items-center justify-center px-6 pt-24 text-white sm:px-10 md:px-14">
                    <div className="mx-auto max-w-3xl text-center">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/80">
                        {slide.badge}
                      </p>
                      <img
                        src="/logoespacio.png"
                        alt="logo en portada"
                        className="mx-auto mt-4 w-24 sm:w-45 md:w-120"
                      />
                      <h1 className="mt-4 text-balance text-4xl font-light leading-tight tracking-[0.02em] text-white sm:text-5xl lg:text-6xl">
                        Espacio Descubrirte
                      </h1>
                      <h2 className="mt-4 text-balance text-2xl font-light leading-tight tracking-[0.02em] text-white/95 sm:text-3xl lg:text-4xl">
                        {slide.title}
                      </h2>
                      <p className="mt-5 max-w-2xl text-sm leading-8 tracking-[0.02em] text-white/85 sm:text-base mx-auto">
                        {slide.text}
                      </p>

                      <div className="mt-8 mb-3.5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Link
                          href={RESERVA_HREF}
                          aria-label="Reservar box"
                          className="inline-flex w-full justify-center rounded-full border border-emerald-600 bg-emerald-700 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 ease-out hover:bg-emerald-600 sm:w-auto"
                        >
                          Reserva tu box
                        </Link>
                        <Link
                          href="/servicios"
                          aria-label="Ver servicios"
                          className="inline-flex w-full justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 ease-out hover:bg-white/20 sm:w-auto"
                        >
                          Ver servicios
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-2">
                {safeSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Mostrar slide ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "h-2.5 rounded-full transition-all duration-300",
                      activeIndex === index
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/45 hover:bg-white/70",
                    ].join(" ")}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Slide anterior"
                  onClick={goPrev}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition duration-300 hover:bg-black/55"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Siguiente slide"
                  onClick={goNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition duration-300 hover:bg-black/55"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
