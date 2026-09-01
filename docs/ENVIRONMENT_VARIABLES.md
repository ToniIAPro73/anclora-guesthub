# Environment Variables — Complete Reference

**Objetivo:** Definición exacta de qué variables van en cada entorno (Development, Preview, Production).

---

## Rename 2026-08 — Anclora SyncXML → Anclora GuestHub

Los nombres canónicos de las variables son ahora `GUESTHUB_*` (y `NEXUS_GUESTHUB_*` para el webhook de Nexus). **La aplicación sigue leyendo como fallback los nombres legacy `SYNCXML_*` / `NEXUS_SYNCXML_*`**, por lo que los despliegues existentes no requieren cambio inmediato. Fallback crítico: `GUESTHUB_ENCRYPTION_KEY` / `GUESTHUB_FILE_ENCRYPTION_KEY` — sin el fallback legacy, los datos cifrados antes del rename serían ilegibles.

Excepciones que NO se renombran:

- Valor por defecto de `GUESTHUB_SES_APPLICATION` = `"Anclora SyncXML"` — nombre de aplicación registrado ante SES.HOSPEDAJES (compatibilidad legal, no renombrar).
- Dominios `anclora-syncxml.vercel.app` y `syncxml.anclora.com` — endpoints legacy pendientes de decisión del propietario.
- Nombres de base de datos `anclora_syncxml_dev` — decisión de despliegue, no de código.

---

## Visión general

| Categoría | Development | Preview | Production |
| --------- | ----------- | ------- | ---------- |
| **Donde** | `.env.local` (local) | Vercel Settings (Preview scope) | Vercel Settings (Production scope) |
| **Secretos** | No (dev values) | Sí (reales) | Sí (reales) |
| **DB** | Local/dev | Preview DB | Production DB |
| **URLs** | localhost:3000 | `<preview-url>.vercel.app` | `anclora-syncxml.vercel.app` |
| **SES** | Vacío o preprod | Vacío (NO COPIAR) | Preprod (si necesario) |
| **Admin** | Enabled (testing) | Enabled (admin) | Disabled (default) |

---

## 🔧 Development (.env.local)

**Archivo:** `.env.local` (git-ignored, local only)

### Requeridas

```env
# Database (local)
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/anclora_syncxml_dev"
DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/anclora_syncxml_dev"

# Next.js / Auth
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST="true"

# Session
SESSION_SECRET="dev-secret-openssl-rand-base64-32"

# GuestHub
GUESTHUB_APP_URL="http://localhost:3000"
GUESTHUB_LOGIN_URL="http://localhost:3000/login"
GUESTHUB_ADMIN_EMAIL="antonio@anclora.com"

# Admin Access (for testing)
GUESTHUB_ADMIN_ACCESS_ENABLED="true"
GUESTHUB_ADMIN_ACCESS_TOKEN="dev-token"
GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV="development,preview"
GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"
```

### Opcionales (por feature)

```env
# Encryption (si implementado)
GUESTHUB_ENCRYPTION_KEY=""
GUESTHUB_FILE_ENCRYPTION_KEY=""

# Email (si feature de pilot requests)
RESEND_API_KEY="re_test_xxxxx"
GUESTHUB_PILOT_REQUEST_TO="antonio@anclora.com"

# Document Ingestion (si habilitado)
ENABLE_MINERU_PARSER="false"
MINERU_AGENT_INGEST_PATH="/ruta/local/mineru"
MINERU_DEFAULT_BACKEND="pipeline"

# Storage (si Vercel Blob)
BLOB_READ_WRITE_TOKEN=""
```

### Shared (same values)

```env
GUESTHUB_DISABLE_AUTH="false"
GUESTHUB_LOCAL_DEMO="false"
GUESTHUB_SES_ENV="pre"
GUESTHUB_SES_APPLICATION="Anclora SyncXML"
GUESTHUB_SES_ALLOW_PRODUCTION_SEND="false"
GUESTHUB_SES_ALLOW_INSECURE_TLS="false"
NODE_OPTIONS="--use-system-ca"
AUTH_TRUST_HOST="true"
```

### Que NO incluyas en Development

- ❌ `DATABASE_URL` de producción
- ❌ `GUESTHUB_SES_ENDPOINT` (dejar vacío)
- ❌ `GUESTHUB_SES_USERNAME` (dejar vacío)
- ❌ `GUESTHUB_SES_PASSWORD` (dejar vacío)
- ❌ Credenciales de APIs reales (a menos que necesites)

