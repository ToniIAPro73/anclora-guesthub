# Recaptura del manual de usuario — Anclora GuestHub

Documento operativo generado el 2026-09-25 (CHG-0014). Fuente de verdad: `docs/manual/screenshots.manifest.json`.

## Estado actual

| CURRENT | STALE | PLACEHOLDER | STATIC |
| ---: | ---: | ---: | ---: |
| 18 | 0 | 0 | 1 |

- **CURRENT**: la UI capturada sigue vigente; solo se actualizó el branding.
- **STALE**: la UI cambió después de la captura; pendiente de recaptura real (no se parchea).
- **PLACEHOLDER**: imagen de relleno o ausente; pendiente de captura real.
- **STATIC**: asset de marca del documento; no se captura.

## Reglas QA-safe

- Solo la identidad QA persistente definida en `.anclora/PRODUCTION_RUNTIME.md`; nunca la cuenta personal ni cuentas operativas.
- El ejecutor **no siembra, no crea y no borra datos**: navega y fotografía. Reutiliza los datos QA existentes (`QA_REUSE=true`).
- Las pantallas `assisted` las prepara el operador dentro de la cuenta QA; cualquier acción con escritura se hace solo sobre datos QA.
- Trabajo y commits en `development` (el script se niega a ejecutarse en otra rama).

## Requisitos

1. Dependencias del repo (`npm ci`). El repo no declara Playwright: instálalo sin tocar package.json con `npm i --no-save playwright && npx playwright install chromium`.
2. Variables en `.env.local` (no versionado): `MANUAL_QA_PASSWORD`, ninguna adicional. Opcional `MANUAL_APP_URL` (por defecto `http://localhost:3000`).
3. Datos QA necesarios: Excel de reserva sintético de QA (sin datos reales de huéspedes) cargado en la sesión QA.

## Identidades QA por rol

| Rol | Identidad | Variables | Acceso |
| --- | --- | --- | --- |
| `qa` | qa.guesthub@anclora.local | `MANUAL_QA_EMAIL` / `MANUAL_QA_PASSWORD` | inicio de sesión manual en el navegador abierto |

## Ejecución (en el Mac)

```bash
# 1. Arrancar la app en una terminal
npm run dev   # acceso con la identidad QA vía Anclora Identity (OIDC)

# 2. En otra terminal, desde la raíz del repo
bash scripts/manual/recapture-manual.sh              # todas las capturas pendientes
bash scripts/manual/recapture-manual.sh --auto-only  # solo las automáticas
bash scripts/manual/recapture-manual.sh --only a.png,b.png
node scripts/manual/recapture-manual.mjs --list      # ver el inventario
```

El script comprueba rama, fichero de entorno y que la app responde; captura en `docs/manual/screenshots/`, deja un registro en `tmp/manual-recapture-log.json` y regenera el documento con:

```bash
node scripts/generate-guesthub-manual-pdf.mjs --lang=all
```

Documentos que se regeneran: `public/manuals/anclora-guesthub-manual-usuario-es.{pdf,html}`, `public/manuals/anclora-guesthub-user-manual-en.{pdf,html}`, `public/manuals/anclora-guesthub-benutzerhandbuch-de.{pdf,html}`.

Tras revisar capturas y documento: actualiza `status` a `CURRENT` en el manifiesto para las pantallas recapturadas, registra el cambio en el changelog del manual si existe y haz commit en `development`.

## Pantallas

| Archivo | Estado | Modo | Rol | Ruta inicial | Qué capturar |
| --- | --- | --- | --- | --- | --- |
| `guesthub-de-dashboard-detail.png` | CURRENT | assisted | qa | / | Idioma DE — Dashboard mit konsolidierter Buchung (sección «8. Operatives Dashboard») |
| `guesthub-de-import.png` | CURRENT | assisted | qa | / | Idioma DE — Importbildschirm (sección «1. Produktumfang») |
| `guesthub-de-precheckin-form.png` | CURRENT | assisted | qa | / | Idioma DE — Oeffentliches Pre-Check-in-Formular (sección «Test-Pre-Check-in») |
| `guesthub-de-precheckin-panel.png` | CURRENT | assisted | qa | / | Idioma DE — SES- und Test-Pre-Check-in-Panel (sección «7. SES und Pre-Check-in») |
| `guesthub-de-review.png` | CURRENT | assisted | qa | / | Idioma DE — Pruefung importierter Daten (sección «5. Gefuehrte Pruefung») |
| `guesthub-de-xml.png` | CURRENT | assisted | qa | / | Idioma DE — Visuelle Ansicht des erzeugten XML (sección «6. XML und Download») |
| `guesthub-en-dashboard-detail.png` | CURRENT | assisted | qa | / | Idioma EN — Dashboard with consolidated booking (sección «8. Operational dashboard») |
| `guesthub-en-import.png` | CURRENT | assisted | qa | / | Idioma EN — Import screen (sección «1. Product scope») |
| `guesthub-en-precheckin-form.png` | CURRENT | assisted | qa | / | Idioma EN — Public pre-check-in form (sección «Test pre-check-in») |
| `guesthub-en-precheckin-panel.png` | CURRENT | assisted | qa | / | Idioma EN — SES and test pre-check-in panel (sección «7. SES and pre-check-in») |
| `guesthub-en-review.png` | CURRENT | assisted | qa | / | Idioma EN — Imported data review (sección «5. Guided review») |
| `guesthub-en-xml.png` | CURRENT | assisted | qa | / | Idioma EN — Generated XML visual view (sección «6. XML and download») |
| `guesthub-es-dashboard-detail.png` | CURRENT | assisted | qa | / | Idioma ES — Dashboard con reserva consolidada (sección «8. Dashboard operativo») |
| `guesthub-es-import.png` | CURRENT | assisted | qa | / | Idioma ES — Pantalla inicial de importacion (sección «1. Alcance del producto») |
| `guesthub-es-precheckin-form.png` | CURRENT | assisted | qa | / | Idioma ES — Formulario publico de pre-check-in (sección «Pre-check-in de prueba») |
| `guesthub-es-precheckin-panel.png` | CURRENT | assisted | qa | / | Idioma ES — Panel SES y pre-check-in de prueba (sección «7. SES y pre-check-in») |
| `guesthub-es-review.png` | CURRENT | assisted | qa | / | Idioma ES — Revision de datos importados (sección «5. Revision guiada») |
| `guesthub-es-xml.png` | CURRENT | assisted | qa | / | Idioma ES — Vista visual del XML generado (sección «6. XML y descarga») |
| `logo-anclora-guesthub.png` | STATIC | static | - | — | Logo Premium de portada (ya actualizado). |
