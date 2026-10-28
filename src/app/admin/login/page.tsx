import type { Metadata } from "next";
import { AdminLoginView } from "@/components/AdminLoginView";
import { redirect } from "next/navigation";
import { isAncloraIdentityEnabled } from "@/lib/anclora-identity/env";

export const metadata: Metadata = {
  title: "Acceso aplicación — Anclora GuestHub",
  description: "Acceso privado de administrador a Anclora GuestHub.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (isAncloraIdentityEnabled()) redirect("/api/auth/anclora-identity/login");
  return <AdminLoginView />;
}
