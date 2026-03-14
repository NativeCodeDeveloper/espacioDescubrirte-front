"use client";

import Image from "next/image";
import Link from "next/link";

const beneficios = [
  "Ambientes silenciosos y profesionales",
  "WiFi estable y climatizacion",
  "Sala de espera comoda",
  "Flexibilidad para reservar por horas",
  "Ubicaciones estrategicas",
  "Soporte directo para coordinar tu agenda",
];

export default function UltraformerPage() {
  return (
    <main className="bg-[#f7f2ea] text-slate-900">
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-24 md:px-10 md:pb-24 md:pt-28 lg:grid-cols-[1.15fr_1fr] lg:items-center xl:px-12 xl:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Espacios y equipamiento
          </p>
          <h1 className="mt-5 text-4xl font-light leading-tight sm:text-5xl">
            Boxes profesionales listos para terapia
          </h1>
          <p className="mt-7 text-sm leading-relaxed text-slate-700 sm:text-base">
            En Espacio Descubrirte ofrecemos ambientes preparados para que puedas concentrarte
            en tus pacientes. Cada box esta pensado para brindar privacidad, comodidad y
            una experiencia profesional.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            Nuestro equipo acompana el proceso de reserva y disponibilidad para que tu agenda
            se mantenga organizada y flexible.
          </p>

          <Link
            href="/agendaProfesionales"
            className="mt-10 inline-flex rounded-full bg-emerald-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-emerald-600"
          >
            Ir a agenda
          </Link>
        </div>

        <div className="relative aspect-[6/5] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_24px_70px_-38px_rgba(15,23,42,0.35)]">
          <Image
            src="/imgportada.webp"
            alt="Boxes profesionales"
            fill
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </section>

      <section className="border-t border-white/60 bg-white/70">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24 xl:px-12">
          <h2 className="text-3xl font-light leading-tight text-slate-900 sm:text-4xl">
            Beneficios clave
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beneficios.map((item) => (
              <article
                key={item}
                className="rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm text-slate-700"
              >
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
