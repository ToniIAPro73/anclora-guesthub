# Quick Reference: Variables por Entorno

> **Rename 2026-08 (Anclora SyncXML → Anclora GuestHub):** los nombres canónicos son `GUESTHUB_*` / `NEXUS_GUESTHUB_*`. El código sigue leyendo como fallback los nombres legacy `SYNCXML_*` / `NEXUS_SYNCXML_*` — los despliegues existentes no necesitan migración inmediata. Detalle en [`ENVIRONMENT_VARIABLES.md`](./ENVIRONMENT_VARIABLES.md#rename-2026-08--anclora-syncxml--anclora-guesthub).

## 📋 Copiar/Pegar Exacto

### 🔧 Development (.env.local)

```env
# === DATABASE (LOCAL) ===
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/anclora_syncxml_dev"
DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/anclora_syncxml_dev"

# === NEXT.JS / AUTH ===
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"

# === SESSION ===
SESSION_SECRET="dev-secret-change-in-prod"

# === GUESTHUB CORE ===
GUESTHUB_APP_URL="http://localhost:3000"
GUESTHUB_LOGIN_URL="http://localhost:3000/login"
GUESTHUB_ADMIN_EMAIL="antonio@anclora.com"
GUESTHUB_DISABLE_AUTH="false"
GUESTHUB_LOCAL_DEMO="false"

# === ADMIN ACCESS (DEV) ===
GUESTHUB_ADMIN_ACCESS_ENABLED="true"
GUESTHUB_ADMIN_ACCESS_TOKEN="dev-token"
GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV="development,preview"
GUESTHUB_ADMIN_ACCESS_REDIRECT="/app"
GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"

# === SES (DEJAR VACÍO EN DEV) ===
GUESTHUB_SES_ENV="pre"
GUESTHUB_SES_ENDPOINT=""
GUESTHUB_SES_USERNAME=""
GUESTHUB_SES_PASSWORD=""
GUESTHUB_SES_LANDLORD_CODE=""
GUESTHUB_SES_APPLICATION="Anclora SyncXML"
GUESTHUB_SES_ALLOW_PRODUCTION_SEND="false"
GUESTHUB_SES_ALLOW_INSECURE_TLS="false"

# === SHARED ===
NODE_OPTIONS="--use-system-ca"
```

---

### 🔵 Preview (Vercel — Scope: Preview)

**GENERADOR:** SESSION_SECRET y ADMIN_TOKEN necesitan valores nuevos

```env
# === SESSION (GENERAR NUEVO) ===
SESSION_SECRET=<openssl rand -base64 32>
GUESTHUB_ADMIN_ACCESS_TOKEN=<openssl rand -hex 32>

# === URLS PREVIEW ===
NEXT_PUBLIC_APP_URL=https://<branch>-anclora-syncxml.vercel.app
AUTH_URL=https://<branch>-anclora-syncxml.vercel.app
GUESTHUB_APP_URL=https://<branch>-anclora-syncxml.vercel.app
GUESTHUB_LOGIN_URL=https://<branch>-anclora-syncxml.vercel.app/login

# === DATABASE (PREVIEW) ===
DATABASE_URL=<PREVIEW-DB-CONNECTION-STRING>
DIRECT_URL=<PREVIEW-DB-CONNECTION-STRING>

# === ADMIN ACCESS (PREVIEW) ===
GUESTHUB_ADMIN_ACCESS_ENABLED="true"
GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV="preview,development"
GUESTHUB_ADMIN_ACCESS_REDIRECT="/app"
GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"

# === SES (VACÍO - NO COPIAR) ===
GUESTHUB_SES_ENV="pre"
GUESTHUB_SES_ENDPOINT=""
GUESTHUB_SES_USERNAME=""
GUESTHUB_SES_PASSWORD=""
GUESTHUB_SES_LANDLORD_CODE=""
GUESTHUB_SES_APPLICATION="Anclora SyncXML"
GUESTHUB_SES_ALLOW_PRODUCTION_SEND="false"
GUESTHUB_SES_ALLOW_INSECURE_TLS="false"

# === SHARED ===
AUTH_TRUST_HOST="true"
GUESTHUB_ADMIN_EMAIL="antonio@anclora.com"
NODE_OPTIONS="--use-system-ca"
```

---

### 🔴 Production (Vercel — Scope: Production)

**GENERADOR:** SESSION_SECRET necesita valor nuevo (diferente a Preview)

```env
# === SESSION (GENERAR NUEVO - DIFERENTE A PREVIEW) ===
SESSION_SECRET=<openssl rand -base64 32>

# === URLS PRODUCTION ===
NEXT_PUBLIC_APP_URL="https://anclora-syncxml.vercel.app"
AUTH_URL="https://anclora-syncxml.vercel.app"
GUESTHUB_APP_URL="https://anclora-syncxml.vercel.app"
GUESTHUB_LOGIN_URL="https://anclora-syncxml.vercel.app/login"

# === DATABASE (PRODUCTION) ===
DATABASE_URL=<PRODUCTION-DB-CONNECTION-STRING>
DIRECT_URL=<PRODUCTION-DB-CONNECTION-STRING>

# === ADMIN ACCESS (PRODUCTION - DISABLED) ===
GUESTHUB_ADMIN_ACCESS_ENABLED="false"
GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV="development"
GUESTHUB_ADMIN_ACCESS_REDIRECT="/app"
GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"

# === SES (PREPROD - SI NECESARIO) ===
GUESTHUB_SES_ENV="pre"
GUESTHUB_SES_ENDPOINT="https://ses-api-preprod.xxx.com"
GUESTHUB_SES_USERNAME="preprod-user"
GUESTHUB_SES_PASSWORD="preprod-pass"
GUESTHUB_SES_LANDLORD_CODE="landlord-code"
GUESTHUB_SES_APPLICATION="Anclora SyncXML"
GUESTHUB_SES_ALLOW_PRODUCTION_SEND="false"
GUESTHUB_SES_ALLOW_INSECURE_TLS="false"

# === SHARED ===
AUTH_TRUST_HOST="true"
GUESTHUB_ADMIN_EMAIL="antonio@anclora.com"
NODE_OPTIONS="--use-system-ca"
```

---

## 📊 Diferencias Clave

| Aspecto | Development | Preview | Production |
|---------|-------------|---------|------------|
| **DATABASE_URL** | Local | Preview DB | Production DB |
| **URLs** | localhost:3000 | preview-url | anclora-syncxml.vercel.app |
| **SESSION_SECRET** | dev-value | unique | unique (different) |
| **ADMIN_ACCESS_ENABLED** | true | true | **false** |
| **SES_ENDPOINT** | (vacío) | (vacío) | preprod-url |
| **SES_CREDENTIALS** | (vacío) | (vacío) | preprod-creds |

---

## 🎯 Qué cambiar en cada variable entre entornos

```text
DATABASE_URL
├─ Dev: postgresql://localhost:5432/dev
├─ Preview: postgresql://neon-preview.db/preview
└─ Prod: postgresql://neon-prod.db/prod

NEXT_PUBLIC_APP_URL
├─ Dev: http://localhost:3000
├─ Preview: https://branch-anclora-syncxml.vercel.app
└─ Prod: https://anclora-syncxml.vercel.app

SESSION_SECRET
├─ Dev: dev-secret (cualquier valor)
├─ Preview: <generado> (único)
└─ Prod: <generado> (único, diferente a Preview)

GUESTHUB_ADMIN_ACCESS_ENABLED
├─ Dev: true (testing)
├─ Preview: true (admin testing)
└─ Prod: false (disabled by default)

GUESTHUB_SES_ENDPOINT
├─ Dev: (vacío)
├─ Preview: (vacío) ⚠️ NUNCA copiar
└─ Prod: https://ses-preprod.xxx.com

GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV
├─ Dev: "development,preview"
├─ Preview: "preview,development"
└─ Prod: "development"
```

---

## ✅ Verificación rápida

**Antes de pushear a Preview:**

```text
☑️ SESSION_SECRET generado nuevo
☑️ ADMIN_ACCESS_TOKEN generado nuevo
☑️ URLs actualizadas a preview-url
☑️ DATABASE_URL apunta a preview DB
☑️ SES credenciales VACÍAS
☑️ ADMIN_ACCESS_ENABLED="true"
```

**Antes de pushear a Production:**

```text
☑️ SESSION_SECRET generado nuevo (diferente a Preview)
☑️ URLs actualizadas a anclora-syncxml.vercel.app
☑️ DATABASE_URL apunta a production DB
☑️ ADMIN_ACCESS_ENABLED="false"
☑️ ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"
☑️ SES apunta a PREPROD (no prod real)
```

---

*Anclora GuestHub — Quick Reference*
