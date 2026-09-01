# Anclora Ecosystem Contract Groups

## Objetivo
Definir el marco contractual UX/UI del ecosistema Anclora y fijar una ruta única de consulta para cualquier modificación visual o creación de una nueva aplicación.

Ruta canónica:
- `docs/standards/`

## Autoridad

- Registro operativo: `contracts/governance/contracts-registry.json`
- Inventario de repos Anclora: `docs/governance/ecosystem-repos.json`
- Fuente ejecutable de UI: `anclora-design-system`

Regla de publicación:
- La bóveda debe mantener una copia maestra de estos contratos en `docs/standards/`.
- Cada aplicación debe incluir en su propio `docs/standards/` los contratos que le apliquen.
- Si un contrato se modifica a nivel ecosistema, la bóveda y las aplicaciones afectadas deben actualizarse en la misma ronda.

## Modelo de autoridad

- La bóveda gobierna:
  - clasificación del ecosistema
  - contratos
  - alcance
  - excepciones
  - criterios de cumplimiento
- `anclora-design-system` gobierna la implementación ejecutable de:
  - `taxonomy`
  - `tokens`
  - `themes`
  - `foundations`
  - `components`
  - `patterns`
  - `assets`
- Una app no debe inventar una tercera fuente de verdad local para botones, cards, modales, shell, tipografía o tokens si ya existe una pieza canónica en `anclora-design-system`.

## Capas reales del design system

Las decisiones visuales y de composición deben apoyarse en estas capas reales del repo `anclora-design-system`:

- `taxonomy`: clasificación de producto y vocabulario de variantes
- `tokens`: tokens primitivos y semánticos
- `themes`: combinaciones de tema por familia y producto
- `foundations`: color, tipografía, spacing, radius, elevation, iconografía y reglas base
- `components`: primitivas y componentes canónicos reutilizables
- `patterns`: shells, bloques, funnels, overlays y composiciones recurrentes
- `assets`: logos, favicons y recursos de marca

Regla práctica:
- si el cambio afecta implementación visual, primero se busca la pieza en `anclora-design-system`
- si el cambio afecta alcance, clasificación o excepciones, primero se consulta la bóveda

## Alcance de esta fase

Aplicaciones internas:
- `anclora-advisor-ai`
- `anclora-filestudio`
- `anclora-nexus`
- `anclora-content-generator-ai`
- `anclora-fiscal` *(añadida 2026-08, verificada contra código real)*
- `anclora-visionflow` *(añadida 2026-08, verificada contra código real)*
- `anclora-linguo-cam` *(incorporada 2026-08-02 al ecosistema gobernado — antes clasificada como "Independent Product"; decisión explícita del cliente, verificada contra código real)*

Aplicaciones premium:
- `anclora-impulso`
- `anclora-command-center`
- `anclora-synergi`
- `anclora-data-lab`
- `anclora-energyscan`
- `anclora-talent` *(estado: pausado, fuera de alcance activo desde 2026-08 — ver `docs/governance/ecosystem-repos.json`)*
- `anclora-guesthub` *(añadida 2026-08, verificada contra código real, estado `pre-mvp`)*
- `anclora-groundsync` *(añadida 2026-08-03, verificada contra código real — app interna de uso operativo pero gobernada como producto independiente, comparable a `anclora-impulso`; decisión explícita del cliente)*

Aplicaciones ultra premium:
- `anclora-private-estates`
- `anclora-private-estates-landing` *(nombre de repo confirmado 2026-08; comparte tema completo con `anclora-private-estates`)*

Aplicaciones portfolio / showcase *(sección añadida 2026-08)*:
- `anclora-portfolio`
- `anclora-azure-bay-landing-page` *(nombre de repo corregido 2026-08 — `anclora-azure-bay-landing` sin el sufijo `-page` no existe, devuelve 404 en GitHub)*
- `anclora-portfolio-showcase`
- `anclora-energyscan-showcase` *(hereda tema completo de `anclora-energyscan`, no el genérico portfolio — es el producto real en fase MVP mostrándose, no una pieza de demo)*
- `anclora-syncxml-showcase` *(mismo criterio que energyscan-showcase, producto real en fase pre-mvp)*
- `anclora-fiscal-showcase`
- `anclora-group-landing` *(identidad propia verificada 2026-08 — usa el brand book completo, navy/signal-blue/command-purple, NO el tema genérico portfolio-gold; ver `ANCLORA_BRANDING_COLOR_TOKENS.md`)*

Fuera de alcance en esta fase:
- ninguno

## Fuentes auditadas

