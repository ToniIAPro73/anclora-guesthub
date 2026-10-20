# Checklist de validación — llamada a free-port tolerante a CI

**Alcance:** corrección de la llamada de liberación de puerto del script `dev`. La versión anterior fallaba con `MODULE_NOT_FOUND` en los runners de CI, donde no existe el repo hermano `anclora-infrastructure` (rompió el E2E de `anclora-linguo-cam`, cuyo Playwright arranca `npm run dev`). Ahora la llamada se omite si `../anclora-infrastructure/scripts/free-port.mjs` no existe y, si existe, se propaga su código de salida. No cambia código de la aplicación.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| Tests de `free-port.mjs` y `wire-dev-port.mjs` (en `anclora-infrastructure`) | PASS — 11 tests, incluido el caso sin repo hermano |
| Extremo a extremo en `anclora-secureflow` (puerto ocupado, `npm run dev`) | PASS — liberado y servidor arrancado en el puerto del registro |
| Ejecución de la llamada en un directorio sin `anclora-infrastructure` | PASS — salida 0 |
| `package.json` válido | PASS |

## Verificación visual

No aplica: solo el script de arranque local.

## Promoción

No solicitada en este cambio.
