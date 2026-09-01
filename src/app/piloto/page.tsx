import type { Metadata } from "next";
import { LandingAnalytics } from "@/components/landing/LandingAnalytics";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { PilotRequestForm } from "@/components/landing/PilotRequestForm";
import { PilotPageContent } from "@/components/landing/PilotPageContent";

export const metadata: Metadata = {
  title: "Solicitar piloto controlado — Anclora GuestHub",
  description:
    "Solicita participar en el piloto controlado de Anclora GuestHub. Revisamos el encaje antes de conceder acceso. Sin datos reales de huéspedes.",
};

export default function PilotPage() {
  return <PilotPageContent analytics={<LandingAnalytics />} form={<PilotRequestForm />} cookieConsent={<CookieConsent />} />;
}
