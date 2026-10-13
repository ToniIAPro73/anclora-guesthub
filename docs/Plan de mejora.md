# Plan de mejora de Anclora GuestHub

**Versión:** 2.1 · **Corte documental:** 13 de octubre de 2026
**Baseline de análisis:** rama `chore/codex-guesthub-roadmap-docs`, HEAD `f8b3938ff7210a0465a29980b2a99ba53c55c999`; remoto `origin/development` sincronizado en `a476c70` antes de integrar la documentación. Flujo final: trabajo directo sobre `development`.
**Respaldo de housekeeping:** `/Users/toni/Developer/anclora/backups/guesthub-spec-housekeeping-20261013T124801` (bundle de refs y snapshots verificados, permisos privados).
**Estado:** `PROPUESTA PENDIENTE DE REVISIÓN DE TONI`. Este documento no acepta la propuesta ni autoriza implementación, cambios de infraestructura o comunicaciones SES.
**Ejecución de pruebas, builds, auditorías de paquetes y servicios externos en esta misión:** `NOT_RUN`.

## Propósito y límites

Toni y el agente hacen la validación inicial de producto al revisar esta spec. Para cada tarea futura, el agente implementa y ejecuta los gates técnicos proporcionales; Toni realiza después su revisión funcional y visual y acepta o pide ajustes. No se exige un panel de validadores humanos distintos por tarea. Validaciones de usuarios, mercado o especialistas externos no son prerequisito de implementación interna; se reservan para decisiones de mercado o usos públicos que dependan de ellas.

Ordenar la reducción de riesgos y la validación de la hipótesis de producto para gestores que actualmente preparan reservas en Excel. GuestHub es una aplicación operativa de importación, normalización/validación, generación de XML y operaciones asistidas; el estado del repo no sustenta describirla como PMS completo ni como garantía de cumplimiento.

Solo Fase 0 se detalla como trabajo ejecutable. Fases 1–4 son un índice de roadmap sujeto a gates y nueva especificación. Fechas, duraciones, esfuerzo y métricas son propuestas; dependen de capacidad, decisiones de Toni y evidencia. No se usaron datos reales de viajeros.

## Fuentes y estado inicial

- Git: el análisis partió del checkout `chore/codex-guesthub-roadmap-docs` (`f8b3938`) y se continuó en `development` conforme a la instrucción actual. La copia `../anclora-guesthub-f0` y la rama `feat/codex-guesthub-f0` se respaldaron antes de retirarlas; sus cambios de código no se integraron.
- Contratos: `.anclora/PRODUCTION_RUNTIME.md` declara `LOCAL_RUNTIME_MODEL=PRODUCTION_BACKED`, `DO_NOT_CREATE_DEVELOPMENT_DATABASE=true`; `.anclora/SECURITY_RULES.md` establece literalmente “SES solo en preproducción, nunca en real”. Esta regla bloquea SES de producción aunque exista cualquier bandera técnica. Cambiarla requiere decisión explícita y proceso canónico separado; esta propuesta no lo inicia.
- Código inspeccionado estáticamente: `src/lib/ses/config.ts:23-38,56-67`; `src/lib/ses/access.ts:4-18`; `src/lib/auth.ts:78-98`; `src/lib/anclora-identity/authorization.ts:24-36`; `prisma/schema.prisma:25-63,65-118,173-190`; `src/lib/precheckin.ts:59-62,68-101`; `src/lib/security/rateLimit.ts:27-83`; `next.config.ts:7-45`; `package.json` y `.github/workflows/ci.yml`.
- Documentos comparados: `ROADMAP.md`; `plans/001-rbac-and-ses-production-guard.md` a `plans/004-dependency-and-verification-baseline.md`; `plans/syncxml-review-2026-07-20.md` (base `3475638`, distinta de HEAD); specs/tareas SDD bajo `sdd/features/security-audit-priority-plan/`; diagnóstico anterior de Instinct/P1–P8 resumido y revalidado en `docs/Análisis de anclora guesthub y análisis de competidores.md`.
- SDD: `sdd/README.md` y ejemplos de spec/plan/tasks existen; las rutas referenciadas `../agency-agents/docs/guides/SDD_INTEGRATION_GUIDE.md` y `OPENSPEC_WORKFLOW.md` no están disponibles en el workspace inspeccionado (`NOT_FOUND`). Esta propuesta manual sigue la estructura de artefactos local; no se instaló tooling.
- Hallazgo sobre fuente de Instinct: no se encontró en el repositorio un artefacto independiente identificable con ese diagnóstico; por ello sus puntos se tratan como afirmaciones históricas reproducidas en documentación, no como fuente primaria verificable.
- Todos los tests presentes son evidencia de existencia únicamente. Ninguno se ejecutó en esta misión (`NOT_RUN`).

