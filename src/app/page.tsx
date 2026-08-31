import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/LandingExperience";

const title = "Anclora GuestHub — Gestión de huéspedes y alquiler vacacional";
const description =
  "Gestión de huéspedes, check-in y operación de alquiler vacacional: revisa datos de huéspedes desde Excel/XLSX y genera XML revisable orientado al flujo SES.HOSPEDAJES, con privacidad por defecto y validación controlada.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Anclora GuestHub",
    images: [{ url: "/brand/anclora-guesthub.png" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function LandingPage() {
  return <LandingExperience />;
}