Contratos documentados detectados:
- `contracts/components/UI_MOTION_CONTRACT.md` en `anclora-impulso`
- `contracts/components/MODAL_CONTRACT.md` en `anclora-impulso`
- `contracts/logic/LOCALIZATION_CONTRACT.md` en `anclora-impulso`
- `sdd/contracts/UI-SURFACE-INTERACTION-CONTRACT.md` en `anclora-nexus`
- `sdd/contracts/UI-PAGE-PRIMITIVES-CONTRACT.md` en `anclora-nexus`
- `sdd/contracts/UI-EXTERNAL-PORTAL-PREMIUM-CONTRACT.md` en `anclora-nexus`
- contratos de campos `text/select/boolean` en `anclora-nexus`

Contratos implícitos pero claros en código y UX:
- estructura de preferencias `locale + theme` en `anclora-advisor-ai`
- patrón `locale + theme toggles` en `anclora-data-lab`
- patrón premium editorial en `anclora-synergi`
- patrón ultra premium oro/teal en `anclora-private-estates`
- patrón de botones/cards/modales de `anclora-impulso` para producto premium de `fitness_wellness`
- patrón dark-only + switcher de idioma en la landing pública de `anclora-private-estates` (emergente, 2026-04-05)

## Contratos canónicos del ecosistema

Base transversal:
- `ANCLORA_GROUP_BRAND_IP_CONTRACT.md`
- `COOKIES_CONSENT_CONTRACT.md`
- `UI_MOTION_CONTRACT.md`
- `MODAL_CONTRACT.md`
- `LOCALIZATION_CONTRACT.md`

Por grupo:
- `ANCLORA_INTERNAL_APP_CONTRACT.md`
- `ANCLORA_PREMIUM_APP_CONTRACT.md`
- `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT.md`
- `ANCLORA_PORTFOLIO_SHOWCASE_CONTRACT.md`

Branding transversal:
- `ANCLORA_GROUP_BRAND_IP_CONTRACT.md`
- `ANCLORA_BRANDING_MASTER_CONTRACT.md`
- `ANCLORA_BRANDING_ICON_SYSTEM.md`
- `ANCLORA_BRANDING_COLOR_TOKENS.md`
- `ANCLORA_BRANDING_TYPOGRAPHY.md`
- `ANCLORA_BRANDING_FAVICON_SPEC.md`

Mapeo obligatorio hacia `anclora-design-system`:
- contratos de branding -> `assets`, `tokens`, `themes`, `foundations`
- contrato Brand/IP -> `metadata`, `legal`, `footer`, `docs`, `i18n`, `exportables`
- contratos de grupo -> `taxonomy`, `themes`, `components`, `patterns`
- motion -> `tokens`, `foundations`, `components`
- modales -> `components`, `patterns`
- localización -> `patterns`, `components`, `foundations`

Documentos de apoyo no normativos:
- `ANCLORA_INTERNAL_APPS_GAP_ANALYSIS.md`

## Repos a los que aplica

- `anclora-group`
- `anclora-advisor-ai`
- `anclora-filestudio`
- `anclora-nexus`
- `anclora-content-generator-ai`
- `anclora-fiscal`
- `anclora-visionflow`
- `anclora-impulso`
- `anclora-command-center`
- `anclora-synergi`
- `anclora-data-lab`
- `anclora-energyscan`
- `anclora-guesthub`
- `anclora-groundsync`
- `anclora-talent` *(pausado — ver nota de estado arriba)*
- `anclora-private-estates`
- `anclora-private-estates-landing`
- `anclora-portfolio`
- `anclora-azure-bay-landing-page` *(nombre corregido 2026-08, ver nota arriba)*
- `anclora-portfolio-showcase`
- `anclora-energyscan-showcase`
- `anclora-syncxml-showcase`
- `anclora-fiscal-showcase`
- `anclora-group-landing`
- `anclora-playa-viva-uniestate`

## Ramas operativas por repositorio

Rama operativa principal por defecto: `main`

Excepciones documentadas:

| Repo | Rama operativa | Motivo |
|---|---|---|
| `anclora-playa-viva-uniestate` | `development` | Landing en desarrollo activo; no operar sobre `main` |
| `anclora-impulso` | `master` | Convención histórica del repo; equivalente a `main` operativo |

> Nota 2026-08-01: `anclora-azure-bay-landing-page` deja de ser excepción — su rama operativa vuelve a ser `main` por decisión de Toni (la historia real ya operaba sobre `main`). La rama `development` fue jubilada y eliminada (local y remoto) tras verificar que era ancestro completo de `main` — no se perdió ningún commit.

