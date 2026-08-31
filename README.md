<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-guesthub.png" alt="Anclora GuestHub" width="132" />

# Anclora GuestHub

### Gestión de huéspedes, check-in y operación de alquiler vacacional

Producto premium en fase pre-MVP para la gestión de huéspedes y el alquiler vacacional: transforma hojas de cálculo de reservas de alojamiento en ficheros XML normalizados, por reserva, listos para los sistemas de reporte requeridos (SES.HOSPEDAJES).

**Español** · [English](./README.en.md) · [Deutsch](./README.de.md)

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Categoría](https://img.shields.io/badge/categoría-Premium-C07860)
![Idiomas](https://img.shields.io/badge/idiomas-ES%20%7C%20EN%20%7C%20DE-047857)

</div>

---

> [!IMPORTANT]
> Repositorio interno del ecosistema Anclora. Producto en fase **pre-MVP**. No publicar detalles operativos, credenciales ni lógica sensible fuera de canales autorizados.

## Qué es

Anclora GuestHub (anteriormente Anclora SyncXML) gestiona huéspedes, check-in y la operación de alquiler vacacional: convierte hojas Excel de reservas de hospedaje en ficheros XML individuales por reserva, con validación de datos y flujo de descarga controlado. Está pensado para simplificar el cumplimiento de reporte de alojamiento (SES.HOSPEDAJES) a partir de fuentes de datos habituales del sector.

## Categoría en el ecosistema

| Campo | Valor |
|---|---|
| Categoría | Premium |
| Estado | Pre-MVP |
| Acento de marca | `#BFA46A` |
| Tipografía | DM Sans |
| Repositorio canónico | `anclora-guesthub` |

## Funcionalidades principales

- Importación y parseo de Excel de reservas (ExcelJS)
- Generación de XML por reserva (fast-xml-parser)
- Descarga empaquetada en ZIP (JSZip)
- Persistencia con Prisma
- Almacenamiento de ficheros en Vercel Blob
- Notificaciones por email (Resend)

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Framework | Next.js, React |
| Base de datos | Prisma |
| Procesado de datos | ExcelJS, fast-xml-parser, JSZip |
| Almacenamiento | Vercel Blob |
| Email | Resend |
| Testing | Testing Library, Jest DOM |

## Arranque local

```bash
npm install
npm run dev
```

## Idiomas soportados

- Español (predeterminado)
- English
- Deutsch

## Rename 2026-08

Este producto se ha renombrado: **Anclora SyncXML → Anclora GuestHub**. El repositorio pasó de `anclora-syncxml` a `anclora-guesthub`. Los identificadores técnicos legacy (claves de sesión/almacenamiento, contrato con Nexus, nombre de aplicación SES, prefijos de blob storage) se conservan por compatibilidad; ver la sección siguiente y [`docs/ENVIRONMENT_VARIABLES.md`](./docs/ENVIRONMENT_VARIABLES.md).

### Legacy identifiers (conservados intencionadamente)

- Cookies/localStorage/sessionStorage: `anclora-syncxml-session`, `anclora-syncxml-theme`, `anclora-syncxml-language`, `anclora-syncxml-landing-locale`, `anclora-syncxml-cookie-consent` (RGPD), `syncxml-session`; eventos `syncxml:new` / `syncxml:auth-changed`.
- Variables de entorno: los nombres canónicos son `GUESTHUB_*` / `NEXUS_GUESTHUB_*`; el código lee como fallback los nombres legacy `SYNCXML_*` / `NEXUS_SYNCXML_*` (crítico para `*_ENCRYPTION_KEY`).
- Contrato Nexus: payload `source: "syncxml_landing"`, `target_product: "syncxml"`, cabecera `X-SyncXML-Signature`.
- Códigos de error internos de API `SYNCXML_*` (contrato interno, cubierto por tests).
- SES.HOSPEDAJES: `applicationName` por defecto `"Anclora SyncXML"` (nombre de aplicación registrado ante SES — no renombrar).
- Blob storage: prefijo `syncxml/` (renombrarlo dejaría huérfanos los objetos persistidos).
- Símbolo interno `SyncXmlWorkflow` y claves `globalThis.syncXml*` (solo en memoria).
- Bases de datos `anclora_syncxml_dev` y dominios `anclora-syncxml.vercel.app` / `syncxml.anclora.com`: endpoints legacy pendientes de decisión del propietario.
- Clave de agente Memanto `anclora-syncxml` (continuidad de memoria operativa).

## Documentación y gobernanza

- Contratos de marca y gobernanza: [`docs/standards/`](./docs/standards/)
- Bóveda Anclora (fuente de verdad): `contracts/` y `docs/governance/`

---

<div align="center">

### Anclora Group

Uso interno.

</div>
