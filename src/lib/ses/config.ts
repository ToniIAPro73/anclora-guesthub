import { envValue, envFlagWithLegacy } from "@/lib/security/env";

export type SesEnvironment = "pre" | "prod";

export const SES_PRE_ENDPOINT = "https://hospedajes.pre-ses.mir.es/hospedajes-web/ws/v1/comunicacion";
export const SES_PROD_ENDPOINT = "https://hospedajes.ses.mir.es/hospedajes-web/ws/v1/comunicacion";
export const SES_SCHEMA_VERSION = "v3.1.3";
export const SES_SCHEMA_DIR = "schemas/ses-hospedajes/v3.1.3";

export type SesConfig = {
  environment: SesEnvironment;
  endpoint: string;
  username: string;
  password: string;
  landlordCode: string;
  applicationName: string;
  allowProductionSend: boolean;
  allowInsecureTls: boolean;
};

// Dual-read: canonical GUESTHUB_SES_* names first, legacy SYNCXML_SES_* as
// fallback (product rename Anclora SyncXML → Anclora GuestHub, 2026-08).
export function getSesConfig(environment: SesEnvironment = (envValue("GUESTHUB_SES_ENV", "SYNCXML_SES_ENV") as SesEnvironment) || "pre"): SesConfig {
  const resolvedEnvironment = environment === "prod" ? "prod" : "pre";
  const endpoint = envValue("GUESTHUB_SES_ENDPOINT", "SYNCXML_SES_ENDPOINT")
    || (resolvedEnvironment === "prod" ? SES_PROD_ENDPOINT : SES_PRE_ENDPOINT);

  return {
    environment: resolvedEnvironment,
    endpoint,
    username: envValue("GUESTHUB_SES_USERNAME", "SYNCXML_SES_USERNAME") || "",
    password: envValue("GUESTHUB_SES_PASSWORD", "SYNCXML_SES_PASSWORD") || "",
    landlordCode: envValue("GUESTHUB_SES_LANDLORD_CODE", "SYNCXML_SES_LANDLORD_CODE") || "",
    // Registered SES.HOSPEDAJES application name — do NOT rename: it must match
    // the legal registration for the <aplicacion> XML field.
    applicationName: envValue("GUESTHUB_SES_APPLICATION", "SYNCXML_SES_APPLICATION") || "Anclora SyncXML",
    allowProductionSend: envFlagWithLegacy("GUESTHUB_SES_ALLOW_PRODUCTION_SEND", "SYNCXML_SES_ALLOW_PRODUCTION_SEND"),
    allowInsecureTls: resolvedEnvironment === "pre" && envFlagWithLegacy("GUESTHUB_SES_ALLOW_INSECURE_TLS", "SYNCXML_SES_ALLOW_INSECURE_TLS"),
  };
}

export function getSesConfigStatus(environment: SesEnvironment = "pre") {
  const config = getSesConfig(environment);
  return {
    environment: config.environment,
    endpoint: config.endpoint,
    hasCredentials: Boolean(config.username && config.password),
    hasLandlordCode: Boolean(config.landlordCode),
    hasApplicationName: Boolean(config.applicationName),
    readyForPreproduction: Boolean(config.username && config.password && config.landlordCode && config.applicationName),
    productionEnabled: config.allowProductionSend,
    insecureTlsEnabled: config.allowInsecureTls,
  };
}

export function assertSesConfig(config: SesConfig, options: { requireCredentials?: boolean; requireLandlordCode?: boolean } = {}) {
  const missing: string[] = [];
  if (options.requireCredentials !== false) {
    if (!config.username) missing.push("GUESTHUB_SES_USERNAME");
    if (!config.password) missing.push("GUESTHUB_SES_PASSWORD");
  }
  if (options.requireLandlordCode !== false && !config.landlordCode) missing.push("GUESTHUB_SES_LANDLORD_CODE");
  if (!config.applicationName) missing.push("GUESTHUB_SES_APPLICATION");
  if (missing.length) throw new Error(`Missing SES.HOSPEDAJES configuration: ${missing.join(", ")}`);
  if (config.environment === "prod" && !config.allowProductionSend) {
    throw new Error("SES.HOSPEDAJES production sending is blocked. Set GUESTHUB_SES_ALLOW_PRODUCTION_SEND=true only after successful pre-production testing.");
  }
}