## Roadmap de cinco fases

Ventanas de referencia conservadas del prompt (26 semanas nominales). Se desplazan completas cuando capacidad o gates no estén disponibles; no se comprimen para cumplir fechas.

| Fase | Ventana propuesta | Tareas y dependencia | Gate de salida propuesto |
|---|---|---|---|
| **F0 — Seguridad y alcance** | 12–26 oct 2026 · 2 sem | GH-0.1 política SES; GH-0.2 autorización, roles y ownership; GH-0.3 CSP/errores; GH-0.4 PII y ciclo de vida; GH-0.5 baseline CI/dependencias; GH-0.6 definición del producto y claims. | Decisiones de seguridad registradas; ninguna operación permite SES real mientras rija `.anclora/SECURITY_RULES.md`; matriz cubre rutas/recursos; gaps PII/CSP/dependencias tienen evidencia o bloqueo y owner; revisión de Toni. Cualquier gate no ejecutado queda `NOT_RUN`, no `PASS`. |
| **F1 — Flujo verificable de preproducción** | 26 oct–23 nov 2026 · 4 sem | GH-1.1 fixtures sintéticas/arnés; GH-1.2 ledger minimizado; GH-1.3 catálogo de respuestas; GH-1.4 informe. Depende de F0 aprobado y acceso pre autorizado por separado. | Solo transacciones preproducción, con fixtures sintéticas, autorización específica, entorno y denominadores definidos. El objetivo 30–50 es capacidad tentativa, no aceptación automática. Si falta acceso/autorización: `BLOCKED`. Respuesta recibida, acuse/lote y resultado final se registran como estados distintos. |
| **F2 — Persistencia y ciclo de datos** | 23 nov 2026–4 ene 2027 · 6 sem | GH-2.1 persistencia pre-check-in; GH-2.2 expiración/revocación/borrado; GH-2.3 rate limit compartido. Depende de F0 y diseño de datos aprobado. | Diseño compatible con runtime production-backed; clasificación/minimización, revisión de schema/migración, rollback y evidencia de expiración/revocación; no se crea DB alternativa. Gate de DB según contratos canónicos. |
| **F3 — Aislamiento y onboarding** | 4 ene–1 mar 2027 · 8 sem | GH-3.1 cerrar gaps RBAC/tenant; GH-3.2 onboarding Excel; GH-3.3 importación de formato externo documentado, solo tras verificar interfaz, licencia, cobertura y deduplicación. Depende de F0–F2 según alcance técnico. | Matriz de permisos y aislamiento demostrada con cuentas QA dedicadas y datos sintéticos; importación queda bloqueada solo si su fuente o contrato impiden implementarla con seguridad. Entrevistas/validación de gestores son investigación de mercado opcional y no bloquean trabajo interno. |
| **F4 — Beta y decisión comercial** | 1 mar–12 abr 2027 · 6 sem | GH-4.1 preparar beta/piloto como trabajo condicionado a uso externo; GH-4.2 soporte/runbook; GH-4.3 decisión de alcance/precio/lanzamiento. Depende de gates técnicos previos; los requisitos de privacidad/legal aplican antes de la actividad pública concreta que los requiera. | El código y preparación interna no esperan cohortes, entrevistas ni revisores externos. Antes de beta pública: consentimiento y operación apropiados, claims aprobados para su contexto, revisión especializada solo donde el uso o afirmación lo requiera y decisión expresa de Toni. No implica publicar ni habilitar SES real. |

