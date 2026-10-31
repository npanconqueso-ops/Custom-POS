# Lavandería POS MX — Edición para una sola computadora

**Un archivo. Una computadora. Un mostrador de lavandería.**

> **Traducción de la documentación original de Ozark POS, adaptada al proyecto mexicano.** La aplicación en la rama `desarrollo-mx` sigue en desarrollo y todavía conserva textos sin traducir. **No debe utilizarse con clientes, cobros o pedidos reales** hasta que se prueben los procesos de ventas, impresión y restauración de respaldos.
>
> [Leer el manual original en inglés](README.en.md) · [Plan técnico para México](ADAPTACION-MX.md) · [Instalación y pruebas funcionales](GUIA-PRUEBAS-MX.md)

Este punto de venta se utilizó en una tintorería real que tenía dos establecimientos. Permitía recibir ropa, identificarla con etiquetas, procesarla, preparar lotes, almacenarla para su entrega, registrar cuentas de clientes, operar una ruta y llevar control del personal. El negocio original lo utilizó de junio a septiembre de 2026. El 30 de septiembre de 2026 migró a su sistema sucesor para varias computadoras y esta edición quedó congelada. En lugar de retirarla, sus creadores la publicaron como un único archivo HTML ejecutable localmente.

La edición para una sola computadora conserva las funciones locales; las que requieren un servidor están desactivadas y señaladas en la interfaz. El software es gratuito, tiene licencia MIT y no exige cuenta, suscripción ni conexión a internet.

## Cómo iniciar

1. Descarga [`ozark-pos-single-pc.html`](ozark-pos-single-pc.html) desde este repositorio. En GitHub, abre el archivo y utiliza la opción de descarga. **Descarga la versión de la rama `desarrollo-mx`**, no la de `main`, si quieres probar los cambios mexicanos.
2. Haz doble clic en el archivo. Se abrirá en el navegador, sin instalador ni servicio adicional.
   - La edición original se desarrolló y probó con **Google Chrome**. Microsoft Edge utiliza el mismo motor. Si Windows lo abre con otro navegador, haz clic derecho en el archivo y selecciona **Abrir con → Chrome**.
   - **Abre siempre el mismo archivo de la misma manera y en el mismo navegador.** Los datos quedan almacenados localmente y están asociados a ese origen de archivo y al perfil del navegador. Abrir una copia desde otra ruta, otro navegador o en modo incógnito puede mostrarte una base de datos vacía.
3. Inicia sesión con uno de los NIP de demostración de la versión original:

   | Perfil | NIP de demostración |
   |---|---|
   | Propietario | **1234** |
   | Encargado | **2222** |
   | Mostrador | **1111** |

   **Cámbialos inmediatamente** en Administración → Empleados. Estos NIP son públicos y no protegen ninguna información real.
4. Configura tu negocio en Administración → Configuración → Sucursales: nombre, dirección, código postal, teléfono e impuestos. Los datos originales son ficticios. Cambia también los encabezados de los tickets en Administración → Impresión; el nombre predeterminado «YOUR CLEANERS» también puede aparecer en estados de cuenta, etiquetas de bolsas, registros de tiempo y hojas de nómina.
5. Modifica los precios en Administración → Catálogo de precios. Los importes originales son de muestra y **no son tarifas mexicanas**. La aplicación de esta rama ya trabaja en kilogramos para nuevas operaciones de lavado por peso, pero el resto de la adaptación fiscal y lingüística todavía requiere validación. Las tarifas de prendas individuales permanecen configurables.

La edición original incluye tres sucursales de ejemplo (dos mostradores y una ruta). Si solo utilizarás una, elimina de la configuración las sucursales ficticias innecesarias **después de respaldar y comprobar la operación de prueba**.

