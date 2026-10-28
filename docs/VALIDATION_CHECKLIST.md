# Checklist de validación — GuestHub Identity login entry (2026-10-28)

**Repositorio:** anclora-guesthub
**Rama:** development
**Validación en development:** Toni confirmó que el cambio está verificado.
**Datos:** no se modificaron datos de aplicación ni secretos.

## 1. Qué cambia

- `/login` y `/admin/login` entran mediante Anclora Identity cuando está activo.
- Las rutas locales de login, recuperación y cambio de contraseña quedan
  bloqueadas en modo Identity.
- Logout limpia las cookies local y de Identity.
- El descubrimiento OIDC tiene un límite de 8 segundos.
- Se conserva el control de pertenencia al piloto y el mapeo local de roles.

## 2. Comprobaciones

| Comprobación | Comando o método | Resultado |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | PASS |
| ESLint focalizado | Archivos de login, auth y cliente OIDC afectados | PASS |
| Integridad del diff | `git diff --check` y `git diff --cached --check` | PASS |
| Visual QA de Production actual | `anclora-visual-qa check https://guesthub.anclora.com/login` | PASS; confirmó la pantalla local anterior al cambio |
| Visual QA tras el cambio | Pendiente de publicación del SHA | NOT_RUN |
| Suite Vitest | No ejecutada | No solicitada |

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
