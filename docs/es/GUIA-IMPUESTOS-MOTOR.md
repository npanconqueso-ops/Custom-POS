# Configurar impuestos para distintos mercados (motor genérico CustomPOS)

[Fuente original en inglés](../TAX-GUIDE.md) · [Guía fiscal específica para México](IMPUESTOS-MX.md)

Los impuestos sobre ventas y consumo cambian según el país y la región. CustomPOS mantiene el **motor general** y configura las reglas particulares mediante `FLOW.endpoints.tax`. Toda la configuración descrita aquí corresponde a `endpoints.tax`; si una operación no tiene impuesto, el nodo puede omitirse.

> **Advertencia:** este documento describe las opciones del **motor genérico** (`pos.html`), no asegura que todas estén disponibles en la aplicación original de Single-PC (`single-pc/ozark-pos-single-pc.html`). El cumplimiento fiscal mexicano requiere validación independiente.

En el constructor, la etapa de Pago permite introducir la tasa de impuesto, indicar si está incluida en el precio y configurar zonas de reparto. Cada artículo puede marcarse como gravado o exento mediante su editor avanzado. Las configuraciones siguientes sirven para modificaciones más especializadas del código.

## 1. Tasa única (valor predeterminado)

Para establecimientos con una sola tasa:

```js
endpoints: { tax: { rate: 0.0825 } }     // 8.25%, se agrega al precio
```

La tasa se expresa en formato decimal: `0.0825` corresponde a 8.25%. El impuesto se añade al subtotal y aparece como línea independiente en el comprobante.

## 2. Impuesto incluido en el precio (IVA / GST)

En muchos países el precio mostrado al consumidor ya incluye el impuesto. La opción `included:true` hace que el sistema desglose su parte gravada, sin aumentar el total anunciado:

```js
endpoints: { tax: { rate: 0.20, included: true } }  // IVA de ejemplo del 20% dentro del precio
```

- **El total que paga el cliente no cambia**: el impuesto se extrae del precio, no se agrega.
- El reporte «Ventas netas» excluye impuestos y el reporte de impuestos identifica la parte correspondiente.
- Los recibos del motor genérico señalan «Tax (incl.)» en inglés, a menos que también se traduzca su plantilla.
- El constructor ofrece una opción de impuesto incluido o agregado al pagar.

## 3. Artículos gravados y exentos en una misma venta

Algunos bienes pueden estar exentos y otros gravados. Establece `taxable:false` para no considerar un artículo en la base gravable. Los descuentos se distribuyen de manera proporcional:

```js
catalog: [
  { id:"milk", name:"Leche", price:3.5, taxable:false },
  { id:"soda", name:"Refresco", price:2.0 },
]
```

El motor no grava automáticamente la venta de tarjetas de regalo (categoría técnica `"giftcard"`). En el constructor, cada artículo tiene una opción de gravado/exento en el editor avanzado.

### Tasas diferentes por categoría

Cuando un booleano de gravado/exento no basta, se pueden definir clases tributarias identificadas por nombre y asignarlas a los productos. Sin clase, se aplica la tasa base; `taxable:false` sigue siendo exento:

```js
endpoints: { tax: {
  rate: 0.08,
  classes: { grocery: 0, prepared: 0.08 }
} },
catalog: [
  { id:"milk", name:"Leche", price:2, taxClass:"grocery" },
  { id:"dog", name:"Hot Dog", price:5, taxClass:"prepared" },
  { id:"soda", name:"Refresco", price:3 },
]
```

En el ejemplo, el primer artículo genera $0.00, el segundo $0.40 y el tercero $0.24 de impuesto, para un total de $0.64. Se configuran las clases en la etapa Pago del constructor y se asignan a cada artículo desde su editor.

## 4. Impuesto según destino para reparto (zonas)

En determinadas jurisdicciones de Estados Unidos, el impuesto aplicable a una entrega depende de su destino y no de la ubicación del establecimiento. Por eso el motor genérico admite zonas:

```js
endpoints: { tax: {
  rate: 0.08,
  zones: [
    { name: "Centro", rate: 0.09 },
    { name: "Al otro lado del río", rate: 0.0825 },
  ]
} }
```

- Al registrar el pago de una orden con reparto aparece la selección de zona de impuesto. El importe se recalcula según su tasa.
- «En el establecimiento» mantiene la tasa base.
- Cada selección de zona queda registrada en el historial de actividad.
- El constructor incluye configuración de zonas cuando existe una ruta de reparto, como ocurre en plantillas de pizzería y florería.

El motor evita consultas automáticas a servicios comerciales de impuestos por dirección (por ejemplo, Avalara o TaxJar), porque esa dependencia impediría mantener un archivo local completamente autónomo. Si se requieren tarifas a nivel de dirección, se propone un complemento opcional del servidor, no del archivo descargado.

## Guía rápida de configuraciones

| Situación | Configuración |
|---|---|
| Una ubicación con impuesto agregado al cobrar | `{ rate: 0.0X }` |
| Productos exentos | Tasa general más `taxable:false` en artículos exentos |
| Tasas según categoría | Agregar `classes:{…}` y `taxClass` por artículo |
| Reparto con impuesto de destino | Agregar `zones:[{name,rate},…]` |
| Precio con IVA/GST incluido | `{ rate: 0.XX, included: true }` |
| Sin impuesto | Omitir `endpoints.tax` |
| Sucursales físicas con tasas diferentes | Configurar `rate` en el flujo de cada sucursal |

## Funciones todavía no desarrolladas en el motor original

- **Consulta automática de tasa por dirección:** deliberadamente omitida del archivo gratuito y sin conexión.
- **Exenciones temporales de impuestos por fechas** y **reportes consolidados entre sucursales:** pendientes de implementación al momento de redactar la documentación original.

Si el proyecto necesita estas funciones, se requiere ampliar configuración o motor. Revisa [`docs/IDEAS.md`](../IDEAS.md) para la propuesta original de funcionalidades.

## Qué implica para nuestra lavandería mexicana

La edición Single-PC utiliza una función de cálculo distinta y podría agregar el impuesto sobre el precio base. Por eso **no debe asumirse que `included:true` funcionará allí**. Los cálculos de IVA de México, anticipos, saldos, cancelaciones y CFDI requieren un proceso de desarrollo y pruebas propio, documentado en [IMPUESTOS-MX.md](IMPUESTOS-MX.md).
