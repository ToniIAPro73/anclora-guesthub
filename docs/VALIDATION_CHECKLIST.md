# Checklist de validación — GuestHub Identity access guidance (2026-10-28)

**Repositorio:** anclora-guesthub
**Rama:** development
**Validación en development:** Toni confirmó que el cambio está verificado.
**Datos:** no se modificaron datos de aplicación ni secretos.

## 1. Qué cambia

- Los errores de callback de Identity vuelven a `/login` con una explicación
  clara y sin exponer códigos OAuth ni detalles técnicos.
- Si la cuenta no tiene membresía GuestHub activa, se explica cómo solicitar
  acceso al piloto.
- La autorización sigue denegando el acceso y no crea una sesión sin membresía.
- Se añadieron pruebas focalizadas para membresía ausente, fallo de intercambio
  y estado caducado.

## 2. Comprobaciones

| Comprobación | Comando o método | Resultado |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | PASS |
| ESLint focalizado | Archivos de login, auth y cliente OIDC afectados | PASS |
| Integridad del diff | `git diff --check` y `git diff --cached --check` | PASS |
| Pruebas focalizadas | `npx vitest run tests/anclora-identity-callback.test.ts tests/anclora-identity-authorization.test.ts` | PASS; 9 pruebas |
| TypeScript | `npm run typecheck` | PASS |
| ESLint focalizado | Rutas y pantalla de login afectadas | PASS |
| Integridad del diff | `git diff --check` | PASS |
| Visual QA local | `anclora-visual-qa` en estados de membresía, intercambio y reintento, más `/piloto` | PASS |

## 3. Revisión de Toni

| # | Dónde | Resultado |
| --- | --- | --- |
| 1 | development | Validado por Toni antes del commit y push |
| 2 | Preview | Pendiente tras el deployment del commit |
| 3 | Production | Pendiente del flujo de promoción gobernado |

## 4. Promoción

- [x] Validado en development
- [ ] Validado en Preview
- [ ] `PROMOTE=FULL`
- [ ] Promoción completa. Pendiente de revisión de Preview y autorización expresa.
