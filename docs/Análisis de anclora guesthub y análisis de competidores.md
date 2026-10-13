# Análisis de Anclora GuestHub y competidores

**Versión:** 2.0 · **Fecha de corte:** 12 de octubre de 2026
**Baseline del repositorio:** rama `chore/codex-guesthub-roadmap-docs`, commit `f8b3938ff7210a0465a29980b2a99ba53c55c999` (árbol limpio al inicio). `origin/development` apunta a `a476c70`, que es el baseline del prompt, no el checkout actual.
**Estado:** propuesta pendiente de revisión de Toni. **Alcance:** revisión documental, estática y web de fuentes públicas. No se ejecutaron pruebas/build/auditoría de dependencias ni se verificaron servicios externos (`NOT_RUN`).

## Resumen ejecutivo

GuestHub no es hoy un PMS. Es una aplicación web enfocada en importar reservas desde Excel, validar y normalizar los datos, producir XML por reserva y gestionar operaciones con SES.HOSPEDAJES. El README contiene lenguaje amplio de “gestión de huéspedes y alquiler vacacional”, que puede hacer pensar en un PMS; conviene describir el producto por el flujo efectivamente implementado.

La fortaleza principal es un flujo vertical y especializado: importación Excel con `exceljs`, reglas de validación, catálogos INE, generación XML basada en el esquema SES v3.1.3, operaciones de lote/comunicación/consulta/anulación y registro de envíos. El código incorpora autenticación de pilotos, roles, `ownerId`, cifrado y pruebas de regresión; la revisión presente no ejecutó esas pruebas. Esto corrige varios hallazgos antiguos de Instinct, sin convertir test existente en evidencia de eficacia.

La oportunidad no es competir por amplitud con suites de check-in/PMS. Puede posicionarse como una herramienta de transición para gestores pequeños que ya llevan reservas en hojas de cálculo y necesitan revisar, corregir y trazar los datos antes de comunicarlos. Esa hipótesis no está validada comercialmente. Entrevistas o pilotos pueden ayudar a resolver preguntas de mercado, pero no son requisito previo para el desarrollo interno; cualquier claim público de demanda o eficacia necesitará evidencia apropiada.

El riesgo más claro confirmado en el código es una divergencia entre dos banderas de activación de envío productivo, junto con una política de seguridad local que dice “SES solo en preproducción”. También están confirmados el almacenamiento en memoria del pre-check-in y de los límites de frecuencia, y una CSP con directivas `unsafe-inline`/`unsafe-eval`. La autorización de identidad Anclora no concede acceso a cualquier sesión: exige `GROUP_OWNER` o membership. El riesgo remanente es que `GROUP_OWNER` concede acceso completo y hay que confirmar cómo se gobierna esa asignación y distinguir el rol de plataforma del rol de administrador de GuestHub.

## Qué existe en el baseline

