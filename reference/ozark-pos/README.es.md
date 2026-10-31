# Ozark POS: un punto de venta en un solo archivo y las pruebas que lo respaldan

[Original en inglés](README.md) · [Explicación técnica en español](../../docs/es/REFERENCIA-OZARK.md)

Esta carpeta contiene el punto de venta que operó una planta de limpieza de ropa y su ruta de reparto: un archivo HTML, un servidor Node de sincronización sin dependencias y una aplicación envolvente opcional para escritorio.

El programa original se utilizó en un negocio real, con dos establecimientos, una planta y una camioneta de reparto, desde junio de 2026 hasta el 30 de septiembre de 2026, cuando fue sustituido por una generación más nueva. Esta copia corresponde a la versión final y está congelada.

La [edición Single-PC](../../single-pc/) permite ejecutar una variante sin servidor, en una sola computadora, generada a partir de este código.

**Licencia MIT:** se permite estudiar y utilizar este código conforme al aviso de licencia.

## Lo más importante: las pruebas

La principal enseñanza del repositorio no es el programa en sí, sino sus siete grupos de comprobaciones, creados para evitar que errores reales vuelvan a producirse.

| Prueba | Qué busca prevenir |
|---|---|
| `check-app-js.js` | Errores de sintaxis en una terminal de venta |
| `test-money.js` | Cobros duplicados, fechas de vencimiento erróneas y reembolsos bancarios fallidos |
| `test-render.js` | Pantallas que fallan o muestran `undefined` |
| `test-render-live.js` | Versiones aparentemente correctas que fallan con datos reales |
| `check-dead-buttons.js` | Botones que no encuentran su función |
| `test-hub.js` | Errores en sincronización, cambios incrementales y borrados implícitos |
| `audit-patterns.js` | Indicadores que quedan activados después de un fallo |

Para ejecutar las comprobaciones originales desde esta carpeta, en un entorno preparado:

```bash
node check-app-js.js Ozark-POS.html && node test-money.js Ozark-POS.html \
  && node test-render.js Ozark-POS.html && node check-dead-buttons.js Ozark-POS.html && node test-hub.js
```

Los comentarios técnicos registran los incidentes que justifican determinadas validaciones, de modo que otra persona pueda comprender la razón de las reglas incluso durante una incidencia nocturna.

## Ejecución de la implementación de referencia

```bash
cp hub.env.example hub.env      # configura al menos OZARK_HUB_KEY
node hub-server.js              # inicia el servidor y la API de sincronización
```

Abre `Ozark-POS.html`. El programa puede trabajar sin conexión; el servidor `hub` coordina los cambios entre dispositivos.

**La edición para una sola computadora no requiere estos pasos:** descarga y abre [`single-pc/ozark-pos-single-pc.html`](../../single-pc/ozark-pos-single-pc.html) directamente en Chrome/Edge.

## Advertencia sobre esta distribución pública

Este código es una **distribución generada y anonimizada**. Los nombres, teléfonos, direcciones, empleados, clientes, servidores e identificadores de pago reales fueron sustituidos por datos ficticios. Las personas que aparecen en la distribución son inventadas, aunque muchos incidentes descritos sí ocurrieron.

El proceso de exportación original rechaza la distribución si encuentra un dato real conocido y posteriormente ejecuta sus baterías de prueba sobre el resultado. Se pretende evitar tanto la publicación de información privada como la distribución de un programa modificado que ya no funcione.
