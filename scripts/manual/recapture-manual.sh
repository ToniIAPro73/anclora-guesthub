#!/usr/bin/env bash
# Recaptura y regeneración completa del manual de usuario (ejecutar en el Mac).
# 1) Arranca la app (ver docs/manual/RECAPTURE.md). 2) Ejecuta este script.
set -euo pipefail
cd "$(dirname "$0")/../.."
MANIFEST=docs/manual/screenshots.manifest.json
ENV_FILE="${ENV_FILE:-$(node -e "console.log(require('./$MANIFEST').env_file)")}"
BRANCH="$(git branch --show-current)"
[ "$BRANCH" = "development" ] || { echo "✗ Rama actual '$BRANCH'. El contrato exige trabajar en development."; exit 1; }
[ -f "$ENV_FILE" ] || { echo "✗ No existe $ENV_FILE (credenciales QA, no versionado)."; exit 1; }
APP_URL="$(node --env-file="$ENV_FILE" -e "console.log(process.env.MANUAL_APP_URL || require('./$MANIFEST').app_url_default)")"
curl -fsS -o /dev/null --max-time 10 "$APP_URL" || { echo "✗ La app no responde en $APP_URL. Arráncala primero (docs/manual/RECAPTURE.md)."; exit 1; }
node --env-file="$ENV_FILE" scripts/manual/recapture-manual.mjs "$@"
GEN="$(node -e "console.log(require('./$MANIFEST').generator || '')")"
if [ -n "$GEN" ]; then echo "→ Regenerando manual: $GEN"; eval "$GEN"; fi
echo; git status --short -- docs/manual public 2>/dev/null || true
echo "Revisa capturas y documento generado; marca en el manifiesto status=CURRENT las recapturadas y haz commit en development."
