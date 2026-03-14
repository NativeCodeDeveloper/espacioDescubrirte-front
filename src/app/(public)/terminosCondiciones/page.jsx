"use client";

import Link from "next/link";

export default function TerminosCondicionesPage() {
  return (
    <main className="bg-[#f7f2ea] text-slate-900">
      <section className="mx-auto w-full max-w-4xl px-6 py-24 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          Espacio Descubrirte
        </p>
        <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
          Terminos y condiciones
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">
          Esta pagina se encuentra en actualizacion. Si necesitas revisar condiciones
          de servicio, escribenos a contacto@descubrirte.cl y te responderemos a la brevedad.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:contacto@descubrirte.cl"
            className="inline-flex rounded-full border border-emerald-200 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900 transition hover:border-emerald-300"
          >
            Contactar soporte
          </a>
          <Link
            href="/"
            className="inline-flex rounded-full bg-emerald-700 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-600"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
