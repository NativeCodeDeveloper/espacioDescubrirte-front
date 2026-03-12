"use client";

import Image from "next/image";
import Link from "next/link";

export default function MisionVisionPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#f6f7fb] py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(148,163,184,0.2),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.14),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center xl:px-12 xl:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Ortega & Schmuck
            </p>
            <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">Misión y Visión</h1>
            <p className="mt-7 text-justify text-sm leading-relaxed text-slate-600 sm:text-base">
              Nuestra misión es entregar atención odontológica integral, personalizada y de
              alta calidad, combinando diagnóstico clínico, tecnología avanzada y protocolos
              seguros para mejorar la salud oral y la calidad de vida de cada paciente.
            </p>
            <p className="mt-5 max-w-2xl text-justify text-sm leading-relaxed text-slate-600 sm:text-base">
              Nuestra visión es consolidarnos como una clínica dental referente en
              Providencia y Santiago por la excelencia clínica, la cercanía en la atención
              y los resultados funcionales y estéticos obtenidos en cada tratamiento.
            </p>

            <Link
              href="/contacto"
              className="mt-10 inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Solicitar evaluación
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/70 bg-slate-100 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.5)]">
            <Image
              src="/dr2.png"
              alt="Misión y visión clínica"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