### Métricas candidatas (sin objetivos comprometidos)

Si se decide hacer investigación de mercado o piloto, definir antes población, unidad, muestreo, denominador y exclusiones. Esa investigación no es DoR para implementar tareas internas. Candidatas: campos críticos importados correctamente/campos críticos esperados; errores corregibles resueltos/errores corregibles detectados; resultados finales aceptados/comunicaciones con resultado terminal conocido (separando timeout, pendiente y reintento); mediana/P90 de tiempo observado vs. línea base manual; incidentes de aislamiento/privacidad y carga de soporte por reserva. No se fija porcentaje, reducción de tiempo, aceptación SES o disposición a pagar sin línea base observada. No incluir datos identificables en la analítica.

## Especificación ejecutable propuesta — Fase 0

### Convenciones del gate

Cada criterio se etiqueta `PASS` solo con artefacto verificable y gate técnico completado por el agente; `FAIL` cuando evidencia demuestra incumplimiento; `BLOCKED` solo si una dependencia concreta impide implementar o verificar con seguridad; `NOT_RUN` si la verificación no se ejecutó. Toni revisa luego el resultado funcional/visual y acepta la entrega o pide ajustes. Un documento, test existente o bandera configurada no equivale a comportamiento comprobado. Esta tarea documental no ejecutó verificación técnica: todas las pruebas de implementación listadas abajo están `NOT_RUN`.

Los diseños no presentes en el código llevan marca `PROPUESTA`. Después de revisar y validar esta spec con Toni, el agente implementa tarea a tarea sobre `development`, ejecuta los gates técnicos aplicables y realiza QA visual cuando cambie UI o comportamiento visible. Hace commits y pushes coherentes a `origin/development`; no crea ramas por tarea/fase ni PRs. No promueve automáticamente. El trabajo F0 nunca modifica datos ni crea tablas, buckets, usuarios, cuentas, integraciones o credenciales.

### GH-0.1 — Política SES única, fail-closed y limitada a preproducción

