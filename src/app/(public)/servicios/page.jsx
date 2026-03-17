"use client";

import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
const serviciosPrincipales = [
  "Boxes de atencion terapeutica completamente equipados",
  "Ambientes calidos y profesionales",
  "Espacios pensados para psicoterapia individual, de pareja y familiar",
  "Modalidad flexible de arriendo por horas",
  "Comunidad de profesionales de la salud mental",
];

const serviciosAdicionales = [
  "Sala de espera",
  "Te y cafe disponible para terapeutas y pacientes",
  "Conexion Wi-Fi gratuita",
  "Espacios equipados y privados para tus sesiones",
  "Ambiente acogedor y profesional",
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
            Un entorno creado para el encuentro terapeutico.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-600">
            Espacio Descubrirte es un lugar pensado para profesionales de la salud mental que
            buscan boxes completamente equipados y un ambiente calido, profesional y
            cuidadosamente disenado para la atencion clinica.
            Nuestro proposito es facilitar el acceso a espacios de atencion de calidad para
            que puedas enfocarte en lo mas importante: el proceso terapeutico y el bienestar
            de las personas.
          </p>
        </RevealOnScroll>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-20 md:grid-cols-2 md:px-10 xl:px-12">
        <RevealOnScroll className="w-full">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.25)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Que ofrecemos
          </p>
          <h2 className="mt-4 text-2xl font-light text-slate-900">Arriendo pensado para terapia</h2>
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
            Nuestras sucursales incluyen
          </p>
          <h2 className="mt-4 text-2xl font-light text-slate-900">Comodidad para cada sesion</h2>
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
