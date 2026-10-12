# Análisis de Anclora GuestHub y competidores

**Versión:** 1.0 · **Fecha de corte:** 12 de octubre de 2026
**Baseline del repositorio:** rama `development`, commit `a476c70`
**Alcance:** revisión documental y estática del código y de fuentes públicas de producto. No se ejecutaron pruebas ni se verificaron servicios externos.

## Resumen ejecutivo

GuestHub no es hoy un PMS. Es una aplicación web enfocada en importar reservas desde Excel, validar y normalizar los datos, producir XML por reserva y gestionar operaciones con SES.HOSPEDAJES. El README contiene lenguaje amplio de “gestión de huéspedes y alquiler vacacional”, que puede hacer pensar en un PMS; conviene describir el producto por el flujo efectivamente implementado.

La fortaleza principal es un flujo vertical y especializado: importación Excel, reglas de validación, catálogos INE, generación XML basada en el esquema SES v3.1.3, operaciones de lote/comunicación/consulta/anulación y registro de envíos. Se han incorporado autenticación de pilotos, roles, `ownerId`, cifrado de datos y pruebas de regresión. Esto es una base más madura que la que describe el prompt histórico de Instinct.

La oportunidad no es competir por amplitud con suites de check-in/PMS. Puede posicionarse como una herramienta de transición para gestores pequeños que ya llevan reservas en hojas de cálculo y necesitan revisar, corregir y trazar los datos antes de comunicarlos. Esa hipótesis necesita entrevistas y uso observado; aún no hay evidencia comercial o de envíos reales a SES en el repositorio.

El riesgo más claro confirmado en el código es una divergencia entre dos banderas de activación de envío productivo, junto con una política de seguridad local que dice “SES solo en preproducción”. También están confirmados el almacenamiento en memoria del pre-check-in y de los límites de frecuencia, y una CSP con directivas `unsafe-inline`/`unsafe-eval`. La autorización de identidad Anclora no concede acceso a cualquier sesión: exige `GROUP_OWNER` o membership. El riesgo remanente es que `GROUP_OWNER` concede acceso completo y hay que confirmar cómo se gobierna esa asignación y distinguir el rol de plataforma del rol de administrador de GuestHub.

## Qué existe en el baseline