- **Prioridad / estado:** P0 · propuesta pendiente · revisión de seguridad obligatoria.
- **Owner / verificación técnica:** agente de ingeniería. **Revisión funcional/producto:** Toni después de que el agente presente evidencia y resultado.
- **Objetivo:** especificar una única decisión server-side para cada capacidad SES y eliminar la contradicción entre `src/lib/ses/config.ts:37,65-67` (`GUESTHUB_SES_ALLOW_PRODUCTION_SEND` con fallback legacy `SYNCXML_SES_ALLOW_PRODUCTION_SEND`) y `src/lib/ses/access.ts:4-9` (`GUESTHUB_ALLOW_SES_PRODUCTION_SEND` / legacy equivalente).
- **Alcance:** inventariar todas las rutas `src/app/api/ses/**`; identificar operación/configuración/endpoint, variables leídas, modo dry-run y rol; proponer decisión central fail-closed para el entorno pre. Preservar nombres legacy hasta análisis de compatibilidad. No habilitar ambiente `prod`, aunque una bandera esté presente.
- **Exclusiones:** cambiar `.anclora/SECURITY_RULES.md`, enviar a SES, inspeccionar credenciales, cambiar variables externas, migrar o activar un contrato productivo.
- **Dependencias:** ninguna para análisis. Cualquier implementación requerirá decisión de contrato aparte; política actual es un límite obligatorio, no una decisión abierta en esta tarea.
- **Rutas reales:** `src/lib/ses/config.ts`, `src/lib/ses/access.ts`, `src/app/api/ses/**`, pruebas bajo `tests/*ses*` y `tests/rbac-routes.test.ts`; solo para inventario, no edición ahora.
- **Diseño `PROPUESTA`:** función/política única que acepte operación, entorno y dry-run; resultado denegatorio ante ausencia, valor inválido, conflicto de bandera, endpoint prod o excepción. Config de preproducción no podrá redirigirse silenciosamente a host productivo.
- **Escenarios:** positivo: llamada autorizada de preproducción con configuración consistente (futuro QA separado); negativo: bandera de prod presente; límite: flags canónica y legacy opuestas, env desconocido, endpoint sobreescrito; autorización: anónimo, `pilot_user`, `admin`, principal Anclora sin membresía y `GROUP_OWNER`. En todos los escenarios queda prohibido tráfico real.
- **Aceptación objetiva:** (1) tabla de verdad por ruta y variable sin celdas omitidas; (2) no existe combinación de input/flag que permita host SES real mientras el contrato local siga igual; (3) discrepancia de banderas tiene decisión y compatibilidad documentadas; (4) modo pre no acepta hostname prod; (5) cada resultado “transmitido”, “acuse/lote”, “procesado/resultado” se mantiene distinto en copy y modelo de evidencia.
- **Rechazo objetivo:** cualquier diseño interpreta opt-in técnico como autorización legal/operativa; una ruta no está inventariada; configuración desconocida falla abierta; renombra clave/API legacy sin plan de compatibilidad.
- **Evidencia requerida:** tabla por ruta + nombres de variable no secretos, referencias de archivo/línea, decisión pendiente/aprobada firmada por Toni, casos de regresión propuestos. Evidencia de ejecución de pruebas: `NOT_RUN`; no hay envío SES.
- **QA y observabilidad previstos:** pruebas unitarias de tabla de verdad y tests de ruta (QA backend, futura misión); log de decisión con código estable, entorno lógico (`pre`/bloqueado), operación y correlation ID; jamás URL con credenciales, payload, viajeros o secretos.
- **Riesgo/rollback:** riesgo de romper pruebas de pre si se endurece host/config; rollback futuro solo restaurando capacidad pre autorizada y manteniendo denegación de producción. No se permite rollback que desbloquee prod.
- **Esfuerzo P50/P80:** 1.5 / 3 días de ingeniería, excluida aprobación contractual externa.

### GH-0.2 — Matriz de identidad, rol, tenant y propietario