| Área | Evidencia en HEAD | Lectura |
| --- | --- | --- |
| Producto | `README.md:11,30,44`; `src/lib/excel/parseExcel.ts`; `src/lib/xml/` | Conversión y operación de reservas desde Excel hacia XML/SES; no hay base para llamarlo PMS integral. |
| Esquema SES | `schemas/ses-hospedajes/v3.1.3/`; `src/lib/ses/schema.ts`, `client.ts`, `submissionRepository.ts` | Esquema, cliente y persistencia de envíos están en el repo. La presencia del código no demuestra que se hayan realizado envíos reales. |
| Autenticación/roles | `src/lib/auth.ts:78-98`; `src/lib/anclora-identity/authorization.ts:24-36`; `src/app/api/ses/*/route.ts`; `tests/rbac-routes.test.ts`, `tests/anclora-identity-authorization.test.ts` | Existen guards `requireAdmin`/`requireRole`; la mayoría de acciones SES mutantes y admin usan `requireAdmin`; `/api/ses/validate` usa `requireAuth` (validar si consulta de validación no transmite datos). La sesión Anclora se mapea a `admin` en `auth.ts:48-56`; el helper de acceso exige `GROUP_OWNER` o membership. Revisar privilegio efectivo y consistencia de rutas. Tests existentes no ejecutados. |
| Propiedad de reservas | `Reservation.ownerId` e índice en `prisma/schema.prisma:25-63`; `tests/reservation-ownership.test.ts` | Existe ownership, pero `ownerId` es nullable. La prueba en el repo no equivale a ejecutar la suite ni acredita aislamiento de cada operación/caso. |
| PII y ficheros | `src/lib/privacy/encryption.ts`; `src/lib/storage/`; `StoredFile.encrypted` y campos IV/tag en Prisma | Hay primitives de cifrado/persistencia. Falta inventariar exhaustivamente qué campos y copias están cubiertos, retención, borrado y claves en operación. |
| Pre-check-in | `src/lib/precheckin.ts`; `src/app/api/precheckin/`; `tests/precheckin.test.ts` | El estado de sesiones se mantiene en memoria del proceso (`globalThis`); no es durable entre instancias/reinicios. |
| Rate limiting | `src/lib/security/rateLimit.ts:27-83` | Limiter en memoria por instancia serverless; defensa best-effort, no cuota distribuida. |
| Envío SES productivo | `src/lib/ses/config.ts:21-38,56-67`; `src/lib/ses/access.ts:4-18`; `.anclora/SECURITY_RULES.md` | Dos nombres distintos controlan producción (`GUESTHUB_SES_ALLOW_PRODUCTION_SEND` y `GUESTHUB_ALLOW_SES_PRODUCTION_SEND`, además de fallbacks legacy diferentes). Existe divergencia de decisión. El contrato de seguridad dice SES solo en preproducción; prod debe permanecer bloqueado, no basta una bandera ni una recomendación de plan anterior. |
| CSP | `next.config.ts:7-26`; `tests/security-headers.test.ts` | Existe CSP global, pero `script-src` permite `unsafe-inline` y `unsafe-eval`, y `style-src` permite `unsafe-inline`. |
| Pruebas/CI | `tests/`; `package.json`; `.github/workflows/ci.yml` | Hay tests y CI. La cantidad no se presenta como evidencia de calidad ni se ejecutó ningún comando en esta auditoría (`NOT_RUN`). No se halló smoke E2E browser bajo `tests/`. |
| Documentación de producto | `README.md`, `ROADMAP.md`, `plans/001`–`004`, `plans/syncxml-review-2026-07-20.md`, manuales ES/EN/DE | Existe material amplio. Hay que consolidar la fuente de verdad y mantener referencias legacy cuando sean necesarias por compatibilidad técnica/registro SES. |

### Delta frente al material de Instinct

El prompt adjunto se toma como antecedente, no como especificación aprobada. Revalidación de sus P1–P8:

| Hallazgo original | Estado al 12/10/2026 |
| --- | --- |
| P1 pre-check-in en memoria | **Confirmado**, revisar `src/lib/precheckin.ts`. |
| P2 rate limit en memoria | **Confirmado**, revisar `src/lib/security/rateLimit.ts`. |
| P3 dos banderas SES productivo | **Confirmado**, revisar `src/lib/ses/config.ts` y `access.ts`. |
| P4 cualquier sesión Anclora es admin | **No confirmado / la descripción es incorrecta.** `resolveGuestHubAccess` exige `GROUP_OWNER` o membership. Revisar autorización de administración de rutas y la asignación real de claims; no confundir membership con rol admin. |
| P5 CSP insegura | **Parcialmente confirmado.** Hay CSP, pero permite inline y eval en scripts e inline en estilos; no es correcto decir que no hay CSP. |
| P6 no hay evidencia de envíos reales de preproducción | **Sin evidencia en el repo inspeccionado.** El código y los tests no acreditan transacciones externas exitosas. |
| P7 avisos `npm audit` sin triage | **No verificado en esta revisión.** El plan 004 histórico menciona dependencia `xlsx`, pero el `package.json` actual no la lista como dependencia directa; no afirmar advisories actuales sin ejecutar auditoría y clasificar lockfile/transitivos. |
| P8 deuda SyncXML / documentación dispersa | **Parcial.** README/manuales ya usan GuestHub. Permanecen nombres legacy explícitos por compatibilidad de variables, claves y aplicación registrada ante SES. No renombrarlos a ciegas. La documentación puede consolidarse. |

### Delta frente a ROADMAP y planes 001–004

`ROADMAP.md` aún describe como near-term CI, pruebas XML y fixtures sintéticas, mientras que la rama actual ya contiene workflows, numerosas pruebas y `src/lib/demo/syntheticDataset.ts`; eso es inventario de artefactos, no resultado de ejecución. Los planes fueron escritos sobre `3475638` y su tabla “TODO” quedó obsoleta en varios puntos:

