---
title: ANCLORA_BRANDING_ICON_SYSTEM
type: standard
estado: activo
scope: branding
tags: [branding, standards, anclora, icon-system]
related:
  - "[[ANCLORA_BRANDING_MASTER_CONTRACT]]"
  - "[[ANCLORA_BRANDING_COLOR_TOKENS]]"
  - "[[ANCLORA_BRANDING_FAVICON_SPEC]]"
---

# ANCLORA_BRANDING_ICON_SYSTEM

> Referencia: [[ANCLORA_BRANDING_MASTER_CONTRACT]]

## Objetivo

Definir el color, materialidad y estructura de cada icono del ecosistema Anclora. Cualquier generación o modificación de un icono debe seguir esta especificación.

## Estructura del icono

Todos los iconos comparten la misma geometría:
- **Forma**: Círculo con tres ondas horizontales centradas
- **Proporciones**: Borde exterior ≈ 7% del radio, interior ≈ 93%
- **Textura interior**: Cuero fino / grano metálico sutil
- **Tamaño canónico**: 1024×1024 px
- **Fondo**: Transparente (PNG con canal alfa)

## Bordes por categoría

### Entidad Matriz — Plata Cromada Monocromática

| Nivel | Hex | RGB |
|-------|-----|-----|
| Peak | `#D0D4DC` | (208, 212, 220) |
| Medio | `#A8AEB8` | (168, 174, 184) |
| Sombra | `#6E7580` | (110, 117, 128) |

Ondas = mismo color que el borde. Esquema monocromático.

### Internas — Plata Cromada

| Nivel | Hex | RGB |
|-------|-----|-----|
| Peak | `#D0D4DC` | (208, 212, 220) |
| Medio | `#A8AEB8` | (168, 174, 184) |
| Sombra | `#6E7580` | (110, 117, 128) |

### Premium — Cobre Rosado

| Nivel | Hex | RGB |
|-------|-----|-----|
| Peak | `#E0A090` | (224, 160, 144) |
| Medio | `#C07860` | (192, 120, 96) |
| Sombra | `#805040` | (128, 80, 64) |

### Ultra Premium — Oro Pulido

| Nivel | Hex | RGB |
|-------|-----|-----|
| Peak | `#F0D060` | (240, 208, 96) |
| Medio | `#D4AF37` | (212, 175, 55) |
| Sombra | `#8B7322` | (139, 115, 34) |

## Mapa completo de iconos

| Categoría | App | Borde | Ondas | Interior | Hue ondas |
|-----------|-----|-------|-------|----------|-----------|
| Entidad Matriz | `anclora-group` | Plata | `#A8AEB8` plata | `#1A1E2A` navy | 220° |
| Interna | `anclora-advisor-ai` | Plata | `#1DAB89` teal | `#162944` navy azul | 162° |
| Interna | `anclora-nexus` | Plata | `#D4AF37` oro | `#192350` navy índigo | 45° |
| Interna | `anclora-content-generator-ai` | Plata | `#E06848` coral | `#1A1410` carbón cálido | 12° |
| Interna | `anclora-filestudio` *(añadido 2026-08)* | Plata | `#4FB3BF` teal claro *(sin matiz de marca propio confirmado en el repo — asignado para wayfinding)* | `#0D0F12` carbón neutro *(interior inferido del fondo real del producto, no verificado píxel a píxel en el icono ya generado)* | 186° |
| Interna | `anclora-fiscal` *(añadido 2026-08)* | Plata | `#D7A957` dorado | `#070C13` navy profundo *(inferido del fondo real del producto)* | 38° |
| Interna | `anclora-visionflow` *(añadido 2026-08)* | Plata | `#5C70D8` índigo | `#0F1520` navy índigo *(inferido del fondo real del producto)* | 230° |
| Premium | `anclora-impulso` | Cobre | `#FF6A00` naranja | `#1A1C2B` navy | 25° |
| Premium | `anclora-data-lab` | Cobre | `#2DA078` esmeralda | `#12201C` navy verde | 155° |
| Premium | `anclora-talent` *(pausado)* | Cobre | `#4A9FD8` azul cielo | `#141E28` navy azul | 205° |
| Premium | `anclora-synergi` | Cobre | `#8C5AB4` púrpura | `#1C162A` navy púrpura | 280° |
| Premium | `anclora-command-center` | Azul/violeta | `#6C63FF` violeta premium + `#5FA8FF` azul luminoso | `#1E1A2E` navy púrpura | 245° |
| Premium | `anclora-guesthub` *(añadido 2026-08)* *(renombrado a GuestHub 2026-08)* | Cobre | `#BFA46A` dorado apagado | `#070A12` navy profundo *(inferido del fondo real del producto)* | 41° |
| Ultra | `anclora-private-estates` | Oro | `#D4AF37` oro | `#1A3035` teal oscuro | 45° |
| Ultra | `anclora-private-estates-landing` *(añadido 2026-08)* | Oro | `#D4AF37` oro *(comparte icono con `anclora-private-estates`, mismo lockup confirmado)* | `#1A3035` teal oscuro | 45° |

