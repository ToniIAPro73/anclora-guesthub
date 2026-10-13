# GuestHub — índice SDD

**Estado:** PROPUESTA · **Revisión inicial:** Toni + agente · **No aceptada; no autoriza código ni operaciones.**

## Estado y artefactos

| ID / tarea | Fase | Prioridad propuesta | Dependencias | Estado | Artefacto / gate |
|---|---:|---:|---|---|---|
| GH-0.1 Política única SES pre fail-closed | F0 | P0 | Ninguna para análisis; decisión de contrato separada | PROPUESTA | [spec](000-seguridad-y-alcance/spec.md), [plan](000-seguridad-y-alcance/plan.md), [tasks](000-seguridad-y-alcance/tasks.md), G0.1 |
| GH-0.2 identidad, roles y ownership | F0 | P0 | decisión GROUP_OWNER | PROPUESTA | mismos artefactos, G0.2 |
| GH-0.3 CSP y errores | F0 | P1 | inventario de CSP / GH-0.1 | PROPUESTA | mismos artefactos, G0.3 |
| GH-0.4 lifecycle de datos | F0 | P1 | GH-0.2 | PROPUESTA | mismos artefactos, G0.4 |
| GH-0.5 baseline CI/dependencias | F0 | P1 | Ninguna | PROPUESTA | mismos artefactos, G0.5 |
| GH-0.6 alcance y claims | F0 | P2 | GH-0.1, GH-0.4 | PROPUESTA | mismos artefactos, G0.6 |
| GH-1.1 a GH-1.4 flujo de preproducción | F1 | P1 | F0; autorización SES pre aparte | ROADMAP | Solo resumen en [roadmap](../../docs/guesthub-roadmap.md) |
| GH-2.1 a GH-2.3 persistencia/lifecycle/rate limit | F2 | P1 | F0; diseño y gates de datos | ROADMAP | Solo resumen en roadmap |
| GH-3.1 a GH-3.3 aislamiento/onboarding/importación | F3 | P1 | F0–F2; decisiones y fuentes de datos | ROADMAP | Solo resumen en roadmap |
| GH-4.1 a GH-4.3 beta/operación/decisión | F4 | P2 | Gates F0–F3, privacidad/legal/capacidad | ROADMAP | Solo resumen en roadmap |

## F0

- [spec.md](000-seguridad-y-alcance/spec.md): problema, resultados, alcance, actores, requisitos y escenarios.
- [plan.md](000-seguridad-y-alcance/plan.md): opciones y propuesta técnica basada en evidencia del HEAD.
- [tasks.md](000-seguridad-y-alcance/tasks.md): descomposición GH-0.1–0.6 y Definition of Ready/Done.
- [gates.md](000-seguridad-y-alcance/gates.md): matriz de requisitos, comprobación, denominadores, evidencia y revisión.
- [analysis.md](000-seguridad-y-alcance/analysis.md): baseline, delta, contradicciones y límites.
- [evidence/README.md](000-seguridad-y-alcance/evidence/README.md): procedimiento de evidencia futura sin PII.

Roadmap completo: [docs/guesthub-roadmap.md](../../docs/guesthub-roadmap.md). Decisiones: [docs/guesthub-decisions.md](../../docs/guesthub-decisions.md). Fuentes: [docs/guesthub-sources.md](../../docs/guesthub-sources.md).

## Secuencia y criterio

El agente implementa tareas directamente en development, ejecuta gates técnicos y QA visual aplicable; Toni revisa funcional y visualmente cada entrega. Sin entrevistas ni paneles externos previos. F0.1/F0.2 condicionan solo cambios que toquen SES/ownership; las demás tareas independientes pueden avanzar en paralelo. Usa BLOCKED solo ante una dependencia concreta. Commit/push a origin/development tras gates; sin ramas/PR por tarea y sin promoción automática. Con autorización expresa de Toni, promociones paso a paso development → staging → production → main. Las fases F1–F4 no tienen descomposición ejecutable aquí: se especifican después del gate y revisión de su fase predecesora. No se autoriza crear una base alternativa; runtime PRODUCTION_BACKED. SES producción queda bloqueado por .anclora/SECURITY_RULES.md.

Todos los checks dinámicos de esta misión son NOT_RUN. Ningún documento se marca ACEPTADO.
