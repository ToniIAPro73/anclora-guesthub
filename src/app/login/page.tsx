import type { Metadata } from "next";
import { LoginPageContent } from "@/components/landing/LoginPageContent";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAncloraIdentityEnabled } from "@/lib/anclora-identity/env";
import { AncloraAuthCard } from "@/components/auth/AncloraAuthCard";

export const metadata: Metadata = {
  title: "Iniciar sesión — Anclora GuestHub",
  description:
    "Acceso autorizado a Anclora GuestHub en validación controlada. La participación en el piloto se concede tras revisión manual de la solicitud.",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ identity_error?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const rawError = (await searchParams).identity_error;
  const error = Array.isArray(rawError) ? rawError[0] : rawError;
  const supportedError = error === "membership_required" || error === "exchange" || error === "retry" || error === "unavailable";

  if (isAncloraIdentityEnabled() && !supportedError) redirect("/api/auth/anclora-identity/login");

  if (supportedError) {
    const membershipRequired = error === "membership_required";
    const retryRequired = error === "exchange" || error === "retry";
    return (
      <main className="auth-gate-screen">
        <AncloraAuthCard
          mode="gate"
          badge={membershipRequired ? "PILOTO CONTROLADO" : "ACCESO SEGURO"}
          title={membershipRequired
            ? "Tu acceso aún no está activado"
            : retryRequired
              ? "No hemos podido completar el acceso"
              : "El acceso no está disponible ahora"}
          description={membershipRequired
            ? "Has iniciado sesión, pero GuestHub está disponible para participantes aprobados del piloto. Solicita participar y te avisaremos cuando tu acceso esté preparado."
            : retryRequired
              ? "Se ha producido un problema temporal al abrir GuestHub. Puedes volver a intentarlo en unos segundos."
              : "Estamos preparando el acceso seguro a GuestHub. Vuelve a intentarlo más tarde o solicita información sobre el piloto."}
          footer={<p><Link href="/">Volver al inicio de GuestHub</Link></p>}
        >
          {membershipRequired ? (
            <Link className="btn-primary auth-card-action" href="/piloto">Solicitar acceso al piloto</Link>
          ) : retryRequired ? (
            <Link className="btn-primary auth-card-action" href="/api/auth/anclora-identity/login">Volver a intentarlo</Link>
          ) : (
            <Link className="btn-primary auth-card-action" href="/piloto">Solicitar información del piloto</Link>
          )}
        </AncloraAuthCard>
      </main>
    );
  }

  return <LoginPageContent />;
}
