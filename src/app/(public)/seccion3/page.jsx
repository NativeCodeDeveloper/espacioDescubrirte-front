"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const clinicalCases = [
  {
    title: "Rehabilitación de sonrisa",
    description: "Recuperación funcional y estética dental con un protocolo clínico conservador.",
    image: "/7.png",
  },
  {
    title: "Alineación dental",
    description: "Planificación ortodóncica para mejorar mordida, función y armonía de la sonrisa.",
    image: "/8.png",
  },
  {
    title: "Blanqueamiento clínico",
    description: "Tratamiento progresivo para recuperar luminosidad dental preservando la estructura.",
    image: "/12.png",
  },
  {
    title: "Carillas dentales",
    description: "Enfoque restaurador para mejorar forma, color y proporción con resultados naturales.",
    image: "/10.png",
  },
];

const FALLBACK_CASE_IMAGE = "/ac3.png";

export default function Seccion3() {
  const scrollerRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});

  const scrollByAmount = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;

    const firstCardWidth = container.firstElementChild?.clientWidth ?? 0;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    const amount =
      firstCardWidth > 0 ? Math.round(firstCardWidth + gap) : Math.round(container.clientWidth * 0.82);
    const nextLeft = direction === "left" ? -amount : amount;

    container.scrollBy({ left: nextLeft, behavior: "smooth" });
  };

  return (
    <>
      <section
        id="casos-clinicos"
        className="scroll-mt-24 bg-black py-20 text-white sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/65">Casos clinicos</p>
                <h2 className="mt-4 max-w-3xl text-balance text-3xl font-light leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
                  Resultados reales, planificados con criterio clínico y odontológico.
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByAmount("left")}
                  aria-label="Desplazar casos hacia la izquierda"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 hover:bg-white/20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount("right")}
                  aria-label="Desplazar casos hacia la derecha"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 hover:bg-white/20"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <div
            ref={scrollerRef}
            className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {clinicalCases.map((item, index) => (
              <RevealOnScroll
                key={item.title}
                className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                delayClass={index === 0 ? "delay-100" : "delay-150"}
              >
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={imageErrors[item.image] ? FALLBACK_CASE_IMAGE : item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 31vw"
                      className="object-cover"
                      onError={() =>
                        setImageErrors((current) => ({
                          ...current,
                          [item.image]: true,
                        }))
                      }
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.74)_100%)]" />
                  </div>
                  <div className="flex min-h-[176px] flex-col p-5 sm:p-6">
                    <h3 className="h-[3.5rem] overflow-hidden text-xl font-light leading-7 tracking-[0.02em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 h-[5.25rem] overflow-hidden text-sm leading-7 tracking-[0.02em] text-white/72">
                      {item.description}
                    </p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="scroll-mt-24 bg-[#050505] py-20 text-white sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,#111_0%,#050505_55%,#1a1a1a_100%)] px-6 py-14 text-center sm:px-10">
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">Agenda premium</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-light leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
                Reserva tu evaluación y recibe un plan dental personalizado.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 tracking-[0.02em] text-white/74 sm:text-base">
                Coordinamos tu hora con el equipo clinico para definir objetivos, tiempos y
                ruta de tratamiento.
              </p>
              <Link
                href="/reserva-hora"
                aria-label="Reservar hora"
                className="mt-8 inline-flex w-full max-w-xs justify-center rounded-full border border-white/20 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-black transition duration-300 ease-out hover:bg-white/90"
              >
                Reservar hora
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
