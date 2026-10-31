# Instalación y plan de pruebas funcionales — Lavandería POS MX

**Versión:** rama `desarrollo-mx`. **Estado:** experimental.  
**Equipo objetivo:** una computadora con Windows 10/11, Chrome o Edge.  
**Datos:** exclusivamente ficticios; no operar con dinero o clientes reales.

> Esta guía está destinada a quien operará la lavandería. Separa pruebas manuales (sin instalar programas adicionales) de pruebas automatizadas para desarrolladores. Una prueba **no se considera aprobada** hasta ejecutarse y registrar su resultado; la existencia de esta guía no implica que ya se hayan ejecutado todos los casos.

## 1. Instalación de prueba en Windows (sin servidor)

1. Abre el [repositorio en la rama desarrollo-mx](https://github.com/npanconqueso-ops/Custom-POS/tree/desarrollo-mx).
2. En GitHub, **Code → Download ZIP** y extrae el contenido en una ubicación fija como `C:\LavanderiaPOS\`.
3. En la carpeta extraída abre `single-pc\ozark-pos-single-pc.html` mediante **Abrir con → Google Chrome** (Edge también puede funcionar).
4. **Abre siempre el mismo archivo desde la misma carpeta y el mismo perfil de navegador.** No lo copies a otra ruta tras registrar pruebas; el almacenamiento local puede quedar asociado a la ruta/origen anterior.
5. Inicia sesión como propietario con el NIP de demostración **1234**. Encargado **2222** y Mostrador **1111** también son NIP públicos de ejemplo; cámbialos en Configuración de empleados antes de cualquier uso real.

No hacen falta Node.js, Git ni una base de datos para abrir el archivo HTML.

**No usar el botón de demostración de custompos.org ni la rama `main`: corresponden a versiones diferentes.**

## 2. Preparación de escenarios

En **Administración → Configuración → Sucursales (Admin → Settings → Stores)**, asigna un nombre ficticio de prueba, por ejemplo **Lavandería Prueba MX**, y configura **impuesto 0% solo para aislar las operaciones aritméticas de estas pruebas**. Este valor no es una recomendación fiscal para México. Consulta al contador antes de operar.

En **Administración → Configuración → Reglas (Rules)** ajusta la tarifa de lavado por peso a **$30.00 por kg**, en el campo «Lavado y secado (MXN/kg)». Verifica que el sistema conserve el valor después de guardar.

En **Administración → Catálogo de precios (Price Book)** configura o agrega un artículo ficticio «Edredón de prueba» con **$80.00 por pieza**. El catálogo original contiene artículos y precios de muestra estadounidenses; no los trates como precios sugeridos para México.

Crea un cliente ficticio:

- Nombre: **Cliente Prueba MX**.
- Teléfono: **5500000000** (ficticio).
- No registres datos de personas reales.

## 3. Casos manuales y resultados esperados

Registra el resultado de cada caso como **Aprobado**, **Falló** o **No disponible**.

### P01 — Arranque y navegación

1. Abre el HTML desde el disco.
2. Comprueba que aparece la pantalla inicial y que puede solicitarse el NIP.
3. Entra como propietario y abre Administración, Recepción rápida, Detalle, Búsqueda y Caja.
4. Verifica que no hay pantallas en blanco ni mensajes de error.

**Esperado:** se navega sin errores; pueden permanecer textos sin traducir, que deben anotarse por separado.

### P02 — Cobro por kilogramo

1. Crea una recepción para Cliente Prueba MX.
2. Selecciona lavado por peso / lavado y secado. La edición original puede pedir crear el pedido primero y capturar el peso posteriormente en **Detalle**.
3. Ingresa **5 kg** y confirma la tarifa de **$30/kg**.
4. Revisa la descripción y el importe.

**Esperado, con impuesto de prueba al 0%:** `5 × $30.00 = $150.00`. Debe mostrar **kg**, no **lb**. El ticket interno debe conservar el peso y la tarifa.

### P03 — Cobro por pieza

1. Registra otro pedido para el mismo cliente.
2. En su detalle selecciona «Edredón de prueba» (o el artículo ficticio equivalente del catálogo).
3. Agrega **2 piezas** a **$80.00** cada una.

**Esperado:** `2 × $80.00 = $160.00`, sin unidades de peso. Si la edición obliga a describir cada pieza individualmente, registra dos líneas a $80.00.

### P04 — Combinación de kilo y pieza

1. Intenta registrar **3 kg × $30 = $90** y **1 pieza × $80 = $80** para el mismo cliente.
2. Comprueba si ambos conceptos pueden estar en **un mismo pedido y un mismo ticket** o si la aplicación crea órdenes separadas.

**Objetivo del negocio:** total conjunto de **$170.00** con impuesto de prueba del 0%. **Este flujo no está garantizado** por la edición actual. Si solo permite dos pedidos de $90 y $80, registra **No disponible / mejora pendiente**, no «Aprobado». No fuerces modificaciones de pedidos anteriores.

### P05 — Anticipo y saldo

1. Utiliza un pedido ficticio de **$150.00**.
2. Registra un anticipo de **$50.00**.
3. Confirma que el saldo pendiente es **$100.00**.
4. Cuando corresponda, registra un segundo pago de **$100.00**.

**Esperado:** total cobrado acumulado **$150.00**, saldo **$0.00**, sin duplicar cargos ni pagos.

### P06 — Cambios de estado y entrega

1. Identifica el pedido recibido.
2. Revisa la transición de Detalle a Preparación / Ubicación / Listo.
3. Marca el pedido como listo solo si se ha asignado una ubicación cuando la aplicación la exige.
4. Intenta completar la entrega.

**Esperado:** el pedido conserva su folio, cliente, líneas e importes; la entrega no crea un cobro duplicado. Si el flujo de tintorería tiene demasiados pasos para una lavandería pequeña, registrarlo como ajuste pendiente.

### P07 — Ticket y vista previa

1. Desde un pedido, utiliza la opción de imprimir.
2. Si no tienes impresora, usa el destino **Guardar como PDF** desde Chrome (Ctrl+P).
3. Comprueba nombre del local, folio, cliente ficticio, fecha, descripción, **kg o pieza**, total, anticipo y saldo cuando el formato los muestre.

**Esperado:** texto legible, unidad correcta y folio consistente. **Algunas etiquetas técnicas, como `Order:`, se han conservado para evitar romper el lector de códigos**, hasta reescribir y probar el analizador.

### P08 — Persistencia sin conexión

1. Registra un pedido ficticio y anota su folio.
2. Cierra el navegador completamente.
3. Abre **exactamente el mismo HTML** desde la misma carpeta y perfil.
4. Busca el pedido por folio.
5. Desconecta internet y vuelve a recorrer la aplicación.

**Esperado:** los datos permanecen y se puede navegar sin internet. **No cambies de navegador, perfil o ruta** durante esta comprobación.

### P09 — Exportación de respaldo

1. Desde la cuenta Propietario entra en Administración → Configuración.
2. Utiliza **Respaldo completo (todo) / Full backup (everything)**.
3. Guarda el `.json` fuera de la carpeta de la aplicación y verifica que el archivo existe y no está vacío.

**Esperado:** archivo JSON descargado. **La restauración con un clic todavía no está desarrollada**. NO borres datos ni cambies de equipo para intentar una restauración manual; eso será otra fase de pruebas.

### P10 — Caja y corte

1. Abre la caja para el local ficticio usando los controles que muestra el POS.
2. Registra cobros de prueba en efectivo y verifica el cambio.
3. Revisa el corte o arqueo de caja.
4. Comprueba que las denominaciones disponibles son mexicanas.

**Esperado:** cobros y saldo de caja consistentes. La moneda mexicana fue adaptada, pero faltan pruebas operativas.

### P11 — Errores de validación

Sin cobrar dinero real, intenta: peso vacío, peso `0`, peso negativo, artículo sin cantidad y anticipo superior al total. Comprueba si la aplicación rechaza los casos inválidos o si genera importes inconsistentes.

**Esperado:** el programa no debe guardar pedidos inválidos ni crear importes negativos inesperados. Registrar cada fallo.

## 4. Cómo reportar un problema

Envía estos datos para cada fallo:

```text
Caso: P02 — Cobro por kilogramo
Navegador y versión: Chrome ...
Paso donde ocurre: ...
Resultado esperado: 5 kg × $30 = $150
Resultado obtenido: ...
Mensaje de error (si aparece): ...
Captura de pantalla: [adjuntar]
```

Para ver errores técnicos en Chrome usa **Ctrl+Shift+J** para abrir la consola de desarrollador. No compartas contraseñas ni información real de clientes.

## 5. Verificaciones automáticas opcionales (para desarrollo)

Solo si deseas trabajar también con Node.js, instala una versión LTS desde [nodejs.org](https://nodejs.org/). Abre PowerShell en la carpeta **raíz** del repositorio extraído, no dentro de `single-pc`.

```powershell
node --version
node .\tests\mx-single-pc.js
```

La prueba **`mx-single-pc.js` es estática**: valida etiquetas, presencia de rutas de código, sintaxis y el diccionario de español; **no reproduce clicks ni ventas en un navegador**.

Para ejecutar la batería original del proyecto desde Windows, después de instalar Node.js:

```powershell
npm install
$env:CHROMIUM_EXE = "C:\Program Files\Google\Chrome\Application\chrome.exe"
npm test
```

Ajusta la ruta si Chrome está instalado en otra ubicación. **La batería original es extensa y puede fallar por aserciones que esperan textos de la edición inglesa**, además de errores genuinos. Se deben clasificar esos fallos; no presentar el resultado original como aprobación de la adaptación MX.

La rama tiene preparado el archivo `.github/workflows/ci.yml` para ejecutar pruebas en GitHub Actions, pero los forks pueden requerir habilitar Actions manualmente y no hay resultados visibles que permitan dar por aprobado ese proceso.

## 6. Condiciones mínimas antes de operar comercialmente

- Pruebas P01–P11 documentadas y errores críticos resueltos.
- Cobros e impuestos mexicanos revisados con contador.
- Respaldo y restauración completos, comprobados en otro perfil o equipo de prueba.
- Usuarios de demostración y claves predeterminadas sustituidos.
- Tickets probados físicamente con la impresora del negocio.
- La ruta comercial de cobro por kilogramo y pieza validada, incluida la decisión sobre pedidos mixtos.
- Eliminación o desactivación de módulos estadounidenses que no apliquen.

**No dar de alta clientes reales ni utilizar el POS como único control financiero mientras esté en esta etapa.**
