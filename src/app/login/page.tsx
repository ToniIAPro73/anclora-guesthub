import type { Metadata } from "next";
import { LoginPageContent } from "@/components/landing/LoginPageContent";
import { redirect } from "next/navigation";
import { isAncloraIdentityEnabled } from "@/lib/anclora-identity/env";

export const metadata: Metadata = {
  title: "Iniciar sesión — Anclora GuestHub",
  description:
    "Acceso autorizado a Anclora GuestHub en validación controlada. La participación en el piloto se concede tras revisión manual de la solicitud.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  if (isAncloraIdentityEnabled()) redirect("/api/auth/anclora-identity/login");
  return <LoginPageContent />;
}
