'use client'
import {useState, useEffect} from "react";
import {router} from "next/client";
import {ButtonDinamic} from "@/Componentes/ButtonDinamic";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import RevealOnScroll from "@/Componentes/RevealOnScroll";



export default function AgendaProfesionales() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [listaProfesionales, setListaProfesionales] = useState([]);
    
    function irAgendaProfesional(id_profesional) {
        router.push(`/agendaEspecificaProfersional/${id_profesional}`);
    }

    async function seleccionarProfesionales() {
        try {
            const res = await fetch(`${API}/profesionales/seleccionarTodosProfesionales`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
            });

            const dataProfesionales = await res.json();
            setListaProfesionales(dataProfesionales);

        }catch(err) {
            return toast.error('No ha sido posible listar profesionales, contacte a soporte IT');
        }
    }

    useEffect(() => {
        seleccionarProfesionales()
    },[])

    return (
<div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] px-4 py-24 text-emerald-900 sm:px-6 sm:py-32 lg:px-8">

    {/* Glow de fondo */}
    <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-400/[0.08] blur-[140px]"></div>

    <div className="mx-auto max-w-4xl">

        {/* Header */}
        <RevealOnScroll className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-700/80">
                Agenda Online
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-emerald-900 sm:text-5xl lg:text-6xl">
                Nuestras sucursales
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-emerald-800/70">
                Selecciona una sucursal para ver su disponibilidad, selecciona el horario disponible, realiza el pago y listo!.
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-400/50"></div>
                <div className="h-1 w-1 rounded-full bg-emerald-500/70"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-400/50"></div>
            </div>
        </RevealOnScroll>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listaProfesionales.map((profesional, index) => (
                <RevealOnScroll
                    key={profesional.id_profesional}
                    className="w-full"
                    delayClass={index % 3 === 0 ? "delay-100" : index % 3 === 1 ? "delay-150" : "delay-200"}
                >
                    <button
                        onClick={() => irAgendaProfesional(profesional.id_profesional)}
                        className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-emerald-200/70 bg-white p-7 text-left shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_20px_50px_-20px_rgba(16,95,74,0.18)] sm:p-8"
                    >
                        {/* Glow hover */}
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/0 blur-3xl transition-all duration-500 group-hover:bg-emerald-300/20"></div>

                        {/* Línea superior decorativa */}
                        <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-emerald-600/70 to-emerald-200/30 transition-all duration-500 group-hover:w-full"></div>

                        {/* Inicial */}
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-base font-bold text-emerald-800 transition-all duration-500 group-hover:border-emerald-300 group-hover:bg-emerald-100 group-hover:text-emerald-900 group-hover:shadow-[0_0_20px_-4px_rgba(16,95,74,0.18)]">
                            {profesional.nombreProfesional?.charAt(0)}
                        </div>

                        {/* Contenido */}
                        <h2 className="mt-5 text-base font-semibold tracking-wide text-emerald-900 transition-colors duration-300 group-hover:text-emerald-800">
                            {profesional.nombreProfesional}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-emerald-800/70 transition-colors duration-300 group-hover:text-emerald-800">
                            {profesional.descripcionProfesional}
                        </p>

                        {/* CTA */}
                        <div className="mt-6 flex w-full items-center justify-between border-t border-emerald-100 pt-5">
                            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700/70 transition-colors duration-300 group-hover:text-emerald-800">
                                Ver agenda
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 transition-all duration-300 group-hover:border-emerald-300 group-hover:bg-emerald-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-700 transition-all duration-300 group-hover:translate-x-px group-hover:text-emerald-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </button>
                </RevealOnScroll>
            ))}
        </div>

    </div>
</div>
    )
}