| Plan anterior | Estado observado en HEAD | Disposición para el roadmap |
|---|---|---|
| 001 RBAC + guard SES | `requireAdmin` existe y varias rutas SES/admin lo usan; sigue `requireAuth` en `/api/ses/validate`. `config.ts` y `access.ts` conservan nombres de bandera diferentes. La política canónica local prohíbe SES real. | No recrear helpers RBAC. Inventariar cobertura residual y resolver una política de configuración que mantenga prod bloqueado. La sugerencia antigua de habilitar prod con rol/bandera se rechaza por conflicto con `.anclora/SECURITY_RULES.md`. |
| 002 ownership + persistencia | `Reservation.ownerId` e índices existen; list/get/delete/descarga aplican owner en código inspeccionado. `ownerId` es nullable. `Guest`, `StoredFile`, `AuditEvent` derivan de reserva. La persistencia de reservas aún tiene ruta de memoria según `src/lib/db/reservations.ts`; `SesSubmission` también cae a memoria si DB falla (`src/lib/ses/submissionRepository.ts:132-145`). | No volver a crear owner desde cero. Trazar todas las rutas/relaciones, tratamiento de registros null y fallos de persistencia antes de proponer cambio. |
| 003 headers + errores | `next.config.ts:7-45` ya instala CSP, Referrer, nosniff, frame y permissions headers y define `turbopack.root`; CSP conserva `unsafe-inline` y `unsafe-eval`. Errores requieren revisión por ruta, no asumir que el hallazgo histórico se mantiene íntegro. | Gap reducido a directivas/errores vigentes; no recrear cabeceras ni repetir warning de raíz de workspace. |
| 004 dependencias + baseline | `package.json` usa `exceljs`, no lista `xlsx` directamente; CI/workflows existen. No se ejecutó auditoría ni suite en esta revisión. | Advisory `xlsx` histórico no se declara actual. Obtener snapshot de lockfile/advisories solo en misión que autorice ejecución. Sin upgrades forzados. |

La revisión técnica `plans/syncxml-review-2026-07-20.md` inspeccionó commit `3475638`, no el HEAD actual. Sus resultados de lint/typecheck/tests/build/audit se citan únicamente como historial de aquella revisión y no como verificación vigente. El diagnóstico original de Instinct no se encontró como archivo separado dentro del repo; sus P1–P8 se contrastan arriba como afirmaciones históricas.

Además, el modelo `ownerId` ya está presente desde una migración anterior y hay un plan de propiedad en la historia. El roadmap debe evaluar sus gaps (nullable, recursos derivados, rutas y datos legados), no volver a proponer su creación como si no existiera.

## Fortalezas

1. **Flujo de dominio acotado y valioso.** Resuelve una tarea real y repetitiva para la que hay obligaciones de registro; la utilidad del producto no depende de convertirse en PMS.
2. **Validación antes de salida.** Parser, normalizadores, autocorrección, reportes y esquema XSD local permiten invertir en explicar y corregir errores de entrada.
3. **Integración especializada.** El repo contempla consulta, comunicación, lotes y anulaciones SES; puede convertir el diagnóstico de respuestas en una ventaja de experiencia, condicionada a evidencia real.
4. **Aislamiento y seguridad ya evolucionan.** Roles, `ownerId`, cifrado, rate limiting y cabeceras tienen pruebas dedicadas y planes asociados.
5. **Datos de demostración sintéticos y manuales multilingües.** Facilitan pruebas y onboarding sin usar viajeros reales.
6. **Base automatizada.** CI, tipos y pruebas ofrecen una red para endurecer el producto gradualmente.

## Debilidades y riesgos prioritarios

### P0 — Activación y autorización de SES

- Resolver la discrepancia entre la bandera que consume `config.ts` y la que consume `access.ts` como una única política de fail-closed.
- El contrato local `.anclora/SECURITY_RULES.md` dice “SES solo en preproducción, nunca en real”. No asumir que el envío de producción está autorizado por una variable o por el prompt. La especificación debe mantener producción bloqueada hasta revisión explícita y cambio de contrato autorizado.
- Revisar guard de rol, identidad, ownership, reintentos y rutas de anulación/consulta. Una interfaz o payload cliente no constituye autorización.

### P1 — Estado efímero y continuidad

- Pre-check-in y rate limiter están ligados a memoria de proceso. Persistencia puede ser necesaria para fiabilidad; antes de elegir almacenamiento hay que resolver el modelo local `PRODUCTION_BACKED`, el alcance de producción y la clasificación de datos.
- `ownerId` nullable requiere estrategia explícita para filas antiguas y operaciones sobre reservas sin propietario. No se debe migrar/atribuir datos de producción sin plan de reconciliación y aprobación correspondiente.

