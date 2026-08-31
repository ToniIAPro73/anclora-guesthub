import type { AppLanguage, AppTheme } from "./domain";
import { ACTIVE_APP_LOCALES, DEFAULT_APP_LOCALE, normalizeActiveLocale } from "./anclora-language-toggle";

export const DEFAULT_THEME: AppTheme = "dark";
export const DEFAULT_LANGUAGE: AppLanguage = DEFAULT_APP_LOCALE;

export const themeModes: AppTheme[] = ["dark", "light", "system"];
export const languages: AppLanguage[] = [...ACTIVE_APP_LOCALES];

// Legacy cookie names kept after the Anclora SyncXML → Anclora GuestHub rename
// (2026-08): renaming them would reset saved theme/language preferences.
export const PREFERENCE_COOKIE_NAMES = {
  theme: "anclora-syncxml-theme",
  language: "anclora-syncxml-language",
} as const;

export function normalizeTheme(value: unknown): AppTheme {
  return value === "light" || value === "system" ? value : DEFAULT_THEME;
}

export function normalizeLanguage(value: unknown): AppLanguage {
  return normalizeActiveLocale(value);
}
