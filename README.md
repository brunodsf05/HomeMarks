# HomeMarks
¿Quieres que tu **página de inicio** muestre los **marcadores**? ¡Esto es lo que buscas!

Mejora la experiencia de usar los marcadores con una interfaz atractiva, rápida y funcional, pensada para acceder a todo en un instante.

![Extensión HomeMarks en funcionamiento](/docs/assets/hero.png)

## Características
-   Nada de configuraciones... ¡HomeMarks siempres cargará los marcadores de tu navegador!
-   Interfaz limpia y minimalista.
-   Navegación veloz ya sea con teclado o ratón.
-   Barra de búsqueda para localizar marcadores o hacer búsquedas web.
-   Compatible con varios navegadores.


> [!WARNING]
> Este proyecto aún está en desarrollo. De momento Firefox no es compatible. De momento HomeMarks te muestra los marcadores, permite filtrar y buscar en internet.

## Estado del proyecto

- [x] Cargar marcadores del navegador
- [x] Búsqueda integrada
- [ ] Compatibilidad con Firefox
- [ ] Modificar marcadores (Renombrar, crear, eliminar y mover)
- [ ] Recargar los marcadores cuando se actualicen, es decir, si el usuario utiliza la barra de marcadores del navegador 

## Desarrollo

### Instalación

1.  Clona este repositorio y entra al proyecto.
2.  Instala las dependencias ``pnpm install``

### Prueba la interfaz

1.  Ejecuta ``pnpm run dev``. Ahí se te ejecutará un servidor de desarrollo, los marcadores mostrados son **MockData**.

### Prueba la extensión

#### Requisitos
Navegador basado en **Chromium**. (La compatibilidad con **Firefox** está en desarrollo).

1.  Ejecuta ``pnpm run build``.
2.  Abre la página de **gestionar de extensiones**.
3.  Dentro activa el modo desarrollador.
4.  Selecciona **carga descomprimida**.
5.  Elige la carpeta **dist**. (La que fue generada por ``pnpm run build``)
6.  Abre una nueva pestaña.
