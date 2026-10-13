# Plan propuesto — Fase 0 Seguridad y alcance

**Estado:** PROPUESTA · pendiente de revisión de Toni · no autorizado para implementación.
**Base:** HEAD f8b3938, 12/10/2026. Duraciones P50/P80 orientativas de ingeniería; no comprometen calendario.

## Dirección técnica

Reutilizar controles existentes y cerrar sus fronteras. No crear una segunda autenticación ni otra abstracción de ownership. En SES, consolidar decisión de capacidad en servidor, conservar referencias legacy y denegar siempre prod conforme al contrato. No confiar en environment/dryRun del cliente. En autorización, derivar actor y owner desde sesión/claims de servidor y aplicar filtros en recursos derivados. En privacidad, preferir reducción de datos y ciclo de vida observable sobre retención nueva. En CSP, revisar consumidores actuales antes de alterar directivas. El inventario de deps separa lockfile/runtime/dev y no sustituye auditoría dinámica.

### Componentes actuales reutilizables

- auth: src/lib/auth.ts, requireAuth/requireRole/requireAdmin/getSessionOwnerId.
- Identity: src/lib/anclora-identity/authorization.ts y session.ts.
- owner filtering: src/app/api/reservations/** y src/lib/db/reservations.ts.
- SES: src/lib/ses/config.ts, access.ts, client.ts, parser.ts, submissionRepository.ts.
- errores/logs: src/lib/api/errors.ts.
- cifrado: src/lib/privacy/encryption.ts; almacenamiento: src/lib/storage/**.
- CSP/headers y raíz: next.config.ts.
- CI: .github/workflows/ci.yml; parser: src/lib/excel/parseExcel.ts.

## Opciones principales

| Decisión | Opción A | Opción B | Recomendación para propuesta |
|---|---|---|---|
| Gate SES | Un helper de política pre-only central y servidor; legacy flags no habilitan prod. | Mantener dos readers y sincronizarlos documentalmente. | A; reduce divergencia. Producción denegada sin excepción. |
| Identity vs admin | Claim de membership habilita app, rol GuestHub limita admin. | GROUP_OWNER equivale a admin global. | Preferir separación explícita; decisión de Toni pendiente. |
| ownerId null | Denegar acceso piloto; investigar reconciliación aparte. | Asignación masiva por email/reserva. | A; no atribuir sin evidencia. |
| CSP | Nonce/hash por framework, excepciones limitadas. | Mantener unsafe directives temporalmente con owner/review date. | Evaluar compatibilidad; prohibir expansión no justificada. |
| Persistencia fallback | Error controlado si no hay durable storage para operaciones que afirman persistencia. | Permitir memoria solo en demo/dev y anunciar no durable. | Distinguir modos. Cualquier decisión de escritura/contrato queda para revisión futura. |
| Dependencias | Snapshot estático lockfile y auditoría en misión autorizada. | Cambiar paquetes automáticamente. | A; no update ni audit en esta tarea. |

## Ejecución propuesta por bloque

1. GH-0.1 y GH-0.2: construir inventarios primero; resolver flags y matriz antes de considerar cambios. Ninguna transacción real SES.
2. GH-0.3 y GH-0.4: inspeccionar CSP/errores y flujo de datos campo a almacén; no abrir env ni datos reales.
3. GH-0.5: documentar scripts, lockfile, workflow, parser límites; auditoría de dependencias autorizada será otro gate, no ejecutada aquí.
4. GH-0.6: resolver estados/claims y someter copy público a Hermes Copy Curator en futura implementación.

## QA futuro

Todos los comandos y revisiones listados son futuros. En esta misión pruebas, lint, typecheck, build, auditoría, browser QA, SES, DB y servicios: NOT_RUN. El flujo futuro trabaja directamente en development, sin rama/PR por tarea; el agente ejecuta QA técnico y visual aplicable, después Toni revisa funcional y visualmente.

- GH-0.1: tabla de combinaciones endpoint/env/flags/dryRun y rutas, incluyendo contradicción legacy. Pruebas unitarias + rutas negativas. No se usa red SES.
- GH-0.2: matriz completa anónimo/pilot/admin/identity, dos owners sintéticos, null-owner, rutas CRUD/download/XML/SES.
- GH-0.3: tests de response headers en HTML/API/pre-checkin y revisión de consola mediante agent-browser / anclora-visual-qa en gate UI proporcional. Sin browser QA en esta misión documental.
- GH-0.4: solo fixture sintética, tests de expiración/revoke/borrado; revisión de análisis de privacidad y esquema antes de toda migración.
- GH-0.5: CI ejecuta scripts que declara; audit report reproducible solo cuando autorizado. Nunca npm audit fix --force.
- GH-0.6: revisión de claims y manuales; Hermes Copy Curator antes del merge de copy público cuando corresponda.

## Observabilidad propuesta

Usar correlation ID opaco, código de decisión, acción, entorno lógico, resultado de autorización y estado SES. No loggear credenciales, token, URL con auth, XML/SOAP, nombre/documento/email, cuerpo de fichero ni query de huéspedes. Para SES distinguir REQUEST_PREPARED, SENT, ACK/BATCH, PROCESSING y terminal PROCESSED/FAILED; no reducir a booleano éxito. Revisión privacy define retención agregada y borrado. No incorporar reportes/listas de viajeros para analítica.

## Rollback y compatibilidad

- Preservar nombres legacy de cookies, env, Nexus, almacenamiento, aplicación registrada SES y símbolos; cualquier rename requiere análisis de compatibilidad separado.
- Si endurecimiento de CSP rompe una superficie, rollback a política previa documentada solo con controles de cabecera y ventana de reexamen, sin ampliar hosts o eliminar framing protection.
- Si guard bloquea un actor válido, no quitar guard globalmente: restaurar solo regla previa permitida, añadir prueba dirigida y revisión de rol/owner.
- Una reversión no borra PII persistida ni objetos Blob; procedimiento de borrado separado y comprobable.
- Nunca revertir al desbloqueo de SES prod ni a acceso cruzado.

## Riesgos y estimación

| Tarea | P50 | P80 | Riesgo/condición |
|---|---:|---:|---|
| GH-0.1 | 1.5 d | 3 d | Compatibilidad con nombres legacy y config del entorno; prod permanece bloqueado. |
| GH-0.2 | 2 d | 4 d | Claims/admin y recursos derivados requieren decisión de owner. |
| GH-0.3 | 2 d | 4 d | Compatibilidad CSP con Next/analytics depende de inspección runtime. |
| GH-0.4 | 2 d | 4 d | Hay campos/copias y fallback que requieren trazabilidad; revisión técnica del agente y Toni; especialista solo antes de uso público aplicable. |
| GH-0.5 | 1 d | 2 d | Auditoría dinámica queda fuera de esta misión. |
| GH-0.6 | 1 d | 2 d | Revisión de Toni; legal/Hermes solo para uso público aplicable. |

P50/P80 son días-persona aproximados, no calendario; no incluyen espera operacional externa (solo para tareas dependientes), SES pre, auditoría especializada, migraciones o corrección de hallazgos. No hay estimación aprobada.
