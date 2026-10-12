# Plan de mejora de Anclora GuestHub

**Versión:** 1.0 · **Fecha:** 12 de octubre de 2026
**Base:** baseline estático `a476c70`; roadmap tentativo de 24 semanas.
**Estado:** propuesta para revisión; no es autorización para envíos SES de producción ni para cambios de infraestructura.

## Objetivo

Reducir riesgo operativo y validar la propuesta de valor de GuestHub para anfitriones/gestores que preparan reservas en Excel. Priorizar seguridad, aislamiento, persistencia, evidencia observable del flujo SES y comprensión de errores. Mantener el alcance de producto como herramienta de importación, validación y comunicación asistida; no tratarlo como PMS integral.

## Secuencia y calendario propuestos

Las fechas presuponen una persona de ingeniería casi a tiempo completo, revisión de Toni semanal, QA parcial y acceso formal a SES preproducción. La capacidad no está confirmada; si varía, conservar duración y gates, desplazar fechas y no comprimir revisiones. Fechas de fases consecutivas incluyen solape solo para entrevistas y documentación no dependientes.

| Fase | Ventana propuesta | Objetivo y tareas | Gate para avanzar |
| --- | --- | --- | --- |
| 0. Seguridad y alcance | 12–26 oct 2026 · 2 sem | GH-0.1 política SES; GH-0.2 matriz de identidad/roles/ownership; GH-0.3 CSP; GH-0.4 inventario privacidad/retención y pre-check-in; GH-0.5 baseline reproducible de dependencias y CI; GH-0.6 claims y límites de producto. | Toda operación SES queda fail-closed según contrato; rutas sensibles con matriz de actor/recurso/acción; discrepancias con `.anclora/SECURITY_RULES.md` resueltas por Toni y contrato actualizado solo por vía gobernada; PII, CSP y advisories tienen disposición/evidencia. |
| 1. Flujo verificable de preproducción | 26 oct–23 nov 2026 · 4 sem | GH-1.1 fixtures sintéticas representativas y arnés; GH-1.2 ledger redacted de solicitudes/respuestas; GH-1.3 catálogo de errores observados; GH-1.4 informe de validación controlada. | Acceso pre autorizado; 30–50 transacciones de prueba solo si SES y Toni autorizan, sin datos reales; cada resultado trazado con fecha, fixture/hash, lote/código, reintento; categorías desconocidas explicitadas. No alcanzar cantidad no convierte fase en PASS. |
| 2. Persistencia y ciclo de datos | 23 nov 2026–4 ene 2027 · 6 sem | GH-2.1 persistencia de pre-check-in con diseño/retención; GH-2.2 ciclo de expiración, revocación y borrado; GH-2.3 rate limit compartido entre instancias. | Diseño compatible con runtime production-backed; revisión de migración/rollback y PII; tests de ciclo de vida y caída/reinicio; no se usa base alternativa ni se toca producción sin gate canónico. |
| 3. Aislamiento y onboarding operativo | 4 ene–1 mar 2027 · 8 sem | GH-3.1 completar ownership/rbac y recursos derivados; GH-3.2 onboarding Excel guiado; GH-3.3 deduplicación e importación desde formato documentado (iCal/CSV solo tras discovery y viabilidad). | Tests por rol y recurso ajeno; dueño de datos no viene del cliente; 5 gestores completan flujo sintético/piloto autorizado y se clasifican bloqueos. Integraciones no verificadas quedan fuera. |
| 4. Beta y decisión comercial | 1 mar–12 abr 2027 · 6 sem | GH-4.1 piloto acotado; GH-4.2 soporte/operaciones y manual de errores; GH-4.3 decisión de precio, alcance y lanzamiento. | Cohorte y consentimiento aprobados; éxito definido antes; evidencia de uso, incidencias, aceptación y carga de soporte; revisión legal/privacidad; decisión explícita de Toni. No llamar lanzamiento a una prueba no autorizada. |

## Fase 0 — definición ejecutable de trabajo

### GH-0.1 — Una sola política de activación SES

