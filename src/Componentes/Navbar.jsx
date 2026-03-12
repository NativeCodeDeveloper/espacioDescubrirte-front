"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Casos clinicos", href: "/#casos-clinicos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(116,120,127,0.42)_0%,rgba(41,43,47,0.58)_45%,rgba(4,4,5,0.76)_100%)] backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 md:h-24 md:px-8 lg:px-6">

        {/* Logo */}
        <Link href="/#inicio" aria-label="Ir al inicio" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20">
            <Image
              src="/logodifort.png"
              alt="Ortega & Schmuck"
              fill
              priority
              sizes="(max-width: 640px) 40px, (max-width: 768px) 56px, 80px"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium uppercase tracking-[0.2em] text-white sm:text-sm sm:tracking-[0.28em]">
              Ortega & Schmuck
            </p>
            <p className="hidden truncate text-[8px] uppercase tracking-[0.2em] text-white/65 sm:block sm:text-[9px]">
              Odontología y Medicina Estética.
            </p>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-12">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acciones */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/agendaProfesionales"
            aria-label="Agendar hora"
            className="hidden rounded-full border border-white/25 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition duration-300 ease-out hover:bg-white/90 sm:inline-flex sm:px-5 sm:py-2.5 sm:text-xs"
          >
            Agendar hora
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 sm:h-10 sm:w-10 lg:hidden"
          >
            {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      {/* Menu móvil */}
      <div
        className={[
          "overflow-hidden border-t border-white/10 bg-black/90 backdrop-blur-xl lg:hidden",
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
          "transition-all duration-300 ease-out",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:gap-2 sm:px-5 sm:py-5 md:px-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-transparent px-4 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/85 transition duration-300 hover:border-white/15 hover:bg-white/10 sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/agendaProfesionales"
            onClick={() => setIsOpen(false)}
            aria-label="Agendar hora desde menu movil"
            className="mt-2 rounded-lg border border-white/25 bg-white px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition duration-300 hover:bg-white/90 sm:text-xs"
          >
            Agendar hora
          </Link>
        </div>
      </div>
    </header>
  );
}