- **Prioridad / estado:** P0 · propuesta pendiente.
- **Owner / verificación técnica:** agente de ingeniería. **Revisión funcional/producto:** Toni; decisiones de privilegio se validan al revisar la spec o tarea.
- **Objetivo:** reconciliar planes 001–002 con los controles que ya existen sin reconstruir roles ni ownership.
- **Alcance:** inventario estático de rutas y operaciones de lectura/escritura/descarga/borrado; trazar `requireAuth`/`requireAdmin`, `getSessionOwnerId`, claims de Identity y `ownerId`; revisar reservas sin owner y relaciones `Guest`, `StoredFile`, `AuditEvent`, SES submissions.
- **Exclusiones:** cambiar datos/roles/claims, asignar owner a registros viejos, definir acceso global nuevo, crear usuarios QA o aplicar migración.
- **Dependencias:** el inventario continúa sin decisión. Para cambios de permisos, usar el principio de mínimo privilegio y comportamiento vigente; si no se puede demostrar una decisión segura compatible, bloquear solo esa operación concreta y pedir decisión a Toni.
- **Rutas reales:** `src/lib/auth.ts:78-98`; `src/lib/anclora-identity/authorization.ts:24-36`; `src/app/api/reservations/**`; `src/app/api/generate/xml/route.ts`; `src/app/api/upload/excel/route.ts`; `src/app/api/ses/**`; `src/app/api/admin/**`; `src/app/api/internal/**`; `prisma/schema.prisma:25-118,173-190`; tests `reservation-ownership`, `rbac-routes`, `anclora-identity-authorization`.
- **Diseño `PROPUESTA`:** matriz actor × acción × recurso × status; recursos sin owner se deniegan o se devuelven sin datos; propagar identidad desde servidor; rol de producto explícito independiente de acceso a la app.
- **Escenarios:** positivo: propietario lee/modifica su reserva según permiso; negativo: sesión ausente, piloto contra ruta admin, actor A opera reserva B; límite: `ownerId=null`, admin sin id, recurso derivado desconectado; autorización: membership vs `GROUP_OWNER`, claims vacíos o no válidos.
- **Aceptación objetiva:** toda ruta/API y recurso derivado aparece en la matriz; cada ruta identifica guard y owner check actual observado; recursos null/ajenos tienen resultado definido; papel de `GROUP_OWNER` se describe sin ampliar privilegios; Toni confirma o pide ajustes en su revisión funcional; evidencia distingue tests existentes de tests ejecutados (`NOT_RUN`).
- **Rechazo objetivo:** se afirma que `requireAdmin` existente prueba cobertura completa; cliente controla owner/rol; acceso basado solo en que la identidad pueda entrar a la app; omitir descarga/XML/SES/submissions; atribución automática de recursos sin dueño.
- **Evidencia requerida:** matriz enlazada a rutas y modelos, lista de gaps y estado de cada prueba. Nada de PII.
- **QA y observabilidad previstos:** futuro conjunto de pruebas por actor/recurso; eventos con actor ID seudónimo/correlation ID, acción y resultado, sin email ni contenido.
- **Riesgo/rollback:** cambios de permiso pueden bloquear usuarios válidos; rollback no puede abrir acceso cruzado; cualquier alternativa requiere aprobación y evidencia de aislamiento.
- **Esfuerzo P50/P80:** 2 / 4 días incluyendo inventario y resolución de decisiones.

### GH-0.3 — CSP, cabeceras y errores expuestos

- **Prioridad / estado:** P1 · propuesta pendiente.
- **Owner / verificación técnica:** agente de ingeniería, incluida comprobación visual focalizada si el cambio afecta pantallas o comportamiento visible. **Revisión:** Toni.
- **Objetivo:** cerrar el gap entre plan 003 y estado actual, que ya aplica cabeceras globales.
- **Alcance:** mapear CSP real `next.config.ts:7-45`, inline scripts de `src/app/layout.tsx`, dependencias de analítica y mensajes de error API. Determinar directivas y excepciones necesarias y revisar errores públicos solo donde persista exposición.
- **Exclusiones:** quitar CSP, ampliar hosts sin evidencia, cambios visuales amplios, promesa de conformidad legal.
- **Dependencias:** GH-0.1 y decisiones sobre herramientas analíticas; diagnóstico documental puede correr en paralelo.
- **Rutas:** `next.config.ts`, `src/app/layout.tsx`, `src/app/api/ses/**`, `src/app/api/cron/**`, `src/app/api/admin/ine/**`, `src/app/api/precheckin/**`, tests `security-headers`.
- **Diseño `PROPUESTA`:** definir transición report-only/nonce/hash o excepción acotada; conservar `frame-ancestors 'none'`, referrer, nosniff, permissions; mapper de error estable donde haya filtración confirmada.
- **Escenarios:** público HTML con cabeceras; usuario autenticado; error downstream sin revelar detalle; inline legítimo; proveedor de analytics bloqueado; pre-check-in sin token filtrado por referrer.
- **Aceptación objetiva:** inventario identifica directiva/consumidor/excepción por cada `unsafe-*`; cada respuesta revisada tiene evidencia de headers; todo error público objeto de cambio tiene contrato genérico/correlation ID; browser QA futuro usa runtime compartido para rutas representativas. No se exige eliminar `unsafe-inline` si se justifica una excepción concreta, owner y revisión de retirada.
- **Rechazo objetivo:** quitar/relajar la política sin justificación, dejar report-only como estado final sin gate, error técnico sensible al cliente o afirmar prueba visual no realizada.
- **Evidencia requerida:** tabla de CSP y errors, test propuesto y salida futura; ejecución de QA browser en esta misión: `NOT_RUN`.
- **Observabilidad prevista:** CSP report sin URL/query/cuerpo/PII; códigos de error estables y correlation ID opaco.
- **Riesgo/rollback:** CSP puede romper framework; rollback solo a última política que conserve denegación de framing y headers base, con excepción temporal rastreada.
- **Esfuerzo P50/P80:** 2 / 4 días.

