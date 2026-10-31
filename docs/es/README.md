# Documentación de CustomPOS en español

**Idioma:** español de México (`es-MX`).  
**Proyecto:** [CustomPOS](../../README.md) · [Manual para una computadora](../../single-pc/README.md) · [Código original en inglés](../../README.en.md)

> Esta carpeta organiza las traducciones y guías en español. **No significa que toda la documentación inglesa ya esté traducida**: la plataforma original contiene más de 30 archivos de documentación y un historial de cambios extenso. Cada archivo traducido llevará un enlace al original para facilitar la revisión.

## Empezar con nuestra lavandería (prioridad)

| Documento | Descripción | Estado |
|---|---|---|
| [README principal](../../README.md) | Qué es el proyecto, componentes y cómo probarlo | Español |
| [Manual Single-PC](../../single-pc/README.md) | Instalación, NIP, respaldo, pedidos y limitaciones | Español |
| [Plan de adaptación](../../single-pc/ADAPTACION-MX.md) | Objetivos, cambios, riesgos y avances en México | Español |
| [Glosario de pantallas](GLOSARIO-LAVANDERIA.md) | Vocabulario estándar y términos de cobro por kilo/pieza | Español |
| [Impuestos y precios](IMPUESTOS-MX.md) | Reglas a validar para MXN, IVA y CFDI | Español |\n| [Guía fiscal del motor genérico](GUIA-IMPUESTOS-MOTOR.md) | Traducción de TAX-GUIDE.md; no confundir con Single-PC | Español |\n| [Referencia técnica Ozark](REFERENCIA-OZARK.md) | Arquitectura, pruebas y lecciones de la aplicación original | Español |
| [Manual en inglés](../../single-pc/README.en.md) | Referencia original fiel del proveedor | Inglés |

## Documentos técnicos del proyecto original

La siguiente relación conserva los enlaces a las fuentes inglesas. **Los enlaces de la tercera columna son a originales sin traducir** hasta que se publique su correspondiente edición española.

| Documento | Tema | Original |
|---|---|---|
| Architecture | Arquitectura general | [docs/ARCHITECTURE.md](../ARCHITECTURE.md) |
| Discoverability | Visibilidad y descubrimiento web | [docs/DISCOVERABILITY.md](../DISCOVERABILITY.md) |
| Flow Schema | Esquema de flujo y configuración | [docs/FLOW-SCHEMA.md](../FLOW-SCHEMA.md) |
| History | Historia del proyecto | [docs/HISTORY.md](../HISTORY.md) |
| Hub Sync | Sincronización entre equipos | [docs/HUB-SYNC.md](../HUB-SYNC.md) |
| Ideas | Propuestas pendientes | [docs/IDEAS.md](../IDEAS.md) |
| Launch Kit | Material de lanzamiento | [docs/LAUNCH-KIT.md](../LAUNCH-KIT.md) |
| Module Library | Módulos disponibles | [docs/MODULE-LIBRARY.md](../MODULE-LIBRARY.md) |
| Ozark Parity | Comparación con la app original | [docs/OZARK-PARITY-ROADMAP.md](../OZARK-PARITY-ROADMAP.md) |
| Ozark Reference | [Traducción al español](REFERENCIA-OZARK.md) | [Original](../OZARK-REFERENCE.md) |
| Payments Module | Integración de pagos | [docs/PAYMENTS-MODULE.md](../PAYMENTS-MODULE.md) |
| Phase 2 | Sustrato técnico de segunda fase | [docs/PHASE-2-SUBSTRATE.md](../PHASE-2-SUBSTRATE.md) |
| Restaurant Vertical | Funciones para restaurantes | [docs/RESTAURANT-VERTICAL.md](../RESTAURANT-VERTICAL.md) |
| Tax Guide | [Traducción al español](GUIA-IMPUESTOS-MOTOR.md) | [Original](../TAX-GUIDE.md) |
| Templates | Plantillas por comercio | [docs/TEMPLATES.md](../TEMPLATES.md) |
| The Model | Modelo de componentes | [docs/THE-MODEL.md](../THE-MODEL.md) |
| V2 Modular Import | Importación modular de la versión 2 | [docs/V2-MODULAR-IMPORT.md](../V2-MODULAR-IMPORT.md) |
| Worker Rights | Funciones laborales estadounidenses | [docs/WORKER-RIGHTS.md](../WORKER-RIGHTS.md) |
| Contributing | Guía de contribución | [CONTRIBUTING.md](../../CONTRIBUTING.md) |
| Journal | Bitácora técnica y decisiones históricas | [JOURNAL.md](../../JOURNAL.md) |
| Go Live | Despliegue del sitio original (no del fork) | [GO-LIVE.md](../../GO-LIVE.md) |
| Payments README | Servicio de cobros | [payments/README.md](../../payments/README.md) |
| Reference README | App de referencia original | [reference/ozark-pos/README.md](../../reference/ozark-pos/README.md) |
| Tests README | Pruebas y validaciones | [tests/README.md](../../tests/README.md) |
| CLAUDE.md | Guía para asistentes de programación | [CLAUDE.md](../../CLAUDE.md) |

## Criterios para las traducciones

1. **No traducir identificadores de código:** variables, nombres de funciones, claves JSON, rutas de archivos, comandos, parámetros y rutas HTTP deben permanecer intactos.
2. **Separar interfaz y datos:** los registros del cliente, descripciones que haya escrito y las medidas guardadas no deben modificarse mediante traducciones visuales.
3. **Preservar licencias:** conservar el texto de MIT y los avisos de atribución.
4. **Revisar formatos mexicanos:** `MXN`, `es-MX`, kilogramos, teléfono de 10 dígitos y fecha de uso local.
5. **No traducir términos jurídicos automáticamente como equivalentes:** reglas fiscales, de privacidad y trabajo de Estados Unidos **no se vuelven mexicanas** por cambiar su idioma.
6. **Comprobar cada cambio:** pruebas de cálculo, estados, tickets y respaldo/restauración antes de trabajar con pedidos reales.

La localización de la interfaz de Single-PC está incorporada en su mismo archivo HTML para mantener la posibilidad de abrirlo sin conexión. Se requiere auditoría lingüística y funcional para los mensajes que todavía se generan directamente en JavaScript.
