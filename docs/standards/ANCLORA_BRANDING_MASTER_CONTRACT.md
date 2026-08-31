---
title: ANCLORA_BRANDING_MASTER_CONTRACT
type: standard
estado: activo
scope: branding
tags: [branding, standards, anclora, contract]
related:
  - "[[ANCLORA_GROUP_BRAND_IP_CONTRACT]]"
  - "[[ANCLORA_BRANDING_ICON_SYSTEM]]"
  - "[[ANCLORA_BRANDING_COLOR_TOKENS]]"
  - "[[ANCLORA_BRANDING_TYPOGRAPHY]]"
  - "[[ANCLORA_BRANDING_FAVICON_SPEC]]"
  - "[[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]]"
---

# ANCLORA_BRANDING_MASTER_CONTRACT

## Objetivo

Definir el sistema de identidad visual completo del ecosistema Anclora: logos, paletas de color, tipografía, iconografía y reglas de uso. Este contrato es la referencia única para cualquier decisión de branding en cualquier aplicación del ecosistema.

## Autoridad

- Registro operativo: `contracts/governance/contracts-registry.json`
- Inventario aplicable: `docs/governance/ecosystem-repos.json`
- Fuente ejecutable relacionada: `anclora-design-system`

## Ruta canónica

- Obsidian: Bóveda maestra (copia de referencia)
- Repos: `contracts/core/ANCLORA_BRANDING_MASTER_CONTRACT.md`

## Ownership / Brand IP

La titularidad de marca, identidad visual, activos intangibles y productos derivados del ecosistema corresponde a Anclora Group conforme al contrato transversal [[ANCLORA_GROUP_BRAND_IP_CONTRACT]].

Este contrato de branding no sustituye el contrato de propiedad intelectual y marca; lo consume.

## Regla de publicación

- La bóveda Obsidian mantiene la copia maestra.
- Cada aplicación debe referenciar este contrato en su propio `docs/standards/`.
- Si se modifica un token de branding a nivel ecosistema, todas las aplicaciones afectadas deben actualizarse en la misma ronda.

## Repos a los que aplica

- `anclora-group`
- `anclora-advisor-ai`
- `anclora-nexus`
- `anclora-content-generator-ai`
- `anclora-filestudio` *(añadido 2026-08 — nota: sin matiz de marca propio confirmado en su repo real, ver `ANCLORA_BRANDING_COLOR_TOKENS.md`)*
- `anclora-fiscal` *(añadido 2026-08, verificado)*
- `anclora-visionflow` *(añadido 2026-08, verificado)*
- `anclora-impulso`
- `anclora-command-center`
- `anclora-synergi`
- `anclora-data-lab`
- `anclora-energyscan`
- `anclora-guesthub` *(añadido 2026-08, verificado, estado `pre-mvp`)*
- `anclora-talent` *(pausado, fuera de alcance activo desde 2026-08 — el contrato sigue aplicando por si se reactiva)*
- `anclora-private-estates`
- `anclora-private-estates-landing` *(añadido 2026-08 — comparte identidad completa con `anclora-private-estates`)*

Nota:
- `anclora-group` actúa como referencia matriz de branding y puede recibir contratos de branding o gobernanza cuando el registro central lo indique.
- Las superficies `portfolio` se gobiernan con `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`, no con este contrato maestro de branding.
- **Excepción documentada 2026-08:** `anclora-group-landing`, aunque taxonómicamente es `portfolio`, no sigue el tema editorial genérico del contrato de portfolio/showcase — su repo real implementa el brand book completo (navy/signal-blue/command-purple) de forma más fiel que ninguna otra app del ecosistema. Se gobierna con este contrato maestro, no con `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`, pese a su clasificación de tier.

## Sincronización con repos consumidores

- Contrato fuente en la bóveda: `contracts/core/ANCLORA_BRANDING_MASTER_CONTRACT.md`
- Target normal de propagación: `docs/standards/`
- Dependencia de auditoría y propagación desde `contracts/governance/contracts-registry.json`

## Documentos del sistema de branding