### GH-0.4 — Inventario de datos personales y ciclo de vida

- **Prioridad / estado:** P1 · propuesta pendiente.
- **Owner / verificación técnica:** agente de ingeniería. Toni revisa el resultado; especialista externo se consulta solo si una acción pública o una decisión legal/profesional concreta lo requiere.
- **Objetivo:** documentar minimización y lifecycle real antes de ampliar pre-check-in o persistencia.
- **Alcance:** mapear Excel en memoria/almacenamiento, campos de `Guest` y `Reservation`, ficheros/Blob/XML, audit, submissions SES, pre-check-in, logs, cifrado y claves; identificar acceso, finalidad, retención, expiración, revocación y borrado.
- **Exclusiones:** abrir datos reales, `.env*`, logs productivos, crear DB dev, nueva migración, copiar/devolver datos personales.
- **Dependencias:** GH-0.2 para ownership; inventario puede empezar ya.
- **Rutas:** `prisma/schema.prisma:25-128`; `src/lib/privacy/encryption.ts`; `src/lib/storage/**`; `src/lib/precheckin.ts:29-49,59-119`; `src/lib/ses/submissionRepository.ts`; `src/lib/audit.ts`; rutas de reservation, precheckin y SES.
- **Diseño `PROPUESTA`:** mapa campo→finalidad→sistema→actor→retención→borrado→cifrado; revisar duración de token pre-check-in frente a expiración configurada y hecho de que lista de sesiones vive en memoria por instancia.
- **Escenarios:** fin de plazo normal; token expirado/revocado; fallo de instancia; borrado de reserva con registros derivados; objeto Blob sin referencia; clave no disponible/rotada; solicitud de retención legal.
- **Aceptación objetiva:** todos los campos/almacenes con PII o metadatos sensibles identificados; lifecycle define método de verificar borrado y límites de copias; gaps de retención/owner se documentan y se usa el comportamiento más conservador existente; marcar `BLOCKED` solo si impide implementar/verificar una operación específica con seguridad; valoración de privacidad/legal requerida antes de recolectar campos adicionales.
- **Rechazo objetivo:** claim RGPD sin revisión; persistir más datos por conveniencia; suponer cifrado de todos los campos porque existe helper; proponer DB/bucket alternativo o tocar producción en F0.
- **Evidencia requerida:** mapa de flujo y matriz de retención solo con campos/modelos, no datos reales; decisión de minimización; revisión técnica por el agente; consulta especializada solo antes de un uso público o decisión legal que realmente dependa de ella.
- **QA/observabilidad previstos:** tests sintéticos de expiración/revocación/borrado futuros; métricas de conteo y estados sin identidad directa ni payload.
- **Riesgo/rollback:** retención mal definida amplía impacto de exposición; no recolectar datos nuevos hasta cerrar decisión. Revertir una funcionalidad no borra copias existentes sin procedimiento comprobable.
- **Esfuerzo P50/P80:** 2 / 4 días.

### GH-0.5 — Baseline de CI y dependencias

