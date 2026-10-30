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
  --source gemini-dev
```

Guardar error resuelto:

```bash
memanto remember "Error resuelto: <sintoma>. Causa: <causa>. Solucion: <solucion>. Verificado con <test/comando>." \
  --type error \
  --confidence 0.95 \
  --provenance observed \
  --source gemini-dev
```

Guardar preferencia:

```bash
memanto remember "Preferencia: <preferencia concreta del usuario>." \
  --type preference \
  --confidence 1.0 \
  --provenance explicit_statement \
  --source gemini-dev
```

Guardar pendiente:

```bash
memanto remember "Pendiente: <tarea>. Bloqueo: <bloqueo>. Siguiente paso: <accion>." \
  --type commitment \
  --confidence 0.9 \
  --provenance explicit_statement \
  --source gemini-dev
```

### Cierre

```bash
memanto remember "Cierre: se completo <tarea>. Rama: <rama>. Commit: <sha>. Pendiente: <si/no>." \
  --type event \
  --confidence 0.95 \
  --provenance observed \
  --source gemini-dev

memanto memory sync --project-dir .
```
<!-- /MEMANTO-MANAGED-SECTION -->

---

## Flujo Git obligatorio

**Antes de modificar código, lee:**

- `docs/devops/AGENT_GIT_WORKFLOW_CONTRACT.md` — Contrato obligatorio
- `docs/devops/BRANCHING_MODEL.md` — Modelo detallado

### Regla base

Trabaja directamente en la rama existente `development`; no crees ramas de tarea ni worktrees para el trabajo normal. Comprueba la rama y el estado antes de editar y conserva el trabajo previo que encuentres. Mantén los cambios locales sin commit ni push hasta que Toni valide el resultado en el entorno de desarrollo. Tras su validación expresa, haz commit y push a `origin/development`. Después espera la revisión de Preview; solo `PROMOTE=FULL` autoriza la promoción completa según la política canónica del workspace. No promociones automáticamente ni esperes a que terminen CI o despliegues.

<!-- ANCLORA-AOS:START -->
# Gemini adapter

This repository follows AOS. Use `AGENTS.md` as bootstrap and resolve canonical Governance and the repository runtime contract from it. Provider-specific behavior must not override AOS.
<!-- ANCLORA-AOS:END -->
