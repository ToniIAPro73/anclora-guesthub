---
title: ANCLORA_BRANDING_TYPOGRAPHY
type: standard
estado: activo
scope: branding
tags: [branding, standards, anclora, typography]
related:
  - "[[ANCLORA_BRANDING_MASTER_CONTRACT]]"
  - "[[ANCLORA_BRANDING_COLOR_TOKENS]]"
---

# ANCLORA_BRANDING_TYPOGRAPHY

> Referencia: [[ANCLORA_BRANDING_MASTER_CONTRACT]]

## Objetivo

Definir los stacks tipográficos por categoría de aplicación. La tipografía es un diferenciador de grupo y debe mantenerse consistente dentro de cada categoría.

---

## Stacks por categoría

### Entidad Matriz

| Rol | Fuente | Peso | Fallback | Variable CSS |
|-----|--------|------|----------|-------------|
| Body / UI | Georgia | 400 | serif | — (body directo) |
| Labels / Caps | Georgia | 700 | serif | — |

Justificación: `anclora-group` usa serif para diferenciarse de todas las apps operativas. Transmite institucionalidad y autoridad corporativa. Es el único punto del ecosistema donde se usa serif como fuente principal de body.

```css
body { font-family: Georgia, 'Times New Roman', serif; }
```

| App | Estado actual | Acción |
|-----|--------------|--------|
| `anclora-group` | Georgia ✓ | Sin cambios |

---

### Internas (Advisor AI, Nexus, Content Generator AI)

| Rol | Fuente | Peso | Fallback | Variable CSS |
|-----|--------|------|----------|-------------|
| Display / H1-H2 | Inter | 600-700 | system-ui, sans-serif | `--font-sans` |
| Body / UI | Inter | 400-500 | system-ui, sans-serif | `--font-sans` |
| Monospace | JetBrains Mono | 400 | monospace | `--font-mono` |

Justificación: Inter es la fuente más adecuada para interfaces operativas densas. Excelente legibilidad a tamaños pequeños, amplio soporte de pesos.

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

| App | Estado actual | Acción |
|-----|--------------|--------|
| `anclora-advisor-ai` | Sin fuente custom | Añadir Inter como `--font-sans` |
| `anclora-nexus` | Inter ✓ + Playfair Display | Eliminar Playfair (reservada para ultra premium) |
| `anclora-content-generator-ai` | DM Sans + Bricolage Grotesque | Eliminar ambas, migrar a Inter |
| `anclora-filestudio` *(añadido 2026-08)* | Pendiente de verificar fuente real — no auditado en esta sesión (solo se verificó color) | Confirmar/añadir Inter como `--font-sans` |
| `anclora-fiscal` | **Excepción formal 2026-08** — Montserrat + Playfair Display + EB Garamond vía `next/font`, respaldada por ADR-003/004 de `docs/decision-log.md` del propio repo (identidad visual compartida con Anclora Insights como sello editorial) | No aplicar Inter — excepción de marca aceptada, no deuda técnica |
| `anclora-visionflow` *(añadido 2026-08)* | Pendiente de verificar fuente real — no auditado en esta sesión (solo se verificó color) | Confirmar/añadir Inter como `--font-sans` |

---

### Premium (Impulso, Data Lab, Talent, Synergi, Command Center)

| Rol | Fuente | Peso | Fallback | Variable CSS |
|-----|--------|------|----------|-------------|
| Display / H1-H2 | DM Sans | 600-700 | system-ui, sans-serif | `--font-sans` |
| Body / UI | DM Sans | 400-500 | system-ui, sans-serif | `--font-sans` |
| Monospace | JetBrains Mono | 400 | monospace | `--font-mono` |

Justificación: DM Sans aporta un carácter más redondo y accesible que Inter, adecuado para productos orientados a usuario final. Sus formas geométricas suaves transmiten modernidad y cercanía, diferenciándose de la Inter operativa de las internas.