- **Prioridad / estado:** P1 · propuesta pendiente; análisis estático parcialmente preparado.
- **Owner / verificación técnica:** agente de ingeniería; Toni revisa el resultado de la tarea. AppSec externo no es requisito general y se consulta si aparece una dependencia que requiera juicio especializado antes de uso público.
- **Objetivo:** actualizar el plan 004 frente a cambios ya presentes: `exceljs` sustituyó la referencia directa histórica a `xlsx`, y `next.config.ts` define `turbopack.root`.
- **Alcance:** leer lockfile y `.github/workflows/ci.yml`; mapear comandos disponibles; revisar límites de parser; obtener después, en una misión autorizada que sí ejecute auditoría, snapshot de advisories y clasificación directa/transitiva, runtime/dev, severidad, disponibilidad de fix y responsable.
- **Exclusiones:** no ejecutar `npm audit`, pruebas, lint, typecheck, build ni instalación; no editar dependencias/workflows/config ahora; no upgrades forzados.
- **Dependencias:** ninguna para inventario documental.
- **Rutas:** `package.json`, lockfile(s), `.github/workflows/ci.yml`, `src/lib/excel/parseExcel.ts`, `src/app/api/upload/excel/route.ts`, `next.config.ts`, tests `excel-parser`/`new-excel-files`.
- **Diseño `PROPUESTA`:** reproducible report de inventario con fecha y comando aprobado; criterio de severidad/caducidad de excepción; límites de filas/columnas/tamaño/tiempo referenciados a valores actuales sin inventar desempeño.
- **Escenarios:** advisory directo runtime; transitive dev; sin fix; parser XLSX dentro de límite y fuera; workflow sin permiso de datos real.
- **Aceptación objetiva:** estado actual distingue dependencia y lockfile frente al plan viejo; no se afirma riesgo de `xlsx` actual sin auditoría; CI y scripts se citan; cada high/critical en ejecución futura obtiene decisión de mitigación, actualización o excepción con owner y expiración. Todos los comandos de ejecución en esta misión quedan `NOT_RUN`.
- **Rechazo objetivo:** repetir hallazgo `xlsx` como actual sin verificación; declarar baseline verde; cambiar lock/dependencies/config; usar la advertencia de raíz antigua como estado vigente pese a `turbopack.root`.
- **Evidencia requerida:** lista de scripts/workflows inspeccionados y snapshot futuro con origen de datos; ningún resultado de auditoría atribuido a esta misión.
- **QA/observabilidad previstos:** CI agrupada en punto de cambio aprobado; logs de CI sin env/secretos ni datos de viajeros.
- **Riesgo/rollback:** actualización puede romper parsing; mantener rollback versionado sujeto a triage de seguridad, nunca downgrade forzado de Next.
- **Esfuerzo P50/P80:** 1 / 2 días de análisis; verificación dinámica futura es tarea separada.

### GH-0.6 — Definición de producto, estados y claims

- **Prioridad / estado:** P2 · propuesta pendiente; cambios de copy público requieren Hermes Copy Curator antes del merge.
- **Owner / verificación:** agente y Toni. Si se modifica copy público, se conserva el gate Hermes del contrato SDD; no se exige investigación de usuarios previa para documentación o implementación interna.
- **Objetivo:** alinear README, roadmap, manuales y UI con capacidades observables y límites legales.
- **Alcance:** definición in/out, estado de XSD, XML generado, validación local, comunicación solicitada, respuesta recibida, lote y resultado terminal; inventario de claims y fuentes oficiales/proveedores.
- **Exclusiones:** publicar, contactar competidores/clientes, dar asesoría legal, afirmar cumplimiento garantizado o alterar nombres legacy de sesión/storage/SES.
- **Dependencias:** GH-0.1/0.4 para consistencia. Copy público queda sujeto al gate Hermes; afirmaciones de carácter legal/profesional requieren revisión especializada antes de ese uso público, sin bloquear trabajo interno que evite dichos claims.
- **Rutas/documentos:** `README.md`, `ROADMAP.md`, manuales en `docs/manual/`, `docs/guesthub-xml-states.md`, `src/lib/xml/**`, `src/lib/ses/**`, UI `src/components/SyncXmlWorkflow.tsx`.
- **Diseño `PROPUESTA`:** frase de producto basada en importación Excel y preparación revisable; estados diferenciados y no equivalentes; formatos externos se mantienen como hipótesis hasta verificar fuentes, licencia y cobertura.
- **Escenarios:** XSD local válido con cero tráfico; solicitud enviada sin acuse; acuse aceptado pero resultado pendiente; rechazo definitivo; canal/región con autoridad diferente; PMS vs herramienta focalizada.
- **Aceptación objetiva:** claim enlaza a archivo/función o fuente oficial; cada estado no implica el siguiente; mercado separa claim del proveedor y función descrita por manual; copy evita “PMS completo”, “cumple garantizado” y aceptación sin evidencia; ningún claim legal se presenta como certificado; solicitar revisión especializada antes del uso público que dependa de interpretación legal.
- **Rechazo objetivo:** precio no publicado inferido; números/porcentajes comerciales no atribuibles; envío productivo sugerido; nombre técnico legacy removido sin compatibilidad revisada.
- **Evidencia requerida:** inventario de claims con estado y URL/fecha de consulta; revisión Hermes pendiente hasta trabajo de copy.
- **QA/observabilidad previstos:** revisión editorial y legal; no requiere browser QA si es solo documentación; para UI futura el QA visual se elige según contrato compartido.
- **Riesgo/rollback:** copy puede inducir expectativas incorrectas; mantener texto neutral y recuperar versión editorial si gate no pasa.
- **Esfuerzo P50/P80:** 1 / 2 días más el tiempo de revisión de Toni; especialistas solo si el uso público lo requiere.

