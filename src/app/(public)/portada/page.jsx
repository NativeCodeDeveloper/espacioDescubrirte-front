"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultHeroSlides = [
  {
    id: "hero-1",
    image: "/fondo2.png",
    alt: "Clinica premium Ortega & Schmuck",
    badge: "Experiencia premium",
    title: "Diseño clínico de alta precisión.",
    text: "Protocolos personalizados para resultados naturales en odontología integral.",
  },
  {
    id: "hero-2",
    image: "/fondo3.png",
    alt: "Paciente en evaluacion estetica",
    badge: "Tecnologia avanzada",
    title: "Resultados funcionales y estéticos.",
    text: "Análisis integral, plan por etapas y acompañamiento continuo en cada tratamiento.",
  },
  {
    id: "hero-3",
    image: "/fondo1.png",
    alt: "Equipo clinico especializado",
    badge: "Atencion personalizada",
    title: "Tu salud oral en un solo lugar.",
    text: "Integramos criterio clínico y estética dental para una experiencia moderna y segura.",
  },
];

export default function Portada({ slides = defaultHeroSlides }) {
  const safeSlides = useMemo(
    () => (slides.length > 0 ? slides : defaultHeroSlides),
    [slides]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

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
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(133,139,149,0.2),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(255,255,255,0.08),transparent_35%)]" />

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-none items-start px-2 pt-3 pb-4 sm:pt-5 sm:pb-8 md:min-h-[calc(100vh-6rem)] md:px-8 md:pt-7 lg:px-10">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-900/40 shadow-[0_34px_90px_-56px_rgba(0,0,0,0.95)]">
          <div
            className="relative min-h-[76vh] sm:min-h-[82vh]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {safeSlides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={slide.id}
                  className={[
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    isActive ? "opacity-100" : "pointer-events-none opacity-0",
                  ].join(" ")}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,5,6,0.92)_0%,rgba(8,8,8,0.55)_45%,rgba(12,12,12,0.42)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 top-0 flex items-end px-6 pb-10 pt-20 sm:px-10 sm:pb-12 md:px-14">
                    <div className="max-w-2xl">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">
                        {slide.badge}
                      </p>
                      <h1 className="mt-4 text-balance text-4xl font-light leading-tight tracking-[0.02em] text-white sm:text-5xl lg:text-6xl">
                        Odontología clínica integral
                      </h1>
                      <h2 className="mt-4 text-balance text-2xl font-light leading-tight tracking-[0.02em] text-white/95 sm:text-3xl lg:text-4xl">
                        {slide.title}
                      </h2>
                      <p className="mt-5 max-w-xl text-sm leading-8 tracking-[0.02em] text-white/80 sm:text-base">
                        {slide.text}
                      </p>

                      <div className="mt-8 mb-3.5 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                          href="/agendaProfesionales"
                          aria-label="Agendar hora"
                          className="inline-flex w-full justify-center rounded-full border border-white/20 bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black transition duration-300 ease-out hover:bg-white/90 sm:w-auto"
                        >
                          Agendar hora
                        </Link>
                        <Link
                          href="/agendaProfesionales"
                          aria-label="Ir a servicios"
                          className="inline-flex w-full justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 ease-out hover:bg-white/20 sm:w-auto"
                        >
                          Conoce nuestros servicios
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