**Prioridad:** P0 · **Esfuerzo:** 1–2 días · **Owner:** ingeniería · **Revisor:** seguridad/propietario del producto (Toni).
**Problema:** `src/lib/ses/config.ts` y `src/lib/ses/access.ts` leen nombres diferentes de bandera. El contrato del repo dice que SES se usa solo en preproducción.

**Entregable:** decisión de producto documentada; punto único de lectura; guard server-side fail-closed; inventario de entradas; tests de combinaciones de bandera/entorno/modo dry-run. Dejar producción imposible por defecto y conservarla bloqueada mientras siga vigente el contrato actual.

**Aceptación:** (1) todas las rutas y cliente dependen de una política única; (2) variable ausente, inválida o contradictoria no permite producción; (3) producción con bandera no es habilitada por esta tarea si el contrato aún lo prohíbe; (4) cobertura de casos pre, prod/dry-run y prod/live; (5) docs enumeran variables canónicas y legacy.
**Rechazo:** cualquier ruta puede eludir el guard; dos fuentes siguen divergiendo; un nombre legacy activa prod implícitamente; documento sugiere enviar a prod sin autorización y cambio contractual.
**Evidencia:** diff, pruebas de ruta y decisión aprobada; no enviar a SES real.

### GH-0.2 — Matriz de identidad, roles y ownership

**Prioridad:** P0 · **Esfuerzo:** 2–4 días.
**Problema:** el repo ya tiene `PilotUserRole`, autorización Anclora y `Reservation.ownerId`, así que no debe reconstruirse. Se necesita demostrar cobertura de rutas y recursos relacionados, revisar el alcance privilegiado de `GROUP_OWNER` y tratar registros sin owner.

**Entregable:** matriz de actor × acción × recurso × resultado para sesiones anónimas, piloto, admin y `GROUP_OWNER`; inventario de API; decisión de acceso global/organización; estrategia de datos legacy `ownerId=null` sin atribuciones automáticas.

**Aceptación:** rutas de lectura/escritura/descarga/borrado/SES aparecen todas en la matriz; la identidad y rol se resuelven en servidor; fixtures de dos usuarios prueban denegación cruzada en reservas, huéspedes, ficheros, XML y submissions; `GROUP_OWNER` se trata conforme a un contrato explícito.
**Rechazo:** confiar en rol/owner enviado por cliente, omitir endpoint derivado o asumir que el test existente cubre todas las rutas.
**Evidencia:** tabla versionada, referencias a rutas y tests negativos.

### GH-0.3 — CSP con política compatible

**Prioridad:** P1 · **Esfuerzo:** 2–4 días.
**Entregable:** inventario de scripts inline, analítica y estilos; plan para nonce/hash o reducción por directiva; aplicación y prueba de una CSP que elimine `unsafe-eval` y reduzca `unsafe-inline` de `script-src`, con regresión visual focalizada.

**Aceptación:** política final y excepciones documentadas; no `unsafe-eval`; inline eliminado de `script-src` o excepción técnica estrecha justificada por el framework, owner y fecha de retirada; cabeceras presentes en ruta pública y app; browser QA de login, dashboard y flujo de importación, consola sin violaciones atribuibles a la app.
**Rechazo:** retirar CSP, dejar permanente report-only, introducir rotura de flujo o ampliar hosts sin justificación.
**Evidencia:** test de header y capturas/log sanitizado de browser QA.

### GH-0.4 — Mapa de datos, retención y pre-check-in

**Prioridad:** P1 · **Esfuerzo:** 2–3 días de análisis.
**Entregable:** inventario de campos/almacén/consumidor/retención/borrado para Excel, Guest, pre-check-in, XML, Blob, audit y SES; recomendación de persistencia y ciclo de vida que respete el runtime `PRODUCTION_BACKED`.

**Aceptación:** `globalThis` efímero y sus límites están declarados; clasificación de PII y copias identificada; propuesta cubre expiración, revocación, acceso, borrado verificable, claves y migración gradual; revisión de privacidad registrada.
**Rechazo:** afirmar cumplimiento RGPD sin revisión; crear base de desarrollo; persistir nuevos datos de viajeros sin política.
**Evidencia:** mapa y ADR de opciones, sin datos reales.

