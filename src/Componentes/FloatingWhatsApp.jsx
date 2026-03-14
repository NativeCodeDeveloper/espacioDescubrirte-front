"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
    return (
        <FloatingWhatsApp
            phoneNumber="+56971237451"
            accountName="Espacio Descubrirte"
            avatar="/logoespacio.png"
            statusMessage=""
            chatMessage="Hola, necesito informacion sobre arriendo de boxes."
            placeholder="Escribe tu mensaje..."
            notification
            notificationSound
        />
    );
}
