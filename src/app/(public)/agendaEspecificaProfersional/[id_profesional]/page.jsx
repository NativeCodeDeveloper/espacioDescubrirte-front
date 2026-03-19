"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import { useAgenda } from "@/ContextosGlobales/AgendaContext";
import Link from "next/link";
import ShadcnButton2 from "@/Componentes/shadcnButton2";
import { toast } from "react-hot-toast";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";

function formatDateToYMD(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// Dado un Date, retorna { lunes, sabado } como Date de esa semana (Lun-Sáb)
function getWeekBounds(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const dayOfWeek = d.getDay(); // 0=dom, 1=lun ... 6=sáb
    // Si es domingo (0), pertenece a la semana anterior (lun-sáb previo)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const lunes = new Date(d);
    lunes.setDate(d.getDate() + diffToMonday);
    const sabado = new Date(lunes);
    sabado.setDate(lunes.getDate() + 5);
    return { lunes, sabado };
}

function isSameWeek(dateA, dateB) {
    const wA = getWeekBounds(dateA);
    const wB = getWeekBounds(dateB);
    return wA.lunes.getTime() === wB.lunes.getTime();
}

function formatWeekRange(lunes, sabado) {
    const opts = { day: 'numeric', month: 'short' };
    return `Lun ${lunes.toLocaleDateString('es-CL', opts)} - Sáb ${sabado.toLocaleDateString('es-CL', opts)}`;
}

function getWeekKey(dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    const { lunes } = getWeekBounds(d);
    return formatDateToYMD(lunes);
}

function agruparPorSemana(horas) {
    const grupos = {};
    for (const slot of horas) {
        const key = getWeekKey(slot.fecha);
        if (!grupos[key]) grupos[key] = [];
        grupos[key].push(slot);
    }
    return Object.entries(grupos)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([mondayStr, slots]) => {
            const monday = new Date(mondayStr + "T12:00:00");
            const { lunes, sabado } = getWeekBounds(monday);
            return { lunes, sabado, mondayKey: mondayStr, slots };
        });
}

