---
trigger: always_on
---

# Frontend Rules & Business Logic (NSwag Context)

Este documento define las reglas de negocio y comportamientos de UI para la integración con el Backend.
**Nota Técnica**: El proyecto utiliza **NSwag**. Todos los clientes de API y DTOs están autogenerados. No crees interfaces manuales ni llamadas `fetch` directas.

## 1. Integración con API (NSwag)

*   **Cliente Principal**: Utiliza el cliente autogenerado (ej: `TodoManagementClient` o `ITodoManagementClient`) inyectado en tus servicios/hooks.
*   **DTOs**: Utiliza estrictamente los tipos generados para requests y responses (ej: `CreateTodoListCommand`, `RegisterProgressionCommand`, `TodoListViewModel`).

### Mapeo de Operaciones
| Acción de Usuario | Método del Cliente (NSwag) | DTO de Entrada |
| :--- | :--- | :--- |
| **Cargar Listas** | `getAllTodoLists(...)` | `includeItems: true` |
| **Crear Tarea** | `addTodoItem(...)` | `AddTodoItemCommand` |
| **Editar Tarea** | `updateTodoItem(...)` | `UpdateTodoItemCommand` |
| **Borrar Tarea** | `removeTodoItem(...)` | `RemoveTodoItemCommand` |
| **+ Progreso** | `registerProgression(...)` | `RegisterProgressionCommand` |

## 2. Reglas de Negocio en UI

Aunque el backend valida, la UI debe ser proactiva para mejorar la UX.

### 2.1. Bloqueo por Progreso (> 50%)
> **Regla**: Las tareas se "bloquean" parcialmente si `totalProgress > 50%`.

*   **Lógica**:
    ```typescript
    // Ejemplo conceptual usando el DTO generado
    const isLocked = (item: TodoItemViewModel) => item.totalProgress > 50;
    ```
*   **Comportamiento**:
    *   Si `isLocked(item)` es `true`:
        *   **Deshabilitar** el botón/icono de "Editar" y "Eliminar".
        *   Mostrar un *tooltip* explicando: "La tarea tiene más del 50% de avance y no se puede modificar".

### 2.2. Validación de Nuevo Progreso (RegisterProgression)
> **Regla de Consistencia**: El progreso es incremental y lineal en el tiempo.

Al abrir el modal para [RegisterProgression](cci:1://file:///c:/Users/javi-/source/repos/TodoTechnicalTest/src/Microservices/TodoManagement/TodoManagement.API/Apis/TodoManagementApi.cs:79:4-86:5):

1.  **Validación de Fecha**:
    *   Buscar la fecha más reciente en `item.progressions`.
    *   Configurar el `minDate` del datepicker para que sea `ultimaFecha + 1 día` (o posterior al mismo momento).
    *   *Error*: "La fecha debe ser posterior al último avance registrado ({fecha})".

2.  **Validación de Porcentaje**:
    *   Calcular el remanente: `maxAllowed = 100 - item.totalProgress`.
    *   Configurar el input de porcentaje (`percent`) para tener `max={maxAllowed}`.
    *   *Error*: "El avance total no puede superar el 100% (Máximo actual: {maxAllowed}%)".

## 3. Definiciones de Datos (Referencia)

Los DTOs generados siguen estas definiciones conceptuales:

*   **ItemId**: Es el identificador **visual y de negocio** (entero: 1, 2, 3...) que espera el usuario.
    *   *Importante*: Los comandos `Update/Remove/Register` requieren tanto el [TodoListId](cci:1://file:///c:/Users/javi-/source/repos/TodoTechnicalTest/src/Microservices/TodoManagement/TodoManagement.Domain/AggregatesModel/TodoListAggregate/TodoItem.cs:53:4-56:5) (Guid) como el [ItemId](cci:1://file:///c:/Users/javi-/source/repos/TodoTechnicalTest/src/Microservices/TodoManagement/TodoManagement.Domain/AggregatesModel/TodoListAggregate/TodoItem.cs:58:4-61:5) (Int).
*   **Progression**: Historial de avances. No edites el [TotalProgress](cci:1://file:///c:/Users/javi-/source/repos/TodoTechnicalTest/src/Microservices/TodoManagement/TodoManagement.Domain/AggregatesModel/TodoListAggregate/TodoItem.cs:29:4-35:5) directamente; envía un comando [RegisterProgression](cci:1://file:///c:/Users/javi-/source/repos/TodoTechnicalTest/src/Microservices/TodoManagement/TodoManagement.API/Apis/TodoManagementApi.cs:79:4-86:5) con el *delta* (incremento).