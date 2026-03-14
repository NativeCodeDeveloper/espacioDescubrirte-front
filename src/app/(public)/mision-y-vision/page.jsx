"use client";

import Image from "next/image";
import Link from "next/link";

export default function MisionVisionPage() {
  return (
    <main className="bg-[#f7f2ea] text-slate-900">
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.7),transparent_50%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.12),transparent_45%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center xl:px-12 xl:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Espacio Descubrirte
            </p>
            <h1 className="mt-5 text-4xl font-light leading-tight sm:text-5xl">Mision y Vision</h1>
            <p className="mt-7 text-sm leading-relaxed text-slate-700 sm:text-base">
              Nuestra mision es facilitar el arriendo de boxes profesionales para psicologos
              y terapeutas, entregando un entorno confiable, silencioso y listo para atender.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Nuestra vision es ser la plataforma de referencia en Chile para profesionales
              de la salud mental que buscan espacios flexibles y de alta calidad.
            </p>

            <Link
              href="/agendaProfesionales"
              className="mt-10 inline-flex rounded-full bg-emerald-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-emerald-600"
            >
              Ir a agenda
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_24px_70px_-38px_rgba(15,23,42,0.35)]">
            <Image
              src="/img2.webp"
              alt="Espacio Descubrirte"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
