import { Braces, HeartPulse, ScanLine, Stethoscope } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const pillars = [
  {
    title: "Tecnologia avanzada",
    text: "Equipamiento de ultima generacion para diagnosticos claros y decisiones de alta precision.",
    icon: ScanLine,
  },
  {
    title: "Profesionales especializados",
    text: "Equipo clinico con formacion continua para ofrecer protocolos seguros y actualizados.",
    icon: Stethoscope,
  },
  {
    title: "Enfoque estetico premium",
    text: "Buscamos armonia y naturalidad con una planificacion individual en cada paciente.",
    icon: Braces,
  },
  {
    title: "Atencion personalizada",
    text: "Acompanamiento cercano antes, durante y despues del tratamiento.",
    icon: HeartPulse,
  },
];

export default function Seccion1() {
  return (
    <section
      id="porque-elegirnos"
      className="scroll-mt-24 bg-black py-20 text-white sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs uppercase tracking-[0.24em] text-white/65">Por que elegirnos</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-light leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
            Una clinica premium pensada para resultados naturales y medibles.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <RevealOnScroll
                key={item.title}
                className="h-full"
                delayClass={
                  index === 0
                    ? "delay-75"
                    : index === 1
                    ? "delay-100"
                    : index === 2
                    ? "delay-150"
                    : "delay-200"
                }
              >
                <article className="h-full rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(37,37,38,0.95)_0%,rgba(14,14,15,0.98)_100%)] p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-white/20">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-5 text-xl font-light tracking-[0.01em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 tracking-[0.02em] text-white/75">
                    {item.text}
                  </p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
