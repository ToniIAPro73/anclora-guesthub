<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-guesthub.png" alt="Anclora GuestHub" width="132" />

# Anclora GuestHub

### Guest management, check-in and vacation rental operations

Pre-MVP premium product for guest management and vacation rental operations: it transforms hospitality booking spreadsheets into normalized, per-reservation XML files ready for required reporting systems (SES.HOSPEDAJES).

[Español](./README.md) · **English** · [Deutsch](./README.de.md)

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Category](https://img.shields.io/badge/category-Premium-C07860)
![Languages](https://img.shields.io/badge/languages-ES%20%7C%20EN%20%7C%20DE-047857)

</div>

---

> [!IMPORTANT]
> Internal Anclora ecosystem repository. Product in **pre-MVP** stage. Do not publish operational details, credentials, or sensitive logic outside authorized channels.

## What it is

Anclora GuestHub (formerly Anclora SyncXML) manages guests, check-in and vacation rental operations: it converts hospitality booking Excel sheets into individual per-reservation XML files, with data validation and a controlled download flow. It is designed to simplify accommodation reporting compliance (SES.HOSPEDAJES) from common industry data sources.

## Category in the ecosystem

| Field | Value |
|---|---|
| Category | Premium |
| Status | Pre-MVP |
| Brand accent | `#BFA46A` |
| Typography | DM Sans |
| Canonical repository | `anclora-guesthub` |

## Key features

- Excel booking import and parsing (ExcelJS)
- Per-reservation XML generation (fast-xml-parser)
- ZIP-packaged download (JSZip)
- Persistence with Prisma
- File storage on Vercel Blob
- Email notifications (Resend)

## Technology stack

| Area | Technology |
|---|---|
| Framework | Next.js, React |
| Database | Prisma |
| Data processing | ExcelJS, fast-xml-parser, JSZip |
| Storage | Vercel Blob |
| Email | Resend |
| Testing | Testing Library, Jest DOM |

## Local setup

```bash
npm install
npm run dev
```

## Supported languages

- Español (default)
- English
- Deutsch

## Rename 2026-08

This product was renamed: **Anclora SyncXML → Anclora GuestHub** (repository `anclora-syncxml` → `anclora-guesthub`). Legacy technical identifiers (session/storage keys, Nexus contract values, SES registered application name, blob storage prefix) are intentionally retained for compatibility — see the Spanish README section "Legacy identifiers" and [`docs/ENVIRONMENT_VARIABLES.md`](./docs/ENVIRONMENT_VARIABLES.md).

## Documentation and governance

- Brand and governance contracts: [`docs/standards/`](./docs/standards/)
- Anclora Vault (source of truth): `contracts/` and `docs/governance/`

---

<div align="center">

### Anclora Group

Internal use.

</div>
