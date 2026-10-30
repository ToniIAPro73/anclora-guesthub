
> [!IMPORTANT]
> This repository is governed by the Anclora canonical contracts under `.anclora/`.
> Agent-specific defaults, personal presets, or global agent configurations must NOT override those contracts.
> Read `.anclora/AGENT_PROJECT_CONTEXT.md` before starting substantial work.


<!-- MEMANTO-MANAGED-SECTION -->
## Uso de Memanto

Agente por defecto en este repo: `anclora-syncxml`.

> Nota (rename 2026-08): el producto se ha renombrado **Anclora SyncXML → Anclora GuestHub** (repositorio `anclora-guesthub`), pero la clave de agente Memanto `anclora-syncxml` se conserva intencionadamente para mantener la continuidad de la memoria operativa.

Usa Memanto como memoria operativa persistente. Sirve para recordar decisiones tecnicas, errores resueltos, contexto estable, preferencias del usuario y pendientes reales.

No sustituye documentacion canonica, Git, issues ni contratos de la boveda.

### Reglas

- Lee `MEMORY.md` antes de empezar.
- Si hay dudas sobre contexto previo, ejecuta `memanto recall` o `memanto answer` antes de asumir.
- Guarda solo informacion que ahorre tiempo o evite repetir errores.
- Todos los comandos `memanto` son comandos de shell. Ejecutalos en terminal.
- Nunca guardes secretos, tokens, contrasenas, credenciales completas ni datos personales sensibles.

### Inicio de tarea

```bash
memanto agent activate anclora-syncxml
memanto recall "contexto actual de este proyecto" --limit 10
memanto answer "Que decisiones previas debo respetar aqui?"
```

### Durante la tarea

Guardar decision:

```bash
memanto remember "Decision: <que se decidio> porque <razon>. Afecta a <repo/modulo>." \
  --type decision \
  --confidence 0.95 \
  --provenance explicit_statement \
  --source codex-dev
```

Guardar error resuelto:

```bash
memanto remember "Error resuelto: <sintoma>. Causa: <causa>. Solucion: <solucion>. Verificado con <test/comando>." \
  --type error \
  --confidence 0.95 \
  --provenance observed \
  --source codex-dev
```

Guardar preferencia:

```bash
memanto remember "Preferencia: <preferencia concreta del usuario>." \
  --type preference \
  --confidence 1.0 \
  --provenance explicit_statement \
  --source codex-dev
```

Guardar pendiente:

```bash
memanto remember "Pendiente: <tarea>. Bloqueo: <bloqueo>. Siguiente paso: <accion>." \
  --type commitment \
  --confidence 0.9 \
  --provenance explicit_statement \
  --source codex-dev
```

### Cierre

```bash
memanto remember "Cierre: se completo <tarea>. Rama: <rama>. Commit: <sha>. Pendiente: <si/no>." \
  --type event \
  --confidence 0.95 \
  --provenance observed \
  --source codex-dev

memanto memory sync --project-dir .
```
<!-- /MEMANTO-MANAGED-SECTION -->

---

## Flujo Git obligatorio

**Antes de modificar código, todo agente debe leer:**

- [`docs/devops/AGENT_GIT_WORKFLOW_CONTRACT.md`](docs/devops/AGENT_GIT_WORKFLOW_CONTRACT.md) — Contrato obligatorio
- [`docs/devops/BRANCHING_MODEL.md`](docs/devops/BRANCHING_MODEL.md) — Modelo detallado
-  — Pasos prácticos

### Flujo de revisión y promoción vigente

La política canónica del workspace y `.anclora/PRODUCTION_RUNTIME.md` sustituyen las antiguas instrucciones de ramas `feat/*` y commits automáticos de esta guía.

1. Trabaja directamente en `development` y deja los cambios locales sin commit ni push.
2. Ejecuta las comprobaciones proporcionales a `QA_MODE` y presenta los cambios en el entorno de desarrollo.
3. Espera la validación expresa de Toni. Solo esa validación autoriza el commit y push a `origin/development`.
4. Después del push, espera a que Toni revise Preview. Solo `PROMOTE=FULL` autoriza la promoción completa `staging → production → main`.
5. Despacha un único workflow de cadena completa. No esperes ni consultes el estado de CI, despliegues o workflow, ni verifiques las ramas entre saltos; Toni revisa los entornos resultantes.

