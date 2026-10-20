# Checklist de validación — arranque local sin conflictos de puerto

**Alcance:** el script `dev` ejecuta primero `anclora-infrastructure/scripts/free-port.mjs`, que libera el puerto asignado al repo en `anclora-infrastructure/config/dev-endpoints.yaml` si lo ocupa un proceso colgado del propio workspace (nunca un proceso ajeno). En los comandos `next dev` y `vite` simples se fija además el puerto del registro (`-p N`, `--port N --strictPort`). No cambia código de la aplicación ni la VPS.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `package.json` válido tras el cambio | PASS |
| Tests de `free-port.mjs` y `wire-dev-port.mjs` (en `anclora-infrastructure`) | PASS — 10 tests |
| Prueba de extremo a extremo en `anclora-secureflow` (puerto ocupado, `npm run dev`) | PASS — puerto liberado y servidor arrancado en el puerto del registro |

## Verificación visual

No aplica: solo el script de arranque local.

## Promoción

No solicitada en este cambio.
