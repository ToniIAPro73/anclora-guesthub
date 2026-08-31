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

## Pending regeneration (rename 2026-08)

After the Anclora SyncXML → Anclora GuestHub rename, the published files must be regenerated with the command above (requires Chrome/Chromium for PDF rendering). Until then, the previous `anclora-syncxml-*.{pdf,html}` artifacts remain in this folder as legacy outputs and should be replaced (`git rm`) once the regenerated `anclora-guesthub-*` files exist.