> Nota 2026-08-01: `anclora-data-lab` y `anclora-synergi` dejan de ser excepción — la rama `sdd/premium-app-contracts` registrada aquí **no existe** ni local ni remotamente en ninguno de los dos repos (drift del registro, detectado en el barrido de auditoría de branding 2026-08-01). Su rama operativa es `main`, ya verificada y auditada en esa fecha. Ambos repos conservan `development`/`staging`/`production` sincronizadas con `main` como el resto del ecosistema.

> [!warning] Antes de hacer push a cualquier repo
> Verificar la rama operativa de este mapa. No asumir que todos los repos usan `main`.
> En repos con `development` como rama activa, nunca hacer push directo a `main`.

## Sincronización con repos consumidores

- Contrato fuente en la bóveda: `contracts/core/ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
- Target normal de propagación: `docs/standards/`
- La auditoría y la propagación se resuelven desde `contracts/governance/contracts-registry.json`
- Este contrato no aplica a `Independent Products` salvo mención explícita

## Orden de lectura obligatorio

Al tocar botones, cards, shells, tablas o bloques interactivos:
1. pieza equivalente en `anclora-design-system` (`components` o `patterns`)
2. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
3. contrato del grupo aplicable
4. `UI_MOTION_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

Al tocar tema, tokens o variantes visuales de botones:
1. capa equivalente en `anclora-design-system` (`tokens`, `themes`, `foundations`)
2. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
3. contrato del grupo aplicable
4. `CONTRACT_CONDITION_CATALOG.md`
5. `UI_MOTION_CONTRACT.md`

Al tocar modales:
1. primitive o pattern equivalente en `anclora-design-system`
2. `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`
3. contrato del grupo aplicable
4. `MODAL_CONTRACT.md`
5. `LOCALIZATION_CONTRACT.md`

Al crear una app nueva:
1. clasificarla como `interna`, `premium` o `ultra premium`
2. clasificar además `domain`, `product_archetype`, `system_role` y `ecosystem_clusters`
3. copiar a `docs/standards/` el set base y el contrato de grupo
4. partir de `anclora-design-system` para `tokens`, `themes`, `components` y `patterns`
5. leer la capa de branding correspondiente
6. documentar cualquier excepción local antes de implementar componentes nuevos

## Mapa de asignación por aplicación

| Aplicación | Grupo | Idiomas objetivo | Tema objetivo | Contratos mínimos |
| --- | --- | --- | --- | --- |
| `anclora-advisor-ai` | Interna | `es`, `en` | `dark/light/system` | Base + interno |
| `anclora-filestudio` | Interna | `es`, `en` | Pendiente de auditoría por superficie | Base + interno |
| `anclora-nexus` | Interna | `es`, `en`, `de`, `ru` | `dark` operativo | Base + interno |
| `anclora-content-generator-ai` | Interna | `es`, `en` | `dark/light/system` | Base + interno |
| `anclora-impulso` | Premium | `es`, `en` | `dark/light` | Base + premium |
| `anclora-command-center` | Premium | `es`, `en`, `de` | `dark/light` | Base + premium |
| `anclora-synergi` | Premium | `es`, `en`, `de` | tema editorial único | Base + premium |
| `anclora-data-lab` | Premium | `es`, `en`, `de` | `dark/light/system` | Base + premium |
| `anclora-energyscan` | Premium / Real Estate + Energy Intelligence | `es`, `en`, `de` | `dark/light/system` | Base + premium |
| `anclora-talent` | Premium | `es`, `en` | `dark/light` | Base + premium |
| `anclora-private-estates` | Ultra premium | `es`, `en`, `de`, `fr` | premium multi-theme (dark, verificado 2026-08 — accent real `#D4AF37` sobre navy `#07252F`, no la variante que se documentaba antes) | Base + ultra premium |
| `anclora-private-estates-landing` | Ultra premium (landing pública) | `es`, `en`, `de` ¹ | `dark-only` ² — comparte tema completo con `anclora-private-estates` | Base + ultra premium |
| `anclora-fiscal` | Interna | Pendiente de auditoría de locales | `dark` confirmado (navy `#070C13` + dorado `#D7A957`), `light` no verificado | Base + interno |
| `anclora-visionflow` | Interna | Pendiente de auditoría de locales | `dark/light` confirmado — ambos modos definidos en el repo real (`.dark { --avf-accent }` y `:root` claro) | Base + interno |
| `anclora-linguo-cam` | Interna | Pendiente de auditoría de locales | `dark/light` confirmado — ambos modos definidos en `index.css` real; acento lima `#59B635` asignado 2026-08-02 al incorporarla (resuelve colisión exacta con `advisor-ai`, ver `ANCLORA_BRANDING_MASTER_CONTRACT.md`) | Base + interno |
| `anclora-guesthub` | Premium | Pendiente de auditoría de locales | `dark` confirmado (navy `#070A12` + dorado apagado `#BFA46A`), `light` no verificado en esta sesión | Base + premium |
| `anclora-groundsync` | Premium | Pendiente de auditoría de locales | `dark/light` confirmado — ambos modos definidos en `src/index.css` real (`:root` dark + `:root[data-theme='light']`); accent `#afd2fa`/`#2f6fd9` | Base + premium |
| `anclora-portfolio` | Portfolio / showcase | `es`, `en` | tema editorial único o dual diseñado | Base + portfolio |
| `anclora-azure-bay-landing-page` | Portfolio / showcase | `es`, `en` | tema editorial único — nombre de repo corregido 2026-08, icono comparte lockup de Private Estates (navbar corporativo), acento se queda en portfolio genérico (pieza de demo, no producto) | Base + portfolio |
| `anclora-portfolio-showcase` | Portfolio / showcase | `es`, `en` | tema editorial único, hereda de `anclora-portfolio` | Base + portfolio |
| `anclora-energyscan-showcase` | Portfolio / showcase (excepción) | `es`, `en`, `de` | hereda tema completo de `anclora-energyscan` (verde `#00DC82`), NO el editorial genérico — es el producto real en MVP mostrándose | Base + portfolio |
| `anclora-syncxml-showcase` | Portfolio / showcase (excepción) | Pendiente de auditoría | hereda tema completo de `anclora-guesthub` (dorado `#BFA46A`), mismo criterio que energyscan-showcase | Base + portfolio |
| `anclora-fiscal-showcase` | Portfolio / showcase | Pendiente de auditoría | tema editorial único genérico | Base + portfolio |
| `anclora-group-landing` | Portfolio / showcase (excepción) | Pendiente de auditoría de locales | identidad brand-book completa propia (navy `#0A1F3D`, signal-blue `#5FA8FF`, command-purple `#6C63FF`) — NO el editorial genérico, verificado 2026-08 contra `src/styles/tokens.css` real | Base + portfolio |
| `anclora-playa-viva-uniestate` | Portfolio / showcase | `es`, `en` | tema editorial único | Base + portfolio |

