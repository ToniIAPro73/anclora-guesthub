# Tareas propuestas F0 — GH-0.1 a GH-0.6

**Estado global:** PROPUESTA · **Implementación autorizada:** no. Cada esfuerzo P50/P80 es día-persona tentativo. Evidencia de ejecución en esta misión: NOT_RUN.

## Definition of Ready (DoR)

- Toni revisó y aceptó la spec y autorizó comenzar la fase.
- Trabajar directamente en `development`; comprobar estado y preservar cambios existentes.
- Criterios de gates conocidos; el agente implementa y ejecuta QA técnico. Toni revisa funcional y visualmente cada tarea.
- No se leen ni copian secretos; se conoce runtime PRODUCTION_BACKED; no hay DB desarrollo.
- Fixtures sintéticas para QA; entorno externo ausente por defecto. La validación de usuarios/mercado no es requisito previo.

## Definition of Done (DoD)

- Todos los criterios obligatorios de tarea y sus gates tienen evidencia revisable; el agente registra resultado técnico y visual aplicable, Toni registra aceptación funcional/visual o ajustes.
- Pruebas ejecutadas identifican comando, versión/entorno sanitizado, fecha, resultado y denominador; las no ejecutadas siguen NOT_RUN.
- Errores de seguridad críticos son FAIL o BLOCKED con responsable, nunca implícitamente aceptados.
- Sin viajeros reales, secretos en logs, SES real, cambios de contrato por bandera, o PII nueva sin lifecycle aprobado.
- Copy público pasa el gate Hermes Copy Curator antes del merge cuando corresponda; esto no añade un panel de validadores para cambios internos.

## GH-0.1 — Política única de acceso SES pre-only