---

## 🔵 Preview (Vercel)

**Ubicación:** Vercel Console → Project Settings → Environment Variables → **Scope: Preview**

### Requeridas (COPIAR de Development y actualizar)

```env
SESSION_SECRET=<GENERAR-NUEVO-VALOR>
GUESTHUB_ADMIN_ACCESS_TOKEN=<GENERAR-NUEVO-VALOR>
```

### Requeridas (URLs Preview)

```env
NEXT_PUBLIC_APP_URL=https://<branch-name>-anclora-syncxml.vercel.app
AUTH_URL=https://<branch-name>-anclora-syncxml.vercel.app
GUESTHUB_APP_URL=https://<branch-name>-anclora-syncxml.vercel.app
GUESTHUB_LOGIN_URL=https://<branch-name>-anclora-syncxml.vercel.app/login
```

### Admin Access Preview

```env
GUESTHUB_ADMIN_ACCESS_ENABLED="true"
GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV="preview,development"
GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"
```

### Database Preview

```env
DATABASE_URL=<PREVIEW-DB-URL>
DIRECT_URL=<PREVIEW-DB-URL>
```

### SES (VACÍO - NO COPIAR credenciales)

```env
GUESTHUB_SES_ENDPOINT=""
GUESTHUB_SES_USERNAME=""
GUESTHUB_SES_PASSWORD=""
GUESTHUB_SES_LANDLORD_CODE=""
```

### Shared (same as development)

```env
AUTH_TRUST_HOST="true"
GUESTHUB_ADMIN_EMAIL="antonio@anclora.com"
GUESTHUB_ADMIN_ACCESS_REDIRECT="/app"
GUESTHUB_SES_ENV="pre"
GUESTHUB_SES_APPLICATION="Anclora SyncXML"
GUESTHUB_SES_ALLOW_PRODUCTION_SEND="false"
GUESTHUB_SES_ALLOW_INSECURE_TLS="false"
NODE_OPTIONS="--use-system-ca"
```

### Opcionales (si habilitados)

```env
RESEND_API_KEY=<SI-NECESARIO>
BLOB_READ_WRITE_TOKEN=<SI-NECESARIO>
ENABLE_MINERU_PARSER="false"
```

### Que NO incluyas en Preview

- ❌ `GUESTHUB_SES_ENDPOINT` (prodre)
- ❌ `GUESTHUB_SES_USERNAME` (prodre)
- ❌ `GUESTHUB_SES_PASSWORD` (prodre)
- ❌ `DATABASE_URL` de production
- ❌ Credenciales SES reales

---

## 🔴 Production (Vercel)

**Ubicación:** Vercel Console → Project Settings → Environment Variables → **Scope: Production**

### Requeridas (DIFERENTE de Preview)

```env
SESSION_SECRET=<GENERAR-NUEVO-VALOR-DISTINTO-A-PREVIEW>
```

### Requeridas (URLs Production)

```env
NEXT_PUBLIC_APP_URL="https://anclora-syncxml.vercel.app"
AUTH_URL="https://anclora-syncxml.vercel.app"
GUESTHUB_APP_URL="https://anclora-syncxml.vercel.app"
GUESTHUB_LOGIN_URL="https://anclora-syncxml.vercel.app/login"
```

### Admin Access Production (STRICT)

```env
GUESTHUB_ADMIN_ACCESS_ENABLED="false"
GUESTHUB_ADMIN_ACCESS_ALLOWED_ENV="development"
GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"
```

### Database Production

```env
DATABASE_URL=<PRODUCTION-DB-URL>
DIRECT_URL=<PRODUCTION-DB-URL>
```

### SES Production (SOLO si necesitas)

```env
GUESTHUB_SES_ENDPOINT="https://ses-api-preprod-url.com"
GUESTHUB_SES_USERNAME="<preprod-username>"
GUESTHUB_SES_PASSWORD="<preprod-password>"
GUESTHUB_SES_LANDLORD_CODE="<code>"
```

**⚠️ CRÍTICO:** SES debe apuntar a **preproducción**, NUNCA a producción real sin autorización explícita.

### Shared (same)

```env
AUTH_TRUST_HOST="true"
GUESTHUB_ADMIN_EMAIL="antonio@anclora.com"
GUESTHUB_ADMIN_ACCESS_REDIRECT="/app"
GUESTHUB_SES_ENV="pre"
GUESTHUB_SES_APPLICATION="Anclora SyncXML"
GUESTHUB_SES_ALLOW_PRODUCTION_SEND="false"
GUESTHUB_SES_ALLOW_INSECURE_TLS="false"
NODE_OPTIONS="--use-system-ca"
```

