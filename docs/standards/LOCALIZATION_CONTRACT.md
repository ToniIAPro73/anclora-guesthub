# Localization Contract

## Objetivo
Garantizar que cada aplicación del ecosistema respete su cobertura real de idiomas y que ninguna feature nueva introduzca mezcla de idioma, deuda de traducción o layouts rotos por expansión de copy.

## Fuente ejecutable

La localización visible debe apoyarse en piezas reales de `anclora-design-system` cuando existan:
- `components` para selector o toggle de idioma
- `patterns` para preferencias visibles de `locale + theme`
- `foundations` para spacing, wrap y legibilidad en labels, CTAs, tabs y headings

Regla:
- el contrato fija cobertura y cumplimiento; el design system fija cómo se ve y se comporta la capa de selección e i18n visible.

## Autoridad

- Registro operativo: `00-governance/registry/contracts-registry.json`
- Inventario aplicable: `00-governance/registry/ecosystem-repos.json`
- Fuente ejecutable relacionada: `anclora-design-system`

## Regla base
- El contrato de localización se adapta al número de idiomas objetivo de cada app, no a la cantidad de locales que pueda haber en helpers internos.

Cobertura objetivo por aplicación:
- `anclora-advisor-ai`: `es`, `en`
- `anclora-nexus`: `es`, `en`, `de`, `ru`
- `anclora-content-generator-ai`: `es`, `en`
- `anclora-impulso`: `es`, `en`
- `anclora-command-center`: `es`, `en`, `de`
- `anclora-synergi`: `es`, `en`, `de`
- `anclora-data-lab`: `es`, `en`, `de`
- `anclora-energyscan`: `es`, `en`, `de` con preferencias asociadas `es/de -> EUR + m²` y `en -> GBP + sq ft`
- `anclora-talent`: `es`, `en`
- `anclora-private-estates`: `es`, `en`, `de`, `fr`
- landing pública de `anclora-private-estates`: `es`, `en`, `de` (excepción: `fr` aplazado; ver nota en `00-governance/contracts/core/ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md`)

## Repos a los que aplica

- `anclora-advisor-ai`
- `anclora-nexus`
- `anclora-content-generator-ai`
- `anclora-impulso`
- `anclora-command-center`
- `anclora-synergi`
- `anclora-data-lab`
- `anclora-energyscan`
- `anclora-talent`
- `anclora-private-estates`
- `anclora-portfolio`
- `anclora-azure-bay-landing`

Nota:
- `anclora-group` mantiene la autoridad matriz de marca y gobernanza, pero no es target normal de propagación de este contrato transversal.

## Sincronización con repos consumidores

- Contrato fuente en la bóveda: `00-governance/contracts/logic/LOCALIZATION_CONTRACT.md`
- Target normal de propagación: `10-group/brand/`
- Dependencia de auditoría y propagación desde `00-governance/registry/contracts-registry.json`

## Directrices Editoriales y de Copy (Unified)

### Principios
- La localización no es traducción literal.
- Cada idioma debe sonar natural en su propio contexto.
- La intención original debe preservarse.
- No se deben añadir claims no presentes en el texto original.
- La coherencia de marca prevalece sobre la simetría palabra por palabra.
- El copy debe adaptarse al tipo de app: Ultra Premium, Premium, Internal, Portfolio.

### Idiomas oficiales de referencia
- ES, CA, EN, DE, FR, IT, PT, SV, DA, NL, NO (Cada app usa su subconjunto definido en Cobertura Objetivo).

### Reglas de localización editorial
- Preservar nombres propios, lugares, marcas y datos factuales.
- Adaptar cortesía, registro y fórmula comercial al idioma destino.
- Evitar literalismos y frases con apariencia de IA.
- Respetar límites visuales de la superficie UI.
- Mantener placeholders, interpolaciones y formato funcional.

### Política de claims
- No añadir promesas comerciales, garantías o datos no proporcionados originalmente.

## Reglas obligatorias de implementación
- No mezclar idiomas en una misma vista salvo contenido de terceros o nombres propios.
- Todo texto visible de producto debe nacer en la capa de traducción aprobada por el repo.
- No cerrar una feature con copy sólo en el idioma por defecto.
- No hardcodear labels, placeholders, estados, validaciones ni títulos de modal.
- Las pantallas deben soportar expansión de copy sin desbordes ni truncados peligrosos.

## Gate de aceptación

Una feature no está lista si:
- deja textos nuevos fuera de i18n
- la vista mezcla idiomas
- el selector de idioma existe pero no gobierna toda la superficie afectada
- una traducción rompe layout y se ignora
- el copy suena artificial o puramente literal (falla QA lingüístico)
