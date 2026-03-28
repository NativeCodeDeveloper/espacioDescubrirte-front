'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputTextDinamic } from "@/Componentes/InputTextDinamic";
import { InputNumberDinamic } from "@/Componentes/InputNumberDinamic";
import { TextAreaDinamic } from "@/Componentes/TextAreaDinamic";
import { ButtonDinamic } from "@/Componentes/ButtonDinamic";
import { SelectDinamic } from "@/Componentes/SelectDinamic";
import ToasterClient from "@/Componentes/ToasterClient";
import toast from 'react-hot-toast';

export default function Profesionales() {
    const [listaProfesionales, setListaProfesionales] = useState([]);
    const [nombreProfesional, setNombreProfesional] = useState('');
    const [descripcionProfesional, setDescripcionProfesional] = useState('');
    const [id_profesional, setIdProfesional] = useState("");
    const API = process.env.NEXT_PUBLIC_API_URL;


    async function seleccionarTodosProfesionales() {
        try {
            const res = await fetch(`${API}/profesionales/seleccionarTodosProfesionales`, {
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            })

            if (!res.ok) {
                return toast.error('Error al cargar los profesionales, por favor intente nuevamente.');
                
            }else{
                const respustaBackend = await res.json();

                if(respustaBackend){
                    setListaProfesionales(respustaBackend);

                }else{
                    return toast.error('Error al cargar los profesionales, por favor intente nuevamente.');
                }
            }
        }catch (error) {
            return toast.error('Error al cargar los profesionales, por favor intente nuevamente.');
        }
    }

    useEffect(() => {
        seleccionarTodosProfesionales();
    }, []);


    async function seleccionarProfesional(id_profesional) {
        try {

            if(!id_profesional){
                return toast.error('Por favor seleccione un profesional para continuar con la edición.');
            }

            const res = await fetch(`${API}/profesionales/seleccionarProfesional`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({id_profesional}),
                mode: 'cors'
            })

            if (!res.ok) {
                return toast.error('Error al seleccionar el profesional, por favor intente nuevamente.');

            }else{
                const respustaBackend = await res.json();

                if(Array.isArray(respustaBackend) && respustaBackend.length > 0){
                    setNombreProfesional(respustaBackend[0].nombreProfesional);
                    setDescripcionProfesional(respustaBackend[0].descripcionProfesional);
                    setIdProfesional(respustaBackend[0].id_profesional);
                    return toast.success('Profesional seleccionado correctamente.');
                }else{
                    return toast.error('Error al seleccionar el profesional, por favor intente nuevamente.');
                }
            }
        }catch (error) {
            return toast.error('Error al seleccionar el profesional, por favor intente nuevamente.');
        }
    }



    async function eliminarProfesional(id_profesional) {
        try {
            if(!id_profesional){
                return toast.error('Por favor seleccione un profesional para continuar con la eliminacion.');
            }
            const res = await fetch(`${API}/profesionales/eliminarProfesional`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({id_profesional}),
                mode: 'cors'
            })

            if (!res.ok) {
                return toast.error('Error al eliminar el profesional, por favor intente nuevamente.');

            }else{
                const respustaBackend = await res.json();

                if(respustaBackend.message === true){
                    setNombreProfesional("");
                    setDescripcionProfesional("");
                    setIdProfesional("");
                    await seleccionarTodosProfesionales();
                    return toast.success('Profesional eliminado correctamente.');
                }else{
                    return toast.error('Error al eliminar el profesional, por favor intente nuevamente.');
                }
            }
        }catch (error) {
            return toast.error('Error al eliminar el profesional, por favor intente nuevamente.');
        }
    }





    async function insertarProfesional(nombreProfesional,descripcionProfesional) {
        try {

            if(!nombreProfesional || !descripcionProfesional){
                return toast.error('Por favor complete todos los campos para insertar el profesional.');
            }

            const res = await fetch(`${API}/profesionales/insertarProfesional`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({nombreProfesional,descripcionProfesional}),
                mode: 'cors'
            })

                if (!res.ok) {
                    return toast.error('Error al insertar el profesional, por favor intente nuevamente.');
                }else{
                    const respustaBackend = await res.json();

                    if(respustaBackend.message === true){
                        setNombreProfesional('');
                        setDescripcionProfesional('');
                        await seleccionarTodosProfesionales();
                        return toast.success('Profesional insertado correctamente.');
                    }else{
                        return toast.error('Error al insertar el profesional, por favor intente nuevamente.');
                    }
                }
        }catch (error) {
            return toast.error('Error al insertar el profesional, por favor intente nuevamente.');
        }
    }





    async function actualizarProfesional(nombreProfesional,descripcionProfesional,id_profesional) {
        try {

            if(!nombreProfesional || !descripcionProfesional || !id_profesional){
                return toast.error('Por favor complete todos los campos para actualizar el profesional.');
            }

            const res = await fetch(`${API}/profesionales/actualizarProfesional`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({nombreProfesional,descripcionProfesional,id_profesional}),
                mode: 'cors'
            })

            if (!res.ok) {
                return toast.error('Error al actualizar el profesional, por favor intente nuevamente.');
            }else{
                const respustaBackend = await res.json();

                if(respustaBackend.message === true){
                    setNombreProfesional('');
                    setDescripcionProfesional('');
                    setIdProfesional("");
                    await seleccionarTodosProfesionales();
                    return toast.success('Profesional actualizado correctamente.');

                }else{
                    return toast.error('Error al actualizar el profesional, por favor intente nuevamente.');
                }
            }
        }catch (error) {
            return toast.error('Error al actualizar el profesional, por favor intente nuevamente.');
        }
    }



    return (
        <div className="min-h-screen bg-white">
            <ToasterClient />

            <div className="mx-auto w-full max-w-6xl px-6 py-10">

                {/* Header */}
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
<<<<<<< HEAD
                            Gestión de agendas
                        </h1>
                        <p className="text-sm text-slate-500">
                            Administra las horas, los profesionales, los box y los calendarios desde una sola vista.
=======
                            Sucurales
                        </h1>
                        <p className="text-sm text-slate-500">
                            Gestión de Sucursales registradas en la plataforma
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6">

                        <div className="space-y-1">
                            <h2 className="text-base font-semibold text-slate-900">
                                Ingreso y edición
                                <span className="ml-2 text-blue-700">(Sucursal)</span>
                            </h2>
                            <p className="text-sm text-slate-500">
                                Complete los campos para registrar o actualizar una Sucursal.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-1.5">
<<<<<<< HEAD
                                <label className="text-sm font-medium text-slate-700">Nombre de la Agenda</label>
=======
                                <label className="text-sm font-medium text-slate-700">Nombre de la Sucursal</label>
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)

                                <InputTextDinamic
                                    value={nombreProfesional}
                                    onChange={(e) => setNombreProfesional(e.target.value)}