### P1 — Seguridad web y privacidad

- CSP reduce defensa en profundidad mientras admita scripts inline/eval; adaptar política exige comprobar scripts de Next y proveedor de analítica y validar en una pantalla representativa.
- Verificar cifrado por campo y ciclo de vida de documentos originales, XML, payloads, copias de Blob y exportaciones.
- Revisar minimización de logs y respuestas de error, registros SES y retención.

### P1 — Confiabilidad y evidencia de SES

- No hay en los documentos revisados un ledger verificable de envíos externos de preproducción, su resultado asíncrono, código/respuesta, reintento y relación con fixture. No convertir “cliente implementado” en “integración probada”.
- Un arnés con datos sintéticos y cuenta/entorno de preproducción autorizado debe preceder cualquier experimento. Los envíos a producción quedan fuera del roadmap aprobado por defecto.

### P2 — Propuesta de valor y comercialización

- Falta evidencia publicada de usuarios activos, reducción de tiempo, aceptación SES, disposición a pagar, soporte y coste de adquisición.
- El objetivo de importar Airbnb/Booking directamente es prematuro: primero inventariar qué exporta el usuario hoy y las vías documentadas (iCal/CSV/PMS); no basar el roadmap en APIs no verificadas.
- La identidad de producto, README y manuales deben describir límites con claridad: herramienta de apoyo operativo, no garantía de cumplimiento legal ni sustituto del portal/asesor.

## Mercado y competidores relevantes

La comparación es funcional y cualitativa, basada en páginas oficiales consultadas el 12/10/2026. Las capacidades y precios de terceros cambian; sus claims son del proveedor y no han sido probados por Anclora. No es una clasificación de calidad.

