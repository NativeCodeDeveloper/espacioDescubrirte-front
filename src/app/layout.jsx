import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Inter, Lato, Michroma, Montserrat } from "next/font/google";

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

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ortegaschmuck.cl"
);

export const metadata = {
  title: {
    default: "Ortega & Schmuck | Clínica Dental Premium",
    template: "%s | Ortega & Schmuck",
  },
  description:
    "Sitio oficial de Ortega & Schmuck. Odontología clínica integral con tecnología avanzada y planes personalizados.",
  keywords: [
    "Ortega & Schmuck",
    "clinica dental",
    "odontologia integral",
    "rehabilitacion oral",
    "diseno de sonrisa",
    "implantes dentales",
    "clinica premium",
  ],
  authors: [{ name: "Ortega & Schmuck", url: metadataBase.href }],
  publisher: "Ortega & Schmuck",
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
    title: "Ortega & Schmuck | Clínica Dental Premium",
    description:
      "Experiencia clínica premium con enfoque integral en odontología y rehabilitación oral.",
    url: metadataBase.href,
    siteName: "Ortega & Schmuck",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ortega & Schmuck",
    description:
      "Odontología clínica premium con protocolos personalizados.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${lato.variable} ${inter.variable} ${michroma.variable}`}>
      <body className="min-h-screen bg-white">
        <AnimatedLayout>
          <AgendaProvider>{children}</AgendaProvider>
        </AnimatedLayout>
      </body>
    </html>
  );
}
