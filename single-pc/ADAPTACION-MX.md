# Adaptación de CustomPOS Single-PC para lavandería en México

> Estado: planificación técnica. **La aplicación original aún no está adaptada ni validada para operación comercial en México.**

## Alcance confirmado

- Una sola computadora en mostrador.
- Uso local, sin servidor y sin dependencia de internet.
- Negocio pequeño de lavandería.
- Conservaremos `main` como referencia del fork. Los cambios se desarrollarán en `desarrollo-mx`.
- Proyecto original MIT: conservar la licencia y el aviso de derechos de autor.

## Primera versión deseada (MVP)

1. Clientes (nombre, teléfono, historial).
2. Recepción de pedidos, folio y fecha estimada de entrega.
3. Catálogo de servicios configurable: por peso (kg), por pieza o tarifa fija, según las necesidades del negocio.
4. Estados: recibido → en proceso → listo → entregado.
5. Cobros en MXN: efectivo, transferencia y pagos anotados de una terminal externa; anticipos, saldo y cambio.
6. Comprobante de recepción y ticket final imprimibles.
7. Apertura y corte de caja con registros auditables.
8. Exportación y **restauración probada** de respaldos locales.

## Adaptaciones de localización

- Español (es-MX) en pantallas operativas, avisos y tickets.
- Pesos mexicanos (MXN), fechas dd/mm/aaaa y teléfonos mexicanos.
- Kilogramos en el lavado por peso; definir migración para datos o configuraciones existentes en libras.
- Efectivo en denominaciones mexicanas.
- Datos de identificación y políticas del establecimiento en los tickets.
- Revisar cálculo de precios e IVA, sin presentar reportes originales como documentación fiscal mexicana.

## Riesgos / bloqueos para salida a producción

- **Crítico:** implementar importación/restauración verificable del respaldo JSON; ensayar recuperación en otro perfil del navegador.
- **Crítico:** cambiar PIN de demostración, controlar permisos y uso exclusivo del equipo.
- **Crítico:** probar cobros parciales, cancelaciones, redondeos, devoluciones y cortes de caja.
- **Crítico:** validar persistencia en Chrome/Edge, operación sin conexión y pruebas de impresora térmica real.
- **Fiscal:** no se incluye timbrado CFDI del SAT. La facturación puede realizarse fuera del POS; el flujo de conciliación debe definirse con asesoría contable.
- **Privacidad:** aviso de privacidad y resguardo de los datos de clientes.
- **Mantenimiento:** el archivo HTML de Single-PC es grande; preferir cambios acotados, reproducibles y probados.

## Orden de trabajo propuesto

- [x] Crear fork propio.
- [x] Crear rama `desarrollo-mx`.
- [x] Registrar alcance y prioridades técnicas.
- [x] Confirmar modalidad de cobro: **kilogramo y pieza**. Tarifas todavía pendientes de cargar.
- [x] Identificar constantes/funciones para moneda, peso, fechas, teléfonos e impuestos.
- [x] Incorporar comprobaciones estáticas en `tests/mx-single-pc.js` (pendiente ejecución de CI y pruebas funcionales).\n- [ ] Crear pruebas de regresión para importes, pagos y conversiones.
- [x] Primer cambio de código: unidades de kilogramos, etiqueta MXN/kg, fechas dd/mm/aaaa, formato telefónico y denominaciones de caja.\n- [ ] Traducir todas las pantallas y verificar resultados con datos ficticios.
- [ ] Implementar exportación + restauración de respaldo y ensayo de recuperación.
- [ ] Personalizar tickets y comprobar impresión real.
- [ ] Piloto controlado antes de operar con clientes reales.

## Nota de uso

El software original es de código abierto con licencia MIT. Esta rama está en desarrollo: no almacenar información real de clientes o ventas hasta superar pruebas de seguridad, cobros y recuperación de datos.

## Avance de código (31-10-2026)

