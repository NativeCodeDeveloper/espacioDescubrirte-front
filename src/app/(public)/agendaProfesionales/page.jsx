'use client'
import {useState, useEffect} from "react";
import {router} from "next/client";
import {ButtonDinamic} from "@/Componentes/ButtonDinamic";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";



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
<div className="relative min-h-screen overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">

    {/* Glow de fondo */}
    <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-amber-400/[0.03] blur-[120px]"></div>

    <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="animate-reveal-up text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-400/60">
                Agenda Online
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Nuestros Profesionales
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/40">
                Selecciona un profesional para ver su disponibilidad y agendar tu cita.
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/30"></div>
                <div className="h-1 w-1 rounded-full bg-amber-400/40"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/30"></div>
            </div>
        </div>

        {/* Cards */}
        <div className="animate-reveal-up-delay mt-16 grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listaProfesionales.map((profesional, index) => (
                <button
                    key={profesional.id_profesional}
                    style={{animationDelay: `${index * 150}ms`}}
                    onClick={() => irAgendaProfesional(profesional.id_profesional)}
                    className="animate-reveal-up group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 opacity-0 text-left backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-400/15 hover:shadow-[0_20px_50px_-16px_rgba(180,140,50,0.12)] sm:p-8"
                >
                    {/* Glow hover */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/0 blur-3xl transition-all duration-500 group-hover:bg-amber-400/[0.06]"></div>

                    {/* Línea superior decorativa */}
                    <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-amber-400/60 to-amber-200/20 transition-all duration-500 group-hover:w-full"></div>

                    {/* Inicial */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/10 bg-amber-400/[0.06] text-base font-bold text-amber-400/50 transition-all duration-500 group-hover:border-amber-400/20 group-hover:bg-amber-400/10 group-hover:text-amber-300 group-hover:shadow-[0_0_20px_-4px_rgba(200,160,60,0.15)]">
                        {profesional.nombreProfesional?.charAt(0)}
                    </div>

                    {/* Contenido */}
                    <h2 className="mt-5 text-base font-semibold tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white">
                        {profesional.nombreProfesional}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-white/30 transition-colors duration-300 group-hover:text-white/45">
                        {profesional.descripcionProfesional}
                    </p>

                    {/* CTA */}
                    <div className="mt-6 flex w-full items-center justify-between border-t border-white/[0.05] pt-5">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/25 transition-colors duration-300 group-hover:text-amber-400/70">
                            Ver agenda
                        </span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:border-amber-400/20 group-hover:bg-amber-400/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/25 transition-all duration-300 group-hover:translate-x-px group-hover:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </button>
            ))}
        </div>

    </div>
</div>
    )
}