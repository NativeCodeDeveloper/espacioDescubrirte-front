import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const RESERVA_HREF = "/agendaProfesionales";

export default function ProvidenciaLotaPage() {
  return (
    <main className="bg-[#f7f2ea] text-slate-900">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-16 pt-24 md:grid-cols-2 md:px-10 md:pb-20 md:pt-28 xl:px-12">
        <RevealOnScroll className="contents">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Sucursal</p>
          <h1 className="mt-4 text-4xl font-light leading-tight sm:text-5xl">
            Providencia - Lota 2257
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">
            Lota 2257, Providencia, Santiago
          </p>
          <p className="mt-6 text-sm leading-7 text-slate-600">
            Sucursal Los Leones, a pasos de estacion Los Leones, con 2 estacionamientos
            gratuitos sujetos a disponibilidad. Un entorno moderno y comodo para tus sesiones
            de terapia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={RESERVA_HREF}
              className="rounded-full bg-emerald-700 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-600"
            >
              Ir a agenda
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
              src="/lota3.webp"
              alt="Sucursal Providencia Lota"
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Boxes</p>
          <h2 className="mt-4 text-2xl font-light text-slate-900">Boxes disponibles</h2>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-700" />
              <div>
                <p className="font-semibold text-slate-900">Box 1</p>
                <p className="mt-1">
                  Espacio pensado para terapias individuales y familiares, disenado con
                  enfoque en la modernidad, la comodidad y la iluminacion.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-700" />
              <div>
                <p className="font-semibold text-slate-900">Box 2</p>
                <p className="mt-1">
                  Box hibrido para terapia de adultos y con ninos. Un espacio acogedor y
                  estimulante que fomenta la creatividad y el bienestar.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-700" />
              <div>
                <p className="font-semibold text-slate-900">Box 3</p>
                <p className="mt-1">
                  Espacio intimo y acogedor, disenado con enfoque en la comodidad y privacidad
                  para sesiones mas intimas.
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
            Lota 2257, Providencia, Santiago.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Mapa sucursal Providencia Lota"
              src="https://www.google.com/maps?q=Lota%202257%2C%20Providencia%2C%20Santiago%2C%20Chile&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[260px] w-full"
            />
          </div>
          <a
            href="https://maps.google.com/?q=Lota%202257%2C%20Providencia%2C%20Santiago%2C%20Chile"
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
