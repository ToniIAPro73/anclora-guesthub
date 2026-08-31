import type { Metadata } from "next";
import { AdminLoginView } from "@/components/AdminLoginView";

export const metadata: Metadata = {
  title: "Acceso aplicación — Anclora GuestHub",
  description: "Acceso privado de administrador a Anclora GuestHub.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginView />;
}
