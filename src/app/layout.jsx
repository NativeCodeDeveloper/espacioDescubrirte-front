import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Inter, Lato, Michroma, Montserrat, Playfair_Display, Manrope } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const michroma = Michroma({
  subsets: ["latin"],
  variable: "--font-michroma",
  weight: ["400"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.descubrirte.cl"
);

export const metadata = {
  title: {
    default: "Espacio Descubrirte | Arriendo de Boxes para Terapia",
    template: "%s | Espacio Descubrirte",
  },
  description:
    "Arriendo de boxes para psicologos y terapeutas. Espacios profesionales, ubicaciones estrategicas y reserva flexible.",
  keywords: [
    "Espacio Descubrirte",
    "arriendo de boxes",
    "boxes para psicologos",
    "boxes para terapeutas",
    "consultas profesionales",
    "salas de terapia",
    "arriendo por horas",
  ],
  authors: [{ name: "Espacio Descubrirte", url: metadataBase.href }],
  publisher: "Espacio Descubrirte",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: metadataBase.href,
  },
  openGraph: {
    title: "Espacio Descubrirte | Arriendo de Boxes para Terapia",
    description:
      "Boxes profesionales para terapia con reserva flexible en Providencia y Antofagasta.",
    url: metadataBase.href,
    siteName: "Espacio Descubrirte",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacio Descubrirte",
    description:
      "Arriendo de boxes para psicologos y terapeutas con ubicaciones estrategicas.",
  },
  icons: {
    icon: "/logoespacio.png",
    apple: "/logoespacio.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${lato.variable} ${inter.variable} ${michroma.variable} ${playfair.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen bg-white">
        <AnimatedLayout>
          <AgendaProvider>{children}</AgendaProvider>
        </AnimatedLayout>
      </body>
    </html>
  );
}