| Área | Evidencia en HEAD | Lectura |
| --- | --- | --- |
| Producto | `README.md:11,30,44`; `src/lib/excel/parseExcel.ts`; `src/lib/xml/` | Conversión y operación de reservas desde Excel hacia XML/SES; no hay base para llamarlo PMS integral. |
| Esquema SES | `schemas/ses-hospedajes/v3.1.3/`; `src/lib/ses/schema.ts`, `client.ts`, `submissionRepository.ts` | Esquema, cliente y persistencia de envíos están en el repo. La presencia del código no demuestra que se hayan realizado envíos reales. |
| Autenticación/roles | `prisma/schema.prisma` (`PilotUserRole`); `src/lib/auth.ts`; `src/lib/anclora-identity/authorization.ts`; `tests/rbac-routes.test.ts`, `tests/anclora-identity-authorization.test.ts` | Hay roles `admin`/`pilot_user` y autorización basada en claims de identidad. Revisar uso consistente en cada ruta y la gobernanza de `GROUP_OWNER`. |
| Propiedad de reservas | `Reservation.ownerId` e índice en `prisma/schema.prisma:25-63`; `tests/reservation-ownership.test.ts` | Existe ownership, pero `ownerId` es nullable. La prueba en el repo no equivale a ejecutar la suite ni acredita aislamiento de cada operación/caso. |
| PII y ficheros | `src/lib/privacy/encryption.ts`; `src/lib/storage/`; `StoredFile.encrypted` y campos IV/tag en Prisma | Hay primitives de cifrado/persistencia. Falta inventariar exhaustivamente qué campos y copias están cubiertos, retención, borrado y claves en operación. |
| Pre-check-in | `src/lib/precheckin.ts`; `src/app/api/precheckin/`; `tests/precheckin.test.ts` | El estado de sesiones se mantiene en memoria del proceso (`globalThis`); no es durable entre instancias/reinicios. |
| Rate limiting | `src/lib/security/rateLimit.ts:27-83` | Limiter en memoria por instancia serverless; defensa best-effort, no cuota distribuida. |
| Envío SES productivo | `src/lib/ses/config.ts:37,65-67`; `src/lib/ses/access.ts:4-17` | Dos nombres distintos autorizan producción (`GUESTHUB_SES_ALLOW_PRODUCTION_SEND` y `GUESTHUB_ALLOW_SES_PRODUCTION_SEND`). Un módulo puede permitir que el cliente configure envío mientras el guard de ruta lo rechaza, o a la inversa. |
| CSP | `next.config.ts:7-26`; `tests/security-headers.test.ts` | Existe CSP global, pero `script-src` permite `unsafe-inline` y `unsafe-eval`, y `style-src` permite `unsafe-inline`. |
| Pruebas/CI | 33 archivos `tests/*.test.ts`; `package.json`; `.github/workflows/ci.yml` | Hay una base amplia de pruebas automatizadas y CI configurada. No se ejecutaron en esta auditoría; suite no equivale a “33 suites verificadas ahora”. No se halló un smoke E2E browser entre los archivos de pruebas. |
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
| [Chekin](https://chekin.com/) | Suite de check-in online/presencial, automatización de reportes, pagos, llaves y experiencia de huésped; afirma integración SES y conexiones PMS. | Mucho más amplia, orientada a automatizar toda la operación y crecer con propiedades. | No competir en amplitud. Enfocar importación Excel, explicación y control revisable para flujo manual existente. |
| [Check-in Scan](https://www.checkinscan.com/) | App de escaneo/registro, check-in y comunicación automática a SES y cuerpos regionales; anuncia integraciones. | Captura de identidad y registro de extremo a extremo, incluyendo app y automatización. | GuestHub debe justificar cualquier captura de documentos; la importación de hoja debe reducir exposición y fricción. |
| [Partee](https://partee.es/gestion-de-partes-de-viajeros/) | Gestión de reservas, check-in online/presencial, lectura de documentos, sincronización iCal/PMS, reportes y corrección/anulación. | Producto especializado que ya cubre una parte sustancial del flujo legal y de reservas. | Corrección, trazabilidad e importación no son por sí solas diferenciales; calidad de explicación y control de datos pueden serlo. |
| [BookCheckin](https://bookcheckin.com/) | Check-in y comunicación SES con PMS/canales; su web publica prueba y precio de entrada. | Competidor directo orientado a anfitrión/pequeño gestor, con onboarding y flujo de extremo a extremo. | Presión sobre el nicho pequeño; evitar afirmar que el segmento está desatendido o tener ventaja de precio sin estudio. |
| [AvaiBook Fast Check-in](https://helpcenter.avaibook.com/es/articles/2245443-registro-de-viajeros-fast-check-in) | Módulo de una plataforma de gestión de reservas con formularios, firma, escaneo y envío a SES/Mossos/Ertzaintza. | El registro forma parte de un PMS/channel manager. | No duplicar sincronización/PMS hasta validar necesidad de quien opera Excel. |
| Ulyses Cloud | PMS/hotelero con comunicación a SES documentada para determinados establecimientos. [Guía oficial](https://help.ulysescloud.com/hc/es/articles/17144236610716-SES-Hospedajes) | Orientado a operación hotelera, integración PMS, con particularidades territoriales. | Gestor hotelero ya servido por su PMS no es cliente inicial prioritario. |

### Posicionamiento recomendado (hipótesis)

> “Convierte tu Excel de reservas en comunicaciones revisables para SES.HOSPEDAJES, con validación por campo, corrección guiada y un registro claro del resultado.”

Validar con 5–8 gestores que hoy preparen datos desde Excel: tiempo actual, tipos de fichero, frecuencia de errores, quién verifica, cuánto dato sensible guardan, volumen de reservas y alternativas usadas. Preguntar por procesos reales; no presentar la hipótesis como demanda demostrada. La diferencia defendible debe ser precisión del mapeo, explicaciones útiles, registro verificable y privacidad/minimización; no una lista de integraciones aún no implementadas.

## Fuentes normativas y límites de claims

- El RD 933/2021 es la referencia legal primaria para registro documental e información de hospedajes. Revisar artículos 3–7 y anexos, texto consolidado y modificaciones vigentes con asesoría jurídica antes de convertirlo en reglas de producto: [BOE, RD 933/2021](https://www.boe.es/buscar/act.php?id=BOE-A-2021-17461).
- Las preguntas frecuentes del Ministerio del Interior orientan sobre uso de SES y aspectos técnicos, pero no sustituyen el texto legal ni el alta/validación de acceso: [FAQ oficial](https://interior.gob.es/opencms/pdf/servicios-al-ciudadano/Hospedajes-y-Alquiler-de-Vehiculos/Preguntas_frecuentes_hospedajes_alquiler_vehiculos_09_04_2025.pdf).
- No afirmar “cumplimiento garantizado”, “aprobado por el Ministerio” ni equivalencia con una comunicación aceptada a partir de que el XML valide localmente. Distinguir XML generado, solicitud transmitida, respuesta recibida, lote procesado y resultado confirmado.
- No ampliar retención o recopilación de datos personales solo para facilitar analítica o demos. Ciclo de vida, acceso, cifrado, borrado y encargos deben revisarse con asesoría de privacidad.

## Conclusión

GuestHub tiene un núcleo diferenciable y técnico que merece consolidación antes de abrir el alcance. Recomendación: (1) cerrar de forma fail-closed la autorización y límites de SES; (2) corregir persistencia y aislamiento con diseño compatible con los contratos de producción; (3) reducir riesgo de CSP y documentar lifecycle de datos; (4) producir evidencia controlada de preproducción; (5) validar el nicho Excel y el onboarding; y solo después decidir importadores externos, multiusuario avanzado o lanzamiento comercial.

Las fechas del plan siguiente son una propuesta de capacidad, no promesas. Los gates deben detener fases si falta autorización, evidencia o revisión humana.
