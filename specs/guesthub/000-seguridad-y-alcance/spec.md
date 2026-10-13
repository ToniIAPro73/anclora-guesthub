# Spec F0 — Seguridad y alcance de GuestHub

**ID:** GHS-000 · **Versión:** 1.0 · **Estado:** PROPUESTA · **Revisión:** pendiente de Toni
**Baseline de análisis:** rama chore/codex-guesthub-roadmap-docs, HEAD f8b3938ff7210a0465a29980b2a99ba53c55c999, 12/10/2026. El trabajo documental actualizado se entrega en development.
**Aprobación:** pendiente de Toni. La aceptación futura de la spec autorizará el inicio de F0 según la solicitud de Toni, pero no autoriza SES real, uso de servicios externos, migraciones ni cambios contractuales fuera de los gates aplicables.

## Problema

GuestHub ya contiene componentes de autenticación/roles, ownership, cifrado selectivo, persistencia de reservas y submissions, CSP, CI y manejo SES. Los planes históricos todavía describen parte de ellos como inexistentes. Persisten gaps y decisiones: dos gates SES leen banderas diferentes; la regla SECURITY_RULES permite solo preproducción; requireAdmin no sustituye una revisión por recurso; ownerId es nullable; grupos de datos tienen campos/copies distintos; pre-check-in, rate limit, audit y fallback SES pueden usar memoria; la CSP admite inline/eval.

El objetivo de F0 es dejar esas decisiones y los criterios de una futura ejecución explícitos, conservando el comportamiento contractual. No se demuestra aquí la efectividad de controles ni se autoriza tráfico SES.

## Resultados esperados

1. Cada operación SES y combinación de entorno/configuración tiene política server-side; cualquier conflicto falla cerrado y SES real permanece prohibido mientras SECURITY_RULES diga solo preproducción.
2. Matriz de actor, rol, acción, recurso y resultado identifica controles existentes y gaps. Usuario con acceso a GuestHub no es automáticamente admin autorizado para toda acción.
3. Inventarios de CSP, errores, PII, almacenamiento y lifecycle distinguen código, documentación, hipótesis y evidencia pendiente.
4. Baseline de CI/dependencias usa lockfile/workflows presentes y no declara una auditoría actual que no se ejecutó.
5. Claims del producto distinguen transformación/validación local, transmisión, acuse/lote y procesamiento final.

## Alcance

- GH-0.1: consolidar especificación de política SES pre y divergencia de banderas.
- GH-0.2: inventario de guards, permisos y aislamiento por recurso; decisión sobre GROUP_OWNER y owner null.
- GH-0.3: revisión de CSP/headers/errors actuales y compatibilidad de superficies.
- GH-0.4: mapa de datos personales, copias, cifrado, retención, revocación, borrado y pre-check-in.
- GH-0.5: inventario reproducible de lockfile, CI y comandos; resultados dinámicos quedan pendientes.
- GH-0.6: definición de producto, estados, claims, mercado y fuentes.

## Exclusiones

- Cambiar código, tests, schema, configuración, workflow, dependencias, datos o contratos canónicos.
- Ejecutar pruebas, lint, typecheck, build, auditoría de paquetes, migraciones, servicios SES, deploy, contacto o publicación.
- Usar datos reales de viajeros, credenciales, .env, identidad personal de Toni o logs con PII.
- Crear DB alternativa/dev, bucket, cuenta, usuario, integración o servicio.
- Habilitar SES prod, cambiar su política, usar los datos para analítica secundaria o prometer cumplimiento.
- Definir specs ejecutables de F1–F4 o construir importadores externos contra APIs no documentadas.

## Actores y fronteras

| Actor / sistema | Frontera conocida | Verificación pendiente |
|---|---|---|
| Anónimo | requireAuth/requireAdmin deben denegar rutas protegidas. | Cobertura estática completa por endpoint y método. |
| Pilot user | Rol existe; ciertas rutas usan requireAuth y algunos recursos filtran owner. | Acciones permitidas, recursos derivados, null-owner y rutas SES de validación. |
| Admin GuestHub | requireAdmin existe. | Gestión de alta y concesión de privilegio; no asumir que todo admin puede operar todo. |
| Anclora Identity | helper de acceso requiere GROUP_OWNER o application_membership; getSessionUser mapea la sesión habilitada a role admin. | Claims efectivos y separación entre membership, GROUP_OWNER y admin GuestHub. |
| Viajeros | Campos de identidad y contacto definidos en Guest y submissions. | Finalidad, transparencia, base, retención y borrado por campo/almacén con revisión especialista. |
| SES preproducción | Config/client/routes implementados. | Credenciales, disponibilidad y aceptación no comprobadas aquí. |
| SES producción | Endpoint/flags existen en código. | BLOQUEADO por SECURITY_RULES: uso solo preproducción. No existe permiso por esta spec. |

## Requisitos

