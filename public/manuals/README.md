# Anclora GuestHub Published Manuals

This folder is the canonical publication folder for the latest user manuals.

## Current version

| Language | PDF | HTML preview |
| --- | --- | --- |
| ES | `anclora-guesthub-manual-usuario-es.pdf` | `anclora-guesthub-manual-usuario-es.html` |
| EN | `anclora-guesthub-user-manual-en.pdf` | `anclora-guesthub-user-manual-en.html` |
| DE | `anclora-guesthub-benutzerhandbuch-de.pdf` | `anclora-guesthub-benutzerhandbuch-de.html` |

## Source of truth

- Editable sources: `docs/manual/manual-usuario*.md`
- Generator: `scripts/generate-guesthub-manual-pdf.mjs`
- Command: `node scripts/generate-guesthub-manual-pdf.mjs --lang=all`

`tmp/manual-pdf/` is not a publication folder. It may contain local or legacy rendering artifacts and must not be treated as the latest version.

## Rename regeneration (2026-09-01)

Regenerated post-rename (Anclora SyncXML → Anclora GuestHub). Legacy `anclora-syncxml-*.{pdf,html}` artifacts have been removed from this folder.
