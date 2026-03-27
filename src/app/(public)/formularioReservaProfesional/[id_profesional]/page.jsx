"use client"
import {useEffect, useState, useMemo} from "react";
import ShadcnInput from "@/Componentes/shadcnInput2";
import ShadcnButton2 from "@/Componentes/shadcnButton2";
import {useAgenda} from "@/ContextosGlobales/AgendaContext";
import {toast} from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import {SelectDinamic} from "@/Componentes/SelectDinamic";

function formatDateToYMD(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getWeekBounds(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const dayOfWeek = d.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const lunes = new Date(d);
    lunes.setDate(d.getDate() + diffToMonday);
    const sabado = new Date(lunes);
    sabado.setDate(lunes.getDate() + 5);
    return { lunes, sabado };
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

export default function FormularioReservaProfesional() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [nombrePaciente, setNombrePaciente] = useState("");
    const [apellidoPaciente, setApellidoPaciente] = useState("");
    const [rut, setRut] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const { horasSeleccionadas } = useAgenda();
    const [listaTarifasProfesionales, setListaTarifasProfesionales] = useState([]);

    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState("");
    const [servicioSeleccionado, setServicioSeleccionado] = useState("");
    const [tarifaSeleccionadaIndex, setTarifaSeleccionadaIndex] = useState("");
    const[descripcionProfesional, setDescripcionProfesional] = useState("");

    const {id_profesional} = useParams();

    const [totalPago, setTotalPago] = useState("");
    const router = useRouter();

    // --- Lógica de precios por hora con descuento ---
    // El precio base viene de la tarifa del servicio seleccionado
    const precioBaseTarifa = tarifaSeleccionadaIndex !== "" && listaTarifasProfesionales[tarifaSeleccionadaIndex]
        ? Number(listaTarifasProfesionales[tarifaSeleccionadaIndex].precio)
        : 0;

    function calcularPrecioHora(cantidadHoras, precioBase) {
        if (!precioBase) return 0;
        if (cantidadHoras >= 5) return Math.round(precioBase * 5500 / 7000);
        if (cantidadHoras === 4) return Math.round(precioBase * 6000 / 7000);
        return precioBase;
    }

    function getNombrePlan(cantidadHoras) {
        if (cantidadHoras >= 5) return "Plan Flexible";
        if (cantidadHoras === 4) return "Bloque Semanal";
        return "Horas Sueltas";
    }

    const cantidadHorasTotal = horasSeleccionadas.length;

    // Agrupar por semana para calcular precio independiente por semana
    const semanasAgrupadas = useMemo(() => agruparPorSemana(horasSeleccionadas), [horasSeleccionadas]);

    const desgloseSemanal = useMemo(() => {
        return semanasAgrupadas.map((semana) => {
            const cantidadHoras = semana.slots.length;
            const precioHora = calcularPrecioHora(cantidadHoras, precioBaseTarifa);
            const descuentoPorcentaje = precioBaseTarifa > 0 && cantidadHoras > 0
                ? Math.round(((precioBaseTarifa - precioHora) / precioBaseTarifa) * 100)
                : 0;
            const subtotal = cantidadHoras * precioHora;
            const nombrePlan = getNombrePlan(cantidadHoras);
            return { ...semana, cantidadHoras, precioHora, descuentoPorcentaje, subtotal, nombrePlan };
        });
    }, [semanasAgrupadas, precioBaseTarifa]);

    const totalCalculado = desgloseSemanal.reduce((sum, s) => sum + s.subtotal, 0);
    const ivaTotal = Math.round(totalCalculado * 0.19);
    const totalConIva = totalCalculado + ivaTotal;
    const ahorroTotal = desgloseSemanal.reduce((sum, s) => sum + (precioBaseTarifa - s.precioHora) * s.cantidadHoras, 0);

    async function seleccionarProfesionalDatos(id_profesional) {
        try {
            const res = await fetch(`${API}/profesionales/seleccionarProfesional`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json',},
                mode: 'cors',
                body: JSON.stringify({id_profesional}),
            })

            if (!res.ok) {
                return toast.error('Error al cargar los Tarifas y Servicios Profesionales, por favor intente nuevamente.');
            }else{

                const respustaBackend = await res.json();
                if(respustaBackend){
                    setProfesionalSeleccionado(respustaBackend[0].nombreProfesional);
                    setDescripcionProfesional(respustaBackend[0].descripcionProfesional);
                }else{
                    return toast.error('Error al cargar los Tarifas y Servicios Profesionales, por favor intente nuevamente .');
                }
            }
        }catch (error) {

            return toast.error('Error al cargar los tarifas y Servicios Profesionales, por favor intente nuevamente.');
        }
    }



    async function seleccionarTodasTarifasProfesionales(profesional_id) {
        try {
            const res = await fetch(`${API}/tarifasProfesional/seleccionarTarifasPorProfesional`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                'Content-Type': 'application/json',},
                mode: 'cors',
                body: JSON.stringify({profesional_id}),
            })

            if (!res.ok) {
                return toast.error('Error al cargar los Tarifas y Servicios Profesionales, por favor intente nuevamente.');
            }else{

                const respustaBackend = await res.json();
                if(respustaBackend && respustaBackend.length > 0){
                    setListaTarifasProfesionales(respustaBackend);
                    setTarifaSeleccionadaIndex(0);
                    setServicioSeleccionado(respustaBackend[0].nombreServicio);
                }else{
                    return toast.error('Error al cargar los Tarifas y Servicios Profesionales, por favor intente nuevamente .');
                }
            }
        }catch (error) {

            return toast.error('Error al cargar los tarifas y Servicios Profesionales, por favor intente nuevamente.');
        }
    }

    useEffect(() => {
        seleccionarTodasTarifasProfesionales(id_profesional);
        seleccionarProfesionalDatos(id_profesional)
    }, [id_profesional]);

    // Actualizar totalPago automáticamente cuando cambian las horas o la tarifa
    useEffect(() => {
        if (cantidadHorasTotal > 0 && precioBaseTarifa > 0) {
            setTotalPago(totalConIva);
        } else {
            setTotalPago("");
        }
    }, [cantidadHorasTotal, totalConIva, precioBaseTarifa]);


    async function pagarMercadoPago() {
        try {
            if (!nombrePaciente || !apellidoPaciente || !rut || !telefono || !email || !id_profesional) {
                return toast.error("Debe completar toda la informacion para realizar la reserva")
            }

            if (!horasSeleccionadas || horasSeleccionadas.length === 0) {
                return toast.error("Debe seleccionar al menos una hora para realizar la reserva")
            }

            if (!servicioSeleccionado) {
                return toast.error("Debe seleccionar un motivo de consulta para realizar la reserva")
            }

            if (totalPago <= 0) {
                return toast.error("El monto a pagar no es válido, seleccione un servicio y horas")
            }

            const res = await fetch(`${API}/pagosMercadoPago/create-order`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tituloProducto: `Reserva Consulta: ${servicioSeleccionado} con ${profesionalSeleccionado} (${horasSeleccionadas.length} sesión${horasSeleccionadas.length > 1 ? 'es' : ''})`,
                    precio: Number(totalPago),
                    cantidad: 1,
                    nombrePaciente,
                    apellidoPaciente,
                    rut,
                    telefono,
                    email,
                    horasSeleccionadas,
                    estadoReserva : 'reservada',
                    totalPago,
                    id_profesional
                }),
                mode: "cors",
            });

            if (!res.ok) {
                return toast.error("No se puede procesar el pago por favor evalue otro medio de pago contactandonos por WhatsApp")
            }

            const data = await res.json();

            if (data) {
                const checkoutUrl = data?.init_point;

                if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                } else {
                    return toast.error("No se puede procesar el pago. Problema a nivel del Link de init point")
                }
            } else {
                return toast.error("No se puede procesar el pago. Intenet mas tarde.")
            }
        } catch (err) {
            console.error(err);
            return toast.error("No se puede procesar el pago por favor evalue otro medio de pago contactandonos por WhatsApp")
        }
    }



    const formatoCLP = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });




    function volver(id_profesional) {
        router.push(`/agendaEspecificaProfersional/${id_profesional}`);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <header className="animate-reveal-up mb-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-slate-500 shadow-sm">
                        Reserva Online
                    </div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {profesionalSeleccionado || "Cargando..."}
                    </h1>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                        {descripcionProfesional}
                    </p>
                    <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
                </header>

                <form
                    className="animate-reveal-up-delay space-y-8 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur sm:p-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    {/* Servicio */}
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Servicio</h2>
                        <div className="mt-1 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"></div>
                        <div className="mt-4">
                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">Motivo de consulta</label>
                            <SelectDinamic
                                value={tarifaSeleccionadaIndex}
                                onChange={(e) => {
                                    const index = e.target.value;
                                    setTarifaSeleccionadaIndex(index);
                                    const tarifa = listaTarifasProfesionales[index];
                                    if (tarifa) {
                                        setServicioSeleccionado(tarifa.nombreServicio);
                                    }
                                }}
                                placeholder="Seleccione un servicio"
                                options={listaTarifasProfesionales.map((tarifa, index) => ({
                                    value: index,
                                    label: tarifa.nombreServicio
                                }))}
                                className={tarifaSeleccionadaIndex !== "" ? "border-emerald-400 bg-emerald-50/50 font-medium text-slate-900" : ""}
                            />
                        </div>
                    </div>

                    {/* Datos personales */}
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Datos personales</h2>
                        <div className="mt-1 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"></div>
                        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Nombre</label>
                                <ShadcnInput
                                    value={nombrePaciente}
                                    onChange={(e) => setNombrePaciente(e.target.value)}
                                    placeholder="Ej: Ana"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Apellido</label>
                                <ShadcnInput
                                    value={apellidoPaciente}
                                    onChange={(e) => setApellidoPaciente(e.target.value)}
                                    placeholder="Ej: Pérez"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">RUT</label>
                                <ShadcnInput
                                    value={rut}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                                        setRut(value);
                                    }}
                                    placeholder="12345678K (Sin puntos ni guion)"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Correo electrónico</label>
                                <ShadcnInput
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ejemplo@correo.cl"
                                    className="w-full"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Teléfono</label>
                                <ShadcnInput
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    placeholder="+56 9 1234 5678"
                                    className="w-full sm:max-w-xs"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resumen de citas agrupado por semana */}
                    {horasSeleccionadas.length > 0 && (
                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Resumen de tus citas ({cantidadHorasTotal} sesión{cantidadHorasTotal > 1 ? 'es' : ''}{desgloseSemanal.length > 1 ? `, ${desgloseSemanal.length} semanas` : ''})
                            </h2>
                            <div className="mt-1 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"></div>
                            <div className="mt-4 space-y-4">
                                {desgloseSemanal.map((semana, semanaIdx) => (
                                    <div key={semana.mondayKey} className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                                        {/* Header de semana */}
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                {desgloseSemanal.length > 1 ? `Semana ${semanaIdx + 1}: ` : ''}{formatWeekRange(semana.lunes, semana.sabado)}
                                            </h3>
                                            <span className="text-xs font-semibold text-slate-600">
                                                {semana.cantidadHoras} {semana.cantidadHoras === 1 ? 'hora' : 'horas'}
                                            </span>
                                        </div>

                                        {/* Slots de esta semana */}
                                        <div className="space-y-2">
                                            {semana.slots.map((sel, idx) => {
                                                const fechaDate = new Date(sel.fecha + "T12:00:00");
                                                const diaLabel = fechaDate.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
                                                return (
                                                    <div key={`${sel.fecha}-${sel.horaInicio}`} className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-800 capitalize">{diaLabel}</p>
                                                            <p className="text-xs text-slate-500">{sel.horaInicio} - {sel.horaFin}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Desglose de precio por semana */}
                                        {precioBaseTarifa > 0 && (
                                            <div className="mt-3 border-t border-slate-200 pt-3 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-white">
                                                        {semana.cantidadHoras >= 5 ? "⏳" : semana.cantidadHoras === 4 ? "📅" : "💼"}
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Plan aplicado</p>
                                                        <p className="text-sm font-semibold text-slate-800">{semana.nombrePlan}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-xs font-bold text-slate-600">/hr</div>
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Precio por hora</p>
                                                            <p className="text-sm font-semibold text-slate-700">{formatoCLP.format(semana.precioHora)}</p>
                                                        </div>
                                                        {semana.descuentoPorcentaje > 0 && (
                                                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                                                -{semana.descuentoPorcentaje}% dto.
                                                            </span>
                                                        )}
                                                        {semana.descuentoPorcentaje > 0 && (
                                                            <span className="text-xs text-slate-400 line-through">{formatoCLP.format(precioBaseTarifa)}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">$</div>
                                                    <div>
                                                        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                                                            Subtotal ({semana.cantidadHoras} {semana.cantidadHoras === 1 ? 'hora' : 'horas'} x {formatoCLP.format(semana.precioHora)})
                                                        </p>
                                                        <p className="text-lg font-bold text-emerald-700">{formatoCLP.format(semana.subtotal)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Total general */}
                                {precioBaseTarifa > 0 && (
                                    <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                                    Subtotal{desgloseSemanal.length > 1 ? ` (${desgloseSemanal.length} semanas)` : ''}
                                                </p>
                                                <p className="text-sm font-semibold text-slate-700">{formatoCLP.format(totalCalculado)}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">IVA (19%)</p>
                                                <p className="text-sm font-semibold text-slate-700">{formatoCLP.format(ivaTotal)}</p>
                                            </div>
                                            <div className="h-px w-full bg-emerald-200"></div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-medium uppercase tracking-wider text-emerald-600">Total a pagar</p>
                                                    <p className="text-2xl font-bold text-emerald-800">{formatoCLP.format(totalConIva)}</p>
                                                </div>
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">$</div>
                                            </div>
                                        </div>
                                        {ahorroTotal > 0 && (
                                            <div className="mt-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-center">
                                                <p className="text-xs font-medium text-emerald-700">
                                                    Ahorras {formatoCLP.format(ahorroTotal)} en total con tus descuentos por volumen semanal
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {precioBaseTarifa === 0 && (
                                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                                        <p className="text-xs text-amber-600 font-medium">Selecciona un motivo de consulta para ver el precio.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Acciones */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                            <ShadcnButton2 nombre={"RETROCEDER"} funcion={()=>volver(id_profesional)}/>

                        <ShadcnButton2
                            nombre={"FINALIZAR"}
                            funcion={(e) => {
                                if (e?.preventDefault) e.preventDefault();
                                if (e?.stopPropagation) e.stopPropagation();
                                return pagarMercadoPago();
                            }}
                        />
                    </div>
                </form>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Revisa que los datos sean correctos antes de confirmar tu reserva.
                </p>

            </div>
        </div>
    )
}
