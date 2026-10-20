# Checklist de validación — invariantes de promoción: sin esperar al CI de origen

**Alcance:** añadir con `anclora-mods/scripts/adopt-repo.mjs` dos líneas a `.anclora/PRODUCTION_RUNTIME.md`: `PROMOTION_AGENT_WAITS_FOR_SOURCE_CI=false` y `PROMOTION_DISPATCH_IMMEDIATELY=true`. Reflejan la política global: el agente lanza la promoción en cuanto hay autorización y no espera ni sondea el CI de la rama de origen; `promote.yml` rechaza un SHA con estado en fallo. No cambia código ni comportamiento de la aplicación.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `node scripts/adopt-repo.mjs apply --repo <repo>` | APPLIED |
| `node scripts/adopt-repo.mjs check-all` | 40 PASS, 1 exento, 0 bloqueados |
| Diff limitado a `.anclora/PRODUCTION_RUNTIME.md` | 2 inserciones |

## Verificación visual

No aplica: solo contrato de documentación.

## Promoción

Se promueve `development` → `staging` → `production` → `main` con `promote.yml`.
