import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const steps = [
  {
    title: "Revisa disponibilidad",
    text: "Comparte tus horarios y la sede de preferencia para coordinar el box ideal.",
  },
  {
    title: "Elige box y jornada",
    text: "Define si necesitas box infantil, adulto o estandar y la duracion de tu bloque.",
  },
  {
    title: "Selección de horario",
    text: "Selecciona el horario disponible y reserva.",
  },
  {
    title: "Confirma tu reserva",
    text: "Realiza el pago y recibes confirmacion inmediata de tu reserva.",
  },
];

const RESERVA_HREF = "/agendaProfesionales";

export default function Seccion2() {
  return (
    <section
      id="como-reservar"
      className="scroll-mt-24 bg-[#f7f2ea] py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Como reservar</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-light leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
            Un proceso claro para asegurar tu box en pocos pasos.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.title} delayClass={index === 0 ? "delay-75" : "delay-150"}>
              <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.25)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Paso {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-light tracking-[0.01em] text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.25)] sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Reserva inmediata</p>
              <h3 className="mt-3 text-2xl font-light text-slate-900 sm:text-3xl">
                Coordina tu agenda con nuestro equipo hoy mismo.
              </h3>
            </div>
            <Link
              href={RESERVA_HREF}
              className="inline-flex items-center justify-center rounded-full border border-emerald-700 bg-emerald-700 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-600"
            >
              Ir a agenda
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