| Producto | Territorio / enfoque observado | Diferencia respecto a GuestHub | Implicación |
| --- | --- | --- | --- |
| [Chekin](https://chekin.com/check-in-online/) | **Claim de proveedor:** check-in online/presencial, identidad, automatizaciones, pagos y otros módulos. Su guía oficial de soporte describe conexión SES, captura online/escaneo y transmisión automática. La página consultada no publica precio. | Suite de experiencia de huésped más amplia que preparación Excel/XML. | No competir en amplitud; validar si revisión de ficheros y explicación de respuestas es un problema diferencial. |
| [Check-in Scan](https://cdn.checkinscan.com/) | **Claim de proveedor:** captura/registro y comunicación a SES y cuerpos autonómicos, calendario/reserva, cerradura y cobro; no se tomó precio como dato. | Check-in y captura de identidad extremo a extremo. | Justificar necesidad antes de capturar imágenes/documentos; investigar flujo Excel sin asumir ventaja. |
| [Partee](https://partee.es/documentacion/) | **Documentación del proveedor:** check-in online/presencial, lectura de documentos, gestión y corrección de partes, iCal, exportación CSV, integraciones/API; sitio afirma envío a varias autoridades. No se verificó precio actual. | Cubre ya amplio flujo de reserva y registro, incluso CSV/iCal. | Importar Excel o ofrecer trazabilidad no es por sí solo diferencial probado. |
| [BookCheckin](https://bookcheckin.com/) | **Claim del proveedor:** check-in, integración directa, integración PMS y afirmación de partes aceptados; la web publica precio desde €3/propiedad/mes Basic, €5 Pro y €7 Business (consulta 12/10/2026; confirmar condiciones/impuestos antes de cualquier uso comercial). Manual describe setup de credenciales SES. | Competidor orientado a operadores pequeños con flujo directo y precio publicado. Las cifras son claims del proveedor, no comparación normalizada. | No inferir ventaja de precio ni demanda; el valor Excel necesita entrevistas y prueba. |
| [AvaiBook Fast Check-in](https://helpcenter.avaibook.com/es/articles/2245443-registro-de-viajeros-fast-check-in) | **Centro de ayuda oficial:** módulo disponible en planes listados (Avanzado, Premium, Líder, Estándar, Pro), automatización/manual de check-in y envío; precio de módulo no publicado en esta fuente. | Registro incluido en plataforma de gestión de reservas. | No duplicar PMS/sync sin validar uso actual del usuario Excel. |
| [Ulyses Cloud](https://help.ulysescloud.com/hc/es/articles/17144236610716-SES-Hospedajes) | **Guía oficial actualizada 9/10/2026:** describe marketplace/integración por propiedad, configuración y envío de altas/bajas/partes; también muestra estado desde reserva. | PMS orientado a hoteles, con la comunicación SES dentro de operación de reservas. | Segmento servido por PMS puede no ser el primer perfil; validar, no asumir. |

**Fuentes de mercado consultadas el 12/10/2026 (tipo):** páginas oficiales de producto/documentación del proveedor — [Chekin check-in](https://chekin.com/check-in-online/) y [ayuda de conexión SES](https://support.chekin.com/es/knowledge/c%C3%B3mo-conectar-chekin-a-la-plataforma-ses-hospedajes-centro-de-ayuda-de-chekin); [Check-in Scan](https://cdn.checkinscan.com/); [Partee documentación](https://partee.es/documentacion/) y [producto](https://partee.es/); [BookCheckin producto/precios](https://bookcheckin.com/) y [manual de primeros pasos](https://bookcheckin.com/manuales/primeros-pasos); [AvaiBook ayuda](https://helpcenter.avaibook.com/es/articles/2245443-registro-de-viajeros-fast-check-in); [Ulyses guía SES](https://help.ulysescloud.com/hc/es/articles/17144236610716-SES-Hospedajes). Lo indicado como función documentada corresponde a documentación del propio proveedor, no validación independiente. No se encontró fuente oficial específica para precio de los otros proveedores; no se infiere que carezcan de precio.

### Posicionamiento recomendado (hipótesis)

> “Convierte tu Excel de reservas en comunicaciones revisables para SES.HOSPEDAJES, con validación por campo, corrección guiada y un registro claro del resultado.”

Si Toni decide validar mercado, una investigación cualitativa con gestores puede revisar tiempo, formatos, errores, revisión y alternativas. Es trabajo opcional de mercado, no una puerta para implementar tareas internas. No presentar la hipótesis como demanda demostrada ni publicar claims comerciales sin evidencia. La hipótesis de diferencia a explorar incluye calidad del mapeo, explicaciones útiles, registro verificable y minimización de datos; no es una ventaja demostrada ni una lista de integraciones aún no implementadas.

## Fuentes normativas y límites de claims

- **Fuente oficial consultada 12/10/2026:** el BOE ofrece el texto consolidado del RD 933/2021 y advierte que su consolidación es informativa y carece de valor jurídico; la ficha muestra última actualización publicada el 27/10/2021. El texto incluye registro/conservación (art. 5), comunicaciones (art. 6) y tratamiento de datos (art. 7), pero esta consulta no verifica jurisprudencia, instrucciones posteriores ni asesoría para un caso concreto: [BOE, RD 933/2021 consolidado](https://www.boe.es/buscar/act.php?id=BOE-A-2021-17461).
- **FAQ oficial de Interior:** el PDF publicado con fecha en URL como 09/04/2025 no pudo leerse en la herramienta de consulta en esta misión; se conserva como referencia pendiente de revisión manual y no se apoya ninguna conclusión concreta en su contenido: [FAQ Interior](https://interior.gob.es/opencms/pdf/servicios-al-ciudadano/Hospedajes-y-Alquiler-de-Vehiculos/Preguntas_frecuentes_hospedajes_alquiler_vehiculos_09_04_2025.pdf) (`NO_VERIFICADO` en esta consulta).
- No afirmar “cumplimiento garantizado”, “aprobado por el Ministerio” ni equivalencia con una comunicación aceptada a partir de que el XML valide localmente. Distinguir XML generado, validez estructural/local, solicitud transmitida, acuse/lote, procesamiento y resultado final.
- No ampliar retención o recopilación de datos personales solo para facilitar analítica o demos. Ciclo de vida, acceso, cifrado, borrado y encargos deben revisarse con asesoría de privacidad.

## Conclusión

GuestHub tiene un núcleo diferenciable y técnico que merece consolidación antes de abrir el alcance. Recomendación: (1) cerrar de forma fail-closed la autorización y límites de SES; (2) corregir persistencia y aislamiento con diseño compatible con los contratos de producción; (3) reducir riesgo de CSP y documentar lifecycle de datos; (4) producir evidencia controlada de preproducción; (5) validar el nicho Excel y el onboarding; y solo después decidir importadores externos, multiusuario avanzado o lanzamiento comercial.

Las fechas del plan siguiente son una propuesta de capacidad, no promesas. Los gates deben detener fases si falta autorización, evidencia o revisión humana.
