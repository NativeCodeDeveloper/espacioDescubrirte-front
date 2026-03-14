import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatButton() {
  return (
    <a
      href="https://wa.me/56971237451"
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-emerald-700 bg-emerald-700 text-white shadow-[0_15px_40px_-20px_rgba(15,23,42,0.45)] transition duration-300 ease-out hover:scale-105 hover:bg-emerald-600"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
