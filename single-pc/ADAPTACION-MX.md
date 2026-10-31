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
- [ ] Confirmar catálogo y modalidad de cobro (kg, pieza o ambas).
- [ ] Identificar constantes/funciones para moneda, peso, fechas, teléfonos e impuestos.
- [ ] Crear pruebas de regresión para importes, pagos y conversiones.
- [ ] Adaptar primero interfaz y unidades, verificando resultados con datos ficticios.
- [ ] Implementar exportación + restauración de respaldo y ensayo de recuperación.
- [ ] Personalizar tickets y comprobar impresión real.
- [ ] Piloto controlado antes de operar con clientes reales.

## Nota de uso

El software original es de código abierto con licencia MIT. Esta rama está en desarrollo: no almacenar información real de clientes o ventas hasta superar pruebas de seguridad, cobros y recuperación de datos.
