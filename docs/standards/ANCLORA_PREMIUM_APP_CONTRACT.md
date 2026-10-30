# Anclora Premium App Contract

## Objetivo
Fijar una gramática premium compartida para productos públicos o semi-públicos que deben transmitir valor, criterio y confianza sin perder claridad operativa.

Ámbito:
- `anclora-impulso`
- `anclora-synergi`
- `anclora-data-lab`
- `anclora-energyscan`
- `anclora-talent`

## Autoridad

- Registro operativo: `00-governance/registry/contracts-registry.json`
- Inventario aplicable: `00-governance/registry/ecosystem-repos.json`
- Fuente ejecutable relacionada: `anclora-design-system`

## Repos a los que aplica

- `anclora-impulso`
- `anclora-synergi`
- `anclora-data-lab`
- `anclora-energyscan`
- `anclora-talent`

## Sincronización con repos consumidores

- Contrato fuente en la bóveda: `00-governance/contracts/core/ANCLORA_PREMIUM_APP_CONTRACT.md`
- Target normal de propagación: `10-group/brand/`
- Dependencia de auditoría y propagación desde `00-governance/registry/contracts-registry.json`

## Piezas canónicas del design system

Las apps premium deben construirse sobre piezas reales de `anclora-design-system`, no sobre estilos locales de pantalla:

- `tokens` para acentos, foreground, border, glow, overlay y estados semánticos
- `themes` para `dark/light` o tema editorial único diseñado
- `foundations` para tipografía premium, spacing, elevation y materiales
- `components` para:
  - button
  - card
  - dialog
  - input/select/textarea
  - tabs
  - badge/pill
  - top bar controls
- `patterns` para:
  - landing premium
  - shell autenticado premium
  - funnels de sign-in / sign-up
  - dashboards editoriales
  - grids de cards
  - preview / cover / content blocks

Regla:
- una app premium puede componer de forma distinta, pero no debe redefinir localmente una primitive que ya exista como `component` o `pattern` canónico.

## Invariantes de grupo

### 1. Dirección visual
- La identidad visual puede ser más editorial que en el grupo interno.
- Se permiten gradientes, glass, textura, overlays y tipografía con más intención de marca.
- La interacción crítica debe seguir siendo sobria y repetible.
- El primer viewport debe explicar rápido qué es la app y cuál es la siguiente acción.

### 2. Botones premium
- Deben existir las mismas familias semánticas que en internas:
  - `primary`
  - `secondary`
  - `ghost`
  - `destructive`
- El CTA principal puede tener mayor presencia visual, pero no debe monopolizar toda la lectura.
- No más de un CTA dominante por viewport principal.
- Los secundarios deben sentirse premium, no utilitarios sin remate.
- Las familias equivalentes deben mantener semántica visual estable entre temas:
  - misma lógica de foreground por familia
  - misma lógica de contraste por familia
  - misma lectura de prioridad entre `primary`, `secondary`, `ghost` y `destructive`
- Un botón dorado, teal o de firma no puede cambiar arbitrariamente el color del texto entre `dark` y `light` si sigue perteneciendo a la misma familia semántica.
- Si una familia necesita redefinirse entre temas, el cambio debe estar documentado como variante real por tema y no como herencia accidental de tokens.
- La implementación base debe partir del `button` canónico del design system o de una variante explícita derivada del mismo.

### 3. Cards premium
- Se admite mayor profundidad visual que en el grupo interno.
- Requisitos obligatorios:
  - padding estable
  - jerarquía tipográfica clara
  - separación perceptible entre cards
  - hover medido
  - cero solapes o desplazamientos bruscos entre cards vecinas
- La card premium base debe vivir en `anclora-design-system` como pieza o pattern compartido. No se aceptan cuatro gramáticas de card premium inconexas.

### 4. Modales premium
- Se aplica `MODAL_CONTRACT.md`.
- Diferencias admitidas:
  - framing editorial
  - backdrop más trabajado
  - headline con mayor peso de marca
