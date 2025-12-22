# TodoTechnicalTestFront - TaskManager Pro

Cliente Front-End moderno desarrollado en Angular para el TodoTechnicalTest. Este proyecto implementa una arquitectura basada en componentes reutilizables, integración con API vía NSwag y diseño sofisticado con TailwindCSS.

## 🚀 Características Principales

-   **Integración API Automática**: Cliente HTTP generado automáticamente desde Swagger (NSwag) para sincronización perfecta con el Backend .NET.
-   **Diseño Atómico & Reutilizable**: Librería de componentes `todo-*` altamente reutilizables.
-   **Interfaz Moderna**: Estilizado con TailwindCSS, soportando temas (Light/Dark mode capability in CSS structure) y fuentes de Google (Inter).
-   **Drag & Drop**: Funcionalidad de arrastrar y soltar tareas entre columnas usando Angular CDK.
-   **Gestión Avanzada de Tareas**: Modal multifuncional para la creación y edición de tareas con soporte para categorías (Work, Personal, Home) y registro lineal de progreso.

## 🛠️ Tecnologías

*   **Angular 19+** (Standalone Components)
*   **TailwindCSS v4**: Sistema de diseño utility-first.
*   **NSwag**: Generación de cliente TypeScript API.
*   **Angular CDK**: Directivas para Drag and Drop.

## ⚙️ Configuración y Ejecución

### 1. Prerrequisitos
Asegúrate de que el Backend esté corriendo en el puerto 32700 (swagger en `http://localhost:32700/swagger/v1/swagger.json`).

### 2. Instalación
```bash
npm install
```

### 3. Desarrollo Local
Para iniciar el servidor de desarrollo:
```bash
ng serve -o
```
La aplicación estará disponible en `http://localhost:4200/`.

### 4. Actualizar Cliente API
Si el Backend cambia (nuevos endpoints, DTOs modificados), regenera el cliente de Angular ejecutando:
```bash
npm run update-api
```
Esto leerá `nswag.json` y actualizará `src/app/api/api-client.ts`.

## 📂 Estructura del Proyecto

### `src/app/custom-library/`
Contiene los componentes de presentación reutilizables (Dumb Components).
-   `todo-button`: Botones con variantes (primary, secondary, danger, ghost).
-   `todo-input`: Inputs estilizados.
-   `todo-modal`: Wrapper genérico para modales.
-   `todo-card`: Tarjeta visual de una tarea.
-   `todo-column`: Columna visual de una lista de tareas.

### `src/app/home/`
Componentes de página y lógica de negocio (Smart Components).
-   `home.component`: Orquestador principal del tablero. Conecta `todo-column` con el API.
-   `create-list-modal`: Lógica de formulario para crear nuevas listas.

## 📝 Notas de Implementación

-   **API Client**: Se utiliza `TodoClient` inyectable (providedIn root) que abstrae todas las llamadas HTTP.
-   **Entornos**:
    -   Dev: Conecta a `localhost:32700`.
    -   Prod: Configurado para build de producción.
    
## 🎨 Estilos
Los estilos globales y variables de tema (colores primarios, espaciados) están centralizados en `src/styles.css` utilizando la directiva `@theme` de TailwindCSS.
