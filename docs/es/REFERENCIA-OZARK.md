# La implementación de referencia: qué significa poder generar un sistema como Ozark

[Documento original en inglés](../OZARK-REFERENCE.md) · [Índice de documentos en español](README.md)

> **Estado:** la aplicación original completa se encuentra en [`reference/ozark-pos/`](../../reference/ozark-pos/). Es la última versión pública de la generación 1 (v1). El negocio la utilizó desde junio de 2026 hasta el 30 de septiembre de ese año; después migró a la generación 2, que no está incluida en este repositorio.
>
> La copia publicada se actualizó el 10 de octubre de 2026. El autor informa que supera 2,608 comprobaciones monetarias, 749 comprobaciones de renderizado (31 pantallas por tres estados), 597 de sincronización, análisis sintáctico y detección de botones sin función asignada. Esas pruebas describen la **referencia original**, no nuestra variante mexicana.

La idea de incluir el código original no es obligarnos a copiar su arquitectura. Es mostrar el estándar de comportamiento de un POS probado en operación: qué hace, cómo lo prueba y por qué existen ciertas decisiones. La edición ejecutable para una sola computadora está en [`single-pc/`](../../single-pc/).

## Lo primero que debemos estudiar: las pruebas

| Archivo del proyecto | Problema que busca impedir |
|---|---|
| `check-app-js.js` | Que llegue al mostrador un archivo con errores de sintaxis |
| `test-money.js` | Cobros duplicados, formatos de vencimiento y reembolsos que no llegaron al procesador |
| `test-render.js` | Pantallas que fallan o muestran `undefined` al usuario |
| `test-render-live.js` | Una versión que supera otras pruebas pero falla al cargar datos reales |
| `check-dead-buttons.js` | Botones que llaman a funciones inexistentes |
| `test-hub.js` | Problemas de fusión y sincronización; ausencia de datos no equivale a eliminación |
| `audit-patterns.js` | Indicadores internos activados en un proceso y nunca limpiados cuando algo falla |

La idea transferible no es copiar las aserciones sin entenderlas. Es **documentar cada defecto que apareció en producción y mantener una prueba que impida repetirlo**.

## Qué necesita expresar el motor general

### Núcleo

| Mecanismo | Por qué es necesario | Enfoque generalizable |
|---|---|---|
| Combinar registros individuales y conservar el sello temporal más reciente | Una computadora desactualizada eliminó 21 registros al sincronizar | La ausencia de un registro no debe interpretarse como borrado |
| Reloj híbrido y comparación uniforme de fechas | Existían registros antiguos con marcas de milisegundos y otros con relojes híbridos incompatibles | Una única función de comparación en todas las rutas de sincronización |
| Persistencia local por colección | Guardar toda la base por cada cambio resultaba más lento que persistir solo los datos modificados | Guardar únicamente colecciones afectadas |
| Validar la estructura al importar datos | Algunas órdenes carecían del arreglo `lines` y rompían la pantalla | Un guardián de esquema cuando entra la información |

El desarrollador reportó aproximadamente 13 ms frente a 0.5 ms en la comparación entre guardado completo y parcial bajo el caso medido. La pantalla de detalle podía guardar decenas de veces durante un pedido.

### Comercio común: controles de dinero

- **Evitar cobros duplicados consultando el registro de pagos**, no un simple indicador temporal; el original detectó un cargo repetido con 44 segundos de diferencia.
- **Consultar el libro de movimientos inmutable** antes de cobrar una deuda; un saldo o estado aislado puede quedar desactualizado.
- **Claves de idempotencia** para que repetir una solicitud bancaria no genere otro cargo.
- **Marcas específicas para credenciales guardadas**, cuando existe un procesador externo que las maneja.
- **Una verificación de tarjeta de $0 no garantiza que se pueda cobrar después.** Comprobar la autorización real.

Para nuestra lavandería, inicialmente sin pasarela bancaria integrada, lo esencial es que los anticipos, devoluciones y cobros en efectivo mantengan un historial coherente y no se contabilicen dos veces.

