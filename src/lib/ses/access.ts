import { NextResponse } from "next/server";
import { envValue } from "@/lib/security/env";

export function requireSesProductionSendOptIn(options: { environment?: "pre" | "prod"; dryRun?: boolean }) {
  if (options.environment !== "prod" || options.dryRun !== false) return null;
  // Dual-read: canonical GUESTHUB_* first, legacy SYNCXML_* fallback (rename 2026-08).
  // NOTE: pre-existing duplicate flag — ses/config.ts reads *_SES_ALLOW_PRODUCTION_SEND
  // while this module reads *_ALLOW_SES_PRODUCTION_SEND. Kept as-is intentionally.
  if (envValue("GUESTHUB_ALLOW_SES_PRODUCTION_SEND", "SYNCXML_ALLOW_SES_PRODUCTION_SEND") === "true") return null;
  return NextResponse.json(
    {
      error: "SES production sending is disabled",
      // Internal API error code kept as SYNCXML_* for compatibility with existing
      // clients/tests (legacy contract, do not rename).
      code: "SYNCXML_SES_PRODUCTION_SEND_DISABLED",
    },
    { status: 403 },
  );
}
