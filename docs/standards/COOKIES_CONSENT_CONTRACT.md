---
title: COOKIES_CONSENT_CONTRACT
type: standard
estado: activo
scope: cookies-consent
tags: [cookies, consent, legal, gdpr, privacy, anclora, contract]
related:
  - "[[ANCLORA_GROUP_BRAND_IP_CONTRACT]]"
  - "[[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]]"
  - "[[CONTRACT_COMPLIANCE_MATRIX]]"
  - "[[LOCALIZATION_CONTRACT]]"
---

# COOKIES_CONSENT_CONTRACT

## Propósito

Establecer el estándar común de cookies, consentimiento y preferencias de usuario para todas las aplicaciones públicas del ecosistema Anclora Group.

Este contrato busca:

- Garantizar que el usuario puede tomar una decisión informada antes de que se activen cookies no técnicas.
- Evitar patrones oscuros (dark patterns) que dificulten rechazar cookies.
- Evitar solapes visuales con el footer u otros elementos de la página.
- Garantizar que las preferencias de cookies son accesibles y reabribles en cualquier momento.
- Servir como referencia para agentes Claude, Codex, Gemini, Perplexity u otros que implementen o revisen la gestión de cookies en repos del ecosistema.

> [!warning] Limitación legal
> Este contrato establece criterios operativos y de diseño. No sustituye asesoramiento legal especializado ni garantiza cumplimiento normativo pleno. La revisión legal de textos, política de cookies y base jurídica de cada tratamiento es responsabilidad del propietario del producto.

---

## Alcance

Este contrato aplica a todas las apps públicas del ecosistema Anclora Group, incluyendo:

- `anclora-groundsync`
- `anclora-linguo-cam`
- `anclora-private-estates-landing`
- `anclora-energyscan`
- `anclora-nexus` / `anclora-nexus/frontend`
- `anclora-group`
- `anclora-advisor-ai`
- `anclora-portfolio`
- `anclora-impulso`
- `anclora-data-lab`
- `anclora-synergi`
- `anclora-azure-bay-landing`
- `anclora-playa-viva-uniestate`
- Cualquier nueva app pública o semi-pública que se incorpore al ecosistema.

Apps internas o sin superficie pública pueden aplicar un subconjunto reducido de este contrato, siempre que documenten la excepción.

---

## Principios obligatorios

### 1. Consentimiento previo

Las cookies no técnicas (analítica, marketing, personalización) no pueden activarse antes de que el usuario haya dado su consentimiento explícito.

### 2. Simetría de acciones

Los botones "Aceptar todo" y "Rechazar opcionales" (o equivalentes) deben tener la misma prominencia visual:

- misma altura de botón o similar;
- mismo nivel de contraste;
- mismo tamaño de texto;
- ninguno puede estar oculto, en gris sin contraste o reducido a un enlace mientras el otro es botón primario.

### 3. Configuración granular

Cuando existan categorías de cookies opcionales, debe ofrecerse al menos un tercer camino: "Configurar" o "Gestionar preferencias". El usuario debe poder activar o desactivar categorías de forma independiente.

### 4. Cookies técnicas siempre activas

Las cookies estrictamente necesarias (sesión, seguridad, idioma cuando está vinculado a sesión) permanecen activas sin requerir consentimiento. El UI debe indicarlo claramente y no ofrecer toggle para desactivarlas.

### 5. Sin scripts opcionales antes del consentimiento

Ningún script de analítica, pixel de marketing, tag manager o herramienta de tracking debe cargarse o ejecutarse antes de que el usuario haya aceptado la categoría correspondiente.

### 6. Reapertura desde footer

El footer de cada app debe incluir un enlace o botón que permita reabrir el modal o panel de preferencias de cookies en cualquier momento. Ver sección [Footer y reapertura de preferencias].

### 7. Sin botón flotante que tape contenido

