# CustomPOS — versión en español de México

**Crea tu propio punto de venta. Descárgalo. Conserva el control de su código.**

Sistema de punto de venta gratuito y configurable; se puede personalizar localmente. No exige suscripción ni dependencia de un proveedor para conservar el código y los datos.

**Idiomas:** español (esta documentación) · [English / versión original](README.en.md).

> **Estado de este fork:** la adaptación para una lavandería mexicana se desarrolla únicamente en `desarrollo-mx`. La interfaz de la edición Single-PC tiene traducción inicial, pero **todavía no está completamente traducida ni probada para operación comercial**. El motor genérico, constructor y páginas públicas conservan partes en inglés. No confundir esta rama con un producto listo para vender.
>
> **Guías de nuestra edición:** [Manual de la lavandería](single-pc/README.md) · [Plan de adaptación mexicana](single-pc/ADAPTACION-MX.md) · [Índice de documentación](docs/es/README.md).

## ¿Qué es CustomPOS?

El proyecto original surgió de un punto de venta real, creado para una tintorería de dos sucursales, y se generalizó para que pueda configurarse para diferentes tipos de negocios.

En lugar de pagar por un programa alojado en servidores ajenos, puedes utilizar un generador que produce un archivo autónomo con tu POS. El archivo se ejecuta en el navegador, guarda datos localmente y no requiere compilación ni conexión a internet para utilizarse en una sola computadora.

La idea se parece a un constructor de sitios web, con la diferencia de que recibes y conservas el código de tu aplicación.

## ¿Por qué funciona de esta manera?

- **Un solo archivo y uso sin conexión:** se puede ejecutar en Chrome sin mantener un servidor propio.
- **Código que puedes modificar:** la licencia MIT permite utilizar, estudiar y adaptar el proyecto con sus condiciones de atribución.
- **Personalización con asistencia de IA:** el proyecto incluye `CLAUDE.md` y otras guías para cambiar precios, procesos y comprobantes con herramientas de desarrollo.
- **Módulos configurables:** se habilitan únicamente los componentes necesarios: inventario, rutas, registro horario, listas de verificación y otros.

## ¿Cómo se financia el proyecto original?

El software básico se ofrece gratuitamente. Sus creadores contemplan una integración opcional con un procesador de tarjetas, mediante la cual podrían obtener ingresos por el procesamiento contratado por el comercio. No se necesita contratar ese procesador para usar el POS básico.

La arquitectura de pagos está documentada en [`docs/PAYMENTS-MODULE.md`](docs/PAYMENTS-MODULE.md). El diseño separa la información de tarjetas del navegador: las credenciales de procesamiento deben permanecer en el servidor del comercio.

> *El software es libre. El conocimiento es libre.*

## ¿A qué negocios está dirigido?

- **Servicios:** lavanderías, tintorerías, arreglos de ropa, talleres y reparación.
- **Alimentos:** cafeterías, pequeños restaurantes y comercios con preparación de pedidos.
- **Comercio minorista:** inventario, códigos de barras, comprobantes y ventas.
- **Servicios con citas:** salones y negocios que necesitan agenda, empleados o comisiones.

El proyecto original continúa incorporando nuevas plantillas.

## Edición Single-PC: un mostrador en un solo archivo

El POS de referencia atendió dos tintorerías entre junio y septiembre de 2026. El 30 de septiembre el negocio migró a un sistema más nuevo para varias computadoras. La edición anterior quedó disponible como [`single-pc/ozark-pos-single-pc.html`](single-pc/ozark-pos-single-pc.html).

**Características principales:**

1. **Descargar y abrir.** No requiere instalación, cuenta, internet ni servidor.
2. **Flujo de trabajo real:** recepción → detalle → preparación → almacenamiento → entrega; clientes, cuentas, cajas, rutas, control horario y reportes.
3. **Cobros:** efectivo, cheque y registro de tarjetas procesadas con una terminal bancaria independiente.
4. **Límites claros:** mensajes de texto, envío de estados por correo, lector bancario conectado, enlaces de pago, seguimiento web, fotografías, QuickBooks y sincronización de varias computadoras exigen un servidor y están deshabilitados.
5. **Datos locales:** hay un respaldo completo en un archivo JSON, pero el original **no tiene restauración con un clic**. Nuestro fork deberá resolverlo antes de utilizarse comercialmente.

El programa empieza sin clientes ni pedidos reales; incluye empleados y precios de muestra. **Los NIP de demostración son públicos y deben cambiarse.** Consulta [el manual de Single-PC](single-pc/README.md).

El código y las pruebas de la aplicación original legible están en [`reference/ozark-pos/`](reference/ozark-pos/), junto con [su explicación técnica](docs/OZARK-REFERENCE.md).

## Desarrollo del sistema original con Claude

La tintorería de origen, Ozark Cleaners (Arkadelphia y Hot Springs, Arkansas), utiliza software de punto de venta desarrollado con Claude, de Anthropic. El propietario describe cambios en lenguaje natural y un proceso de desarrollo modifica el sistema, genera pruebas y bloquea despliegues que no superan las comprobaciones.

