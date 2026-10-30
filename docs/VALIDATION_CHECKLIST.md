# Checklist de validación — adopción AOS canónica (2026-10-30)

> Se sobrescribe en cada entrega; el historial queda en Git.

**Repositorio:** anclora-guesthub
**Rama:** development
**Datos:** no se usaron ni modificaron datos de aplicación.

## 1. Qué cambia
- Bootstrap mínimo (`AGENTS.md`, adaptadores de proveedor) y contratos `.anclora/` alineados con el modelo AOS ratificado (D-2026-0042): autoridad en Governance, router mínimo, claves Preview heredadas retiradas, semántica de runtime derivada de hechos ya declarados.
- Copias de contratos sincronizadas desde Vault (11 ficheros).
- Sin cambios de código de producto, dependencias ni despliegue.

## 2. Ya comprobado por el agente
| Comprobación | Resultado |
| --- | --- |
| `aos-adopt` inspect/plan/apply, diff limitado a ficheros contractuales | PASS |
| `runtime_semantics.py` sobre `.anclora/PRODUCTION_RUNTIME.md` | PASS |
| Enlaces a Governance en los `.md` modificados, `git diff --check` | PASS |

## 3. NOT_RUN
Tests, lint, typecheck, build y E2E de la aplicación: el diff es solo documentación/configuración contractual.

## 4. Para Toni
Sin pasos manuales. Bloqueante: no.
