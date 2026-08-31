/**
 * Admin access control for GuestHub
 * Restricts sensitive operations to admin users only
 */

import { NextResponse } from "next/server";
import { envValue } from "./env";

/**
 * Check if current environment allows admin SES access
 */
export function isAdminAccessAllowedInEnv(): boolean {
  const env = process.env.NODE_ENV || "development";
  const isProduction = env === "production";

  if (isProduction) {
    return envValue("GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION", "SYNCXML_ALLOW_ADMIN_ACCESS_IN_PRODUCTION") === "true";
  }

  return true; // Allow in dev/preview
}

/**
 * Restrict SES submission for pilot users
 */
export function restrictSESSubmissionForPilot(
  isPilotUser: boolean
): NextResponse<{ error: string; message: string }> | null {
  if (!isPilotUser) return null;

  return NextResponse.json(
    {
      error: "Pilot users cannot submit to SES",
      message:
        "El envío a SES no está disponible para usuarios piloto. " +
        "En esta fase puedes generar y descargar XML revisable.",
    },
    { status: 403 }
  );
}

/**
 * Format error response for SES access denied
 */
export function sesAccessDeniedResponse(reason: "pilot" | "admin-disabled" | "env") {
  const messages = {
    pilot: "Pilot users cannot submit to SES. XML generation only.",
    "admin-disabled": "Admin SES operations are disabled.",
    env: "SES operations not available in this environment.",
  };

  return NextResponse.json(
    {
      error: "SES submission denied",
      message: messages[reason],
      phase: "controlled-pilot",
    },
    { status: 403 }
  );
}

/**
 * Read admin access configuration from environment
 */
export function readAdminAccessConfig() {
  // Dual-read: canonical GUESTHUB_* names first, legacy SYNCXML_* as fallback
  // (product rename Anclora SyncXML → Anclora GuestHub, 2026-08).
  return {
    enabled: envValue("GUESTHUB_ADMIN_ACCESS_ENABLED", "SYNCXML_ADMIN_ACCESS_ENABLED") === "true",
    token: envValue("GUESTHUB_ADMIN_ACCESS_TOKEN", "SYNCXML_ADMIN_ACCESS_TOKEN") || "",
    env: process.env.NODE_ENV || "development",
    allowedEnvs: (envValue("GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV", "SYNCXML_ADMIN_ACCESS_ALLOWED_ENV") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    allowInProduction: envValue("GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION", "SYNCXML_ALLOW_ADMIN_ACCESS_IN_PRODUCTION") === "true",
    email: envValue("GUESTHUB_ADMIN_EMAIL", "SYNCXML_ADMIN_EMAIL") || "admin@anclora.com",
    redirect: envValue("GUESTHUB_ADMIN_ACCESS_REDIRECT", "SYNCXML_ADMIN_ACCESS_REDIRECT") || "/app",
  };
}

/**
 * Evaluate if admin access should be granted
 */
export function evaluateAdminAccess(config: {
  enabled: boolean;
  token: string;
  providedToken: string;
  env: string;
  allowedEnvs: string[];
  allowInProduction: boolean;
}): boolean {
  // If disabled globally, deny
  if (!config.enabled) return false;

  // If in production without explicit opt-in, deny
  if (config.env === "production" && !config.allowInProduction) {
    return false;
  }

  // If env not in allowed list, deny
  if (!config.allowedEnvs.includes(config.env)) {
    return false;
  }

  // If token provided and matches, allow
  if (config.token && config.providedToken === config.token) {
    return true;
  }

  return false;
}