## Regla de lectura visual

| Observación | Significado |
|-------------|-------------|
| Ondas = mismo color que borde | **Entidad Matriz** o **Private Estates** (monocromáticos) |
| Borde plata + ondas de color | App **interna** |
| Borde cobre + ondas de color | App **premium** |
| Borde oro + ondas de color | App **ultra premium** |

## Validación de separación de hue

### Internas

| Par | Separación | Estado |
|-----|------------|--------|
| Coral (12°) ↔ Oro (45°) | 33° | ✓ interiores distintos |
| Oro (45°) ↔ Teal (162°) | 117° | ✓ |
| Teal (162°) ↔ Coral (12°) | 210° | ✓ |

### Premium

| Par | Separación | Estado |
|-----|------------|--------|
| Naranja (25°) ↔ Esmeralda (155°) | 130° | ✓ |
| Esmeralda (155°) ↔ Azul cielo (205°) | 50° | ✓ |
| Azul cielo (205°) ↔ Púrpura (280°) | 75° | ✓ |
| Púrpura (280°) ↔ Rojo (355°) | 75° | ✓ |
| Rojo (355°) ↔ Naranja (25°) | 30° | ✓ interiores distintos |

## Prompts de generación AI

> **Nota 2026-08:** los 4 prompts marcados "añadido 2026-08" son una reconstrucción retroactiva siguiendo el patrón establecido por los prompts existentes — los iconos PNG de estas 4 apps ya existían y están en uso (`assets/logos/` de `anclora-design-system`), pero no hay constancia de si se generaron originalmente con un prompt idéntico a este. Si se necesita regenerar el icono de alguna de estas 4 apps, verificar primero visualmente que el resultado coincide con el PNG ya en producción antes de sustituirlo.

### Template base
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
[MATERIAL] metallic ([BORDER_HEX]) with beveled edges, inner background 
[INTERIOR_DESC] ([INTERIOR_HEX]) with subtle leather grain texture, waves 
brushed [WAVE_DESC] metal ([WAVE_HEX]) with soft highlights, black background, 
3D render, no text, same proportions and wave spacing as reference
```

### Entidad Matriz
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
chrome silver metallic (#A8AEB8) with beveled edges, inner background dark 
navy (#1A1E2A) with subtle leather grain texture, waves brushed silver metal 
matching the border ring color, monochromatic silver scheme, black background, 
3D render, no text
```

