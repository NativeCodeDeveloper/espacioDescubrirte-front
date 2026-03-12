import Image from "next/image";
import Link from "next/link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

const footerLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Casos clinicos", href: "/#casos-clinicos" },
  { label: "Agenda", href: "/reserva-hora" },
  { label: "Contacto", href: "/contacto" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ortegaschmuck.cl",
    icon: Instagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/56994836980",
    icon: MessageCircle,
  },
  {
    label: "Ubicacion",
    href: "https://maps.google.com/?q=Providencia,+Santiago,+Chile",
    icon: MapPin,
  },
];

export default function FooterPremiumMedico() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/10 bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,24,29,0.55)_0%,rgba(7,8,10,0.35)_38%,rgba(0,0,0,0.95)_100%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-8 py-12 lg:grid-cols-[1.25fr_0.75fr] lg:py-16">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-15 p-1.5">
                <Image
                  src="/logodifort.png"
                  alt="Ortega & Schmuck"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div>
                <div className="min-w-0">
                  <p className="truncate text-ml font-medium uppercase tracking-[0.28em] text-white sm:text-m">
                    Ortega & Schmuck
                  </p>
                  <p className="truncate text-[8px] uppercase tracking-[0.2em] text-white/65 sm:text-[9px]">
                    Odontología y Medicina Estética.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 tracking-[0.02em] text-white/72">
              Clinica especializada en armonizacion dental y facial, con protocolos
              personalizados para resultados naturales, seguros y medibles.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="tel:+56994836980"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.1em] text-white/85 transition hover:bg-white/[0.1] hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +56 9 9483 6980
              </a>
              <a
                href="https://wa.me/56994836980"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs tracking-[0.1em] text-white/85 transition hover:bg-white/[0.1] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp directo
              </a>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">Navegacion</p>
              <nav aria-label="Links del pie de pagina" className="mt-4">
                <ul className="flex flex-wrap gap-3">
                  {footerLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="inline-flex rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white/70 transition hover:border-white/30 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] text-white/80 transition hover:scale-105 hover:border-white/35 hover:bg-white/[0.1] hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/58">Ubicacion</p>
            <h4 className="mt-3 text-xl font-light tracking-[0.02em]">
              Providencia, Santiago de Chile
            </h4>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Atencion con agenda previa. Estamos cerca de los principales accesos de Providencia.
            </p>

            <a
              href="https://maps.google.com/?q=Providencia,+Santiago,+Chile"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/90"
            >
              <MapPin className="h-4 w-4" />
              Abrir en Google Maps
            </a>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Mapa ubicacion Ortega & Schmuck"
                src="https://www.google.com/maps?q=Providencia%2C%20Santiago%2C%20Chile&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[240px] w-full"
              />
            </div>
          </aside>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[11px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ortega & Schmuck. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://www.nativecode.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/72 transition hover:text-white"
            >
              NativeCode.cl
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
