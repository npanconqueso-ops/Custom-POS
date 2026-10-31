# Cómo contribuir a CustomPOS

[Documento original en inglés](CONTRIBUTING.md) · [README en español](README.md)

CustomPOS busca demostrar que los pequeños negocios pueden **ser propietarios de su software** en lugar de alquilarlo. Si deseas contribuir, mantén ese principio como guía.

## Principios que debemos respetar

1. **El programa sigue siendo gratuito.** No introducir suscripciones, cuotas por usuario, funciones bloqueadas tras un pago, verificaciones de licencia ni conexiones obligatorias para validar su uso. El modelo de ingresos contemplado por los autores es una integración **opcional y sustituible** de procesamiento bancario.
2. **Prioridad al uso local, sin dependencia del proveedor.** Una aplicación descargada debe poder seguir funcionando sin conexión, en la computadora del propietario y sin un servidor obligatorio. La sincronización mediante `hub` siempre es opcional.
3. **Los datos pertenecen al negocio.** Se guardan en su navegador y, si lo habilita, en su propio servidor. Deben poder exportarse y trasladarse. No agregar telemetría, balizas de análisis ni cargas silenciosas.
4. **No almacenar secretos en navegador ni repositorio.** Las credenciales del procesador bancario deben permanecer en el entorno del servidor de pagos; las claves de sincronización, en el servidor `hub`. No subir contraseñas, datos personales reales o detalles privados de infraestructura.
5. **Código legible.** El usuario debe poder abrir los archivos y comprenderlos. El producto descargado no se minifica deliberadamente; conservar comentarios y estructura clara es una característica del proyecto.

## Organización del código

| Archivo | Función |
|---|---|
| `index.html` | Página principal de CustomPOS |
| `pos.html` | **Motor principal** configurable mediante `window.CUSTOMPOS_FLOW` |
| `builder.html` | Asistente/estudio para elegir negocio, configurar y descargar un POS |
| `hub.js` | Servidor Node opcional para sincronización; ver [docs/HUB-SYNC.md](docs/HUB-SYNC.md) |
| `build.js` | Incorpora el motor en el constructor y genera `dist/custompos.html` |
| `tests/` | Pruebas de navegador organizadas por característica |
| `docs/` | Arquitectura, pagos, sincronización y diseño |
| `JOURNAL.md` | Bitácora histórica de construcción y decisiones |
| `single-pc/` | Edición original de una sola computadora, sobre la que trabajamos |

Los archivos `pos.html` y `builder.html` se mantienen deliberadamente como archivos grandes y autónomos. Busca las divisiones `/* ===== SECTION ===== */` y el registro de módulos cerca del inicio de `pos.html` para orientarte.

## Criterios para aceptar modificaciones

Cada modificación debe verificarse en un navegador real **sin errores de consola** antes de considerarse terminada:

- **Agregar o actualizar pruebas** que demuestren el comportamiento cambiado. Las pruebas de `tests/` utilizan Playwright y detectan errores en la consola.
- **Ejecutar la batería completa**; el proyecto original propone, por ejemplo:

  ```bash
  npm i -D playwright-core
  CHROMIUM_EXE=/path/to/chromium bash -c 'for t in tests/*.js; do node "$t" || echo "FAIL $t"; done'
  ```

- **Separar motor y módulos:** una función es parte del motor si todo negocio la necesita; si un negocio puede vender sin ella, debe ser opcional y activarse por configuración.
- **Actualizar la documentación correspondiente** (`tests/README.md`, `docs/*.md`) y registrar la historia del cambio en `JOURNAL.md`.

En nuestro fork, el primer archivo de verificación de la localización es `tests/mx-single-pc.js`, pero no sustituye las pruebas en navegador.

## Contribuciones iniciales recomendadas

- Diseñar una nueva plantilla comercial en `builder.html`, demostrando que funciona sin cambiar el motor.
- Agregar un adaptador de cobros con la interfaz independiente del procesador (consulta [docs/PAYMENTS-MODULE.md](docs/PAYMENTS-MODULE.md)).
- Crear importadores y exportadores de otros datos (clientes e inventario), en la línea del soporte CSV existente.
- Mejorar accesibilidad, uso móvil y sencillez de operación para personal no técnico.

En el fork mexicano también son pertinentes traducción de mensajes, pruebas de kilo/pieza, restauración de respaldos, tickets térmicos y revisión de cumplimiento fiscal.

## Licencia

Al contribuir aceptas publicar los cambios bajo la [licencia MIT](LICENSE) del repositorio. Quien descarga el POS conserva su derecho a utilizarlo y modificarlo conforme a esa licencia.
