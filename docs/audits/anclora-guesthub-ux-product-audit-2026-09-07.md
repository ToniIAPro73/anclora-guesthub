# Anclora GuestHub — Auditoría UX/UI de Producto

**Skill:** `ux-product-experience-review` (canónica, `~/Developer/anclora/anclora-infrastructure/skills/ux-product-experience-review`, verificada idéntica a la copia instalada) · **Modo:** AUDIT_WITH_REPO_CONTEXT · **Fecha:** 2026-09-07 · **Rama:** development @ `6a198dc` (local = origin/development) · **Estado:** `PASS_WITH_GAPS`

Informe completo con las 37 secciones exigidas por la skill: `anclora-guesthub-ux-product-audit-2026-09-07.html` (artefacto principal) y `anclora-guesthub-ux-product-audit-2026-09-07.xml` (XHTML serializado como XML, validado bien formado). Evidencia de navegador en `evidence/anclora-guesthub-2026-09-07/`.

## CANONICAL_FRONTEND_URL

`https://anclora-syncxml.vercel.app` — verificado como alias de producción activo del proyecto Vercel `anclora-guesthub` vía `vercel inspect` (read-only), build "Ready" de hace 3 días. Nombre de dominio legacy retenido a nivel de infraestructura, pendiente de decisión del propietario según `docs/VERCEL_PREVIEW_SETUP.md` — no es una superficie de UI y no afecta a los hallazgos de experiencia.

La navegación efectiva de esta auditoría se realizó contra `http://localhost:3000` con `GUESTHUB_LOCAL_DEMO=true`, para poder ejercer flujos autenticados con datos sintéticos sin credenciales reales de piloto ni riesgo sobre producción.

## Resumen de hallazgos

| ID | Severidad | Título |
|---|---|---|
| F1 | CRITICAL | La columna de avisos muestra "OK" para datos inválidos antes de validar explícitamente |
| F2 | HIGH | Un huésped duplicado exacto no genera aviso de duplicado |
| F3 | HIGH | Mezcla de idiomas dentro del workspace bajo interfaz en inglés |
| F4 | MEDIUM | El `<title>` del documento no responde al idioma seleccionado |
| F5 | MEDIUM | El selector de tema ocupa tres controles persistentes en la barra global |
| F6 | LOW | Sin adaptación de navegación observable a 390px en la pantalla más densa |

Ver el informe HTML/XML para el modelo de finding completo (evidencia, root cause, acceptance criteria, do-not-break) de cada uno, más 3 fortalezas documentadas en "What works well" (checklist de consentimiento pre-import, enmascarado de PII por defecto, gate de generación de XML).

## Cobertura y límites principales

- Cubierto con evidencia real de navegador: landing (ES/EN), piloto, login (variante demo), import → revisión → validación en `/app`, dashboard, precheckin con token sintético, desktop 1440×900 y 1366×768, tablet 768×1024, móvil 390×844, tema claro y oscuro.
- No cubierto en esta corrida: generación real de XML, descarga/ZIP ejecutados en navegador, historial, escalado del listado de reservas a volumen, formulario real de login con credenciales de piloto, accessibility-audit / i18n-integrity-check / design-system-consumer-check / visual-regression-check compuestos formalmente, alemán en profundidad, móvil apaisado.
- Ninguna acción con efecto externo (SES.HOSPEDAJES, email real, escritura en Blob/DB) fue ejecutada. Solo se usaron datos sintéticos del propio repositorio (`test-data/fixtures/`).

## Validación del artefacto

- `XML_VALIDATION`: PASS (bien formado, verificado con `xml.etree.ElementTree`)
- `HTML_VALIDATION`: PASS (parseo sin errores fatales, 37/37 secciones con anclas de índice funcionales)
- `VISUAL_VALIDATION`: PASS (revisión manual de la maquetación, tema claro/oscuro, tablas con scroll horizontal, print CSS con `break-inside: avoid`)
- `CURRENT_SKILL_SCHEMA_COVERAGE`: PASS (37 secciones del Output Report v2, evidence levels de la skill vigente, finding model v2 completo en F1–F6, scorecards UX/UI + subscores GuestHub)
- `ARTIFACT_RESULT`: PASS