### Paquetes de ciclo de trabajo

El sistema original ofrece etiquetas duraderas por prenda, división de bolsas, asignación de áreas de almacenamiento, reconciliación de entradas y salidas, impresión por sucursal y rutas de entrega con manifiestos.

La regla más importante es que **las etapas físicas de un pedido avanzan de manera coherente**, y que los retrocesos o cancelaciones excepcionales necesitan controles. Los nombres exactos de las etapas son particulares de cada negocio.

### Operaciones de un negocio real

El proyecto describe 28 reglas de integridad para inventario, proceso físico y dinero; reportes de fallos desde el arranque; respaldos cifrados externos que se restauran periódicamente para comprobarse; instantáneas locales cifradas; registro de dispositivos; detección de estaciones desactualizadas; asignación de una estación responsable de tareas automáticas y configuración remota con valores controlados.

Para la edición Single-PC, algunas de estas funciones requieren servidor y **no están disponibles**. No debe confundirse una capacidad de la referencia con una función de nuestra app local.

## Lo que el plan de equivalencia todavía no había contemplado

El plan se cerró el 8 de julio de 2026; varias funciones importantes aparecieron después de operar el sistema en condiciones reales.

1. **Sincronización incremental en cuatro fases.** El servidor entrega solo lo modificado, los equipos envían solo sus cambios y el historial de revisiones permite reconstruir el estado. Al medir el tráfico se hallaron eliminaciones lógicas que se reenviaban sin necesidad: se pasó de 229,736 a 5,248 bytes por revisión. También se detectaron valores que viajaban sin cambios en 2,406 de 2,408 solicitudes.
2. **Espejo de consistencia.** Cada estación calcula huellas digitales de sus colecciones y el servidor identifica las diferencias. Las implementaciones deben coincidir exactamente.
3. **Rechazo o ajuste de marcas temporales imposibles.** No se permite que una marca de borrado con fecha futura invalide registros reales.
4. **Los bytes de imágenes no se insertan directamente en la base sincronizada.** Se convierten en referencias.
5. **Aplicación envolvente de escritorio.** Mantiene identidad local, impresión, instancia única e inicio sin internet, sin perder el sistema centralizado de actualizaciones.
6. **Respaldos que demuestran su validez.** Se cifran, restauran de prueba, comparan con el negocio y muestran claramente la antigüedad del último respaldo correcto.

## Los cinco principios fundamentales

1. **Un error nunca debe parecer un resultado correcto.** Una pantalla vacía tras fallar la carga no significa «no hay mensajes».
2. **La ausencia no significa eliminación.** Solo una marca explícita debe borrar o anular un registro.
3. **Confiar en el historial de movimientos, no solo en un indicador.** Los indicadores pueden restaurarse de forma incorrecta; el registro contable debe ser auditable.
4. **Una prueba que no puede fallar no demuestra nada.** Para cada corrección conviene comprobar que falla en el código anterior y pasa en el corregido.
5. **Marcar lo reemplazado antes de borrarlo definitivamente.** El historial debe permitir comprender y verificar una corrección.

Y un principio adicional que el autor considera especialmente importante: **medir antes de sacar conclusiones**. Algunos incidentes atribuidos al programa provenían en realidad de archivos equivocados, equipos diferentes o datos de versiones anteriores.

## Aplicación a nuestro fork mexicano

La edición [Single-PC](../../single-pc/ozark-pos-single-pc.html) mantiene datos locales y carece de restauración automática. Priorizaríamos un importador verificado de JSON, pruebas de precios por kilogramo y pieza, saldos y caja, impresión y validación de permisos antes de su uso real.

La documentación original es [docs/OZARK-REFERENCE.md](../OZARK-REFERENCE.md). Este archivo conserva los mecanismos y recomendaciones en español; los nombres de archivos, rutas de código y conceptos técnicos siguen siendo referencias al proyecto original.
