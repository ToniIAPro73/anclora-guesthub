#!/usr/bin/env node
import { Resend } from "resend";

// Dual-read: canonical GUESTHUB_* first, legacy SYNCXML_* fallback (rename 2026-08).
const appUrl = process.env.GUESTHUB_APP_URL || process.env.SYNCXML_APP_URL;
const loginUrl = process.env.GUESTHUB_LOGIN_URL || process.env.SYNCXML_LOGIN_URL;
const required = ["ADMIN_EMAILS"];
const realSendRequired = ["RESEND_API_KEY", "RESEND_FROM"];
const missing = required.filter((name) => !process.env[name]);
if (!appUrl) missing.push("GUESTHUB_APP_URL");
if (!loginUrl) missing.push("GUESTHUB_LOGIN_URL");
const dryRun = process.env.DRY_RUN !== "false";
const to = process.env.SMOKE_EMAIL_TO || process.env.ADMIN_EMAILS?.split(",")[0]?.trim();
const from = process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL;

const realMissing = dryRun ? [] : realSendRequired.filter((name) => !process.env[name] && !(name === "RESEND_FROM" && process.env.RESEND_FROM_EMAIL));
if (missing.length || realMissing.length) {
  console.error(`Missing required environment variables: ${[...missing, ...realMissing].join(", ")}`);
  process.exit(2);
}

const message = {
  from: from || "dry-run@example.com",
  to,
  subject: "Smoke test Anclora GuestHub pilot email",
  text: [
    "Smoke test for Anclora GuestHub controlled pilot email.",
    `App URL: ${appUrl}`,
    `Login URL: ${loginUrl}`,
    "No real pilot credentials are included in this smoke test.",
  ].join("\n"),
};

if (dryRun) {
  console.log(JSON.stringify({ ok: true, mode: "dry-run", message }, null, 2));
  process.exit(0);
}

if (!to || !process.env.SMOKE_EMAIL_TO) {
  console.error("Refusing real send without SMOKE_EMAIL_TO.");
  process.exit(2);
}

const resend = new Resend(process.env.RESEND_API_KEY);
const result = await resend.emails.send(message);
if (result.error) {
  console.error(JSON.stringify({ ok: false, error: result.error }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, mode: "real", id: result.data?.id, to }, null, 2));