Si se usa un botón flotante para reabrir preferencias, no puede solapar el footer, el contenido principal ni CTAs críticos. La alternativa recomendada es el enlace en footer, que no genera solape.

### 8. Textos claros y completos

El banner o modal debe incluir texto suficiente para que el usuario entienda qué se está aceptando. Un texto de una línea sin enlace a la política de cookies no cumple el contrato.

### 9. Responsive y legible

Botones y textos deben ser legibles y accesibles en mobile. El banner o modal no puede quedar partido o invisible en viewports pequeños.

---

## Categorías de cookies

Las apps del ecosistema pueden usar alguna o todas estas categorías. Solo deben mostrarse las categorías que realmente se usan.

### Necesarias / Técnicas

- Siempre activas.
- Incluyen: gestión de sesión, seguridad CSRF, preferencias de idioma si es cookie de sesión, funcionalidad core de la app.
- No requieren consentimiento.

### Preferencias / Personalización

- Opcionales.
- Incluyen: tema seleccionado si se almacena en cookie, idioma persistido en cookie entre sesiones, ajustes de visualización.
- Requieren consentimiento o activación explícita.

### Analítica

- Opcionales.
- Incluyen: herramientas de medición de visitas, comportamiento de usuario, eventos de uso (Google Analytics, Plausible, Fathom, Posthog u otras).
- Requieren consentimiento previo.
- Si la app no usa ninguna herramienta de analítica, no debe mostrar esta categoría como activa.

### Marketing

- Opcionales.
- Incluyen: píxeles de conversión, remarketing, campañas publicitarias.
- Requieren consentimiento previo.
- Si la app no usa marketing, **no mostrar esta categoría**. No introducir categorías ficticias.

> [!important]
> Si una app no usa analítica ni marketing en producción, debe eliminar estas categorías del modal o banner. Mostrar categorías vacías o ficticias es un antipatrón que puede confundir al usuario y comprometer la veracidad del consentimiento.

---

## Estándar visual

### Banner inicial

- Debe aparecer en la primera carga si no hay preferencias guardadas.
- Posición recomendada: barra inferior fija o modal centrado. Evitar posiciones que oculten el contenido principal completo.
- Debe contener: texto breve, enlace o referencia a política de cookies, y al menos dos acciones (aceptar / rechazar o configurar).
- No puede bloquear toda la interacción de la página sin ofrecer la opción de rechazar o cerrar.

### Botones

- `min-height: 40px` recomendado para usabilidad en mobile.
- Agrupados con `display: flex; gap: 8px; flex-wrap: wrap` para evitar truncados.
- Focus visible y accesible por teclado.
- No usar solo color para diferenciar acciones; acompañar con label explícito.

### Modal de preferencias

- Debe mostrar las categorías disponibles con toggle o checkbox por categoría.
- Las cookies necesarias deben mostrarse como desactivadas para cambio (visualmente bloqueadas o sin toggle interactivo) con nota explicativa.
- Debe tener botón de cierre claro.
- Debe respetar `MODAL_CONTRACT.md`: sin scroll evitable, acciones en footer del modal, cierre superior derecho.

### Footer en flujo normal

- El footer debe estar en flujo de documento normal (`position: static` o `relative` por defecto).
- No usar `position: absolute` en páginas legales largas, lo que produce solape o footer que sube a mitad de página.
- El footer no debe solaparse con el banner de cookies ni con ningún botón flotante.

---

## Footer y reapertura de preferencias

### Requisitos

- El footer de cada app debe incluir un elemento interactivo (enlace o botón) con label "Cookies" o "Gestión de cookies" o equivalente en el idioma activo.
- Al activarlo, debe abrir el modal o panel de preferencias de cookies.
- La acción debe funcionar aunque el usuario ya haya dado consentimiento previamente.

### Implementación correcta

```html
<!-- Correcto: botón semántico -->
<button type="button" onclick="openCookiePreferences()">
  Cookies
</button>
```

### Implementación incorrecta