Se modificó `single-pc/ozark-pos-single-pc.html` sobre `desarrollo-mx` para usar `wfKg` en las órdenes nuevas y `kg` en las cotizaciones de lavado por peso. Se adaptaron etiquetas de unidades, fecha, teléfono y denominaciones de efectivo. El catálogo de prendas por pieza ya existía en el software y se conserva.

**Compatibilidad de datos:** los campos originales `wfLbs` / `lbs` **no se convierten automáticamente**. No importar archivos JSON de la edición estadounidense en esta versión. Si fuera necesario, crear primero una migración explícita y verificada. La nueva versión todavía tiene múltiples textos en inglés y precios de demostración estadounidenses. **No usar en producción.**

Se agregó `tests/mx-single-pc.js` para detectar referencias antiguas en rutas críticas; su presencia no demuestra que todas las pruebas se hayan ejecutado. Faltan pruebas de interfaz, operaciones completas, fiscalidad y respaldo/restauración.

## Etapa de localización (31-10-2026)

- ✅ Traducción principal del repositorio en `README.md`; se conservó `README.en.md` con la versión inglesa.
- ✅ Traducción del manual Single-PC en `single-pc/README.md`; original en `single-pc/README.en.md`.
- ✅ Índice, glosario y guías de México en `docs/es/`.
- ✅ Capa de localización visual en el HTML autónomo con **521 traducciones exactas** para controles y etiquetas; no modifica claves de base de datos.
- ✅ Etiquetas iniciales de comprobantes (recibos, bolsas, cotización, estados y listas) traducidas.
- ✅ Se corrigió la unidad en el ticket interno para mostrar `kg` con tarifa por kg.
- ✅ Se verificó sintaxis JavaScript de los dos bloques embebidos mediante el analizador V8, sin ejecutar la aplicación.
- ✅ Se añadió guardia estática en `tests/mx-single-pc.js` para diccionario, ticket kg y sintaxis de scripts.
- ⚠️ **Traducción no finalizada:** permanecen mensajes compuestos, textos en diálogos nativos, reportes y flujos secundarios en inglés. El constructor, motor configurable y otros documentos técnicos también necesitan traducción.
- ⚠️ **Pruebas pendientes:** pruebas reales del navegador, flujos de cobro, devolución, ticket físico, respaldo/restauración y cobertura del resto de los textos. Al momento de revisar la API no había ejecuciones de Actions visibles en la rama de este fork.
- ⚠️ **No listo para producción**; conservar datos únicamente ficticios.

Regla de seguridad para traducir tickets: la cadena `Order:` es leída por el extractor de folios/códigos de barras del POS original y no debe traducirse hasta actualizar y probar su analizador; esto **no** es una omisión accidental. Lo mismo aplica a claves de órdenes, importaciones y estados internos. La localización debe comprobar que estos mecanismos siguen funcionando.

## Corrección de Configuración durante pruebas manuales (31-10-2026)

A partir de una captura tomada en Microsoft Edge se confirmó que la pantalla de **Administración → Configuración → Reglas de operación** todavía mostraba numerosos textos en inglés. Se tradujeron directamente los rótulos visibles y sus mensajes de ayuda, las pestañas administrativas, la ventana de sucursales y los avisos de respaldo y tarjeta en modo Single-PC. Se conservaron los IDs de los campos, las claves internas y los cálculos.

Se amplió `tests/mx-single-pc.js` para comprobar las nuevas etiquetas y analizar sintácticamente ambos bloques JavaScript. **La comprobación estática pasó**; aún falta revisar visualmente la pantalla con la nueva versión en Edge y hacer pruebas funcionales de los cobros. El cambio no traduce todos los módulos restantes del POS.

**Para actualizar una prueba local:** no basta recargar la página en el navegador; hay que descargar el HTML actualizado desde `desarrollo-mx`, reemplazar el archivo en la **misma carpeta y con el mismo nombre**, tras hacer un respaldo si se registraron datos. No mezclar archivos `main` y `desarrollo-mx`.