| Documento | Alcance | Wikilink |
|-----------|---------|----------|
| Master Contract | Índice, clasificación, reglas globales | Este documento |
| Brand/IP Contract | Titularidad, copyright, marcas derivadas y adopción legal | [[ANCLORA_GROUP_BRAND_IP_CONTRACT]] |
| Icon System | Estructura, colores y prompts de cada icono | [[ANCLORA_BRANDING_ICON_SYSTEM]] |
| Color Tokens | Tokens CSS dark/light para las 16 apps con branding propio (10 originales + 6 añadidas 2026-08) | [[ANCLORA_BRANDING_COLOR_TOKENS]] |
| Typography | Stacks tipográficos por grupo, detalle por app | [[ANCLORA_BRANDING_TYPOGRAPHY]] |
| Favicon Spec | Paquete favicon, implementación por framework | [[ANCLORA_BRANDING_FAVICON_SPEC]] |

## Orden de lectura obligatorio

Al crear una app nueva:
1. [[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]] — clasificar la app
2. Este documento — reglas globales
3. [[ANCLORA_BRANDING_ICON_SYSTEM]] — asignar color de ondas y borde
4. [[ANCLORA_BRANDING_COLOR_TOKENS]] — copiar tokens base del grupo + definir accent
5. [[ANCLORA_BRANDING_TYPOGRAPHY]] — copiar stack tipográfico del grupo
6. [[ANCLORA_BRANDING_FAVICON_SPEC]] — generar favicon package
7. Registrar la nueva app en los contratos de branding que correspondan

Al modificar la identidad de una app existente:
1. Este documento
2. El contrato de branding específico que aplique
3. Documentar la excepción si la hay

## Clasificación de aplicaciones

| Categoría | Apps | Borde de icono | Tipografía | Descripción |
|-----------|------|---------------|-----------|-------------|
| Entidad Matriz | `anclora-group` | Plata monocromática | Georgia, serif | Portal corporativo y entidad matriz del ecosistema. Identidad exclusiva fuera de grupos. |
| Interna | `anclora-advisor-ai`, `anclora-nexus`, `anclora-content-generator-ai`, `anclora-filestudio`, `anclora-fiscal`, `anclora-visionflow` | Plata cromada | Inter | Herramientas operativas internas. |
| Premium | `anclora-impulso`, `anclora-talent` *(pausado)*, `anclora-data-lab`, `anclora-energyscan`, `anclora-synergi`, `anclora-command-center`, `anclora-guesthub` | Cobre rosado | DM Sans | Productos de valor añadido. |
| Ultra Premium | `anclora-private-estates`, `anclora-private-estates-landing` | Oro pulido | Cardo + Inter + Fraunces | Marca de lujo inmobiliario. |
| Portfolio | `anclora-portfolio`, `anclora-azure-bay-landing-page`, `anclora-playa-viva-uniestate`, `anclora-portfolio-showcase`, `anclora-fiscal-showcase` | Por proyecto | Por proyecto | Fuera de alcance de este contrato — ver `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`. |
| Portfolio (excepción — hereda tema de producto real) | `anclora-energyscan-showcase`, `anclora-syncxml-showcase` | Cobre rosado (heredado) | DM Sans (heredado) | No siguen el tema editorial genérico — son el propio producto en fase MVP/pre-MVP mostrándose, heredan el tema completo de su app madre. |
| Portfolio (excepción — brand book propio) | `anclora-group-landing` | N/A — identidad navy/azul/violeta propia | DM Sans + JetBrains Mono | Única app portfolio que implementa el brand book completo en vez del tema editorial genérico. Se gobierna con este contrato maestro. |

## Regla de escalera visual

```
PLATA MONO (Entidad Matriz) → PLATA + color (internas) → COBRE (premium) → ORO (ultra premium)
```

- **Borde** comunica la categoría
- **Ondas** comunican la app
- **Interior** refuerza la personalidad cromática
- Ondas = borde (monocromático) → Entidad Matriz o Private Estates
- Ondas ≠ borde → app de un grupo operativo

## Mapa de colores de acento por app