El desarrollador original también ofrece una demostración en [custompos.org/single-pc.html](https://custompos.org/single-pc.html), pero **esa demostración no corresponde necesariamente a esta adaptación mexicana** y no debe confundirse con la versión guardada en nuestro fork.

## Dónde se guardan los datos: léelo antes de operar

Toda la información se guarda **en este navegador y en esta computadora** cada vez que cambia algo. La aplicación no envía los datos a un servidor. Eso permite utilizarla sin conexión, pero supone riesgos importantes:

- Si se descompone la computadora o alguien elimina los datos del navegador, **se perderán los pedidos y cobros** salvo que existan respaldos válidos.
- **Respalda frecuentemente:** Administración → Configuración → **Respaldo completo (todo)**. El propietario puede descargar los datos del negocio como archivo `.json`. Guarda copias externas (memoria USB, otra computadora o almacenamiento confiable). La pantalla de inicio muestra la fecha del último respaldo y advierte si transcurrió más de una semana. También se pueden exportar clientes, pedidos, pagos y movimientos de cuentas a hojas de cálculo.
- **Restauración: limitación crítica.** La edición original **no tiene restauración con un clic**. El archivo contiene los datos, pero volver a cargarlos requiere conocimientos técnicos. En nuestro proyecto la restauración comprobada es un requisito indispensable antes de abrir al público.
- **Reiniciar después de hacer pruebas:** primero descarga un respaldo; después puedes borrar los datos asociados al archivo desde la configuración del sitio en Chrome. **Esta acción es destructiva.**

### Compatibilidad de datos con la versión estadounidense

Los campos de peso originales estaban expresados en libras (`wfLbs`), mientras que la versión en desarrollo utiliza `wfKg` y las cotizaciones nuevas utilizan `kg`. **No importes respaldos de la versión estadounidense sin una migración explícita.** Cambiar el nombre de un campo no convierte automáticamente las medidas.

## Funcionalidades que incluye la edición original

- Recepción rápida de ropa y creación de pedidos.
- Detalle de prendas, preparación de lotes, ubicación en estantes y entrega.
- Cotizaciones y búsqueda.
- Administración de clientes, cuentas por cobrar y estados de cuenta impresos.
- Apertura y cierre de cajas.
- Tablero de reparto.
- Registro de entrada y salida de empleados y cálculo original de nómina.
- Listas de revisión, suministros, reportes y catálogo de precios.
- Cobro en efectivo, cheque y registro de operaciones con tarjeta externa.

**Tarjetas:** puedes cobrar utilizando una terminal independiente de tu banco. El sistema solo anota el pago y, cuando corresponde, el código de autorización mostrado por la terminal. **CustomPOS no realiza el cargo bancario directamente.** Elegir «rechazado / no procesado» no registra el cobro.

En nuestra adaptación mexicana el objetivo es simplificar estas funciones y utilizar únicamente las necesarias para una lavandería pequeña: clientes, pedidos por kilogramo o pieza, anticipos, saldos, tickets, cortes y respaldos.

## Funciones que no están disponibles sin servidor

Las siguientes funciones requieren el servidor de la edición para varias computadoras. En Single-PC están ocultas o desactivadas en lugar de simular que funcionan:

- Envío automático de mensajes de texto.
- Envío de estados de cuenta por correo.
- Lector de tarjetas conectado directamente al POS.
- Enlaces de pago y tarjetas guardadas.
- Seguimiento web del pedido por parte del cliente.
- Solicitudes desde el sitio web (recolección, comentarios o depósito de ropa).
- Almacenamiento de fotografías.
- Archivo histórico de largo plazo.
- Integración con QuickBooks.
- Tickets de soporte.
- Configuración remota de estaciones.
- Sincronización de varias computadoras.

La edición original no inicia conexiones a servidores por sí misma. El apartado **Single-PC Edition** de la barra superior muestra el almacenamiento local, los NIP de muestra, las restricciones y las solicitudes de red bloqueadas. La navegación externa de una ruta puede abrir Google Maps si el usuario pulsa explícitamente el enlace.

## Antes de utilizarlo en una lavandería mexicana

- **Aspectos laborales:** la pantalla original de derechos del trabajador incluye reglas, teléfonos y referencias de Arkansas (Estados Unidos). No la utilices para calcular nómina ni obligaciones laborales mexicanas sin rediseñarla y validarla.
- **Contenido religioso:** la edición original muestra de forma predeterminada un versículo bíblico en la pantalla de entrada/salida y en los tickets. Se puede desactivar en Administración → Impresión → Ticket. También deberá revisarse el resto de las pantallas.
- **Listas de trabajo:** las listas diarias, semanales y mensuales proceden del negocio original; cámbialas en Administración según las operaciones de la lavandería.
- **Pesos y precios:** utiliza pesos mexicanos, valores comprobados por kg y por pieza y la política de precios final del negocio.
- **Impuestos y CFDI:** el software original no constituye un sistema de facturación electrónica mexicana; el cálculo de impuestos, los pagos parciales y el desglose del IVA requieren revisión. No emitas facturas del SAT desde esta aplicación sin una integración validada.
- **Protección de datos:** prepara el aviso de privacidad correspondiente y limita el acceso a los datos personales de los clientes.
- **Operación comercial:** prueba con datos ficticios apertura/cierre de caja, pagos parciales, cancelaciones, impresión, recuperación de respaldos, cambios de equipo y funcionamiento sin internet.

## Para desarrolladores

La copia pública se generó desde el código privado del negocio original mediante un exportador que sustituyó nombres, direcciones, teléfonos, clientes, empleados, referencias de pago y direcciones del servidor por datos inventados. Antes de publicar el archivo, el desarrollador ejecutó pruebas del negocio, entre ellas:

- 2,608 aserciones de cálculos monetarios.
- 749 aserciones de renderización de pantallas.
- Una comprobación de botones sin manejadores.
- 40 comprobaciones específicas de la edición para una computadora, incluida la ausencia de comunicaciones a servidores y afirmaciones falsas sobre mensajes enviados.

Estos resultados corresponden al **archivo publicado por el autor**, no certifican automáticamente la adaptación mexicana.

El código legible original y sus baterías de prueba están en [`reference/ozark-pos/`](../reference/ozark-pos/). Los tests originales apuntan a la aplicación de varias computadoras y algunos difieren deliberadamente de Single-PC por nombres ficticios, localidades y funciones desactivadas. El exportador original ejecutaba las comprobaciones con dichas diferencias adaptadas.

Para esta rama se creó [`tests/mx-single-pc.js`](../tests/mx-single-pc.js) como comprobación estática inicial de unidades y localización, pero faltan pruebas integrales en navegador.

## Licencia y procedencia

Licencia **MIT**. Lee [`LICENSE`](LICENSE) y conserva el aviso de autoría de Brayden Ross Sanders / 7Site LLC al redistribuir el software. Se permite utilizarlo, modificarlo y compartirlo conforme a los términos de esa licencia.

La documentación en inglés se mantiene en [README.en.md](README.en.md). Para el avance y las tareas de adaptación consulta [ADAPTACION-MX.md](ADAPTACION-MX.md).
