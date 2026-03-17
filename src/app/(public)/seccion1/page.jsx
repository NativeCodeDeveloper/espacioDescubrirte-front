import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const branches = [
  {
    name: "Providencia - Lota 2257",
    address: "Lota 2257, Providencia, Santiago",
    description:
      "Sucursal Los Leones, a pasos de estacion Los Leones, con 2 estacionamientos gratuitos sujetos a disponibilidad.",
    image: "/lota1.webp",
    href: "/sucursales/providencia-lota",
  },
  {
    name: "Providencia - Nueva Providencia 1860",
    address: "Nueva Providencia 1860, Providencia, Santiago",
    description:
      "Ubicacion estrategica, justo frente a la salida de estacion Pedro de Valdivia.",
    image: "/pvaldivia.webp",
    href: "/sucursales/nueva-providencia",
  },
  {
    name: "Antofagasta - Angamos 193",
    address: "Av. Angamos 193, Antofagasta",
    description:
      "Sucursal Angamos en segundo piso, con box pensado para terapias individuales y familiares.",
    image: "/antofa.webp",
    href: "/sucursales/antofagasta",
  },
];

export default function Seccion1() {
  return (
    <section id="sucursales" className="scroll-mt-24 bg-[#fbfaf7] py-20 text-slate-900 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Sucursales</p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-light leading-tight tracking-[0.02em] sm:text-4xl lg:text-5xl">
            Espacios diseñados para que tu consulta se sienta profesional y acogedora.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 space-y-12">
          {branches.map((branch, index) => {
            const isReversed = index % 2 === 1;

            return (
              <RevealOnScroll key={branch.name} className="w-full">
                <article className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)] md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className={isReversed ? "order-1 md:order-2" : "order-1"}>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Sucursal {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-light tracking-[0.02em] text-slate-900 sm:text-3xl">
                      {branch.name}
                    </h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-500">
                      {branch.address}
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                      {branch.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href={branch.href}
                        className="inline-flex items-center justify-center rounded-full border border-emerald-700 bg-emerald-700 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-600"
                      >
                        Ver sucursal
                      </Link>
                      <Link
                        href="/servicios"
                        className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900 transition hover:border-emerald-300"
                      >
                        Ver servicios
                      </Link>
                    </div>
                  </div>
                  <div
                    className={
                      isReversed
                        ? "order-2 h-full overflow-hidden rounded-2xl border border-slate-200 md:order-1"
                        : "order-2 h-full overflow-hidden rounded-2xl border border-slate-200"
                    }
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={branch.image}
                        alt={`Sucursal ${branch.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
