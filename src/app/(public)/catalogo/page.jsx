"use client";

import Link from "next/link";

export default function CatalogoPage() {
  return (
    <main className="bg-[#f7f2ea] text-slate-900">
      <section className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Espacio Descubrirte
        </p>
        <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
          Catalogo en actualizacion
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
          Estamos preparando la informacion completa de servicios, tipos de boxes y tarifas.
          Si necesitas coordinar una reserva, puedes hacerlo directamente desde nuestra agenda.
        </p>
        <Link
          href="/agendaProfesionales"
          className="mt-8 inline-flex rounded-full bg-emerald-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-emerald-600"
        >
          Ir a agenda
        </Link>
      </section>
    </main>
  );
}