- No cambia:
  - cierre claro
  - footer accionable
  - control del scroll
  - coherencia de campos

### 5. Formularios y funnels
- Los formularios deben inspirar confianza antes que densidad.
- El usuario debe entender siempre:
  - qué se le pide
  - qué recibirá a cambio
  - cuál es el siguiente paso
- Los estados vacíos deben aportar contexto y valor, no sólo ausencia de datos.

### 6. Motion premium
- Motion más refinado que en el grupo interno.
- Permitido:
  - fade suave
  - rise corto
  - stagger breve
  - highlight narrativo contenido
- Prohibido:
  - bounce
  - retardos largos
  - transformaciones que dificulten lectura o click

### 7. Localización premium
- Se aplica `LOCALIZATION_CONTRACT.md`.
- El selector de idioma debe sentirse integrado en la marca.
- Las expansiones de texto no pueden degradar headings, pills, CTAs o formularios.

### 8. Tema premium
- Si la app soporta dos o más temas, cada modo debe sentirse diseñado, no derivado.
- Los temas no pueden reinterpretar por accidente la semántica de una familia de botón, pill o control interactivo.
- La regla base es:
  - misma familia semántica
  - mismo criterio de foreground
  - mismo criterio de contraste
  - mismo criterio de prioridad visual
- Si la app usa un único tema editorial, los tokens base deben dejar abierta una futura extensión sin reescribir componentes.

## Reglas particulares por aplicación

### `anclora-command-center`
- Forma parte del grupo premium.
- Debe mantener `es/en/de`.
- Debe mantener toggle visible de tema `dark/light`.
- Su gramática debe servir como dashboard premium de referencia, no como dashboard interno genérico.

### `anclora-synergi`
- Mantener identidad editorial propia.
- Mantener `es/en/de`.
- Puede operar con un único tema si el acabado es consistente y deliberado.
- Las superficies premium no deben caer en exceso de decoración ni sacrificar legibilidad.

### `anclora-data-lab`
- Mantener `es/en/de`.
- Mantener `dark/light/system`.
- Debe sentirse más analítica y precisa que Synergi, pero compartir la misma disciplina premium en botones, cards y modales.

### `anclora-energyscan`
- Mantener `es/en/de`.
- Mantener coherencia de preferencias por idioma: `es/de` con EUR + m² y `en` con GBP + sq ft.
- Su superficie pública, wizard, resultados, pricing, PDF Premium y sección de proveedores pertenecen a la familia `premium analytical / premium utility`.
- Debe presentar siempre el carácter de prediagnóstico energético orientativo.
- No puede sugerir emisión de Certificados de Eficiencia Energética oficiales ni documentación con validez administrativa.
- El acceso Premium debe distinguir resultado básico, desbloqueo de informe y estado real de pago mediante `paidAt`.

### `anclora-talent`
- Mantener `es/en` con `es` como idioma por defecto.
- Mantener `dark/light` con `dark` como tema inicial.
- El shell autenticado debe exponer toggles visibles de tema e idioma integrados en la identidad premium.
- La experiencia debe sentirse como plataforma editorial premium coherente en `landing`, `sign-in`, `sign-up`, `dashboard`, `editor`, `preview` y `cover`.
- No puede parecer un dashboard interno con decoración aplicada encima.
- Su dominio es `human_capital`, por lo que las composiciones premium deben evitar la semántica visual típica de real estate aunque reutilicen las mismas primitives y reglas base.

## Gate de aceptación

Una feature premium no está lista si:
- parece un dashboard interno con capas cosméticas
- introduce un CTA dominante sin justificar la pantalla
- usa cards con hover espectáculo o layout inestable
- el modo alternativo parece una conversión incompleta
- el selector de idioma o tema rompe el acabado de marca
- una misma familia de botón cambia el foreground o la legibilidad entre temas sin motivo contractual explícito
- resuelve sus componentes críticos fuera de `anclora-design-system` sin haber promovido antes la pieza común
