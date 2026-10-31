# Impuestos, precios y comprobantes: consideraciones para México

**Documento de desarrollo, no asesoría fiscal.** Esta guía describe diferencias entre el POS original y los requisitos que deben verificarse para una lavandería en México. Los criterios fiscales concretos deberán confirmarse con el contador del negocio y la normatividad vigente.

## 1. Precios de venta al público

El POS original de Single-PC fue creado en Estados Unidos y suma un impuesto configurable sobre importes gravados. Para México conviene definir precios anunciados al público en **pesos mexicanos** y, cuando aplique, ya con impuestos incluidos.

Ejemplo meramente ilustrativo, para un servicio sujeto a IVA a la tasa general de 16%:

- Precio final anunciado al cliente: **$116.00 MXN**.
- Base calculada: **$100.00 MXN**.
- IVA incluido: **$16.00 MXN**.
- Total a pagar: **$116.00 MXN**.

Cálculo general, únicamente cuando corresponde una tasa de 16% y se conoce que el precio es final:

```js
const iva = 0.16;
const base = Math.round((precioFinal / (1 + iva)) * 100) / 100;
const impuesto = Math.round((precioFinal - base) * 100) / 100;
```

No basta con cambiar `tax = subtotal * tasa` por esta fórmula: hay que comprobar descuentos, cargos adicionales, anticipos, devoluciones, redondeos y reportes.

## 2. Cobro por kilo y por pieza

Las unidades deberán expresarse de manera inequívoca:

| Servicio | Cantidad | Precio | Total |
|---|---:|---:|---:|
| Lavado y secado | 4.5 kg | $30.00 por kg | $135.00 |
| Edredón individual | 1 pieza | $80.00 por pieza | $80.00 |
| **Total** | | | **$215.00** |

Las cifras son ficticias y únicamente permiten comprobar que el catálogo no mezcla pesos, unidades y tarifas. La edición actual todavía necesita pruebas para órdenes mixtas y tickets.

## 3. Anticipos y liquidaciones

Un anticipo debe registrarse en el momento en que se cobra y reducir el **saldo pendiente**, sin multiplicar el ingreso o el impuesto por contabilizarlo de nuevo al entregar el pedido.

Ejemplo: pedido de $215.00, anticipo de $100.00 y saldo de $115.00. Al entregar y recibir los $115.00, el total de cobros acumulados debe ser $215.00, no $315.00.

La emisión fiscal de anticipos, operaciones a crédito, complementos de pago y facturas globales requiere tratamiento contable específico: no equiparar automáticamente los movimientos internos del POS con CFDI.

## 4. Tickets y CFDI

Un comprobante de recepción **no equivale** a una factura fiscal timbrada.

El ticket operativo debería mostrar nombre comercial, datos de contacto, folio, fecha y hora, cliente (cuando corresponda), detalle por kilo/pieza, precios finales, total, anticipo, saldo, fecha de entrega y observaciones sobre la ropa recibida.

Para CFDI 4.0 (cuando corresponda), utilizar un procedimiento externo válido o integrar un proveedor autorizado de certificación (PAC) después de definir requisitos fiscales, manejo de clientes, cancelaciones y conciliación. No introducir una función de facturación simulada.

## 5. Redondeo, unidades y migración

- Los importes monetarios deben redondearse de forma consistente a centavos y comprobarse con diferentes cantidades, descuentos y métodos de pago.
- El precio configurado por kg se multiplica por los **kilogramos capturados**, no por libras.
- Los registros del original pueden guardar `wfLbs`; la adaptación usa `wfKg`. No se deben reinterpretar automáticamente: una conversión explícita debe usar 1 lb = 0.45359237 kg, manteniendo trazabilidad.
- No utilizar los precios de muestra de Arkansas en operaciones reales mexicanas.

## 6. Pruebas imprescindibles

1. Un pedido únicamente por kilo.
2. Un pedido únicamente por pieza.
3. Un pedido con ambos métodos.
4. Anticipo, pago del saldo y cambio en efectivo.
5. Cancelación antes y después de cobrar.
6. Edición de cantidad o peso con pago parcial previo.
7. Corte de caja, conciliación de métodos de pago y cierre.
8. Ticket de recepción y comprobante de entrega.
9. Respaldo y restauración completa en un navegador limpio.
10. Revisión contable de IVA, CFDI y conciliación de ventas.

**Estado:** estas son especificaciones a validar; no se afirma que todas estén implementadas.

## Referencia al motor genérico

El [manual fiscal original del motor configurable](../TAX-GUIDE.md) documenta `FLOW.endpoints.tax`, tasas, impuestos incluidos y clases tributarias. Esa configuración **no implica** que la edición Single-PC tenga exactamente las mismas opciones. No reutilizar instrucciones de un motor en el otro sin revisar su código.