El relato y sus limitaciones están disponibles en [el sitio original](https://custompos.org/built-with-claude.html) y en [`built-with-claude.html`](built-with-claude.html).

Según el historial y las bitácoras del desarrollador, al 12 de octubre de 2026 se reportaban:

- 94 commits del sistema utilizado desde el 1 de octubre, distribuidos en 9 de los primeros 12 días.
- 1,226 comprobaciones sin fallos ese día; 91 nuevas secciones de comprobación después de la migración de septiembre.
- Más de 48 compilaciones registradas, y al menos 6 despliegues bloqueados por pruebas.
- 2,082 de 2,128 commits desde el 20 de junio marcados con `Co-Authored-By: Claude`.

En el sistema del negocio original, los reembolsos, anulaciones y créditos están restringidos, y los ajustes de datos pasan por sus registros de actividad. La aplicación actual para varias computadoras **no está incluida** en este repositorio: consulta [el plan de importación modular](docs/V2-MODULAR-IMPORT.md).

*Claude es de Anthropic. CustomPOS es un proyecto independiente y no está afiliado con Anthropic.*

## Componentes publicados del proyecto

### Sitio de presentación

[`index.html`](index.html) presenta el proyecto, las condiciones de uso y su propuesta comercial, con temas claro y oscuro.

### Motor configurable

[`pos.html`](pos.html) es el archivo autónomo que permite crear distintas configuraciones de POS. Entre las funciones que documenta el proyecto:

- **Dinero y cobros:** efectivo, cambio, tarjetas a través de integración segura, cuentas de clientes, impuestos, descuentos, cupones, propinas, anticipos, división de cuentas, reembolsos, anulaciones y tickets.
- **Administración:** corte de caja tipo Z, arqueos, horas trabajadas, historial de ventas, reposición de inventario y estados de cuenta.
- **Operación:** inventario, códigos de barras, citas, pantalla de cocina, mesas, cotizaciones, listas de control, tiempos de preparación, indicadores, opciones adicionales y disponibilidad.
- **Personal y clientes:** registro de entrada y salida, NIP, funciones por empleado, comisiones, perfiles, fidelización, tarjetas de regalo, avisos, tablero de estados y rastreo de pedidos.
- **Derechos laborales:** turnos, descansos, solicitudes de ausencia, reemplazos, incidentes, distribución de propinas y portal de empleados. **Estas reglas no deben suponerse compatibles con la legislación mexicana.**
- **Salud financiera:** costo de personal respecto de ventas, margen bruto, productos principales, horarios de mayor demanda y clientes inactivos.

### Constructor de sistemas

[`builder.html`](builder.html) permite elegir tipo de negocio, configurar estaciones y artículos y descargar el POS generado con su archivo `CLAUDE.md`.

El [catálogo de 24 plantillas](docs/TEMPLATES.md) contempla comercio, cafetería, tintorería, reparación, salón, bar, panadería, carnicería por peso, pizzería, florería, lavandería de autoservicio, tatuajes, restaurante y más. Incluye vista previa.

### Pagos

La integración de cobros separa el registro de un pago de la autorización real por parte del procesador bancario. Sin un procesador conectado, el POS **solo registra** un cobro; no debe dar a entender que una tarjeta fue autorizada.

El proyecto propone un adaptador CardConnect/CardPointe documentado en [`docs/PAYMENTS-MODULE.md`](docs/PAYMENTS-MODULE.md) y un servicio de pagos independiente [`payments/pay-server.js`](payments/pay-server.js), capaz de gestionar operaciones como `/charge`, `/refund`, `/void` y `/inquire`. Su validación utiliza [`tools/validate-cardconnect.js`](tools/validate-cardconnect.js) con credenciales de entorno, no guardadas en el repositorio.

**Nuestra lavandería:** inicialmente registrará pagos en efectivo, transferencias o cargos ejecutados en una terminal bancaria externa. No activaremos una pasarela estadounidense por defecto.

### Sincronización entre dispositivos

[`hub.js`](hub.js) es el servidor Node opcional para conectar terminales. El uso compartido se activa expresamente con `?hub=…`. **Nuestra lavandería operará inicialmente en una sola computadora**, sin este servidor.

### Compilación

El comando `node build.js` genera `dist/custompos.html`, una versión autónoma que incorpora el constructor. El repositorio incluye pruebas automatizadas en `tests/`.

## Cómo probar el proyecto

- **Sitio de presentación:** abrir `index.html`.
- **Constructor autónomo:** ejecutar `node build.js` y abrir `dist/custompos.html`.
- **Constructor y motor mediante HTTP local:** ejecutar `python3 -m http.server 8000` y visitar `http://localhost:8000/builder.html`.
- **Motor de demostración:** abrir `pos.html`.
- **Lavandería para una computadora:** abrir `single-pc/ozark-pos-single-pc.html` en Chrome o Edge.
- **Compartir entre dispositivos:** ejecutar `node hub.js` y abrir `http://<host>:8090/pos.html?hub=http://<host>:8090`.

## Ejecutar las pruebas

```bash
npm install
npx playwright install chromium
export CHROMIUM_EXE="$(node -e "console.log(require('playwright-core').chromium.executablePath())")"
npm test
```

En Windows, el comando para configurar `CHROMIUM_EXE` es diferente. La integración continua original ejecuta las pruebas de navegador y el flujo de GitHub Pages publica el sitio, el constructor y la demostración mediante `.github/workflows/pages.yml`.

Los cambios de la edición mexicana deben superar, además, pruebas de kilo/pieza, anticipos, saldos, impresión y recuperación.

## Estado de traducción

- El **manual de Single-PC** está en español.
- El **README principal** está en español en esta rama.
- La **interfaz Single-PC** cuenta con una capa inicial de traducción; todavía existen mensajes y flujos no cubiertos.
- La **documentación técnica adicional** y el **constructor genérico** requieren traducción por separado. La traducción no cambia identificadores, código, fórmulas ni interfaces de programación.

## Licencia

[MIT](LICENSE) © Brayden Ross Sanders / 7Site LLC. Se permite usar, modificar y redistribuir el software con los avisos de licencia y atribución correspondientes.

Para cotejar las afirmaciones y la evolución del proyecto consulta [el README original en inglés](README.en.md).