### Que NO incluyas en Production

- ❌ `GUESTHUB_ADMIN_ACCESS_ENABLED="true"` (must be false)
- ❌ `GUESTHUB_ALLOW_ADMIN_ACCESS_IN_PRODUCTION="true"` (must be false)
- ❌ Credenciales SES de **producción real** (usar preprod)
- ❌ Credenciales de desarrollo

---

## 📋 Checklist de Setup

### Para Development (.env.local)

- [ ] DATABASE_URL apunta a local/dev DB
- [ ] URLs apuntan a <http://localhost:3000>
- [ ] SESSION_SECRET es diferente de production
- [ ] SES_ENDPOINT está vacío
- [ ] ADMIN_ACCESS_ENABLED="true"

### Para Preview (Vercel)

- [ ] SESSION_SECRET es diferente a Development y Production
- [ ] NEXT_PUBLIC_APP_URL = URL preview correcto
- [ ] DATABASE_URL apunta a preview DB (no production)
- [ ] SES_ENDPOINT está **VACÍO** (no copiar credenciales)
- [ ] ADMIN_ACCESS_ENABLED="true"

### Para Production (Vercel)

- [ ] SESSION_SECRET es diferente a Development y Preview
- [ ] URLs apuntan a anclora-syncxml.vercel.app
- [ ] DATABASE_URL apunta a production DB
- [ ] ADMIN_ACCESS_ENABLED="false"
- [ ] ALLOW_ADMIN_ACCESS_IN_PRODUCTION="false"
- [ ] SES apunta a **preproducción** (no producción real)

---

## 🔐 Variables sensibles

| Variable | Development | Preview | Production |
| -------- | ----------- | ------- | ---------- |
| `SESSION_SECRET` | dev-value | Generated | Generated (different) |
| `DATABASE_URL` | Local | Preview DB | Production DB |
| `GUESTHUB_ADMIN_ACCESS_TOKEN` | dev-token | Generated | N/A (disabled) |
| `GUESTHUB_SES_*` | Vacío | Vacío | Preprod (if needed) |
| `RESEND_API_KEY` | Test key | Real (if used) | Real (if used) |
| `BLOB_READ_WRITE_TOKEN` | Empty | Real (if used) | Real (if used) |

---

## 🚫 Variables que NUNCA debes copiar entre entornos

```text
❌ DATABASE_URL (cada env su DB)
❌ SESSION_SECRET (debe ser único por env)
❌ SES credentials (nunca copiar a Preview)
❌ RESEND_API_KEY (puede enviar emails reales)
❌ BLOB_READ_WRITE_TOKEN (puede escribir a producción)
❌ ADMIN_ACCESS_TOKEN (nunca igual entre envs)
```

---

## 📝 Notas importantes

1. **SES en Preview:** SIEMPRE vacío. No copiar credenciales.
2. **Admin en Production:** SIEMPRE deshabilitado por defecto.
3. **DB separadas:** Development, Preview y Production deben ser BDs diferentes.
4. **Secretos únicos:** SESSION_SECRET y tokens deben ser diferentes en cada env.
5. **Preprod vs Prod:** SES de producción debe apuntar a preprod, no a producción real.

---

## 🔄 Cheat Sheet: Copiar entre envs

**De Development a Preview:**

```text
✅ GUESTHUB_ADMIN_EMAIL
✅ GUESTHUB_SES_ENV
✅ GUESTHUB_SES_APPLICATION
✅ NODE_OPTIONS
❌ SESSION_SECRET (generar nuevo)
❌ DATABASE_URL (usar preview DB)
❌ NEXT_PUBLIC_APP_URL (usar preview URL)
```

**De Preview a Production:**

```text
✅ GUESTHUB_ADMIN_EMAIL
✅ GUESTHUB_SES_APPLICATION
✅ NODE_OPTIONS
❌ SESSION_SECRET (generar nuevo)
❌ DATABASE_URL (usar prod DB)
❌ NEXT_PUBLIC_APP_URL (usar prod URL)
❌ GUESTHUB_ADMIN_ACCESS_ENABLED (poner false)
```

---

*Anclora GuestHub — Environment Variables Reference*

*v1.1 — 2026-08-31 (rename Anclora SyncXML → Anclora GuestHub; nombres legacy SYNCXML_* soportados como fallback)*