- **Prioridad:** P0. **Owner:** ingeniería backend. **Revisión:** agente ejecuta controles técnicos; Toni revisa la entrega.
- **Objetivo:** documentar y luego centralizar la política server-side entre config.ts y access.ts, conservando nombres legacy sin habilitar producción.
- **Dependencias:** para análisis, ninguna; para código, aprobación de esta propuesta. El contrato de SECURITY_RULES es límite, no una decisión abierta de habilitar producción.
- **Rutas verificadas:** src/lib/ses/config.ts:21-39,56-67; src/lib/ses/access.ts:4-18; src/app/api/ses/communicate/route.ts:26-49,68-108; rutas src/app/api/ses/**.
- **Alcance:** inventario por operación, route/método, guard, entorno, endpoint y readers de flags; tabla de flags canónica/legacy; diseño central fail-closed pre. Preproduction envío requeriría autorización operacional separada.
- **Exclusiones:** SES producción, actualización de contrato, credenciales, requests de red, cambio de identidad registrada.
- **Alternativas:** central policy server-side recomendada; mantener readers duplicados se rechaza por divergencia. Las flags legacy se mantienen como entradas de compatibilidad sin capacidad para abrir prod.
- **Escenarios:** positivo pre/dry-run (futuro); negativo prod/live; límite flags discordantes, env inválido, host prod en modo pre, endpoint override; autorización sin sesión/pilot/admin/identity.
- **Aceptación — todos obligatorios:** inventario no omite endpoints/métodos; matriz tiene resultado por combinación; prod denegado por política sin excepción técnica; entorno pre no resuelve host prod; conflicto/ausencia falla cerrado; estados preparación, envío, acuse/lote y resultado terminal separados; nombres legacy y caller documentados.
- **Rechazo — cualquiera basta:** cualquier input/flag/rol permite llamar host real; ruta fuera de tabla; reader permite más capacidad que otro; error devuelve credenciales o payload; se confunde respuesta HTTP con aceptación terminal.
- **Evidencia concreta:** tabla estática por ruta/variable; futura evidencia de casos unit/ruta; mock de cliente que demuestra cero invocaciones para prod. En esta misión ejecución NOT_RUN y no hay envíos.
- **Revisión:** el agente ejecuta los controles técnicos; Toni revisa la entrega.
- **Riesgo/rollback:** regressión de pre o clientes legacy; rollback compatible solo restaurando pre previamente aprobado, nunca prod.
- **P50/P80:** 1.5 / 3 días.

## GH-0.2 — Autorización por actor/recurso y ownership

- **Prioridad:** P0. **Owner:** ingeniería backend. **Revisión:** agente ejecuta controles técnicos; Toni revisa la entrega.
- **Objetivo:** demostrar cobertura efectiva; reutilizar requireRole/requireAdmin y owner filters actuales.
- **Dependencias:** decisión sobre significado de GROUP_OWNER; inventario de rutas puede seguir si decisión pendiente.
- **Rutas verificadas:** src/lib/auth.ts:78-98; src/lib/anclora-identity/authorization.ts:24-36; src/app/api/reservations/**; src/app/api/reservations/[id]/download/xml/route.ts; src/app/api/generate/xml/route.ts; src/app/api/upload/excel/route.ts; src/app/api/ses/**; src/app/api/admin/ine/**; src/app/api/internal/**; prisma/schema.prisma:25-118,173-190.
- **Alcance:** lista API + método + datos + guard; owner checks CRUD, XML, archivo, huéspedes, audit y submission; modelo de admin separado del acceso a app; tratamiento null-owner.
- **Exclusiones:** modificar claims/product roles o datos existentes, migraciones, access global no decidido.
- **Alternativas:** exigir rol administrativo separado recomendado; derivar admin implícitamente de membership/GROUP_OWNER queda no aprobado. null-owner denegado para actor sin owner recomendado.
- **Escenarios:** anónimo; pilot own vs another owner; admin; identity membership; GROUP_OWNER; null owner; consulta/creación/borrado/download; child object ID directo.
- **Aceptación — todos obligatorios:** cada API y método sensible está en matriz; guard, owner source, recurso/relación y respuesta están documentados; actor se determina en servidor; no se filtra existencia de recurso ajeno; todas decisiones sin owner están explícitas o se aplica denegación segura por defecto.
- **Rechazo — cualquiera basta:** se delega owner al cliente, se omite ruta/objeto derivado, se asume test existente cubre toda ruta, se asigna null owner automáticamente, se transforma membership a privilegio global sin decisión.
- **Evidencia concreta:** matriz actor × acción × recurso y cobertura estática. Futuro tests con identidades sintéticas y dos owner IDs; todos los tests existentes/ejecución presente NOT_RUN.
- **Revisión:** el agente ejecuta los controles técnicos; Toni revisa la entrega.
- **Riesgo/rollback:** pérdida de acceso legítimo; restaurar solo permiso específico con evidencia, nunca acceso global/cross-owner.
- **P50/P80:** 2 / 4 días.

## GH-0.3 — CSP y errores compatibles con superficies

- **Prioridad:** P1. **Owner:** ingeniería plataforma. **Revisión:** agente ejecuta controles técnicos y visuales si afecta comportamiento visible; Toni hace revisión funcional/visual.
- **Objetivo:** reducir excepciones CSP y filtrar errores donde exista riesgo, reutilizando headers globales.
- **Dependencias:** inventario de scripts/analytics; no bloquea inventario de otras tareas.
- **Rutas:** next.config.ts:7-45; src/app/layout.tsx; src/app/api/ses/**; src/app/api/cron/**; src/app/api/admin/ine/**; src/app/api/precheckin/**; src/lib/api/errors.ts; tests/security-headers.test.ts.
- **Alcance:** mapear directivas, headers, consumos inline, sources, APIs y filtraciones de mensajes; plantear ajuste compatible o excepción acotada con owner y revisión.
- **Exclusiones:** quitar CSP, abrir hosts arbitrariamente, pentest, claim legal, cambios visuales amplios.
- **Alternativas:** nonce/hash; excepción limitada documentada temporalmente; policy report-only solo como transición con plazo.
- **Escenarios:** HTML público/app; API auth; precheckin; error downstream; scripts estáticos; analytics bloqueado; referrer no filtrado.
- **Aceptación — todos obligatorios:** todos headers y unsafe directives listados por superficie; consumidor y justificación de cada excepción; no se propone relax de frame/referrer/nosniff sin evaluación; errores seleccionados no filtran PII/secrets/raw SOAP y usan códigos/correlation IDs; QA visual futura contempla agent-browser/anclora-visual-qa en superficie afectada.
- **Rechazo — cualquiera basta:** CSP ausente como supuesta solución, unsafe-eval sin consumidor, detalle sensible del proveedor al cliente, report-only indefinido, claim de QA browser que no corrió.
- **Evidencia:** tabla de cabeceras/errors y tests previstos; revisión de fuentes; esta misión NOT_RUN.
- **Revisión:** el agente ejecuta los controles técnicos y visuales aplicables; Toni revisa la entrega.
- **Riesgo/rollback:** script legítimo deja de funcionar; rollback a política anterior registrada con fecha de retirada y protecciones base.
- **P50/P80:** 2 / 4 días.

## GH-0.4 — Inventario de datos, lifecycle y pre-check-in

- **Prioridad:** P1. **Owner:** engineering/data. **Revisión:** agente documenta y verifica lifecycle; Toni revisa. Especialista solo antes de uso público que dependa de esa validación.
- **Objetivo:** conocer datos/copies/cifrado/retención antes de ampliar persistencia o captura.
- **Dependencias:** GH-0.2 para actor y owner; inventario puede avanzar en paralelo.
- **Rutas:** prisma/schema.prisma:25-128; src/lib/privacy/encryption.ts:3-46; src/lib/storage/**; src/lib/precheckin.ts:29-119; src/lib/ses/submissionRepository.ts:17-46,63-145; src/lib/audit.ts:27-68; reservas/precheckin/SES routes.
- **Alcance:** mapa campo→finalidad→origen→almacén→actor→cifrado→retención→expiración→borrado; documento original, normalized payload, XML, Blob, audit, SOAP, token precheckin y backups.
- **Exclusiones:** acceder a viajeros reales/DB/storage/env/logs, abrir .env, crear schema/db, añadir campos.
- **Alternativas:** minimizar/no persistir por defecto; persistir con finalidad y TTL explícitos; memoria existente solo donde el modo lo permite.
- **Escenarios:** expiración/revocación, restart serverless, borrado reservation + child/blob, key unavailable, error durante write, retención obligatoria del responsable.
- **Aceptación — todos obligatorios:** todos los almacenes y copias identificados; campos con PII marcados; cifrado distinguido por campo y storage; finalidad/retención/borrado y responsable especificados; gaps se documentan y solo se marcan BLOCKED si impiden una operación concreta; no se recomienda DB alternativa; mapa documentado y revisado por Toni; especialistas solo antes de uso público aplicable.
- **Rechazo — cualquiera basta:** afirmar que helper cifra todo; ampliar datos sin lifecycle; reclamar GDPR compliance; borrar solo DB sin revisar Blob/backups; probar con viajeros reales.
- **Evidencia:** data flow map sin valores; futura fixture sintética; revisión de Toni; especialista solo antes de uso público aplicable. Ejecución actual NOT_RUN.
- **Revisión:** el agente documenta y verifica el lifecycle; Toni revisa la entrega. Especialistas solo antes de un uso público que dependa de ellos.
- **Riesgo/rollback:** persistencia amplía impacto de incidentes; prevenir nuevas capturas hasta resolución. Revertir código no borra copias.
- **P50/P80:** 2 / 4 días.

## GH-0.5 — Baseline reproducible de dependencias y CI

- **Prioridad:** P1. **Owner:** build/release engineer. **Revisión:** agente ejecuta gates CI/paquetes autorizados; Toni revisa el resultado.
- **Objetivo:** actualizar plan 004 y marcar explícitamente qué checks/workflows existen y cuáles no se ejecutaron.
- **Dependencias:** ninguna para inventario.
- **Rutas:** package.json:6-19,21-65; package lock; .github/workflows/ci.yml:1-51; src/lib/excel/parseExcel.ts; src/app/api/upload/excel/route.ts; next.config.ts:29-45.
- **Alcance:** mapear scripts, workflow y dependencias direct/transitive declaradas por lock; requisitos y límites actuales de parser; determinar plan de auditoría separada.
- **Exclusiones:** npm install/audit, actualizar lock/deps, workflow/config, audit fix, test/build.
- **Alternativas:** inventario estático ahora; snapshot de advisories en futura misión autorizada. No inferir seguridad desde ausencia de advisory conocido.
- **Escenarios:** dependencia runtime/dev; Excel dentro/fuera límites existentes; workflow trigger PR/push; CI con placeholders, sin tocar servicios.
- **Aceptación — todos obligatorios:** package y lock identificados; scripts y CI reproducidos con rutas; exceljs reconocido en vez de xlsx directo; no se afirma auditoría actual; para futuros high/critical fijar owner, mitigación o expiración; variables CI se documentan solo como fixture, sin divulgar valores.
- **Rechazo — cualquiera basta:** claim de CI verde ahora, reutilizar hallazgo xlsx histórico como actual, ejecutar comando prohibido, upgrade forzado, omitir test/lint/build definidos en CI.
- **Evidencia:** inventory estático y plan de ejecución; todas las ejecuciones NOT_RUN.
- **Revisión:** el agente ejecuta los gates técnicos autorizados; Toni revisa resultados.
- **Riesgo/rollback:** upgrades pueden romper parser/build; ningún upgrade es parte de F0 documental.
- **P50/P80:** 1 / 2 días.

## GH-0.6 — Alcance de producto y claims

- **Prioridad:** P2. **Owner:** product manager. **Revisión:** Toni revisa el alcance; Hermes/legal/especialistas solo antes de publicación o uso público que requiera esa revisión.
- **Objetivo:** describir producto observado sin exceder evidencia o confundir estado SES.
- **Dependencias:** GH-0.1 para estado SES y GH-0.4 para límites de datos.
- **Rutas y fuentes:** README.md; ROADMAP.md; docs/manual/**; docs/guesthub-xml-states.md; src/lib/xml/**; src/lib/ses/**; src/components/SyncXmlWorkflow.tsx.
- **Alcance:** in/out, glosario de states, claims por ruta/fuente/fecha, comparación cualitativa con proveedores oficiales, hipótesis Excel.
- **Exclusiones:** publicar/contactar; legal advice; price/market shares inferidos; renombrar contracts legacy; afirmar PMS completo o compliance.
- **Alternativas:** claims funcionales anclados en repositorio; claims de resultado solo con evidencia terminal verificable; propuesta de valor como hipótesis no validada; investigación opcional posterior.
- **Escenarios:** XML local válido sin envío; request enviada sin acuse; lote recibido, pendiente o error; rechazo terminal; mismatch de región/procedimiento; review human.
- **Aceptación — todos obligatorios:** cada claim lleva estado y fuente; implementación separada de ejecución; validez XSD no igual a aceptación oficial; fuentes externas con fecha y tipo; hipótesis de mercado declarada; Hermes pendiente/adjunto para copy público.
- **Rechazo — cualquiera basta:** cumple garantizado/aprobado oficialmente, envío exitoso sin evidencia, precio ajeno no publicado inferido, formato externo presentado como soportado sin evidencia.
- **Evidencia:** tabla claim→source→status, minuta de revisión; esta misión no realiza gate Hermes ni publicación.
- **Revisión:** Toni revisa el alcance; Hermes/legal/especialistas solo antes de publicación o uso público que requiera esa revisión.
- **Riesgo/rollback:** copy induce obligaciones/expectativas incorrectas; mantener claims sobrios y versionados.
- **P50/P80:** 1 / 2 días.

## Secuencia y bloqueo

GH-0.1 y GH-0.2 establecen controles para los cambios SES/permisos afectados; no impiden tareas internas independientes. GH-0.3, 0.4 y 0.5 pueden avanzar en paralelo. GH-0.6 depende de estados y mapa de datos. Usa `BLOCKED` solo cuando una dependencia concreta impida implementar o verificar de forma segura; en otro caso registra decisión pendiente y aplica la opción conservadora. Tras gates técnicos, Toni acepta o pide ajustes. Los commits y pushes van directamente a `development`; no se crea rama/PR por tarea. No hay promoción automática.
