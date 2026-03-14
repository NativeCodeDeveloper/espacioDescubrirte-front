import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const reasons = [
  {
    title: "Ambiente profesional",
    text: "Boxes cuidadosamente decorados, con privacidad y condiciones optimas para terapia.",
  },
  {
    title: "Flexibilidad total",
    text: "Arriendo por hora o jornadas completas segun la demanda de tu consulta.",
  },
  {
    title: "Soporte continuo",
    text: "Coordinacion directa para disponibilidad, pagos y necesidades de tu agenda.",
  },
  {
    title: "Ubicaciones estrategicas",
    text: "Sucursales con facil acceso en Providencia y Antofagasta.",
  },
];

const RESERVA_HREF = "/agendaProfesionales";

export default function Seccion3() {
  return (
    <section id="por-que-elegirnos" className="scroll-mt-24 bg-white py-20 text-slate-900 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Por que elegirnos</p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-light leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
              Todo lo que necesitas para brindar una experiencia profesional a tus pacientes.
              </h2>
            </div>

            <div className="w-32 sm:w-44 md:w-75">
              <img
                src="/logoespacio.png"
                alt="logo sección 3"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <RevealOnScroll
              key={item.title}
              delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
              className="h-full"
            >
              <article className="h-full rounded-3xl border border-slate-200 bg-[#f7f2ea] p-6 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.25)]">
                <h3 className="text-xl font-light tracking-[0.02em] text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-slate-200 bg-[#f7f2ea] px-6 py-10 sm:flex-row sm:items-center sm:px-10">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Reserva estandar</p>
              <h3 className="mt-4 text-2xl font-light leading-tight text-slate-900 sm:text-3xl">
                Agenda tu box y comienza a atender con confianza.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Estamos listos para ayudarte a encontrar el espacio perfecto para tu practica.
              </p>
            </div>
            <Link
              href={RESERVA_HREF}
              className="inline-flex w-full max-w-xs justify-center rounded-full border border-emerald-700 bg-emerald-700 px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition duration-300 ease-out hover:bg-emerald-600"
            >
              Ir a agenda
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
