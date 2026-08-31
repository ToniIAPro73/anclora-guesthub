import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";
import { envValue, getSessionSecret } from "@/lib/security/env";
import { authRateLimiter, getRateLimitKey } from "@/lib/security/rateLimit";

export async function POST(request: Request) {
  const rateLimit = authRateLimiter.check(getRateLimitKey(request));
  if (!rateLimit.allowed) return NextResponse.json({ error: "Demasiados intentos" }, { status: 429 });

  // Dual-read: canonical GUESTHUB_* first, legacy SYNCXML_* fallback (rename 2026-08).
  const adminPassword = envValue("GUESTHUB_ADMIN_PASSWORD", "SYNCXML_ADMIN_PASSWORD") || "";
  const adminEmail = (envValue("GUESTHUB_ADMIN_EMAIL", "SYNCXML_ADMIN_EMAIL") || "antonio@anclora.com").toLowerCase();
  if (!adminPassword || !getSessionSecret()) {
    return NextResponse.json(
      {
        error: "Configuracion de acceso incompleta",
        code: "SYNCXML_ADMIN_AUTH_CONFIG_INCOMPLETE",
      },
      { status: 503 },
    );
  }

  const { email, password } = await request.json().catch(() => ({ email: "", password: "" }));
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (normalizedEmail === adminEmail && password === adminPassword) {
    return setSessionCookie(NextResponse.json({ ok: true, role: "admin", email: adminEmail }), {
      id: "admin",
      email: adminEmail,
      role: "admin",
    });
  }

  return NextResponse.json({ error: "Credenciales invalidas", code: "SYNCXML_INVALID_ADMIN_CREDENTIALS" }, { status: 401 });
}