export default function CalendarioMensualHoras() {
    const { id_profesional } = useParams();
    const [nombreProfesional, setNombreProfesional] = useState("");
    const [mesActual, setMesActual] = useState(new Date());
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const lastManualUpdateRef = useRef(0);
    const API = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();

    function formularioReservaProfesional(id_profesional) {
        router.push(`/formularioReservaProfesional/${id_profesional}`);
    }

    useEffect(() => {
        async function obtenerNombreProfesional() {
            try {
                const res = await fetch(`${API}/profesionales/seleccionarProfesional`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_profesional })
                });
                const data = await res.json();
                if (data && data[0]?.nombreProfesional) {
                    setNombreProfesional(data[0].nombreProfesional);
                }
            } catch (err) {
                console.error("Error obteniendo nombre profesional:", err);
            }
        }
        if (id_profesional) obtenerNombreProfesional();
    }, [id_profesional]);

    const {
        horaInicio, setHoraInicio,
        setHoraFin,
        setFechaInicio,
        setFechaFinalizacion,
        horasSeleccionadas,
        agregarHora,
        eliminarHora,
        limpiarHoras,
    } = useAgenda();


    /* ---------- utilidades ---------- */
    const generarDiasMes = () => {
        const year = mesActual.getFullYear();
        const month = mesActual.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0=domingo
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dias = [];
        for (let i = 0; i < firstDay; i++) dias.push(null);
        for (let d = 1; d <= daysInMonth; d++) dias.push(new Date(year, month, d));
        return dias;
    };

    const attentionSlots = useMemo(() => {
        if (!fechaSeleccionada) return [];

        const dayOfWeek = fechaSeleccionada.getDay();
        if (dayOfWeek === 0) return [];

        const slots = [];
        const startMinutes = 9 * 60;
        const endMinutes = 22 * 60;
        let cursor = startMinutes;

        const minutesToHHMM = (min) => {
            const hh = Math.floor(min / 60);
            const mm = min % 60;
            return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
        };

        while (cursor + 60 <= endMinutes) {
            const attStart = cursor;
            const attEnd = cursor + 60;
            slots.push({ start: minutesToHHMM(attStart), end: minutesToHHMM(attEnd) });
            cursor = attEnd + 10;
        }

        return slots;
    }, [fechaSeleccionada]);

    const addMinutesToHHMM = (hhmm, minutesToAdd) => {
        const [hh, mm] = hhmm.split(":").map(Number);
        const total = hh * 60 + mm + minutesToAdd;
        const newH = Math.floor(total / 60);
        const newM = total % 60;
        return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
    };

    const hhmmToMinutes = (hhmm) => {
        const [hh, mm] = hhmm.split(":").map(Number);
        return (hh * 60) + mm;
    };

    // Verificar si un slot ya está seleccionado en horasSeleccionadas
    const isSlotSelected = (fecha, horaStart) => {
        const fechaYMD = formatDateToYMD(fecha);
        return horasSeleccionadas.some(s => s.fecha === fechaYMD && s.horaInicio === horaStart);
    };

    // Verificar si un día tiene slots seleccionados
    const dayHasSelections = (dia) => {
        const fechaYMD = formatDateToYMD(dia);
        return horasSeleccionadas.some(s => s.fecha === fechaYMD);
    };

    // Semanas agrupadas para multi-semana
    const semanasAgrupadas = useMemo(() => {
        return agruparPorSemana(horasSeleccionadas);
    }, [horasSeleccionadas]);

    /* ---------- handlers ---------- */
    const seleccionarFecha = (fecha) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const day = new Date(fecha);
        day.setHours(0, 0, 0, 0);

        if (day < today) {
            toast.error("No puedes agendar en fechas pasadas");
            return;
        }

        const dayOfWeek = fecha.getDay();
        if (dayOfWeek === 0) {
            toast.error("Las atenciones son de Lunes a Sábado.\nLun-Sáb: 9:00-22:00", {
                duration: 4000,
                style: {
                    background: '#FEE2E2',
                    color: '#991B1B',
                    border: '1px solid #FCA5A5',
                }
            });
            return;
        }

        setFechaSeleccionada(fecha);
    };

    const toggleSlot = (hora) => {
        if (!fechaSeleccionada) return;

        const fechaYMD = formatDateToYMD(fechaSeleccionada);

        // Si ya está seleccionado, deseleccionar
        const existingIndex = horasSeleccionadas.findIndex(
            s => s.fecha === fechaYMD && s.horaInicio === hora
        );
        if (existingIndex !== -1) {
            eliminarHora(existingIndex);
            return;
        }

        // Bloquear horas pasadas si la fecha seleccionada es hoy
        const today = new Date();
        const day = new Date(fechaSeleccionada);
        today.setHours(0, 0, 0, 0);
        day.setHours(0, 0, 0, 0);
        const isToday = day.getTime() === today.getTime();
        if (isToday) {
            const now = new Date();
            const nowMinutes = (now.getHours() * 60) + now.getMinutes();
            const slotStartMinutes = hhmmToMinutes(hora);
            if (slotStartMinutes < nowMinutes) {
                toast.error("No puedes agendar una hora que ya pasó");
                return;
            }
        }

        const horaFinAuto = addMinutesToHHMM(hora, 60);
        agregarHora({ fecha: fechaYMD, horaInicio: hora, horaFin: horaFinAuto });

        lastManualUpdateRef.current = Date.now();
    };

    const dias = generarDiasMes();

    const [blockedHours, setBlockedHours] = useState(new Set());
    const [checkingBlocked, setCheckingBlocked] = useState(false);
    const [checkSummary, setCheckSummary] = useState({ blocked: 0, total: 0 });

    async function validarFechaDisponible(fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, showToast = false, id_profesional) {
        try {
            if (!fechaInicio || !fechaFinalizacion || !horaInicio || !horaFinalizacion) {
                if (showToast) toast.error('Debe seleccionar fecha y hora para validar disponibilidad');
                return false;
            }

            const res = await fetch(`${API}/reservaPacientes/validar`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, id_profesional })
            });

            let respuestaBackend;
            try {
                respuestaBackend = await res.json();
            } catch (err) {
                respuestaBackend = null;
            }

            const status = res.status;

            if (respuestaBackend && respuestaBackend.message === true) return {
                available: true, status, body: respuestaBackend, error: false
            };
            if (respuestaBackend && respuestaBackend.message === false) return {
                available: false, status, body: respuestaBackend, error: false
            };

            if (res.ok) return { available: true, status, body: respuestaBackend, error: false };

            if (!res.ok) {
                if (showToast) toast.error('No hay respuesta válida del servidor');
                return { available: false, status, body: respuestaBackend, error: false };
            }
        } catch (error) {
            if (showToast) toast.error('Error de red al validar disponibilidad');
            console.error('validarFechaDisponible error:', error);
            return { available: true, status: 0, body: null, error: true };
        }
    }

    useEffect(() => {
        let mounted = true;
        const checkStart = Date.now();

        async function checkBlocked() {
            if (!fechaSeleccionada) {
                if (mounted) setBlockedHours(new Set());
                return;
            }

            setCheckingBlocked(true);
            const fechaYMD = formatDateToYMD(fechaSeleccionada);

            try {
                const attentionEntries = attentionSlots;
                const limit = 6;
                const checks = [];

                for (let i = 0; i < attentionEntries.length; i += limit) {
                    const batch = attentionEntries.slice(i, i + limit);
                    const batchResults = await Promise.all(batch.map(async (entry) => {
                        const result = await validarFechaDisponible(fechaYMD, entry.start, fechaYMD, entry.end, false, id_profesional);
                        return { h: entry.start, ...result };
                    }));
                    checks.push(...batchResults);
                }

                if (!mounted) return;

                const blocked = new Set(checks.filter(c => c.available === false).map(c => c.h));

                if (lastManualUpdateRef.current > checkStart) {
                    console.debug('checkBlocked result skipped because of manual update');
                } else {
                    setBlockedHours(blocked);
                    setCheckSummary({ blocked: blocked.size, total: attentionEntries.length });
                }

                // Si alguna hora seleccionada quedó bloqueada, eliminarla
                horasSeleccionadas.forEach((sel, idx) => {
                    if (sel.fecha === fechaYMD && blocked.has(sel.horaInicio)) {
                        eliminarHora(idx);
                        toast.error(`La hora ${sel.horaInicio} ya no está disponible`);
                    }
                });

            } catch (e) {
                if (mounted) setBlockedHours(new Set());
            } finally {
                if (mounted) setCheckingBlocked(false);
            }
        }

        checkBlocked();

        return () => { mounted = false; }
    }, [fechaSeleccionada, attentionSlots]);

    /* ---------- UI ---------- */
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl">
                <header className="mb-6 flex flex-col items-center gap-2 text-center">
                    <div
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Agenda · Online
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black tracking-widest">
                        <span className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 text-transparent bg-clip-text">{nombreProfesional || "Cargando..."}</span>
                        <span className="relative mt-1 block h-1 w-40 max-w-full rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-transparent" />
                    </h1>

                    <p className="max-w-md text-sm leading-6 text-slate-500">
                        Selecciona fecha y los bloques horarios que necesites por semana.
                    </p>
                </header>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-900/5 backdrop-blur supports-[backdrop-filter]:bg-white/70 text-slate-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-800">Agenda mensual</h2>
                        <span className="text-[12px] text-slate-500">Selecciona un día</span>
                    </div>
                    <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* Navegación mes */}
                    <div className="mt-3 flex items-center justify-between">
                        <button
                            className="rounded-lg border border-gray-900 bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white shadow-md shadow-slate-900/5 hover:bg-gray-800 active:scale-[0.98] hover:shadow-lg hover:shadow-slate-900/10"
                            onClick={() => {
                                setMesActual(new Date(mesActual.setMonth(mesActual.getMonth() - 1)));
                                setFechaSeleccionada(null);
                            }}
                        >
                            &larr;
                        </button>
                        <strong className="capitalize text-sm font-semibold text-slate-800">
                            {mesActual.toLocaleString("es-CL", { month: "long", year: "numeric" })}
                        </strong>
                        <button
                            className="rounded-lg border border-gray-900 bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white shadow-md shadow-slate-900/5 hover:bg-gray-800 active:scale-[0.98] hover:shadow-lg hover:shadow-slate-900/10"
                            onClick={() => {
                                setMesActual(new Date(mesActual.setMonth(mesActual.getMonth() + 1)));
                                setFechaSeleccionada(null);
                            }}
                        >
                            &rarr;
                        </button>
                    </div>

                    {/* calendario */}
                    <div className="mt-4 grid grid-cols-7 gap-2 rounded-xl bg-slate-900/[0.02] p-2 ring-1 ring-slate-900/5">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, idx) => (
                            <strong key={`weekday-${idx}`}
                                className="text-center text-xs font-semibold text-slate-500">{d}</strong>
                        ))}

                        {dias.map((dia, i) =>
                            dia ? (() => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const day = new Date(dia);
                                day.setHours(0, 0, 0, 0);
                                const isPastDay = day < today;
                                const isSunday = dia.getDay() === 0;
                                const isDisabled = isPastDay || isSunday;
                                const isSelected = fechaSeleccionada?.toDateString() === dia.toDateString();
                                const hasSelections = dayHasSelections(dia);

                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        disabled={isDisabled}
                                        onClick={() => {
                                            if (isDisabled) return;
                                            seleccionarFecha(dia);
                                        }}
                                        className={
                                            "relative h-10 flex items-center justify-center rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 " +
                                            (isDisabled
                                                ? "cursor-not-allowed border border-slate-200/70 bg-white/60 text-slate-400 shadow-sm" + (isSunday ? " opacity-50" : "")
                                                : isSelected
                                                    ? "border border-gray-900 bg-gray-900 text-white shadow-md shadow-gray-900/10"
                                                    : hasSelections
                                                        ? "border border-green-400 bg-green-50 text-green-800 shadow-sm hover:bg-green-100 hover:shadow-md"
                                                        : "border border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:bg-white hover:border-gray-400 hover:shadow-md hover:shadow-slate-900/5")
                                        }
                                    >
                                        {dia.getDate()}
                                        {hasSelections && (
                                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-500 text-[8px] font-bold text-white">
                                                {horasSeleccionadas.filter(s => s.fecha === formatDateToYMD(dia)).length}
                                            </span>
                                        )}
                                    </button>
                                );
                            })() : (
                                <div key={i} />
                            )
                        )}
                    </div>

                    {/* Indicador de semanas y contador */}
                    {horasSeleccionadas.length > 0 && semanasAgrupadas.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {semanasAgrupadas.map((semana) => (
                                <div key={semana.mondayKey}
                                     className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                                    <span className="text-xs font-medium text-green-700">
                                        {formatWeekRange(semana.lunes, semana.sabado)}
                                    </span>
                                    <span className="text-xs font-semibold text-green-800">
                                        {semana.slots.length} {semana.slots.length === 1 ? 'hora' : 'horas'}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center justify-end px-1">
                                <span className="text-xs font-bold text-slate-700">
                                    Total: {horasSeleccionadas.length} {horasSeleccionadas.length === 1 ? 'hora' : 'horas'}
                                    {semanasAgrupadas.length > 1 && ` en ${semanasAgrupadas.length} semanas`}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Horarios */}
                    {fechaSeleccionada && (
                        <div className="mt-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Agenda (09:00-22:00)
                                </h3>
                                <div className="flex items-center gap-3">
                                    <p className="text-xs text-slate-500">Bloques de 60 min</p>
                                    {checkingBlocked && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <svg className="w-3 h-3 animate-spin text-slate-500"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                    stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                            </svg>
                                            <span>Comprobando disponibilidad...</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-3 space-y-2 max-h-96 overflow-y-auto pr-1 rounded-xl bg-slate-900/[0.02] p-2 ring-1 ring-slate-900/5">
                                {attentionSlots
                                    .filter((entry) => {
                                        const isBlocked = blockedHours.has(entry.start);

                                        const isTodaySelected = (() => {
                                            if (!fechaSeleccionada) return false;
                                            const today = new Date();
                                            const day = new Date(fechaSeleccionada);
                                            today.setHours(0, 0, 0, 0);
                                            day.setHours(0, 0, 0, 0);
                                            return day.getTime() === today.getTime();
                                        })();

                                        const isPastHour = (() => {
                                            if (!isTodaySelected) return false;
                                            const now = new Date();
                                            const nowMinutes = (now.getHours() * 60) + now.getMinutes();
                                            const slotStartMinutes = hhmmToMinutes(entry.start);
                                            return slotStartMinutes < nowMinutes;
                                        })();

                                        return !isBlocked && !isPastHour;
                                    })
                                    .map((entry) => {
                                        const selected = isSlotSelected(fechaSeleccionada, entry.start);

                                        return (
                                            <div key={entry.start}
                                                className={"flex items-center justify-between rounded-xl border p-3 shadow-sm hover:shadow-md hover:shadow-slate-900/5 transition " + (selected ? "bg-green-50 border-green-300" : "bg-white/90 border-slate-200")}>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-800">Atención</div>
                                                    <div className="text-xs text-slate-500">{entry.start} - {entry.end}</div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => toggleSlot(entry.start)}
                                                        className={
                                                            "px-3 py-1 rounded-lg font-semibold shadow-sm transition active:scale-[0.98] " +
                                                            (selected
                                                                ? 'bg-green-600 text-white shadow-md hover:bg-red-500'
                                                                : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md hover:shadow-slate-900/5')
                                                        }
                                                    >
                                                        {selected ? 'Quitar' : 'Seleccionar'}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}

                                {attentionSlots.filter((entry) => {
                                    const isBlocked = blockedHours.has(entry.start);
                                    const isTodaySelected = (() => {
                                        if (!fechaSeleccionada) return false;
                                        const today = new Date();
                                        const day = new Date(fechaSeleccionada);
                                        today.setHours(0, 0, 0, 0);
                                        day.setHours(0, 0, 0, 0);
                                        return day.getTime() === today.getTime();
                                    })();
                                    const isPastHour = (() => {
                                        if (!isTodaySelected) return false;
                                        const now = new Date();
                                        const nowMinutes = (now.getHours() * 60) + now.getMinutes();
                                        const slotStartMinutes = hhmmToMinutes(entry.start);
                                        return slotStartMinutes < nowMinutes;
                                    })();
                                    return !isBlocked && !isPastHour;
                                }).length === 0 && (
                                        <div className="text-center py-8 text-red-500">
                                            <p className="text-sm">No hay horarios disponibles para esta fecha</p>
                                            <p className="text-xs mt-1">Por favor selecciona otra fecha</p>
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    {/* Panel resumen de selecciones agrupado por semana */}
                    {horasSeleccionadas.length > 0 && (
                        <div className="mt-5">
                            <h3 className="text-sm font-semibold text-slate-800 mb-2">Horas seleccionadas ({horasSeleccionadas.length})</h3>
                            <div className="space-y-3">
                                {semanasAgrupadas.map((semana) => (
                                    <div key={semana.mondayKey} className="rounded-xl border border-green-200 bg-green-50/50 p-3">
                                        <div className="mb-2 text-xs font-semibold text-green-700">
                                            {formatWeekRange(semana.lunes, semana.sabado)} ({semana.slots.length} {semana.slots.length === 1 ? 'hora' : 'horas'})
                                        </div>
                                        <div className="space-y-2">
                                            {semana.slots.map((sel, idx) => {
                                                const fechaDate = new Date(sel.fecha + "T12:00:00");
                                                const diaLabel = fechaDate.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' });
                                                const globalIdx = horasSeleccionadas.findIndex(
                                                    s => s.fecha === sel.fecha && s.horaInicio === sel.horaInicio
                                                );
                                                return (
                                                    <div key={`${sel.fecha}-${sel.horaInicio}`}
                                                        className="flex items-center justify-between rounded-lg border border-green-200 bg-white px-3 py-2">
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                                                                {idx + 1}
                                                            </span>
                                                            <div>
                                                                <span className="text-sm font-medium text-slate-800 capitalize">{diaLabel}</span>
                                                                <span className="mx-2 text-slate-400">|</span>
                                                                <span className="text-sm text-slate-600">{sel.horaInicio} - {sel.horaFin}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => eliminarHora(globalIdx)}
                                                            className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-600 transition"
                                                            title="Eliminar"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <br />

                <div className="flex gap-5 justify-center">
                    <Link href={"/agendaProfesionales"}>
                        <ShadcnButton2 nombre={"RETROCEDER"} />
                    </Link>

                    <ShadcnButton2
                        nombre={"SIGUIENTE"}
                        funcion={() => {
                            if (horasSeleccionadas.length === 0) {
                                toast.error("Selecciona al menos 1 hora para continuar");
                                return;
                            }
                            formularioReservaProfesional(id_profesional);
                        }}
                    />
                </div>

                <footer className="mt-10 text-center text-xs text-slate-600">
                    <p>
                        Sucursales adaptadas y personalizada para que tus pacientes se sientan en casa.
                    </p>
                    <p className="mt-2 text-[11px] text-slate-400">
                        Horarios: Lun-Sáb 9:00-22:00 | Dom Cerrado
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2 text-[10px] text-slate-500">
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">1-3 hrs/semana: $7.000/hr</span>
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">4 hrs/semana: $6.000/hr</span>
                        <span className="rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-1 text-emerald-800 font-medium">5+ hrs/semana: $5.500/hr</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