```css
--font-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

| App | Estado actual | Acción |
|-----|--------------|--------|
| `anclora-impulso` | Sin fuente custom | Añadir DM Sans |
| `anclora-data-lab` | Georgia, serif | Migrar a DM Sans. Georgia queda reservada para `anclora-group`. |
| `anclora-talent` | Sin fuente custom *(pausado, fuera de alcance activo)* | Añadir DM Sans (si se reactiva) |
| `anclora-synergi` | Cardo (display) + Inter (body) | Eliminar Cardo (reservada para ultra premium). Migrar a DM Sans. |
| `anclora-command-center` | Sin fuente custom | Añadir DM Sans |
| `anclora-guesthub` *(añadido 2026-08)* | Pendiente de verificar fuente real — no auditado en esta sesión (solo se verificó color) | Confirmar/añadir DM Sans |

---

### Ultra Premium (Private Estates, Private Estates Landing)

| Rol | Fuente | Peso | Fallback | Variable CSS |
|-----|--------|------|----------|-------------|
| Display / H1-H2 | Cardo | 400-700 | Georgia, serif | `--font-display` |
| Body / UI | Inter | 400-500 | system-ui, sans-serif | `--font-sans` |
| Acentos editoriales | Fraunces | 400-600 | Georgia, serif | `--font-accent` |

Justificación: Contraste serif (display) + sans-serif (body) clásico de marcas de lujo. Cardo aporta elegancia mediterránea. Fraunces añade un tercer registro para citas y acentos narrativos.

```css
--font-display: 'Cardo', Georgia, serif;
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-accent: 'Fraunces', Georgia, serif;
```

| App | Estado actual | Acción |
|-----|--------------|--------|
| `anclora-private-estates` | Cardo ✓ + Inter ✓ + Fraunces ✓ + Cormorant Garamond | Eliminar Cormorant (de 4 a 3 fuentes) |
| `anclora-private-estates-landing-page` | `font-serif` genérico | Adoptar Cardo y Fraunces explícitamente |

---

## Reglas de uso

1. **No mezclar stacks entre grupos.** Una app interna no puede usar DM Sans ni Cardo. Una app premium no puede usar Inter como body. Ultra premium no puede usar DM Sans.
2. **Pesos estrictos.** Display: 600-700. Body: 400-500.
3. **Letter-spacing:** Body `0.00em`, labels uppercase `0.08-0.12em`, headings `-0.02em`.
4. **Tamaño mínimo body:** 14px desktop, 16px móvil.
5. **Line-height:** 1.5 body, 1.2 headings, 1.0 labels uppercase.

## Reserva de fuentes

| Fuente | Categoría reservada | Rol |
|--------|--------------------|----|
| Georgia | Entidad Matriz | Body + display |
| Inter | Internas + Ultra Premium (body) | Sans-serif operativa |
| JetBrains Mono | Internas + Premium | Monospace |
| DM Sans | Premium | Body + display |
| Cardo | Ultra Premium | Display serif |
| Fraunces | Ultra Premium | Acentos editoriales |

## Tabla de migración completa

| App | Categoría | Fuentes a añadir | Fuentes a eliminar |
|-----|-----------|-------------------|-------------------|
| `anclora-group` | Entidad Matriz | — | — |
| `anclora-advisor-ai` | Interna | Inter | — |
| `anclora-nexus` | Interna | — | Playfair Display |
| `anclora-content-generator-ai` | Interna | Inter | DM Sans, Bricolage Grotesque |
| `anclora-filestudio` | Interna | Inter *(pendiente de verificar estado real)* | Pendiente de auditoría |
| `anclora-fiscal` | Interna | Inter *(pendiente de verificar estado real)* | Pendiente de auditoría |
| `anclora-visionflow` | Interna | Inter *(pendiente de verificar estado real)* | Pendiente de auditoría |
| `anclora-impulso` | Premium | DM Sans | — |
| `anclora-data-lab` | Premium | DM Sans | Georgia |
| `anclora-talent` | Premium *(pausado)* | DM Sans | — |
| `anclora-synergi` | Premium | DM Sans | Cardo, Inter |
| `anclora-command-center` | Premium | DM Sans | — |
| `anclora-guesthub` | Premium | DM Sans *(pendiente de verificar estado real)* | Pendiente de auditoría |
| `anclora-private-estates` | Ultra Premium | — | Cormorant Garamond |
| `anclora-private-estates-landing-page` | Ultra Premium | Cardo, Fraunces | — |

## Criterio de cumplimiento

Una app no cumple este contrato si:
- Usa una fuente no asignada a su categoría
- Mezcla fuentes de dos categorías en la misma vista
- No declara `--font-sans` explícitamente en CSS
- Usa pesos fuera del rango (100-300 o 800-900) en UI operativa
- No respeta tamaño mínimo de body

## Excepción verificada — `anclora-group-landing` (2026-08)

Aunque las superficies `portfolio` están fuera de alcance de este contrato (ver `ANCLORA_BRANDING_MASTER_CONTRACT.md`), `anclora-group-landing` es una excepción documentada: su repo real (`src/styles/tokens.css`) implementa el brand book completo, incluida tipografía propia verificada:

```css
--font-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace;
```

Coincide con el stack Premium (DM Sans + JetBrains Mono), no con un tema editorial genérico de portfolio.
