"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "", href: "/#inicio" },
  { label: "Por que elegirnos", href: "/#por-que-elegirnos" },
  { label: "Servicios", href: "/servicios" },
];

const branchItems = [
  {
    label: "Providencia",
    href: "/sucursales/providencia-lota",
  },
  {
    label: "Pedro de Valdivia",
    href: "/sucursales/nueva-providencia",
  },
  {
    label: "Antofagasta",
    href: "/sucursales/antofagasta",
  },
];

const RESERVA_HREF = "/agendaProfesionales";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);
  const branchesRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!branchesRef.current) return;
      if (!branchesRef.current.contains(event.target)) {
        setIsBranchesOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsBranchesOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const headerClass = scrolled
    ? "border-slate-200 bg-[#f7f2ea]/90"
    : "border-transparent bg-transparent";
  const navLinkClass = "text-emerald-900 hover:text-emerald-700";
  const chevronClass = "text-emerald-700 group-hover:text-emerald-900";
  const ctaClass = "border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-600";
  const iconButtonClass = "border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50";
  const brandClass = "text-emerald-900";
  const brandSubClass = "text-emerald-700";

  const isActiveLink = (href) => {
    if (!href || href.startsWith("/#")) return false;
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const activeNavClass = "text-emerald-700 underline underline-offset-8";
  const activeDropdownClass = "bg-emerald-50 text-emerald-800";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300",
        headerClass,
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 md:h-24 md:px-8 lg:px-6">
        <Link href="/#inicio" aria-label="Ir al inicio" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative h-10 w-16 sm:h-12 sm:w-20 md:h-14 md:w-24">
            <Image
              src="/logoespacio.png"
              alt="Espacio Descubrirte"
              fill
              priority
              sizes="(max-width: 640px) 40px, (max-width: 768px) 56px, 72px"
              className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0">
            <p className={["truncate text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm", brandClass].join(" ")}>
              Espacio Descubrirte
            </p>
            <p className={["hidden truncate text-[9px] uppercase tracking-[0.18em] sm:block", brandSubClass].join(" ")}>
              Boxes profesionales para terapia
            </p>
          </div>
        </Link>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActiveLink(item.href) ? "page" : undefined}
                  className={[
                    "text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                    navLinkClass,
                    isActiveLink(item.href) ? activeNavClass : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="relative" ref={branchesRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isBranchesOpen}
                onClick={() => setIsBranchesOpen((prev) => !prev)}
                className={[
                  "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                  navLinkClass,
                ].join(" ")}
              >
                Sucursales
                <ChevronDown className={["h-4 w-4 transition duration-300", chevronClass].join(" ")} />
              </button>
              <div
                className={[
                  "absolute left-0 top-full z-50 mt-4 w-72 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] transition duration-200",
                  isBranchesOpen ? "visible translate-y-0 opacity-100" : "invisible",
                ].join(" ")}
              >
                {branchItems.map((branch) => (
                  <Link
                    key={branch.href}
                    href={branch.href}
                    aria-current={isActiveLink(branch.href) ? "page" : undefined}
                    onClick={() => setIsBranchesOpen(false)}
                    className={[
                      "block rounded-xl px-4 py-3 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50 hover:text-emerald-800",
                      isActiveLink(branch.href) ? activeDropdownClass : "",
                    ].join(" ")}
                  >
                    {branch.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={RESERVA_HREF}
            aria-label="Reservar box"
            className={[
              "hidden rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition duration-300 ease-out sm:inline-flex sm:px-5 sm:py-2.5 sm:text-xs",
              ctaClass,
            ].join(" ")}
          >
            Reserva
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-full border transition sm:h-10 sm:w-10 lg:hidden",
              iconButtonClass,
            ].join(" ")}
          >
            {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden",
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
          "transition-all duration-300 ease-out",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 sm:px-5 md:px-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-current={isActiveLink(item.href) ? "page" : undefined}
              className={[
                "rounded-lg border border-transparent px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-900 transition duration-300 hover:border-emerald-200 hover:bg-emerald-50",
                isActiveLink(item.href) ? "bg-emerald-50 text-emerald-800" : "",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Sucursales</p>
            <div className="mt-2 flex flex-col gap-1">
              {branchItems.map((branch) => (
                <Link
                  key={branch.href}
                  href={branch.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActiveLink(branch.href) ? "page" : undefined}
                  className={[
                    "rounded-lg px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50",
                    isActiveLink(branch.href) ? "bg-emerald-50 text-emerald-800" : "",
                  ].join(" ")}
                >
                  {branch.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={RESERVA_HREF}
            onClick={() => setIsOpen(false)}
            aria-label="Reservar box desde menu movil"
            className="mt-1 rounded-lg border border-emerald-700 bg-emerald-700 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-emerald-600"
          >
            Reserva
          </Link>
        </div>
      </div>
    </header>
  );
}