Nunca uses `git push --force`, hagas commit directamente en `staging`, `production` o `main`, ni toques secretos o variables reales de Vercel.

<!-- ANCLORA-GLOBAL-AGENT-MEMORY-START -->
## Memoria global Anclora obligatoria

Antes de modificar este repositorio, todo agente IA debe leer:

1. `.anclora/global/GLOBAL_AGENT_WORKFLOW.md`, si existe
2. `.anclora/global/GLOBAL_GIT_WORKFLOW.md`, si existe
3. `.anclora/global/GLOBAL_SECURITY_RULES.md`, si existe
4. `.anclora/AGENT_PROJECT_CONTEXT.md`
5. `.anclora/GIT_WORKFLOW.md`
6. `.anclora/SECURITY_RULES.md`
7. `MEMORY.md`

Regla base: trabajar directamente en la rama existente `development`, según la política canónica del workspace.
<!-- ANCLORA-GLOBAL-AGENT-MEMORY-END -->

<!-- ANCLORA-SDD-STANDARDS-START -->
## Metodología SDD — Estándar Unificado Anclora

Todo desarrollo en este repo sigue la metodología SDD unificada del ecosistema Anclora.

**Referencia canónica**: `agency-agents/docs/guides/SDD_INTEGRATION_GUIDE.md`
**Workflow OpenSpec**: `agency-agents/docs/guides/OPENSPEC_WORKFLOW.md`

### Flujo de trabajo Git

- Rama de trabajo: `development`; no crear ramas temporales por defecto.
- Mantén cambios locales y sin commit hasta que Toni los valide expresamente en el entorno de desarrollo.
- Tras esa validación, crea el commit y haz push a `origin/development`.
- Espera la revisión de Preview; solo `PROMOTE=FULL` inicia la cadena completa `staging → production → main`.
- El agente despacha un workflow asíncrono de cadena completa y no espera CI/despliegues ni verifica ramas entre saltos. Toni revisa los entornos resultantes.
- Nunca commitear directamente en `main`, `staging` ni `production`.

### Principios de desarrollo (Specboot)

1. **Small Tasks, One at a Time** — baby steps, nunca saltarse pasos
2. **Test-Driven Development** — escribir tests fallidos antes de implementar
3. **Type Safety** — código completamente tipado (TypeScript)
4. **Clear Naming** — variables y funciones descriptivas
5. **English Only** — código, comentarios y docs técnicos en inglés
6. **90% Test Coverage** — cobertura exhaustiva en todas las capas
7. **Incremental Changes** — modificaciones focalizadas y revisables

### Ciclo de cambios (SDD en este repo)

Toda feature o fix sigue este flujo antes de escribir código:

- Crear spec: `sdd/features/<nombre>/<nombre>-spec-v1.md`
- Crear plan: `sdd/features/<nombre>/<nombre>-plan-v1.md` (cambios complejos)
- Crear tasks: `sdd/features/<nombre>/<nombre>-tasks-v1.md`
- Implementar tarea a tarea (tests primero)
- Validar contra criterios de aceptación de la spec
- Tras validar la spec, presentar los cambios en `development` y esperar la validación expresa de Toni antes de commit/push; el flujo normal no requiere PR.

### Reglas obligatorias

- **No spec, no code**: toda feature empieza con spec en `sdd/features/`
- **Tests primero**: el agente ejecuta los tests, nunca el usuario
- **Hermes gate**: cambio que afecta copy público → Hermes Copy Curator antes del merge
- **Spec inmutable**: una spec cerrada no se edita; los cambios generan una spec nueva
<!-- ANCLORA-SDD-STANDARDS-END -->

<!-- ANCLORA-AOS:START -->
## AOS bootstrap

This repository follows AOS (`AUTHORITY=anclora-governance`). Resolve canonical Governance ([AOS Adoption Standard](../anclora-governance/standards/AOS_ADOPTION_STANDARD.md)) and this repository's runtime contract `.anclora/PRODUCTION_RUNTIME.md`. Use `.anclora/AGENT_PROJECT_CONTEXT.md` as the minimal task router and `.anclora/AOS_ADOPTION.md` for adoption and exceptions, loading each only as the task requires. Do not assume generic defaults when a contract exists.
<!-- ANCLORA-AOS:END -->
