# Checklist de validación — invariantes de promoción global

**Alcance:** propagar con `anclora-mods/scripts/adopt-repo.mjs` las invariantes nuevas de la política global de promoción a `.anclora/PRODUCTION_RUNTIME.md`: espera solo a que termine el workflow de cada salto, verificación de cada rama a cargo de Toni, alcance multi-repo y resumen único al final. Solo se añaden 6 líneas de contrato; no cambia código ni comportamiento de la aplicación.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `node scripts/adopt-repo.mjs apply --repo <repo>` | APPLIED |
| Diff limitado a `.anclora/PRODUCTION_RUNTIME.md` | 6 inserciones, sin borrados |
| Tests del adopter (`adopt-repo.test.mjs`) | PASS — 38 tests |

## Verificación visual

No aplica: solo contrato de documentación.

## Promoción

No solicitada en este cambio.