<<<<<<< HEAD
                                    placeholder="Ej: Dr. Juan Pérez, Box 1, .."
=======
                                    placeholder="Ej: Sucursal Valdivia Box 1"
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                                    className="w-full"
                                />

                                <p className="text-xs text-slate-400">Solo se permiten letras y espacios.</p>
                            </div>

                            <div className="space-y-1.5">
<<<<<<< HEAD
                                <label className="text-sm font-medium text-slate-700">Descripción de la Agenda</label>
                                <TextAreaDinamic
                                    value={descripcionProfesional}
                                    onChange={(e) => setDescripcionProfesional(e.target.value)}
                                    placeholder="Ej: Sucursal los lagos.."
=======
                                <label className="text-sm font-medium text-slate-700">Descripción de la Sucursal</label>
                                <TextAreaDinamic
                                    value={descripcionProfesional}
                                    onChange={(e) => setDescripcionProfesional(e.target.value)}
                                    placeholder="Ej: Sucursal con Box ambientado preferiblemente para profesionales de la Psicología"
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                            <ButtonDinamic
                                onClick={() => insertarProfesional(nombreProfesional,descripcionProfesional)}
                            >
<<<<<<< HEAD
                                Guardar Agenda
=======
                                Guardar Sucursal
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                            </ButtonDinamic>

                            <ButtonDinamic
                                onClick={() => actualizarProfesional(nombreProfesional,descripcionProfesional,id_profesional)}
                                className="bg-blue-700 hover:bg-blue-600"
                            >
<<<<<<< HEAD
                                Actualizar Agenda
=======
                                Actualizar Sucursal 
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                            </ButtonDinamic>


                            <ButtonDinamic
                                onClick={() => eliminarProfesional(id_profesional)}
                                className="bg-red-700 hover:bg-red-600"
                            >
<<<<<<< HEAD
                                Eliminar Agenda
=======
                                Eliminar Sucursal
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                            </ButtonDinamic>
                        </div>
                    </div>
                </div>

                {/* Selector */}
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="space-y-1 mb-5">
<<<<<<< HEAD
                        <h2 className="text-base font-semibold text-slate-900">Seleccionar Agenda</h2>
                        <p className="text-sm text-slate-500">Seleccione una Agenda para editar o eliminar.</p>
=======
                        <h2 className="text-base font-semibold text-slate-900">Seleccionar Sucursal o Box</h2>
                        <p className="text-sm text-slate-500">Seleccione una sucursal para editar o eliminar.</p>
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <SelectDinamic
                                value={id_profesional}
                                onChange={(e) => setIdProfesional(e.target.value)}
                                options={listaProfesionales.map(profesional => ({
                                    value: profesional.id_profesional,
                                    label: profesional.nombreProfesional
                                }))}

<<<<<<< HEAD
                                placeholder="Selecciona un Agenda"
=======
                                placeholder="Selecciona una sucursal"
>>>>>>> 57d6e11 (Cambios 001 - detalles encontrados por cliente)
                            />
                        </div>
                        <ButtonDinamic
                            onClick={() => seleccionarProfesional(id_profesional)}>
                            Seleccionar
                        </ButtonDinamic>
                    </div>
                </div>

            </div>
        </div>
    );
}
