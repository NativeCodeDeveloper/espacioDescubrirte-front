import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const services = [
  {
    name: "Diseño de sonrisa",
    image: "/1.JPG",
  },
  {
    name: "Implantología dental",
    image: "/2.png",
  },
  {
    name: "Rehabilitación oral",
    image: "/3.png",
  },
  {
    name: "Limpieza dental profunda",
    image: "/4.png",
  },
  {
    name: "Blanqueamiento dental",
    image: "/5.png",
  },
  {
    name: "Carillas dentales",
    image: "/6.png",
  },
];

export default function Seccion2() {
  return (
    <section id="servicios" className="scroll-mt-24 bg-[#080808] py-20 text-white sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs uppercase tracking-[0.24em] text-white/65">Servicios</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-light leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
            Tratamientos diseñados para mejorar tu salud oral con precisión clínica.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealOnScroll
              key={service.name}
              delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
              className="h-full"
            >
              <Link
                href="/reserva-hora"
                aria-label={`Agendar para ${service.name}`}
                className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-[#121212] transition duration-300 ease-out hover:-translate-y-1 hover:border-white/25"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.65)_100%)]" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-light tracking-[0.02em] text-white">{service.name}</h3>
                  <p className="mt-2 text-sm leading-7 tracking-[0.02em] text-white/70">
                    Evaluación personalizada y plan clínico premium para resultados funcionales y naturales.
                  </p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
