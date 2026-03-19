import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const RESERVA_HREF = "/agendaProfesionales";

export default function AntofagastaPage() {
  return (
    <main className="bg-[#f7f2ea] text-slate-900">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-16 pt-24 md:grid-cols-2 md:px-10 md:pb-20 md:pt-28 xl:px-12">
        <RevealOnScroll className="contents">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Sucursal</p>
          <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
            Antofagasta - Angamos 193
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">
            Av. Angamos 193, Antofagasta
          </p>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            Sucursal Angamos en segundo piso. Box pensado para terapias individuales y
            familiares, con un ambiente tranquilo para la atencion de pacientes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={RESERVA_HREF}
              className="rounded-full bg-emerald-700 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-600"
            >
              Agendar un Box
            </Link>
            <Link
              href="/servicios"
              className="rounded-full border border-emerald-200 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900 transition hover:border-emerald-300"
            >
              Ver servicios
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.25)]">
          <div className="relative aspect-[4/3]">
            <Image
              src="/antofa.webp"
              alt="Sucursal Antofagasta"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>
        </RevealOnScroll>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 xl:px-12">
        <RevealOnScroll>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.25)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Box</p>
          <h2 className="mt-4 text-2xl font-light text-slate-900">Box disponible</h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-700" />
              <div>
                <p className="font-semibold text-slate-900">Box 1</p>
                <p className="mt-1">
                  Espacio pensado para terapias individuales y familiares.
                </p>
              </div>
            </li>
          </ul>
        </div>
        </RevealOnScroll>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 xl:px-12">
        <RevealOnScroll>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_55px_-40px_rgba(15,23,42,0.25)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Ubicacion</p>
          <h2 className="mt-4 text-2xl font-light text-slate-900">Mapa de la sucursal</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Av. Angamos 193, Antofagasta.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Mapa sucursal Antofagasta"
              src="https://www.google.com/maps?q=Av.%20Angamos%20193%2C%20Antofagasta%2C%20Chile&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[260px] w-full"
            />
          </div>
          <a
            href="https://maps.google.com/?q=Av.%20Angamos%20193%2C%20Antofagasta%2C%20Chile"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full border border-emerald-700 bg-emerald-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-600"
          >
            Ver en Google Maps
          </a>
        </div>
        </RevealOnScroll>
      </section>
    </main>
  );
}
