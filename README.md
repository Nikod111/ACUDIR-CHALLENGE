# **ACUDIR-CHALLENGE**
# _Proyecto de Evaluación Full Stack (.NET 8)_

## Objetivo

Aplicación web en **.NET 8** (frontend a elección) para gestionar y
filtrar registros de personas almacenados en `Test.json` mediante una
API RESTful.

## Arquitectura

-   **Dominio**: Modelo `Persona` basado en `Test.json`.
-   **Repository**: Manipulación de datos en `Test.json`.
-   **Interfaces**: Contratos para el repositorio.
-   **API/Controllers**: Endpoints RESTful.

## Endpoints

-   **GET /GetAll**: Obtiene todos los registros. Filtros opcionales por
    cualquier campo de `Persona`.
-   **POST /**: Agrega un nuevo registro en `Test.json`.
-   **PUT /**: Modifica un registro existente en `Test.json`.

## Requisitos

-   **.NET**: 8.0
-   Persistencia en archivo `Test.json` (sin base de datos).
-   Principios SOLID, inyección de dependencias y validaciones.

## Entrega

Subir a una nueva rama:

    feature/test-NombreDelDesarrollador

## Evaluación

Se evaluará: 
- Correcta arquitectura por capas.
- Calidad de código y
patrones de diseño.
- Funcionamiento de endpoints y filtrado.
- Buen
control de versiones.

