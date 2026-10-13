# Análisis estático y deltas — Fase 0

**Estado:** PROPUESTA · **corte observado:** 12/10/2026 · **HEAD:** f8b3938ff7210a0465a29980b2a99ba53c55c999.
No se ejecutaron suites, builds, auditorías, migraciones ni comprobaciones contra servicios: NOT_RUN.

## Git y alcance

El análisis partió del checkout chore/codex-guesthub-roadmap-docs, HEAD f8b3938. Después se verificó origin/development en a476c70, se trasladó el commit documental a development y se consolidaron allí los artefactos. Antes de retirar la carpeta y rama temporales de F0 se creó y verificó un respaldo privado con bundle de refs y snapshots de ambos worktrees. El código único de F0 no se integró. La entrega de alineación queda directamente en development.

## Inventario de evidencia

| Tema | Estado | Evidencia actual | Interpretación y límite |
|---|---|---|---|
| Producto | CONFIRMADO_EN_CÓDIGO | README.md:11-45; src/lib/excel/parseExcel.ts; src/lib/xml/**; src/app/api/generate/xml/route.ts | Importa Excel, valida/normaliza y genera XML; APIs SES existentes. README utiliza wording amplio de gestión huéspedes/alquiler. No demuestra PMS integral. |
| XSD/SES | CONFIRMADO_EN_CÓDIGO | src/lib/ses/config.ts:3-8; schemas/ses-hospedajes/v3.1.3/; src/app/api/ses/** | Esquema, cliente y rutas presentes. No demuestra disponibilidad ni resultados externos. |
| SES flags | CONFIRMADO_EN_CÓDIGO | config.ts:37; access.ts:4-9; communicate/route.ts:46-48,68-108 | config y access leen nombres/cadenas legacy diferentes. Ruta mutante requireAdmin; función de access solo limita prod/live según su reader. Contrato de seguridad es más estricto: solo preproducción. |
| RBAC | CONFIRMADO_EN_CÓDIGO | src/lib/auth.ts:78-98; src/app/api/ses/communicate/route.ts:35-49; src/app/api/ses/validate/route.ts:7-16 | requireAdmin existe y se usa en varias rutas SES/admin; validate usa requireAuth, pero valida XML localmente sin red SES. Revisar todas las rutas y métodos. |
| Identity | CONFIRMADO_EN_CÓDIGO | src/lib/anclora-identity/authorization.ts:24-36; auth.ts:48-56 | Helper exige GROUP_OWNER o application membership. getSessionUser asigna role admin a sesión Identity autorizada. Requiere revisar el significado de claims y rol efectivo. No es cierto que cualquier sesión Anclora pase. |
| Owner | CONFIRMADO_EN_CÓDIGO | prisma/schema.prisma:25-63; src/lib/db/reservations.ts:158-210; rutas reservations/** | ownerId nullable; list/get/delete filtran por owner. Las rutas construyen owner desde sesión. Tests de ownership existen; no se ejecutaron. Revisar cargas/descargas y objetos derivados. |
| Persistencia de reservas | CONFIRMADO_EN_CÓDIGO | src/lib/db/reservations.ts:32-40,59-68,70-155 | Producción falla cerrado si DB/persistencia no disponible; memoria se usa en entorno no producción o demo explícita. Si BD falla con persistentStorage true, el error se propaga. |
| SES submissions | CONFIRMADO_EN_CÓDIGO | src/lib/ses/submissionRepository.ts:17-46,63-98,132-145 | Modelo representa SENT/ACCEPTED/PROCESSING/PROCESSED/FAILED etc. Escritura usa DB si configurada; error cae a memoria. Requiere tratamiento explícito de fall-through y durabilidad. |
| Cifrado | CONFIRMADO_EN_CÓDIGO | src/lib/privacy/encryption.ts:3-45; src/lib/db/reservations.ts:114-138; schema.prisma:65-118 | AES-GCM helper existe. Ciertos campos se cifran al escribir (firstName, surname1, documentNumber/support, address/contact); surname2 y otros atributos se pasan sin cifrar aquí. No afirmar cifrado de todos los campos/copies. |
| Pre-check-in | CONFIRMADO_EN_CÓDIGO | src/lib/precheckin.ts:29-49,59-62,68-119 | Mantiene sesiones en globalThis, incluye estado expirado/revocado, guarda hash del token y drafts; no es durable entre instancias/reinicios. |
| Rate limit/audit | CONFIRMADO_EN_CÓDIGO | src/lib/security/rateLimit.ts:27-83; src/lib/audit.ts:27-68 | Ambos son memoria por runtime; el audit contiene eventos con session pseudonym, conteo, hash, validación, idioma/tema. No es ledger durable. |
| CSP/headers | CONFIRMADO_EN_CÓDIGO | next.config.ts:7-45 | Cabeceras globales presentes y turbopack.root definido. script-src conserva unsafe-inline y unsafe-eval; style-src conserva unsafe-inline. |
| CI/deps | CONFIRMADO_EN_CÓDIGO / NOT_VERIFICADO | .github/workflows/ci.yml:1-51; package.json:6-65 | CI declara check:public-docs, lint, typecheck, test, build; package incluye exceljs. Lockfile depende audit para advisory actual; no se ejecutó. El hallazgo viejo xlsx no se copia como vigente. |
| Tests | DOCUMENTADO | tests/**; package.json:10-13 | Archivos presentes. Ejecución en esta misión NOT_RUN; test presente no es evidencia de comportamiento actual. |
| Consentimiento/retención | NO_VERIFICADO | src/lib/precheckin.ts metadataPolicy; schema y storage | Existe metadata de política para datos temporales, pero no se verificó lifecycle completo ni borrado distribuido/Blob/backups. |
| SES pre éxito | NO_VERIFICADO | code/docs only | No hay envío ejecutado/evidencia nueva en esta misión. No convertir cliente implementado en integración operativa demostrada. |
| SES prod | BLOQUEADO | .anclora/SECURITY_RULES.md | SES solo preproducción, nunca real. Flag/config no permite modificarlo. |

## Delta frente a antecedentes

| Fuente | Afirmación/plan previo | Delta observado | Estado para F0 |
|---|---|---|---|
| ROADMAP.md | Prioridades cercanas: reforzar CI, XML tests, fixtures y docs. | CI/tests/demo synthetic dataset están presentes; comandos no corridos. | PARCIAL: inventariar exacto, no presentar como recién inexistente ni verde. |
| plans/001 | No había rol; sesión cualquiera opera SES/admin; quizá autorizar prod con role/flag. | requireAdmin está presente y varias rutas usan; dos readers siguen divergentes. SECURITY_RULES prohíbe prod. | PARCIAL + CONTRADICCIÓN: reutilizar roles; descartar criterio que habilita prod. |
| plans/002 | Crear owner relation y fallback solo de demo. | Migration 20260720000000 y ownerId existen; reserva filtra owner; nullable sigue. Producción reserva falla cerrado, memoria demo/dev. SES submissions sí fallback memoria. | PARCIAL: cerrar derivados/null-owner y durabilidad submission; no reimplementar owner. |
| plans/003 | Añadir headers globales; error leakage amplio. | Headers ya presentes; CSP tiene unsafe; root ya fijado; errores deben revisarse por endpoint. | PARCIAL: dirigir revisión a excepciones/error routes existentes. |
| plans/004 | Auditar xlsx, límites parser, CI coverage/E2E y root ambiguous. | exceljs figura en dependencies; no xlsx directo; workflow existe; next root fijado. Auditoría/umbrales/E2E actuales no comprobados. | PARCIAL/NO_VERIFICADO: no elevar finding viejo. |
| plans/syncxml-review-2026-07-20 | Base 3475638; roles y ownership insuficientes; tests pass, xlsx high, headers missing. | HEAD actual está adelantado en código: roles/owner/CSP/root ya existen; deps difieren. Reporte de tests/audit aplica solo a commit inspeccionado entonces. | DOCUMENTADO como historial, no evidencia actual. |
| Tres docs fuente | Propuestas con baseline/claims previos. | Mantienen sus propios cambios previos y no se modificaron en esta misión. Esta carpeta contrasta su snapshot con código y fuentes actuales. | Revisar diferencias aquí, no modificar antecedentes. |
| Instinct P1–P8 | Diagnóstico histórico en prosa: memoria, flags, roles, CSP, XLSX, etc. | P1–P3 y P5 parcialmente confirmados; P4 “cualquier identidad admin” incorrecto; P7 xlsx no probado ahora; otros elementos requieren evidencia. Artefacto Instinct independiente no localizado. | Hipótesis histórica, cada punto revalidado; no tratar como fuente primaria. |

## Contradicciones materiales

1. Prompt/planes antiguos contemplan que una bandera/rol habilite prod; SECURITY_RULES vigente limita SES a preproducción. Prevalece el contrato: salida fail-closed y nada de tráfico real.
2. getSessionUser mapea sesión de Anclora Identity a rol admin tras sesión autorizada, mientras que resolver acceso distingue GROUP_OWNER/application_membership. Alcance organizacional y meaning de admin requieren decisión de autoridad.
3. Hay cifrado de algunos atributos, pero no justificación para concluir que todos los campos, SOAP, XML, blobs o backups estén cifrados.
4. Reservas fallan cerrado en producción al no persistir; submissionRepository puede degradar a memoria. “Persistencia SES” existe pero no implica durabilidad garantizada.
5. Una suite de tests y workflow existen; no se ejecutaron. Los resultados de julio son evidencia histórica de commit 3475638, no de este HEAD.
6. README legacy registra identificadores/env/domain y contiene referencias a una DB llamada anclora_syncxml_dev; no debe recrearse ni usarse. Runtime canónico establece DB producción, no DB desarrollo.

## Duplicidades y cobertura requerida

- 001 y SDD security-audit plan duplican RBAC/SES; revisar cobertura residual de roles existente.
- 002 y migration de owner duplican ownership si se formulan como implementación nueva; nuevo foco es null-owner, recursos derivados y escenarios.
- 003 duplica headers ya presentes; gap actual es CSP unsafe/error response specific.
- 004 duplica CI/root/dependency concerns antiguos; xlsx advisory es NO_VERIFICADO a fecha actual.
- Cifrado, audit y submissions son seams separados; inventariar persistencia/copies antes de priorizar.
- Coverage estático propuesto es 100% del universo descubierto para rutas críticas, pero el denominador debe congelarse tras inventario; no es afirmación de cobertura de tests actual.

## Limitaciones

- No hubo fetch; estado de origin no se actualizó remotamente.
- No se ejecutaron tests, lint, typecheck, build, dependency audit, migrations, SES, browser QA, DB queries ni lectura de env.
- Algunas afirmaciones de mercado proceden de claims y manuales de proveedor; no son pruebas independientes.
- FAQ Interior y BOE se consultaron públicamente; el texto consolidado BOE advierte que es informativo. Revisión jurídica actual sigue pendiente.
- SDD guide / OpenSpec guide referenciadas por AGENTS.md no aparecen en ../agency-agents/docs/guides. sdd/README y ejemplos existentes sí ofrecen estructura local manual.
- Las estimaciones, ventanas, muestras y thresholds son propuestas sujetas a capacidad y evidencia.

## Decisiones abiertas de impacto

Consultar [docs/guesthub-decisions.md](../../../docs/guesthub-decisions.md). Decisiones pendientes: identidad/admin vs GROUP_OWNER; gestión de null-owner; respuesta ante fallback de submission SES; retención/deletion; excepción CSP; definiciones de métricas. Resuélvelas con criterio conservador y bloquea solo una operación concreta cuando su implementación o verificación segura dependa de ellas.
