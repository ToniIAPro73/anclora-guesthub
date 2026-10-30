# Modal Contract

## Objetivo
Garantizar un patrón único de modales en todo el ecosistema Anclora: jerarquía clara, acciones visibles y cero scroll evitable.

## Fuente ejecutable

La implementación base de overlays debe salir de `anclora-design-system`:
- `components` para `dialog`, `sheet`, `drawer` o primitive equivalente
- `patterns` para formularios densos, selectores visuales, galerías o flows multi-step
- `tokens` y `foundations` para spacing, radii, elevation, backdrop y focus handling

Regla:
- un modal de producto no debe nacer como composición local si el caso encaja en una primitive o pattern ya existente.

## Autoridad

- Registro operativo: `00-governance/registry/contracts-registry.json`
- Inventario aplicable: `00-governance/registry/ecosystem-repos.json`
- Fuente ejecutable relacionada: `anclora-design-system`

## Reglas obligatorias
- El modal se dimensiona según contenido y viewport real, no desde un ancho fijo heredado por defecto.
- La primera estrategia es reorganizar layout y ampliar superficie útil, no introducir scroll.
- El modal puede ocupar gran parte del viewport si eso mejora edición o lectura.
- El cierre debe ser visible arriba a la derecha.
- Las acciones finales deben ser visibles y previsibles en la parte inferior.
- El fondo del modal debe separar con claridad la superficie modal del fondo.

## Regla de scroll
- El scroll de modal completo es el último recurso.
- Antes de aceptarlo hay que:
  - ampliar tamaño
  - redistribuir columnas
  - compactar spacing sobrante
  - agrupar campos breves
  - segmentar contenido en tabs, steps o bloques
- Si un bloque concreto es el que crece demasiado, el scroll debe vivir en ese bloque antes que en todo el modal.
- Que el usuario pueda alcanzar el contenido o el CTA haciendo scroll no demuestra conformidad cuando una ampliación razonable o una composición más ancha/por columnas puede evitarlo.
- En escritorio, el CTA alcanzable tras scroll sigue incumpliendo el gate si el contenido denso puede redistribuirse razonablemente en el espacio disponible.

## Layout recomendado
- Header alineado a la izquierda con espacio para cierre superior derecho.
- Body en `grid` o layout explícito, nunca como columna larga por inercia.
- Footer con secundaria y primaria claramente diferenciadas.
- En desktop: secundaria a la izquierda o neutralizada; primaria a la derecha.

## Repos a los que aplica

`MODAL_CONTRACT` aplica a toda aplicación o superficie UI gobernada por AOS que consuma el Design System, salvo una excepción explícita y justificada registrada en la autoridad canónica.

El alcance se deriva del inventario vigente: repositorios Anclora actuales con `contracts_role=consumer` y `design_system_role=consumer` son consumidores UI sujetos al contrato. Los estados `paused` y `superseded` quedan fuera mientras se mantengan. `applies_to_repos` en el registry es la proyección sincronizada de este criterio, no una fuente de alcance independiente.

`anclora-group` conserva autoridad de matriz y solo queda sujeto a este contrato como consumidor cuando su inventario lo clasifique como tal.

## Sincronización con repos consumidores

- Contrato fuente en la bóveda: `00-governance/contracts/components/MODAL_CONTRACT.md`
- Target normal de propagación: `10-group/brand/`
- Dependencia de auditoría y propagación desde `00-governance/registry/contracts-registry.json`

## Modales densos
- Formularios complejos: usar modal ancho o casi fullscreen.
- Bibliotecas de resultados: limitar ventana visible y añadir paginación o navegación.
- Selectores visuales: evitar hover que invada el espacio de cards contiguas.
- No introducir scroll horizontal salvo casos técnicos extremos.
- Si la interacción supera el contrato cómodo del modal, debe escalar a `sheet`, `drawer` o página dedicada antes de forzar una implementación local frágil.

## Adaptación por grupo

Aplicaciones internas:
- priorizar velocidad de lectura y edición
- framing sobrio
- foco en densidad útil

Aplicaciones premium:
- se permite un tratamiento más editorial del backdrop y del header
- no se sacrifica claridad operativa

Aplicaciones ultra premium:
- se permite un framing más ceremonial
- si la interacción supera el límite cómodo de un modal, debe escalar a sheet o página dedicada

## Gate de aceptación

Un modal no está listo si:
- obliga a scroll vertical por mala composición
- esconde acciones críticas
- no deja claro cómo cerrarlo
- comprime cards, tablas o formularios hasta volverlos frágiles

## Validación visual obligatoria

- Esta validación aplica a todas las aplicaciones del ecosistema Anclora, sin excepción:
  - internas
  - premium
  - ultra premium
  - portfolio/showcase
- Antes de subir cambios que afecten a modales, hay que validarlos visualmente en entorno real al menos en:
  - escritorio
  - móvil
- La validación debe hacerse sobre la interfaz renderizada, no sólo revisando código o snapshots estructurales.
- La validación mínima debe confirmar:
  - que todo el contenido crítico entra correctamente
  - que header, cierre superior y footer de acciones son visibles
  - que no hay clipping de bordes, sombras, foco o hover
  - que no aparece scroll vertical u horizontal evitable
  - que paginación, tabs y controles secundarios no se superponen con el contenido
  - que el modal degrada correctamente entre desktop y mobile
- Si un modal sólo funciona en un viewport, no cumple el contrato.
- Si para resolver el problema hay que cambiar tamaño, densidad, orden de bloques o navegación interna, eso debe hacerse antes de dar el trabajo por válido.
- Si la validación visual no puede completarse o el resultado sigue rompiéndose en alguno de los dos viewports obligatorios, el cambio no debe darse por cerrado ni subirse sin avisarlo explícitamente.
