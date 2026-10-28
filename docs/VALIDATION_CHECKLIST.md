# Checklist de validación — Anclora Identity roles (2026-10-28)

**Repositorio:** anclora-guesthub
**Rama:** development
**Validación en development:** Toni confirmó que el cambio está verificado.
**Datos:** no se modificaron datos de aplicación ni secretos.

## 1. Qué cambia

- Las sesiones Identity solo obtienen el rol GuestHub `admin` cuando su email
  coincide con el administrador local configurado; los demás miembros obtienen
  `pilot_user`.
- Data Lab y GuestHub usan el issuer canónico `https://anclora-identity.anclora.com`.
  Vercel actualizó el registro compartido en Production, Preview y Development.
- No se cambió ningún client secret ni session secret.

## 2. Comprobaciones del agente

| Comprobación | Comando o método | Resultado |
| --- | --- | --- |
| ESLint focalizado | `./node_modules/.bin/eslint src/lib/auth.ts` | PASS |
| TypeScript | `npm run typecheck` | PASS |
| Integridad del diff | `git diff --check` y `git diff --cached --check` | PASS |
| Configuración Vercel | `vercel env run` con salida limitada a booleanos y host/path | PASS; Identity activo, variables requeridas presentes, issuer y callbacks correctos |
| Suite Vitest | No ejecutada | Toni verificó el cambio en development; la suite no se solicitó en esta tarea |

## 3. Revisión de Toni

| # | Dónde | Resultado |
| --- | --- | --- |
| 1 | development | Validado por Toni antes del commit y push |
| 2 | Preview | Pendiente tras el deployment del commit |
| 3 | Production | El deployment activo conserva su configuración anterior hasta una nueva promoción gobernada |

## 4. Promoción

- [x] Validado en development
- [ ] Validado en Preview
- [ ] `PROMOTE=FULL`
- [ ] Promoción completa. Pendiente de revisión de Preview y autorización explícita.
