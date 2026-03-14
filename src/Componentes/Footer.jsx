import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, Mail } from "lucide-react";

const footerLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Sucursales", href: "/#sucursales" },
  { label: "Como reservar", href: "/#como-reservar" },
  { label: "Por que elegirnos", href: "/#por-que-elegirnos" },
  { label: "Servicios", href: "/servicios" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/espacio.descubrirte",
    icon: Instagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/56971237451",
    icon: MessageCircle,
  },
];

export default function FooterPremiumMedico() {
  return (
    <footer id="footer" className="relative bg-[#f7f2ea] text-emerald-900">
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-16">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-20">
                <Image
                  src="/logoespacio.png"
                  alt="Espacio Descubrirte"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="truncate text-xs font-semibold uppercase tracking-[0.28em] text-emerald-900 sm:text-sm">
                  Espacio Descubrirte
                </p>
                <p className="truncate text-[9px] uppercase tracking-[0.2em] text-emerald-700">
                  Boxes profesionales para terapia
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-800">
              Arriendo de boxes equipados y silenciosos para psicologos, terapeutas y coaches.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-emerald-900">
              <a
                href="https://wa.me/56971237451"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-emerald-900 transition hover:text-emerald-700"
              >
                <MessageCircle className="h-4 w-4" />
                +56 9 7123 7451
              </a>
              <a
                href="mailto:contacto@descubrirte.cl"
                className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-emerald-900 transition hover:text-emerald-700"
              >
                <Mail className="h-4 w-4" />
                contacto@descubrirte.cl
              </a>
            </div>

            <nav aria-label="Links del pie de pagina" className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Navegacion</p>
              <ul className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em] text-emerald-900">
                {footerLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-emerald-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-wrap gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200/60 text-emerald-900 transition hover:border-emerald-300 hover:text-emerald-700"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <aside>
            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700">Contacto directo</p>
            <h4 className="mt-3 text-xl font-light tracking-[0.02em] text-emerald-900">
              Agenda tu box cuando lo necesites
            </h4>
            <p className="mt-3 text-sm leading-7 text-emerald-800">
              Escríbenos para coordinar horarios, disponibilidad y tarifas segun tu sede.
            </p>
            <Link
              href="/agendaProfesionales"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700 bg-emerald-700 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-600"
            >
              Ir a agenda
            </Link>
          </aside>
        </div>

        <div className="flex flex-col gap-3 py-6 text-[11px] text-emerald-700 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Espacio Descubrirte. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://www.nativecode.cl/"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-800 transition hover:text-emerald-900"
            >
              NativeCode.cl
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