| ID | Requisito obligatorio | Evidencia de diseño |
|---|---|---|
| R-01 | SES production permanece imposible por política contractual, aunque haya flags técnicos, rol admin o input prod. | Tabla de decisión e inventario de rutas; pruebas futuras en G0.1. |
| R-02 | Inputs, endpoint, entorno o flags ausentes, inválidos o contradictorios no amplían capacidad; credenciales/URLs con auth no se exponen. | Política propuesta fail-closed y errores/correlation ID sin secretos. |
| R-03 | Cada ruta y acción sensible tiene actor y recurso comprobados server-side; cliente no decide owner/role. | Matriz por API/método y recurso. |
| R-04 | Recursos sin propietario no se atribuyen a nadie automáticamente ni se filtran a otro actor. | Tratamiento null-owner y fixtures futuros de aislamiento. |
| R-05 | Todo campo personal nuevo exige finalidad, minimización, acceso, cifrado, retención, expiración y borrado documentados antes de implementación. | Data map y decisión de privacidad. |
| R-06 | CSP se preserva mientras se define transición compatible; toda excepción insegura tiene consumidor, razón, dueño y fecha de reexamen. | Matriz de directivas y superficies. |
| R-07 | Errores públicos no entregan secretos, SOAP crudo, PII o detalles de proveedor sin necesidad aprobada. | Matriz de errores y logs sin PII. |
| R-08 | Afirmaciones de seguridad, prueba, mercado y SES citan fuente y distinguen implementación/test existente/ejecución. | Registro de fuentes y evidencia con estado. |
| R-09 | No se usan DB alternativas ni datos de viajeros reales. | Revisión de artefactos; compatibilidad PRODUCTION_BACKED. |
| R-10 | Toda prueba no ejecutada es NOT_RUN; solo artefacto y revisión completan futuro gate. | Matriz gates.md. |

## Escenarios críticos

| Escenario | Resultado futuro requerido |
|---|---|
| environment=prod y dryRun=false, cualquiera sea bandera o rol | Rechazo server-side; ninguna llamada de red ni escritura engañosa de éxito. |
| Flags canónica y legacy discordantes / endpoint prod bajo environment=pre | Bloqueo; no selección permisiva. |
| Preproducción, identidad autorizada y dry-run | Preparación simulada sin red; cualquier envío real pre se autoriza por separado en una misión operacional. |
| Sin sesión, piloto en ruta admin o reserva de otro owner | 401/403 o 404 según contrato; no revelar existencia del recurso. |
| ownerId ausente en fila histórica | No asignar ni revelar por defecto; decisión de reconciliación separada. |
| GROUP_OWNER con membership ausente | Resultado sigue regla explícita del contrato de acceso; no derivar admin del nombre del claim sin revisar autoridad. |
| CSP bloquea script inline legítimo | Mantener protección; usar nonce/hash o excepción documentada y limitada antes de aplicar. |
| Datos personales en error/respuesta/log | Redactar/minimizar; no capturar payload en telemetría. |
| Falla DB al guardar SES submission | Estado no puede afirmar persistencia durable; exponer limitación y definir manejo de fallback/memoria. |

## Privacidad y seguridad

Schema contiene nombre, documento, contacto, ubicación y pago en Guest/Reservation; reservas cifran determinados campos por encryptString, mientras que schema incluye otros campos no cifrados a nivel de aplicación. StoredFile define bandera de cifrado y metadatos IV/tag, pero hay que seguir el flujo completo. SES submission puede guardar request/response SOAP, referencia, endpoint, códigos y errores; data minimization/redaction debe comprobarse sin leer datos operativos. Precheckin guarda tokens hasheados y drafts, pero sesiones viven en globalThis. Auditoría app usa eventos pseudónimos en memoria. No concluir que el sistema completo cifra/retiene/borra correctamente por existir una utilidad.

## Riesgos, estados y decisiones

Riesgos/decisiones están priorizados en [decisions.md](../../../docs/guesthub-decisions.md); fuente normativa y técnica en [sources.md](../../../docs/guesthub-sources.md). G0.1 está limitado por contrato: se puede unificar el control de preproducción y fallar cerrado, pero no abrir producción. Decisiones de GROUP_OWNER, null-owner, persistencia SES y retención se documentan con opción conservadora. Solo una dependencia concreta que impida un cambio seguro lo bloquea. El agente implementa y ejecuta gates técnicos; Toni hace revisión funcional/visual. Revisiones externas se reservan para usos públicos pertinentes.

## Fuentes y método

Código fuente se cita en [analysis.md](analysis.md); normativa y páginas de proveedores en [registro de fuentes](../../../docs/guesthub-sources.md). Documentación pública de proveedores acredita sus propios claims/manuales, no verificación independiente. Texto consolidado BOE es informativo y no sustituye publicación normativa ni asesoría jurídica. En esta misión no se ejecutaron checks; todos los resultados dinámicos son NOT_RUN.

## Estado inicial de aceptación

Todos los requisitos se encuentran PROPUESTA. Los criterios ejecutables y umbrales propuestos están en [gates.md](gates.md). No hay PASS de implementación. Una dependencia concreta que impide implementar/verificar con seguridad queda BLOCKED; una decisión pendiente con alternativa conservadora no bloquea trabajo independiente. Un comando no corrido permanece NOT_RUN.
