# Checklist de validación — acceso QA de GuestHub vía Identity (2026-10-28)

> Este fichero se sobrescribe en cada entrega. El historial queda en Git.

**Repositorio:** anclora-guesthub
**Rama:** development
**Validación en development:** Toni validó este cambio.
**Datos:** no se enviaron solicitudes ni se modificaron registros de aplicación.

## 1. Qué cambia

- El modo QA se activa solo mediante configuración del servidor y remite solicitudes a la ruta QA de Nexus.
- El formulario reutiliza el mismo identificador de solicitud en un reintento.
- La sesión requiere la membresía de Identity correspondiente; se reconoce el rol QA.

## 2. Ya comprobado por el agente

| Comprobación | Comando o método | Resultado |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | PASS |
| Pruebas focalizadas | `npm test -- --run tests/anclora-identity-authorization.test.ts tests/anclora-identity-callback.test.ts tests/reservation-ownership.test.ts tests/pilot-request-synthetic-sample.test.ts` | PASS |
| Integridad | `git diff --check` | PASS |
| Revisión de alcance QA | Estado Nexus/Identity de solo lectura; ninguna solicitud previa de la identidad QA | PASS |

## 3. Pruebas no ejecutadas (NOT_RUN)

| Prueba | Motivo concreto |
| --- | --- |
| Solicitud real, aprobación Nexus, correo y callback Identity | Los despliegues disponibles no contienen este cambio y falta configuración de entorno QA. |
| Visual QA de flujo desplegado | Pendiente de un deployment con este SHA. |

## 4. Checklist para validar en la aplicación

| # | Dónde | Pasos | Resultado esperado | Cuenta o configuración | Bloqueante |
| --- | --- | --- | --- | --- | --- |
| 1 | GuestHub Preview | Solicitar piloto, verificar Nexus, aprobar y volver a iniciar sesión | Solicitud en scope QA y acceso solo tras rol QA de Identity | `tonipmi.test@gmail.com`; revisora QA Nexus | Sí |

### Casos negativos y de borde

- Configuración QA incompleta: la ruta falla cerrada antes de enviar.
- Reintento de formulario: se conserva el identificador idempotente.
- Sin membresía activa: GuestHub deniega el acceso.

## 5. Riesgos y limitaciones

- La lista de variables de Vercel devolvió `403`; la CLI no pudo consultar el proyecto. No se configuraron secretos.
- No se leyeron credenciales de Gmail ni se enviaron correos.
- No hubo solicitudes, aprobaciones, commits de datos ni despliegues en vivo.

## 6. Decisión de Toni

- [x] Cambios revisados y validados en development.
- [ ] Todos los puntos bloqueantes del flujo desplegado pasan.
- [ ] Se promociona: escribir `PROMOTE=FULL`.
