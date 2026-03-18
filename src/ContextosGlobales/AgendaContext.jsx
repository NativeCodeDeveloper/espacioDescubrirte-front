"use client"

import {createContext, useContext, useState} from "react";

const AgendaContext = createContext(null);

export default function AgendaProvider({children}) {
    // guardamos todo en un único objeto para mantener la forma solicitada
    const [agenda, setAgenda] = useState({
        fechaInicio: "",
        horaInicio: "",
        fechaFinalizacion: "",
        horaFinalizacion: "",
    });

    // Multi-slot: array de { fecha, horaInicio, horaFin }
    const [horasSeleccionadas, setHorasSeleccionadas] = useState([]);

    const setFechaInicio = (fechaStr) => setAgenda(prev => ({...prev, fechaInicio: fechaStr}));
    const setHoraInicio = (horaStr) => setAgenda(prev => ({...prev, horaInicio: horaStr}));
    const setFechaFinalizacion = (fechaStr) => setAgenda(prev => ({...prev, fechaFinalizacion: fechaStr}));
    const setHoraFinalizacion = (horaStr) => setAgenda(prev => ({...prev, horaFinalizacion: horaStr}));

    const agregarHora = (slot) => {
        setHorasSeleccionadas(prev => {
            if (prev.length >= 4) return prev;
            // evitar duplicados
            const existe = prev.some(s => s.fecha === slot.fecha && s.horaInicio === slot.horaInicio);
            if (existe) return prev;
            return [...prev, slot];
        });
    };

    const eliminarHora = (index) => {
        setHorasSeleccionadas(prev => prev.filter((_, i) => i !== index));
    };

    const limpiarHoras = () => {
        setHorasSeleccionadas([]);
    };

    const value = {
        // valores (strings)
        fechaInicio: agenda.fechaInicio,
        horaInicio: agenda.horaInicio,
        fechaFinalizacion: agenda.fechaFinalizacion,
        horaFinalizacion: agenda.horaFinalizacion,

        // setters nombrados
        setFechaInicio,
        setHoraInicio,
        setFechaFinalizacion,
        setHoraFinalizacion,

        // backward-compatibility aliases (mantener variables antiguas usadas en la app)
        horaFin: agenda.horaFinalizacion,
        setHoraFin: setHoraFinalizacion,

        // Multi-slot
        horasSeleccionadas,
        agregarHora,
        eliminarHora,
        limpiarHoras,
    };
    return (
        <AgendaContext.Provider value={value}>
            {children}
        </AgendaContext.Provider>
    )

}

export function useAgenda() {
    const contexto = useContext(AgendaContext);
    if (!contexto) {
        throw new Error("Ha ocurrido un problema con el uso del contexto global de AgendaContext");
    } else {
        return contexto;
    }
}
