# Checklist de validación — política de promoción (2026-10-23)

> Entrega de cambios de flujo y configuración. El SHA final queda registrado en el commit que incluye este checklist.

**Repositorio:** anclora-guesthub
**Rama:** development
**Entorno de validación:** entorno development/Preview del repositorio, pendiente de revisión de Toni
**Datos:** no se usaron ni modificaron datos de aplicación.

## 1. Qué cambia
- El workflow promote.yml admite el dispatch de cadena completa con target=full y source_sha revisado en Preview.
- El contrato runtime define validación expresa en development, Preview y promoción completa asíncrona.
- Los documentos operativos antiguos quedan marcados como históricos y se aplica el flujo actual.

## 2. Ya comprobado por el agente
| Comprobación | Comando o método | Resultado |
| --- | --- | --- |
| Sintaxis de workflows | Parser YAML sobre los 41 `promote.yml` del workspace | PASS |
| Integridad del diff | `git diff --check` | PASS |

## 3. Pruebas no ejecutadas (NOT_RUN)
| Prueba | Motivo concreto |
| --- | --- |
| Suite de la aplicación, lint y build | Cambios de políticas y configuración de promoción; no se ejecutaron suites por no afectar código de aplicación. |
| Revisión visual y smoke test de Preview | Pendiente de Toni en el entorno publicado tras este push. |
| Resultado de CI/deployments | No se esperará ni consultará; Toni revisa los entornos según la política acordada. |

## 4. Checklist para Toni
| # | Dónde | Pasos | Resultado esperado | Bloqueante |
| --- | --- | --- | --- | --- |
| 1 | development | Revisar el contrato y `promote.yml` de este repositorio | Cambios acordes con el flujo aprobado | Sí |
| 2 | Preview | Confirmar la Preview correspondiente al SHA de este push | La revisión corresponde al SHA publicado | Sí, antes de promoción |

## 5. Riesgos y limitaciones
- La promoción requiere el SHA exacto revisado en Preview. Si `development` avanza, el workflow completo se detendrá y requerirá revisión nueva.
- Los resultados de staging, production y main quedan bajo revisión de Toni.

## 6. Decisión de Toni
- [ ] Validado en development
- [ ] Validado en Preview
- [ ] PROMOTE=FULL
- [ ] No se promociona. Motivo: ______________________