Entidad transversal fuera de familias de app:
- `anclora-group` se trata como entidad matriz y portal corporativo, con branding propio definido en `ANCLORA_BRANDING_*`, no como app interna del grupo.

Contrato Brand/IP transversal:
- [[ANCLORA_GROUP_BRAND_IP_CONTRACT]] aplica a Entidad Matriz, Internal, Premium, Ultra Premium, Portfolio / Showcase y superficies Activation cuando existan.
- En productos independientes, sólo aplica si la Bóveda los reclasifica explícitamente dentro del perímetro de explotación de Anclora Group.
- La adopción se registra en [[Brand IP Adoption Matrix]].

Regla complementaria:
- `anclora-group` mantiene contratos universales, pero su branding se gobierna como caso único en la capa `ANCLORA_BRANDING_*`.

Excepciones documentadas activas:

¹ La landing pública de `anclora-private-estates` cubre `es/en/de`. El idioma `fr` está aplazado a una iteración futura. Esta excepción es válida porque el copy en francés no está validado al nivel de calidad exigido por el contrato ultra premium. La cobertura de `fr` se activa cuando el copy esté revisado editorialmente.

² La landing pública de `anclora-private-estates` opera exclusivamente en modo oscuro (`dark-only`). El toggle de tema fue eliminado deliberadamente y reemplazado por un selector de idioma `ES / EN / DE`. Esta decisión es una excepción documentada al contrato `ANCLORA_ULTRA_PREMIUM_APP_CONTRACT`, que permite multi-theme. La excepción es válida porque la landing es una superficie de captación editorial y no una aplicación operativa que el usuario usa en distintos entornos. El modo único refuerza la firma visual, simplifica el mantenimiento y reduce el riesgo de degradación visual entre modos.

## Política de excepciones

- Una excepción local no puede contradecir la semántica base de botones, cards, modales, tema o localización.
- Una excepción visual sólo es válida si responde a:
  - una necesidad de marca explícita
  - una necesidad legal o de accesibilidad
  - una necesidad operativa de dominio
- Toda excepción debe documentarse en el `docs/standards/` del repo afectado.

## Criterio de cumplimiento

Una app no cumple el contrato si:
- tiene soporte técnico de idiomas o tema pero no experiencia visible coherente
- mezcla semánticas distintas para acciones equivalentes
- introduce modales con scroll evitable
- crea nuevas superficies fuera de la gramática del grupo
- reintroduce hardcoded strings donde el contrato exige i18n
- cambia el foreground o el contraste de una familia de botón entre temas sin mantener semántica estable o sin documentar una variante real por tema

