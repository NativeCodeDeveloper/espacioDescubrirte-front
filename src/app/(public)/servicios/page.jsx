"use client";

import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
const serviciosPrincipales = [
  "Arriendo de boxes para terapia",
  "Box para adultos",
  "Box infantil",
  "Box estandar",
  "Sala de espera comoda",
  "Coordinacion y soporte para tu agenda",
];

const serviciosAdicionales = [
  "WiFi estable",
  "Aire acondicionado",
  "Calefaccion",
  "Materiales terapeuticos",
  "Ambientes silenciosos",
];

const RESERVA_HREF = "/agendaProfesionales";

export default function ServicioPage() {
  return (
    <main className="bg-[#f7f2ea] text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28 xl:px-12">
        <RevealOnScroll>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Servicios
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-light leading-tight sm:text-5xl">
            Espacios listos para que puedas concentrarte en tus pacientes.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-600">
            En Espacio Descubrirte encuentras boxes equipados y un entorno profesional para
            psicologos, terapeutas y coaches. Nuestra prioridad es que tu consulta se sienta
            comoda, tranquila y eficiente.
          </p>
        </RevealOnScroll>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-20 md:grid-cols-2 md:px-10 xl:px-12">
        <RevealOnScroll className="w-full">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.25)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Servicios principales
          </p>
          <h2 className="mt-4 text-2xl font-light text-slate-900">Todo lo esencial</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {serviciosPrincipales.map((servicio) => (
              <li key={servicio} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-700" />
                <span>{servicio}</span>
              </li>
            ))}
          </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="w-full" delayClass="delay-150">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.25)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Servicios adicionales
          </p>
          <h2 className="mt-4 text-2xl font-light text-slate-900">Comodidad extra</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {serviciosAdicionales.map((servicio) => (
              <li key={servicio} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-700" />
                <span>{servicio}</span>
              </li>
            ))}
          </ul>
          </div>
        </RevealOnScroll>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <RevealOnScroll className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center md:px-10 md:py-20 xl:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Reserva estandar
            </p>
            <h3 className="mt-4 text-3xl font-light leading-tight text-slate-900">
              Agenda tu box hoy y empieza a atender.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={RESERVA_HREF}
              className="rounded-full bg-emerald-700 px-7 py-3 text-sm font-medium text-white transition hover:bg-emerald-600"
            >
              Ir a agenda
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </main>
  );
}
