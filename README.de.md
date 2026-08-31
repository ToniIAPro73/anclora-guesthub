<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-guesthub.png" alt="Anclora GuestHub" width="132" />

# Anclora GuestHub

### Gaestemanagement, Check-in und Betrieb von Ferienunterkuenften

Premium-Produkt in der Pre-MVP-Phase fuer Gaestemanagement und Ferienvermietung: es wandelt Excel-Tabellen mit Unterkunftsbuchungen in normalisierte XML-Dateien pro Reservierung um, bereit fuer die erforderlichen Meldesysteme (SES.HOSPEDAJES).

[Español](./README.md) · [English](./README.en.md) · **Deutsch**

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Kategorie](https://img.shields.io/badge/kategorie-Premium-C07860)
![Sprachen](https://img.shields.io/badge/sprachen-ES%20%7C%20EN%20%7C%20DE-047857)

</div>

---

> [!IMPORTANT]
> Internes Repository des Anclora-Ökosystems. Produkt in der **Pre-MVP**-Phase. Keine operativen Details, Zugangsdaten oder sensible Logik außerhalb autorisierter Kanäle veröffentlichen.

## Was es ist

Anclora GuestHub (vormals Anclora SyncXML) verwaltet Gaeste, Check-in und den Betrieb von Ferienunterkuenften: es wandelt Excel-Tabellen mit Unterkunftsbuchungen in einzelne XML-Dateien pro Reservierung um, mit Datenvalidierung und kontrolliertem Download-Ablauf. Es soll die Meldepflicht (SES.HOSPEDAJES) fuer Beherbergungsbetriebe anhand gaengiger Branchendatenquellen vereinfachen.

## Kategorie im Ökosystem

| Feld | Wert |
|---|---|
| Kategorie | Premium |
| Status | Pre-MVP |
| Markenakzent | `#BFA46A` |
| Typografie | DM Sans |
| Kanonisches Repository | `anclora-guesthub` |

## Kernfunktionen

- Excel-Buchungsimport und -Parsing (ExcelJS)
- XML-Erzeugung pro Reservierung (fast-xml-parser)
- ZIP-verpackter Download (JSZip)
- Persistenz mit Prisma
- Dateispeicherung auf Vercel Blob
- E-Mail-Benachrichtigungen (Resend)

## Technologie-Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js, React |
| Datenbank | Prisma |
| Datenverarbeitung | ExcelJS, fast-xml-parser, JSZip |
| Speicher | Vercel Blob |
| E-Mail | Resend |
| Tests | Testing Library, Jest DOM |

## Lokaler Start

```bash
npm install
npm run dev
```

## Unterstützte Sprachen

- Español (Standard)
- English
- Deutsch

## Umbenennung 2026-08

Dieses Produkt wurde umbenannt: **Anclora SyncXML → Anclora GuestHub** (Repository `anclora-syncxml` → `anclora-guesthub`). Legacy-Identifikatoren (Session-/Storage-Schluessel, Nexus-Vertragswerte, registrierter SES-Anwendungsname, Blob-Storage-Praefix) bleiben aus Kompatibilitaetsgruenden erhalten — siehe Abschnitt "Legacy identifiers" im spanischen README und [`docs/ENVIRONMENT_VARIABLES.md`](./docs/ENVIRONMENT_VARIABLES.md).

## Dokumentation und Governance

- Marken- und Governance-Verträge: [`docs/standards/`](./docs/standards/)
- Anclora Vault (Quelle der Wahrheit): `contracts/` und `docs/governance/`

---

<div align="center">

### Anclora Group

Interne Nutzung.

</div>
