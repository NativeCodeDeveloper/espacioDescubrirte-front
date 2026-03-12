import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatButton() {
  return (
    <a
      href="https://wa.me/56994836980"
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-black text-white shadow-[0_15px_40px_-20px_rgba(0,0,0,0.8)] transition duration-300 ease-out hover:scale-105 hover:bg-zinc-900"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
