# hex-typescript

Proyecto de ejemplo para **aprender y practicar la arquitectura hexagonal (Ports & Adapters)** usando **TypeScript** y **Node.js**. Implementa un CRUD sencillo de "excuses" (excusas para no ir a trabajar) con persistencia en MongoDB, demostrando una clara separación de capas y responsabilidades.

> **Objetivo principal:**  
> Este proyecto está diseñado para practicar y comprender la arquitectura hexagonal en Node.js y TypeScript, aplicándola en un escenario real de API RESTful.

---

## Tabla de Contenidos

- [Objetivo del Proyecto](#objetivo-del-proyecto)
- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Endpoints de la API](#endpoints-de-la-api)
- [Licencia](#licencia)

---

## Objetivo del Proyecto

El propósito de este proyecto es:
- Comprender los conceptos de la **arquitectura hexagonal**.
- Aprender a separar la lógica de negocio del acceso a la base de datos y de las dependencias externas.
- Practicar buenas prácticas de modularidad y mantenimiento de código en un API CRUD real.
- Tener una base para futuras extensiones o integraciones con otros servicios.

---

## Características

- Arquitectura hexagonal (Ports & Adapters)
- Separación clara entre dominio, aplicación, infraestructura y adaptadores
- API RESTful para gestión de excusas
- Validación de datos y manejo de errores personalizado
- Persistencia en MongoDB
- Código modular y fácil de extender
- Ideal para practicar y experimentar con pruebas unitarias y mocks

---

## Estructura del Proyecto
```
hex-typescript/
├── src/
│   ├── application/
│   │   ├── input/                ← Interfaces de entrada (puertos)
│   │   └── output/               ← Interfaces de salida (puertos)
│   ├── domain/
│   │   ├── models/               ← Modelos de dominio (Excuse)
│   │   └── useCases/             ← Casos de uso (lógica de negocio)
│   └── infrastructure/
│       ├── input/                ← Adaptadores de entrada (controllers, middlewares, rutas)
│       └── output/               ← Adaptadores de salida (persistencia en MongoDB, manejo de errores)
│
├── config/                       ← Configuración de base de datos y variables de entorno
└── ...
```

## Requisitos
- Node.js >= 18.x
- npm >= 9.x
- Docker y Docker Compose (opcional, para MongoDB local)

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Jaycom17/hex-typescript.git
   cd hex-typescript
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. (Opcional) Levanta MongoDB con Docker:
   ```bash
   docker-compose up -d
   ```

## Configuración
- Copia el archivo `.env.example` a `.env` y ajusta las variables según tu entorno (puerto, URI de MongoDB, etc).
- La configuración de la base de datos se encuentra en `src/config/database.ts`.

## Ejecución
- Para desarrollo (con recarga automática):
  ```bash
  npm run dev
  ```

## Endpoints de la API

La API estará disponible en `http://localhost:<PUERTO>/api`.

La API expone los siguientes endpoints para gestionar las excusas:

| Método | Endpoint           | Descripción                                  |
|--------|--------------------|----------------------------------------------|
| GET    | `/excuses`         | Obtiene todas las excusas almacenadas.       |
| GET    | `/excuses/:id`     | Obtiene una excusa por su ID.                |
| POST   | `/excuses`         | Crea una nueva excusa.                       |
| PUT    | `/excuses/:id`     | Actualiza una excusa existente por su ID.    |
| DELETE | `/excuses/:id`     | Elimina una excusa por su ID.                |

Todos los endpoints devuelven datos en formato JSON y utilizan el estándar RESTful.

## Licencia
MIT