### Advisor AI
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
chrome silver metallic (#A8AEB8) with beveled edges, inner background dark 
navy blue (#162944) with subtle leather grain texture, waves brushed teal 
green metal (#1DAB89) with soft highlights, black background, 3D render, no text
```

### Nexus
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
chrome silver metallic (#A8AEB8) with beveled edges, inner background deep 
indigo navy (#192350) with subtle leather grain texture, waves brushed gold 
metal (#D4AF37) with soft highlights, black background, 3D render, no text
```

### Content Generator AI
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
chrome silver metallic (#A8AEB8) with beveled edges, inner background warm 
dark charcoal (#1A1410) with subtle leather grain texture, waves brushed 
coral orange metal (#E06848) with soft highlights, black background, 3D render, no text
```

### Impulso
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
brushed rose copper metallic (#C07860) with beveled edges, inner background 
dark navy (#1A1C2B) with subtle leather grain texture, waves bright orange 
metal (#FF6A00) with soft highlights, black background, 3D render, no text
```

### Data Lab
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
brushed rose copper metallic (#C07860) with beveled edges, inner background 
dark navy green (#12201C) with subtle leather grain texture, waves emerald 
green metal (#2DA078) with soft highlights, black background, 3D render, no text
```

### Talent
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
brushed rose copper metallic (#C07860) with beveled edges, inner background 
dark navy blue (#141E28) with subtle leather grain texture, waves sky blue 
metal (#4A9FD8) with soft highlights, black background, 3D render, no text
```

### Synergi
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
brushed rose copper metallic (#C07860) with beveled edges, inner background 
dark navy purple (#1C162A) with subtle leather grain texture, waves purple 
metal (#8C5AB4) with soft highlights, black background, 3D render, no text
```

### Command Center
```
Circular emblem, three horizontal smooth wave lines, outer ring polished
blue-violet metallic gradient (#5FA8FF to #6C63FF to #8A7CFF) with beveled edges, inner background
dark purple navy (#1E1A2E) with subtle leather grain texture, waves
blue-violet metal gradient (#5FA8FF to #6C63FF to #8A7CFF) with soft highlights, black background, 3D render, no text
```

### Private Estates
```
Circular emblem, three horizontal smooth wave lines, outer ring polished gold 
metallic (#D4AF37) with beveled edges, inner background dark teal (#1A3035) 
with subtle leather grain texture, waves brushed gold metal (#D4AF37) with 
soft highlights, black background, 3D render, no text
```

### FileStudio *(añadido 2026-08)*
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
chrome silver metallic (#A8AEB8) with beveled edges, inner background neutral 
dark charcoal (#0D0F12) with subtle leather grain texture, waves brushed light 
teal metal (#4FB3BF) with soft highlights, black background, 3D render, no text
```

### Fiscal *(añadido 2026-08)*
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
chrome silver metallic (#A8AEB8) with beveled edges, inner background deep 
navy (#070C13) with subtle leather grain texture, waves brushed gold metal 
(#D7A957) with soft highlights, black background, 3D render, no text
```

### VisionFlow *(añadido 2026-08)*
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
chrome silver metallic (#A8AEB8) with beveled edges, inner background indigo 
navy (#0F1520) with subtle leather grain texture, waves brushed indigo blue 
metal (#5C70D8) with soft highlights, black background, 3D render, no text
```

### GuestHub *(añadido 2026-08)*
```
Circular emblem, three horizontal smooth wave lines, outer ring polished 
brushed rose copper metallic (#C07860) with beveled edges, inner background 
deep navy (#070A12) with subtle leather grain texture, waves muted gold metal 
(#BFA46A) with soft highlights, black background, 3D render, no text
```

## Proceso de alta de nueva app

1. Asignar categoría (`Entidad Matriz`, `interna`, `premium` o `ultra premium`) según [[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]]
2. Elegir color de ondas con hue separado mínimo 30° de las apps del mismo grupo
3. Elegir color de interior (navy con tinte del hue de ondas, luminosidad 4-8%)
4. Generar icono con el prompt template
5. Generar favicon package según [[ANCLORA_BRANDING_FAVICON_SPEC]]
6. Definir tokens CSS según [[ANCLORA_BRANDING_COLOR_TOKENS]]
7. Registrar en la tabla de este documento