### Gates de F0

1. **G0-A, política SES:** el agente verifica escenarios y deja SES de producción denegado según `.anclora/SECURITY_RULES.md`; Toni revisa la evidencia funcional.
2. **G0-B, autorización/ownership:** el agente implementa/verifica la matriz de rutas y recursos; aplica mínimo privilegio donde la decisión concreta no esté definida y consulta a Toni si afecta comportamiento de producto. No bloquear el inventario por un panel de revisores.
3. **G0-C, privacidad y web:** el agente documenta/verifica el tratamiento seguro y hace comprobación visual si una superficie visible cambia; las preguntas externas de privacidad/legal se difieren hasta un uso concreto que dependa de ellas.
4. **G0-D, calidad y entrega:** el agente ejecuta los gates técnicos proporcionales; estados y evidencia son explícitos. Toni realiza su revisión funcional/visual después de cada entrega.

**Salida F0:** `PASS` cuando los criterios y gates técnicos tienen evidencia y Toni acepta la entrega; `FAIL` si evidencia demuestra incumplimiento; `BLOCKED` solo ante una dependencia concreta que impide continuar de forma segura; `NOT_RUN` cuando la comprobación aún no se ejecutó. El gate no certifica legalidad, calidad profesional ni mercado. Fechas no alteran el resultado.

## Decisiones pendientes de Toni

Estas decisiones se presentan a Toni junto con la spec y no requieren validadores adicionales. El agente recomienda valores conservadores; solo una respuesta pendiente que impida una acción segura concreta bloquea esa acción.

- **Acceso `GROUP_OWNER`:** mantener acceso global de GuestHub o introducir autoridad administrativa separada. Valor recomendado: no inferir rol administrativo de GuestHub solo por poder acceder a la aplicación; cerrar la definición antes de ampliar privilegios.
- **Recursos `ownerId=null`:** política de denegación/lectura administrativa controlada y reconciliación. Valor recomendado: no atribuir automáticamente ni exponer a pilotos.
- **Capacidad/calendario:** confirmar responsables disponibles y ventanas de revisión; fecha inicial es referencia, no compromiso.
- **Acceso SES preproducción:** si procede, misión operativa separada con autorización, datos sintéticos y credenciales ya dispuestas en el entorno seguro; esta propuesta no lo solicita ni lo ejecuta.
- **Mercado:** confirmar cohorte inicial y mecanismo de entrevistas; precio, beta, territorios y voluntad de pago siguen sin validar.

**Estado de aprobación:** `PENDIENTE DE REVISIÓN DE TONI` · **Implementación:** no autorizada por este documento.
