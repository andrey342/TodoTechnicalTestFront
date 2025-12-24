# Todo Technical Test Frontend - Sistema de Gestión de Tareas para la prueba técnica de BEYOND HOSPITALITY

## Índice
1. [Introducción](#introducción)
2. [Instalación Rápida](#instalación-rápida)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Funcionalidades Principales](#funcionalidades-principales)
5. [Detalle de Componentes](#detalle-de-componentes)
6. [Conceptos Técnicos Clave](#conceptos-técnicos-clave)
7. [Decisiones Técnicas](#decisiones-técnicas)
8. [Posibles Mejoras y Consideraciones Futuras](#posibles-mejoras-y-consideraciones-futuras)
9. [Uso de IA](#uso-de-ia)
10. [Conclusión](#conclusión)
11. [Autor](#autor)

---

## Introducción

Este proyecto es el cliente web para el sistema de gestión de Tareas (Todo Management). Está construido con **Angular 21** y utiliza **TailwindCSS** para los estilos. El objetivo principal es ofrecer una interfaz moderna, robusta y escalable para la gestión de tareas, listas y progresiones.

---

## Instalación Rápida

Para compilar y ejecutar este proyecto, necesitas tener Node.js instalado. A continuación se presentan dos métodos:

### Opción 1: NVM (Recomendado)
El uso de [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) permite cambiar rápidamente entre versiones de Node, evitando problemas de compatibilidad. **Esta es la opción que utilizo en mi día a día** ya que me permite cambiar de versión muy rápidamente.

1.  **Instalar NVM** (si no lo tienes).
2.  **Instalar/Usar la versión correcta**:
    Este proyecto funciona con la versión **Node v20.17.19**.
    ```bash
    nvm install 20.17.19
    nvm use 20.17.19
    ```
3.  **Instalar Angular CLI**:
    ```bash
    npm install -g @angular/cli@21.0.4
    ```
4.  **Instalar dependencias**:
    ```bash
    npm install
    ```
5.  **Ejecutar el proyecto**:
    Utiliza el flag `-o` para abrir automáticamente el navegador.
    ```bash
    ng serve -o
    ```
    Alternativamente, puedes usar el comando estándar de npm (aunque asegúrate de abrir el navegador manualmente si no se abre):
    ```bash
    npm start
    ```


### Opción 2: Instalación Estándar
Si ya tienes una versión de Node compatible instalada globalmente:

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Ejecutar el proyecto**:
    ```bash
    ng serve -o
    ```
    O usando npm:
    ```bash
    npm start
    ```


Accede a la aplicación en [http://localhost:4200/](http://localhost:4200/).

---

## Estructura del Proyecto

La estructura de carpetas en `src/app` está diseñada para ser modular y escalable:

-   **`custom-library/`**: Contiene componentes UI reutilizables y agnósticos a la lógica de negocio. Funciona como un "Design System" interno totalmente reutilizable para otros proyectos.
-   **`home/`**: Contiene la lógica principal de la vista, modales de negocio y orquestación de datos.
-   **`services/`**: Servicios globales que manejan la comunicación con APIs, estado y Websockets.
-   **`interceptors/`**: Manejador global de excepciones para evitar repetir lógica de error en cada llamada.
-   **`environments/`**: Archivos de configuración para distintos entornos (dev, prod).

---

## Funcionalidades Principales

El frontend ofrece varias funcionalidades clave para la gestión de todo el ciclo de vida de las tareas:

1.  **Creación de Listas y Tareas**:
    -   Desde el panel principal puedes crear nuevas listas (`+`) y añadir tareas a cada una.
    -   El formulario de creación valida los campos obligatorios antes de enviar.

2.  **Impresión de Detalles (Print)**:
    -   Al pulsar el botón de impresora en una tarea, el sistema genera un reporte.
    -   **Ejemplo**: Para un Item con *Id=1, Title="Complete Project Report", Description="Finish the final report...", Category="Work", Completed=True* y un historial de progresos.
    -   **Resultado**: Se descargará automáticamente un archivo `.txt` con el formato exacto solicitado en la prueba técnica.
    -   *Utilidad*: De esta manera sencilla puedes verificar que la lógica funciona correctamente sin necesidad de mirar la consola del backend (aunque también se imprime ahí). Además, he añadido que se impriman los detalles de cada item dentro del archivo para mayor claridad.
    -   **Ejemplo Visual del Archivo Generado**:
        ```text
        1) BUG - bla bla bla bla (Documentation) Completed:True
        12/24/2025 02:11:00 PM - 12.00%      |OOOOOO                                            |
        12/24/2025 02:17:00 PM - 37.00%      |OOOOOOOOOOOOOOOOOO                                |
        12/24/2025 02:22:00 PM - 87.00%      |OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO      |
        12/24/2025 08:28:00 PM - 100.00%     |OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO|
        2) Complete Project Report - Finish the final report for the project (Work) Completed:True
        3/18/2025 02:09:00 PM - 30.00%      |OOOOOOOOOOOOOOO                                   |
        3/19/2025 02:09:00 PM - 80.00%      |OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO          |
        3/20/2025 02:09:00 PM - 100.00%     |OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO|
        ```

3.  **Gestión de Progreso**:
    -   Puedes registrar avances mediante el modal de edición.
    -   **Validaciones**: No se permite superar el 100% total, las fechas deben ser consecutivas y el progreso incremental.

4.  **Bloqueo y Borrado**:
    -   Si una tarea supera el **50% de progreso**, se bloquea su edición y borrado por seguridad, mostrando avisos claros al usuario.

---

## Detalle de Componentes

### Custom Library (`src/app/custom-library`)
Esta librería actúa como un set de componentes base (tipo Bootstrap o Tailwind UI) hechos a medida:

-   **`todo-button`**: Botón con estados de carga (loading spinner), variantes (primary/secondary) y tamaños.
-   **`todo-input`**: Input de texto base estilizado.
-   **`todo-date-input`**: Input de fecha con validaciones de rangos (min/max).
-   **`todo-percent-input`**: Input numérico optimizado para porcentajes (0-100).
-   **`todo-card`**: Contenedor visual tipo tarjeta.
-   **`todo-badge`**: Pequeña cápsula de color para mostrar estados o categorías.
-   **`todo-modal`**: Wrapper genérico que maneja el backdrop, animaciones y cierre.
-   **`todo-icon-button`**: Botón optimizado para iconos (ej: papelera, lápiz).
-   **`todo-category-selector`**: Dropdown especializado para seleccionar categorías.
-   **`todo-progress-bar`**: Barra visual que muestra el % completado.
-   **`todo-progress-history`**: Lista visual del historial de progresos.
-   **`todo-toast`**: Notificaciones emergentes (Success/Error/Warning).
-   **`todo-column`**: Layout para organizar las listas en columnas.

### Home (`src/app/home`)
Aquí reside la lógica de negocio específica de la aplicación:

-   **`home.component`**:
    -   Orquestador principal. Carga las listas y escucha eventos de SignalR.
-   **`create-list-modal`**:
    -   Modal específico para crear nuevas listas de tareas.
-   **`todo-item-modal`**:
    -   El componente más complejo. Maneja tanto la **Creación** como la **Edición** de tareas.
    -   Contiene la lógica de validación de progresos, bloqueo por >50%, y registro de nuevos avances.

---

## Conceptos Técnicos Clave

### Estilos Centralizados (`src/styles.css`)
He centralizado las variables y clases de utilidad comunes (como colores `primary`, `secondary`, espaciados) en el archivo de estilos global. Aunque uso **TailwindCSS**, he creado abstracciones para no repetir clases constantemente en el HTML.

### SignalR (`src/app/services/signalr.service.ts`)
Maneja la conexión en tiempo real.
-   Al cargar la aplicación, verás un **Toast** indicando si la conexión con el servidor de notificaciones fue exitosa o falló.
-   Su función principal es escuchar el evento de "Impresión finalizada" para descargar el archivo automáticamente al cliente.

### Interceptors (`src/app/interceptors/`)
Manejador de errores global. Si una API falla, el interceptor captura el error y muestra un Toast descriptivo. Esto evita tener que poner un `try-catch` y un mensaje de alerta en cada llamada individual, previniendo olvidos y código duplicado.

### NSwag
Utilizo NSwag para generar el cliente API automáticamente (`npm run update-api`). Esto me ayuda a optimizar mi tiempo y evitar fallos tontos de tipado, ya que el frontend siempre está sincronizado con los contratos del backend.

-   **Comando**: `npm run update-api`
-   **Funcionamiento**: Este script lee la definición Swagger desde `http://localhost:32700/swagger/v1/swagger.json` (configurado en `nswag.json` y coincidente con `environment.ts`) y actualiza el archivo `src/app/api/api-client.ts`.
-   **Beneficio**: Garantiza que los tipos de datos (DTOs) y los endpoints en el frontend coincidan exactamente con el backend, eliminando errores de tipado y ahorrando tiempo de desarrollo.

---

## Decisiones Técnicas

1.  **Signals vs Reactive Forms**:
    -   Los formularios se podrían haber hecho perfectamente con *Reactive Forms*, que es lo que siempre uso en entornos profesionales. Sin embargo, para esta prueba **he decidido utilizar Signals** como un reto personal y de aprendizaje adicional. Quería demostrar capacidad de adaptación a las nuevas características de Angular y gestionar el estado del formulario de una manera más "moderna" y granular.

2.  **Constantes "Hardcodeadas"**:
    -   Verás que uso strings como `'primary'`, `'left'`, etc. Soy consciente de que lo ideal es tener un archivo de constantes. En un proyecto real lo extraería, pero aquí he priorizado la velocidad de desarrollo.

3.  **Librería de Componentes Propia**:
    -   El tema de los estilos y los componentes se podría mejorar mucho. Lo hice sin entrar demasiado en detalle visual extremo para que no me quitara todo el tiempo, pero he estructurado el código creando **librerías totalmente reutilizables** (`custom-library`) como si estuviera construyendo un pequeño framework de UI para futuros proyectos. En la prueba técnica he decidido no complicarme mucho más visualmente para dedicarle tiempo de calidad al Backend.

---

## Posibles Mejoras y Consideraciones Futuras

1.  **Modal de Aceptación**: Había pensado implementar un modal de confirmación genérico (por ejemplo, "¿Estás seguro de borrar esto?"), pero al final prioricé otras tareas core. Sería una mejora fácil de UX.
2.  **Reactive Forms Híbrido**: Para validaciones muy complejas, mezclar Signals con Reactive Forms sería la arquitectura ideal.
3.  **Implementación Completa de Backend**: Dado que el backend tiene muchas "Posibles mejoras y consideraciones futuras" documentadas (Auth, Usuarios, etc.), la evolución natural del frontend sería implementar esas pantallas: Login, Registro de Usuarios, Roles y personalización de perfil.

---

## Uso de IA

Se ha utilizado IA para estructurar este README de manera correcta, para consultas puntuales sobre configuración (Tailwind, NSwag) y para tareas repetitivas de refactorización. Todo el contenido y código ha sido supervisado estrictamente por mí.

---

## Conclusión

Este proyecto intenta equilibrar una arquitectura limpia y reutilizable con la agilidad necesaria para una prueba técnica, demostrando conocimientos avanzados en las últimas versiones de Angular.

---

## Autor
Hecho con cariño y mucho café por Andrey.