### GH-0.5 — Baseline de dependencias y CI

**Prioridad:** P1 · **Esfuerzo:** 1–2 días.
**Entregable:** inventario reproducible desde lockfile y workflow; clasificación de avisos current (direct/transitive, runtime/dev, severidad, exploitability y fix disponible); definir comando de verificación en CI sin upgrades forzados.

**Aceptación:** informe con fecha/comando/resultado; cada high/critical tiene actualización, mitigación o excepción con responsable/fecha de caducidad; pipeline documentado; no cambios de dependencia fuera de alcance sin evaluación.
**Rechazo:** presentar el P7 histórico como actual sin medir; ejecutar `--force` sin análisis; ignorar avisos.
**Evidencia:** informe de dependencias y workflow/diff si aplica.

### GH-0.6 — Verdad de producto y mensajes públicos

**Prioridad:** P2 · **Esfuerzo:** 1–2 días más revisión copy.
**Entregable:** definición breve, in-scope/out-of-scope y glosario de estados SES; ajustar README y puntos de entrada documentales; revisión Hermes Copy Curator antes de aprobar cambios de copy público conforme al contrato.

**Aceptación:** distingue conversión/validación local de transmisión y respuesta SES; no llama PMS ni promete cumplimiento garantizado; marca integración/importadores como existentes solo con evidencia; idioma, manual y landing coherentes.
**Rechazo:** claims de aprobación oficial, envío exitoso o capacidad aún no demostrada; borrar nombres legacy que sean contractuales.
**Evidencia:** inventario de claims y revisión copy.

## Principios que rigen todas las fases

- **Evidencia por tarea:** artefacto versionado, estado `PROPUESTA`, `EN CURSO`, `PASS`, `FAIL` o `BLOCKED`. `NOT_RUN` nunca cuenta como PASS.
- **No PII real en fixtures:** sintetizar o anonimizar irreversiblemente; no adjuntar Excel/XML de clientes ni credenciales SES a logs.
- **No envío real por inferencia:** producción permanece bloqueada según regla actual. Preproducción solo con autorización operacional específica y credenciales ya provistas en el entorno autorizado; nunca imprimirlas.
- **Migraciones:** leer historial y schema primero; respetar `.anclora/PRODUCTION_RUNTIME.md`, su modelo production-backed y gates aplicables. No crear DB alternativa.
- **Fechas subordinadas a evidencia:** una tarea bloqueada desplaza fases; no bajar umbrales para cumplir el calendario.
- **No inventar integración ni obligación:** usar documentación oficial y distinguir norma, documentación del proveedor y observación del código.

## Métricas a definir antes de piloto

1. Tasa de parseo correcto por formato/campo = campos críticos extraídos sin edición / campos críticos esperados, con denominador y exclusiones previos.
2. Tasa de validación útil = errores corregidos antes del envío / errores corregibles detectados; no contar warnings como errores.
3. Tasa de respuesta aceptada por SES = comunicaciones con resultado final aceptado / transacciones completadas con respuesta, separando timeout/pending/reintentos.
4. Tiempo de tarea mediano y P90 frente a línea base manual observada.
5. Incidencias de privacidad/aislamiento, duplicidad y soporte por reserva.

No fijar metas comerciales o de precisión hasta obtener línea base y revisión de muestra. Las métricas no pueden incluir nombres, documentos o cuerpos de solicitudes.

## Decisiones pendientes de Toni

- Confirmar si se desea mantener SES exclusivamente en preproducción (regla actual) o iniciar proceso formal de modificación de ese contrato en una misión posterior.
- Definir quién puede ser administrador del producto y si `GROUP_OWNER` debe disponer de acceso global.
- Confirmar público inicial, capacidad de piloto, consentimiento y volumen de gestores entrevistables.
- Aprobar acceso a SES preproducción y presupuesto/entorno de QA antes de cualquier transacción externa.
- Precio, modalidad comercial, fecha de beta y alcance territorial se mantienen abiertos.
