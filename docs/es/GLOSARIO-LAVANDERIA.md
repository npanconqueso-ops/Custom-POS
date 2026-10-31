# Glosario y guía de textos para Lavandería POS MX

Esta guía fija el vocabulario que usaremos en la aplicación. Evita que una misma acción aparezca con nombres diferentes en pantallas, mensajes y tickets.

## Traducciones principales

| Inglés original | Español de México | Uso |
|---|---|---|
| Home | Inicio | Pantalla principal |
| Customer | Cliente | Persona que deja la ropa |
| Order | Pedido | Orden de trabajo y cobro |
| Order number | Folio del pedido | Identificador |
| Quick drop-off | Recepción rápida | Alta de pedido |
| Detail | Detalle del pedido | Revisar artículos y peso |
| Wash & Fold | Lavado y secado | Servicio por peso |
| Weight | Peso | Captura de kg |
| lb / pound | kg / kilogramo | Solo en nuevas operaciones MX; no convertir registros viejos visualmente |
| Price per pound | Precio por kilogramo | Tarifa configurable en MXN/kg |
| Piece | Pieza | Servicio unitario |
| Items | Artículos | Ropa o servicios por pieza |
| Price book | Catálogo de precios | Lista de servicios |
| Quote / estimate | Cotización | Propuesta antes del cobro |
| Deposit | Anticipo | Pago recibido antes de entregar |
| Balance due | Saldo pendiente | Importe por cobrar |
| Paid in full | Liquidado | Pedido sin saldo |
| Receipt | Ticket / comprobante | Recibo impreso |
| Drop-off receipt | Comprobante de recepción | Entrega al recibir ropa |
| Pick-up | Entrega | Retiro del pedido |
| In process | En proceso | Lavando, secando o planchando |
| Ready for pickup | Listo para entregar | Trabajo terminado |
| Completed | Entregado | Pedido retirado |
| Drawer | Caja | Efectivo controlado |
| End of day | Corte de caja | Cierre y conciliación |
| Refund | Reembolso | Devolución de un cobro |
| Void | Anulación | Cancelación controlada |
| History | Historial | Pedidos y movimientos anteriores |
| Backup | Respaldo | Copia de datos JSON |
| Restore | Restaurar respaldo | Recuperar datos desde un respaldo validado |
| PIN | NIP | Clave de acceso del empleado |
| Store | Establecimiento / sucursal | Configuración del local |

## Redacción sugerida para el flujo

**Nuevo pedido:** «Selecciona un cliente y agrega un servicio».  
**Por kilo:** «Peso (kg)», «Precio por kg», «Importe».  
**Por pieza:** «Servicio», «Cantidad de piezas», «Precio por pieza», «Importe».  
**Cobro:** «Total del pedido», «Anticipo recibido», «Saldo pendiente», «Forma de pago».  
**Entrega:** «¿Confirmas la entrega de este pedido?».  
**Respaldo:** «Descargar respaldo completo» y «Restaurar desde respaldo».

## Reglas de formato

- Importes: prefijo `$`, dos decimales y referencia **MXN** en encabezado o configuración.
- Fechas visibles: `dd/mm/aaaa`; persistencia interna en ISO cuando el código ya la utiliza.
- Peso: `kg`, números positivos; el redondeo y la precisión de báscula deben definirse con las necesidades del negocio.
- Catálogo mixto: no combinar «precio/kg» con «precio/pieza» en una misma tarifa.
- La interfaz no debe reemplazar nombres, notas del cliente o importes guardados solo por traducirlos.
- Las etiquetas de sistemas como `order.kind`, `wfKg`, `priceId` o `taxable` son **claves técnicas**, no mensajes visibles.

## Mensajes de error recomendados

- «Ingresa un peso mayor que cero».
- «Selecciona al menos un servicio».
- «El importe del anticipo no puede superar el saldo del pedido».
- «No se pudo guardar el pedido. Inténtalo de nuevo».
- «El respaldo no es válido o no corresponde a esta versión».
- «Antes de restaurar, descarga un respaldo de los datos actuales».
- «No se puede confirmar la entrega mientras el pedido esté incompleto».

Estas son **propuestas de mensajes**; la presencia de un texto aquí no significa que la validación funcional correspondiente ya esté implementada.
