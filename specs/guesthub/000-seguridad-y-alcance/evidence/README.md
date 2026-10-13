# Evidencia futura de Fase 0

**Estado:** PROPUESTA · no contiene evidencia de ejecución. Las pruebas de esta misión son NOT_RUN.

## Procedimiento

1. Antes de ejecutar, registrar ID de gate/tarea, SHA/rama, fecha/hora, agente responsable, revisión de Toni, entorno lógico y alcance autorizado.
2. Para pruebas automatizadas, guardar comando exacto, versiones relevantes, exit status, cantidad de casos y denominador, fixture sintética identificada por ID/hash, resultado esperado y observado.
3. Para revisión manual, guardar checklist respondido, rutas/lineas inspeccionadas, decisión, revisión de Toni y fecha. No guardar sesión browser ni datos de entorno.
4. Para QA visual futura, usar agent-browser / anclora-visual-qa y guardar capturas/snapshot sin PII en el directorio QA gitignored que defina el contrato. No activar browser en esta misión.
5. SES: solo preproducción y solo con autorización operacional específica y fixture sintética. No registrar credentials, headers auth, SOAP completo, nombre/documento/telefono/email ni URL con secretos. Evidencia reducida a fixture ID/hash, operation, entorno lógico, código/lote minimizado, estado y timestamp conforme a política aprobada. SES real prohibido mientras rija SECURITY_RULES.
6. Diferenciar resultado: XML generado, validación local/XSD, request enviada, HTTP/SOAP response, acuse/lote, procesamiento y resultado terminal. No inferir estado posterior.
7. Cualquier artefacto con PII/secretos debe descartarse de forma segura y el gate queda BLOCKED; no copiarlo a Git, issue, logs o esta carpeta.
8. Calcular métricas solo tras fijar población, unidad de análisis, ventana, muestreo, numerador/denominador, exclusiones y manejo de timeout/pending. Guardar agregados, no filas de viajeros.

## Nombres y estados

Formato sugerido: GH-0x-<evidence-id>-<date>-<sha-short> con manifiesto de metadata neutral. Estados: PLANNED, NOT_RUN, PASS, FAIL, BLOCKED. Esta propuesta no crea subcarpetas de datos ni agrega artefactos de ejecución.

## Retención y revisión

El agente minimiza y sanitiza artefactos técnicos antes de producirlos; Toni revisa la evidencia. La revisión especializada se solicita solo antes de usos públicos que dependan de ella. Capturas no pueden incluir cuenta personal, email, token, nombres ni documentos. Evidencia de terceros debe enlazar la página pública y la fecha; no copiar manuales completos. El directorio de esta carpeta debe contener solo documentación sintética autorizada.
