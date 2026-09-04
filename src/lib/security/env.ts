export function envFlag(name: string) {
  const value = process.env[name]?.trim().replace(/^["']|["']$/g, "").toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Product rename (2026-08): Anclora SyncXML → Anclora GuestHub.
 * Canonical env vars are now GUESTHUB_*; legacy SYNCXML_* names remain as
 * fallback so existing deployments (and encrypted data keys) keep working.
 */
export function envValue(primary: string, legacy?: string) {
  return process.env[primary] || (legacy ? process.env[legacy] : undefined);
}

export function envFlagWithLegacy(primary: string, legacy: string) {
  return envFlag(primary) || envFlag(legacy);
}

export function isExplicitLocalDemoMode() {
  return envFlagWithLegacy("GUESTHUB_LOCAL_DEMO", "SYNCXML_LOCAL_DEMO") && process.env.NODE_ENV !== "production";
}

export function persistentStorageEnabled() {
  return envFlagWithLegacy("GUESTHUB_ENABLE_PERSISTENT_STORAGE", "SYNCXML_ENABLE_PERSISTENT_STORAGE");
}

export function authDisabled() {
  return envFlagWithLegacy("GUESTHUB_DISABLE_AUTH", "SYNCXML_DISABLE_AUTH") && process.env.NODE_ENV !== "production";
}

export function getSessionSecret() {
  return process.env.SESSION_SECRET || process.env.AUTH_SECRET || "";
}

export function getPersistentPilotAuthConfigError() {
  const missing: string[] = [];
  if (!process.env.DATABASE_URL && !process.env.DIRECT_URL) missing.push("DATABASE_URL");
  if (!getSessionSecret()) missing.push("SESSION_SECRET");
  if (!envValue("GUESTHUB_INTERNAL_API_SECRET", "SYNCXML_INTERNAL_API_SECRET")) missing.push("GUESTHUB_INTERNAL_API_SECRET");
  if (process.env.NODE_ENV === "production" && envFlagWithLegacy("GUESTHUB_DISABLE_AUTH", "SYNCXML_DISABLE_AUTH")) {
    return "GUESTHUB_DISABLE_AUTH is not allowed for persistent pilot auth in production";
  }
  return missing.length ? `Missing persistent pilot auth configuration: ${missing.join(", ")}` : null;
}

export function canProvisionPersistentPilotUsers() {
  return getPersistentPilotAuthConfigError() === null;
}

export function getRuntimeConfigError() {
  if (process.env.NODE_ENV !== "production") return null;
  if (envFlagWithLegacy("GUESTHUB_DISABLE_AUTH", "SYNCXML_DISABLE_AUTH")) return "GUESTHUB_DISABLE_AUTH is not allowed in production";
  const missing: string[] = [];
  if (!getSessionSecret()) missing.push("SESSION_SECRET");
  if (!envValue("GUESTHUB_ADMIN_PASSWORD", "SYNCXML_ADMIN_PASSWORD") && !process.env.DATABASE_URL && !process.env.DIRECT_URL) {
    missing.push("GUESTHUB_ADMIN_PASSWORD or DATABASE_URL");
  }
  if (persistentStorageEnabled()) {
    if (!process.env.DATABASE_URL && !process.env.DIRECT_URL) missing.push("DATABASE_URL");
    if (!envValue("GUESTHUB_ENCRYPTION_KEY", "SYNCXML_ENCRYPTION_KEY") && !envValue("GUESTHUB_FILE_ENCRYPTION_KEY", "SYNCXML_FILE_ENCRYPTION_KEY")) missing.push("GUESTHUB_ENCRYPTION_KEY");
  }
  return missing.length ? `Missing critical GuestHub production configuration: ${missing.join(", ")}` : null;
}

export function validateRuntimeConfig() {
  const error = getRuntimeConfigError();
  if (error) throw new Error(error);
}

export function canUsePasswordAuth() {
  if (authDisabled()) return true;
  if (envValue("GUESTHUB_ADMIN_PASSWORD", "SYNCXML_ADMIN_PASSWORD") && getSessionSecret()) return true;
  if ((process.env.DATABASE_URL || process.env.DIRECT_URL) && getSessionSecret()) return true;
  return isExplicitLocalDemoMode();
}