```html
<!-- Incorrecto: enlace falso -->
<a href="#">Cookies</a>

<!-- Incorrecto: enlace con javascript inline -->
<a href="javascript:void(0)" onclick="openCookiePreferences()">Cookies</a>
```

Usar `<button type="button">` garantiza comportamiento semántico correcto, evita conflictos con navegación y es accesible por teclado sin configuración adicional.

---

## SPA / Vercel

Las aplicaciones SPA (Vite, React, Next.js con rutas client-side) desplegadas en Vercel deben configurar fallback de rutas para que las páginas legales (`/terms`, `/privacy`, `/legal`, `/cookies`) sean accesibles directamente por URL.

### App SPA sin carpeta `api/`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### App SPA con carpeta `api/`

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Sin este fallback, un usuario que acceda directamente a `/privacy` recibirá un 404 de Vercel en lugar de la página de la app.

---

## i18n

Si una app tiene soporte multilingüe (ES/EN/DE u otros), todos los textos de cookies deben respetar el idioma activo del usuario:

- Banner, modal de preferencias, labels de categorías, textos de footer.
- No mezclar idiomas en la misma superficie.
- Si falta traducción para un idioma, usar el idioma base documentado (normalmente ES) con nota interna, y priorizar completar la traducción antes del lanzamiento en ese idioma.

Ver [[LOCALIZATION_CONTRACT]] para reglas completas de localización.

---

## Scripts de terceros

### Reglas

- No inicializar GA, GTM, Meta Pixel, Hotjar, Intercom, Posthog ni ninguna herramienta de tracking o analítica antes de verificar el consentimiento del usuario para la categoría correspondiente.
- Centralizar la inicialización de scripts opcionales en un único punto de la app, ejecutado solo tras consentimiento confirmado.
- Permitir revocación: si el usuario cambia sus preferencias y retira el consentimiento, los scripts opcionales deben dejar de ejecutarse en la siguiente sesión o, cuando sea técnicamente posible, de forma inmediata.

### Patrón recomendado (pseudo-código)

```ts
// Solo ejecutar tras leer las preferencias del usuario
const consent = getCookieConsent();

if (consent.analytics) {
  initAnalytics();
}

if (consent.marketing) {
  initMarketingPixel();
}
```

---

## Criterios de aceptación para agentes

Antes de dar un repo por conforme con este contrato, verificar:

- [ ] `/terms` carga correctamente (sin 404)
- [ ] `/privacy` carga correctamente (sin 404)
- [ ] `/legal` carga correctamente (sin 404)
- [ ] `/cookies` carga si existe como ruta independiente (sin 404)
- [ ] El footer no solapa ningún elemento de la página
- [ ] El footer incluye enlace o botón funcional para reabrir preferencias de cookies
- [ ] "Aceptar" y "Rechazar" tienen prominencia equivalente en el banner
- [ ] No hay "botón flotante" obligatorio que tape el footer o el contenido
- [ ] No hay scripts de analítica o marketing que se carguen antes del consentimiento
- [ ] El banner y el modal de preferencias son responsives y legibles en mobile
- [ ] El build del repo termina sin errores relacionados con el módulo de cookies
- [ ] Si la app es multilingüe, los textos de cookies están disponibles en todos los idiomas soportados

---

## Antipatrones prohibidos

Los siguientes patrones no están permitidos en ningún repo del ecosistema Anclora Group:

| Antipatrón | Motivo |
|---|---|
| "Aceptar todo" como botón primario destacado y "Rechazar" oculto o como enlace de texto | Dark pattern — dificulta rechazo |
| Botón flotante de cookies que solapa footer, CTAs o contenido principal | Genera confusión y accesibilidad deficiente |
| `position: absolute` en footer de páginas legales largas | El footer sube a mitad del contenido |
| Mostrar categorías de marketing o analítica cuando no existen en producción | Falta de veracidad del consentimiento |
| Cargar Google Analytics, Pixel u otros por defecto sin consentimiento | Incumplimiento de principio de consentimiento previo |
| Banner de cookies con texto de una línea sin enlace a política | Consentimiento sin información suficiente |
| Textos de cookies hardcodeados en español en apps multilingües | Rompe i18n — ver [[LOCALIZATION_CONTRACT]] |
| `<a href="#">` o `<a href="javascript:void(0)">` para abrir el modal de cookies | Semántica incorrecta, problemas de accesibilidad |
| Cookies técnicas con toggle desactivable por el usuario | Las cookies técnicas no requieren consentimiento y no deben poder desactivarse |
| Forzar recarga de página al guardar preferencias sin advertencia | Mala UX; solo aceptable si es técnicamente inevitable |

---

## Plantilla mínima de copy en español

Los textos siguientes son orientativos y deben adaptarse al dominio de cada app. No son legalmente vinculantes por sí mismos.

### Banner breve

```txt
Usamos cookies para garantizar el funcionamiento básico del sitio y, con tu permiso,
para mejorar tu experiencia. Puedes aceptar todas, rechazar las opcionales o configurar
tus preferencias.
```

### Botón: Aceptar todas

```txt
Aceptar todas
```

### Botón: Rechazar opcionales

```txt
Rechazar opcionales
```

### Botón: Configurar

```txt
Configurar
```

### Descripción: Cookies necesarias

```txt
Estas cookies son imprescindibles para el funcionamiento del sitio. Incluyen gestión
de sesión, seguridad y funcionalidades básicas. No pueden desactivarse.
```

### Descripción: Preferencias / Personalización

```txt
Estas cookies recuerdan tus preferencias de idioma y visualización entre sesiones.
Desactivarlas puede hacer que debas configurar tus preferencias cada vez que visites el sitio.
```

### Descripción: Analítica

```txt
Estas cookies nos ayudan a entender cómo se usa el sitio y a mejorar la experiencia.
Los datos son agregados y anónimos. Solo se activan con tu consentimiento.
```

### Texto de footer

```txt
Cookies
```

o, si se prefiere más descriptivo:

```txt
Gestión de cookies
```

---

## Evidencia y validación

Antes de marcar un repo como conforme, se recomienda:

### Desktop
- Captura del banner inicial en la primera carga.
- Captura del modal de preferencias abierto.
- Captura del footer con el enlace/botón de cookies visible.
- Navegación directa a `/terms`, `/privacy`, `/legal` para confirmar que cargan.

### Mobile
- Captura del banner en viewport de 375px o equivalente.
- Verificar que los botones son pulsables y legibles.
- Verificar que el footer no solapa el banner.

### Build y lint
- `npm run lint` (o equivalente) sin errores relacionados con el módulo de cookies.
- `npm run build` o `npm run typecheck` sin errores nuevos introducidos por el módulo.

---

## Sincronización con repos consumidores

- Contrato fuente en la bóveda: `00-governance/contracts/logic/COOKIES_CONSENT_CONTRACT.md`
- Target normal de propagación: `10-group/brand/` en cada repo consumidor
- La adopción se registra en `00-governance/registry/CONTRACT_COMPLIANCE_MATRIX.md`

---

## Relación con otros contratos

- [[ANCLORA_GROUP_BRAND_IP_CONTRACT]] — define footer canónico, copyright y declaración de marca derivada. El botón/enlace de cookies vive en ese mismo footer.
- [[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]] — clasifica las apps del ecosistema, sus familias y ramas operativas. Define qué contratos aplican a cada familia.
- [[MODAL_CONTRACT]] — aplica al modal de preferencias de cookies: cierre claro, acciones en footer del modal, sin scroll evitable.
- [[LOCALIZATION_CONTRACT]] — aplica a los textos de cookies en apps multilingües.
- [[CONTRACT_COMPLIANCE_MATRIX]] — donde se registra el estado de cumplimiento por app.