| App | Accent | Hue | Borde |
|-----|--------|-----|-------|
| `anclora-group` | `#A8AEB8` plata | 220° | Plata (mono) |
| `anclora-advisor-ai` | `#1DAB89` teal | 162° | Plata |
| `anclora-nexus` | `#D4AF37` oro | 45° | Plata |
| `anclora-content-generator-ai` | `#E06848` coral | 12° | Plata |
| `anclora-filestudio` | `#4FB3BF` teal claro *(sin matiz de marca propio confirmado en el repo real — asignado solo para wayfinding, ver nota en `ANCLORA_BRANDING_COLOR_TOKENS.md`)* | 186° | Plata |
| `anclora-fiscal` | `#D7A957` dorado | 38° | Plata |
| `anclora-visionflow` | `#5C70D8` índigo | 230° | Plata |
| `anclora-impulso` | `#FF6A00` naranja | 25° | Cobre |
| `anclora-data-lab` | `#2DA078` esmeralda | 155° | Cobre |
| `anclora-energyscan` | `#00DC82` verde energía | 155° | Cobre |
| `anclora-talent` | `#4A9FD8` azul cielo *(pausado, fuera de alcance activo)* | 205° | Cobre |
| `anclora-synergi` | `#8C5AB4` púrpura | 280° | Cobre |
| `anclora-command-center` | `#6C63FF` violeta premium + `#5FA8FF` azul luminoso | 245° | Azul/violeta |
| `anclora-guesthub` | `#BFA46A` dorado apagado | 41° | Cobre |
| `anclora-private-estates` | `#D4AF37` oro | 45° | Oro (mono) |
| `anclora-private-estates-landing` | `#D4AF37` oro *(comparte tema completo con `anclora-private-estates`)* | 45° | Oro (mono) |

> **Nota de mapeo shadcn (2026-08):** el nombre de variable exigido en esta tabla (`--accent`, `--background`, etc.) es el nombre canónico de referencia. Apps que consumen shadcn/ui pueden declarar el mismo valor bajo su propia convención de nombres (`--primary`, `--brand-highlight`, etc.) sin que constituya incumplimiento, siempre que el **valor hexadecimal** coincida exactamente con el asignado. Verificado conforme bajo este criterio: `anclora-impulso`, `anclora-nexus`.

> **Advertencia de gobernanza (2026-08):** verificar los 4 acentos nuevos contra el código fuente real de cada app reveló violaciones de la regla de separación mínima de 30° de hue dentro del mismo grupo (ver invariante 7 más abajo):
> - Interna: `content-generator-ai` (12°) vs `fiscal` (38°) → 26°; `fiscal` (38°) vs `nexus` (45°) → 7°; `advisor-ai` (162°) vs `filestudio` (186°) → 24°
> - Premium: `impulso` (25°) vs `guesthub` (41°) → 16°; `data-lab` (155°) vs `energyscan` (155°) → 0° (coincidencia exacta, preexistente a esta auditoría)
>
> Estos colores son los reales de cada app, verificados directamente contra su código fuente — no se han inventado valores alternativos para forzar el cumplimiento de la regla de 30°. Esta tabla documenta la tensión tal cual existe hoy. Corregir esto implicaría rebrandear visualmente apps ya en producción (cambiar su acento real), una decisión que corresponde al negocio, no a este contrato.

## Invariantes globales de branding

1. **Símbolo fundacional**: Círculo + tres ondas horizontales. Todas las apps del ecosistema (excepto portfolio) usan este símbolo.
2. **Proporciones**: Todas las variantes mantienen exactamente las mismas proporciones, diámetro, separación entre ondas y forma.
3. **Fondo transparente**: Todo icono se entrega en PNG con canal alfa.
4. **Tamaño canónico**: 1024×1024 px.
5. **No se permite texto dentro del icono**.
6. **Zona de exclusión mínima**: 0.25× diámetro del emblema en todas las direcciones.
7. **Separación mínima de hue entre ondas** dentro del mismo grupo: 30°.

## Criterio de cumplimiento

Una app no cumple el contrato de branding si:
- Usa colores de acento que no coinciden con los tokens definidos en [[ANCLORA_BRANDING_COLOR_TOKENS]]
- Usa un borde de icono que no corresponde a su grupo
- Modifica las proporciones del icono fundacional
- Introduce tipografía no declarada en [[ANCLORA_BRANDING_TYPOGRAPHY]]
- No incluye el favicon package completo según [[ANCLORA_BRANDING_FAVICON_SPEC]]
- Usa una fuente reservada para otra categoría

