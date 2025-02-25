# Prueba técnica Rabindra Harichand

![Node.js](https://img.shields.io/badge/Node.js-%235FA04E?logo=nodedotjs&logoColor=white)
![TS Node](https://img.shields.io/badge/TSNode-%233178C6?logo=tsnode&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-%23C21325?logo=jest&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-%232D3748?logo=prisma&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-%233178C6?logo=typescript&logoColor=white)

---

## Tabla de contenido

- [Funcionalidades y Características](#Funcionalidades-y-Características)
- [Requisitos Previos](#Requisitos-previos)
- [Instalación del proyecto](#Instalación-del-proyecto)
  - [Configuración de la base de datos para entorno de desarrollo PostgreSQL](#Configuración-de-la-base-de-datos-para-entorno-de-desarrollo-PostgreSQL)
  - [Ejecución de la API en entorno de desarrollo](#Ejecución-de-la-API-en-entorno-de-desarrollo)
  - [Configuración de la base de datos para entorno de pruebas PostgreSQL](#Configuración-de-la-base-de-datos-para-entorno-de-pruebas-PostgreSQL)
  - [Ejecución de la API en entorno de pruebas](#Ejecución-de-la-API-en-entorno-de-pruebas)
  - [Pruebas de endpoints con Postman](#Pruebas-de-endpoints-con-Postman)
- [Diagrama Entidad Relación](#Diagrama-Entidad-Relación)
- [Arquitectura del sistema](#Arquitectura-del-sistema)
  - [Justificación de la arquitectura](#Justificación-de-la-arquitectura)
  - [Patrón de diseño](#Patrón-de-diseño)
- [Librerías y Frameworks](#Librerías-y-Frameworks)
- [Documentación de la API](#Documentación-de-la-API)
  - [Autenticación](#Autenticación)
  - [Usuarios](#Usuarios)
  - [Productos](#Productos)
  - [Ordenes](#Ordenes)

## Funcionalidades y Características

- Registro, login, modificación, eliminación de usuarios, obtención de un usuario y listado de usuarios con paginación.
- Creación, modificación, actualización, eliminación de productos, obtención de un productos y listado de productos con paginación.
- Creación, actualización de estado, eliminación, historial de órdenes por usuario y listado de todas las órdenes con paginación y obtención de una orden.

➕ **Tests unitarios y de Integración**

➕ **Envío de correos de verificación al hacer el registro de un usuario (para que el correo llegue se debe colocar un correo real). En el correo habrá un link para la verificación del correo del usuario, al hacer clic en él cambiará a `true` la propiedad `emailValidated` del usuario respectivo a nivel de base de datos. Para que esto suceda, deberá abrir el correo y hacer clic en el link, en la misma computadora donde se esté ejecutando el servidor.**

➕ **Uso de Patrones de diseño, como el patrón adaptador**

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Requisitos Previos

- Instalar la última versión LTS de Node.js de [Node.js](https://nodejs.org/en/)
- Esto debería instalar npm, el gestor de paquetes de Node.js
- Instalar el manejador de bases de datos PostgreSQL de [PostgreSQL](https://www.postgresql.org/download/)
- Clonar este repositorio a su máquina local

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Instalación del proyecto

- Abrir la terminal y navegar al directorio root del repositorio clonado
  `cd /path/to/avila-tek-test`

- Instalar las dependencias necesarias
  `npm install`

- Crear un archivo `.env` en el directorio root del proyecto. Puede copiar el archivo `.env.template` y renombrarlo a `.env`.

- ⚠️ Se dejó en el archivo `.env.template` las variables de entorno pertinentes para el envío de correos (**esto NO se debería hacer, pero para propósitos de facilitar la ejecución de esta prueba técnica se hizo de esta manera**). Ya están colocados los datos pertinentes en dichas variables, por lo tanto se sugiere no modificarlos ya que esto pudiera ocasionar fallas en los envíos de correos de verificación de usuarios. Esta característica no impacta en las demás funcionalidades de la API, de tal manera que de haber alguna falla en el envío de correos o la validación del mismo **esto NO impedirá el correcto funcionamiento de la API**. De igual manera,
  para poder validar el correo deberá acceder a la cuenta de correo desde el ordenador o computadora donde esté ejecutando este servidor.

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Configuración de la base de datos para entorno de desarrollo PostgreSQL

- Crear una nueva base de datos en PostgreSQL, preferiblemente con una codificación `UTF8`
  `CREATE DATABASE atek-test WITH ENCODING 'UTF8';`

- Modificar el url de conexión con la base de datos en el archivo `.env`
  `DATABASE_URL=postgresql://username:password@localhost:5432/atek-test`

- Ejecutar las migraciones desde nuestro esquema del ORM Prisma para crear las tablas en la base de datos
  `npx prisma migrate dev`

- Nutrir la base de datos con una data inicial
  `npx prisma db seed`

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Ejecución de la API en entorno de desarrollo

- Levantar la API en entorno de desarrollo
  `npm run dev`

- La API se ejecutará en `http://localhost:PORT` donde `PORT` es el número del puerto especificado en el archivo `.env`

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Configuración de la base de datos para entorno de pruebas PostgreSQL

- Crear una nueva base de datos en PostgreSQL, preferiblemente con una codificación `UTF8`
  `CREATE DATABASE test WITH ENCODING 'UTF8';`

- Modificar el url de conexión con la base de datos en el archivo `.env.test`
  `DATABASE_URL=postgresql://username:password@localhost:5432/test`

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Ejecución de la API en entorno de pruebas

- Levantar la API en entorno de pruebas
  `npm run test`

- La API se ejecutará en `http://localhost:PORT` donde `PORT` es el número del puerto especificado en el archivo `.env.test`

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Pruebas de endpoints con Postman

Para configurar los endpoints en Postman siga los siguiente pasos:

- Abra Postman.
- En la barra lateral haga clic en import
- Arrastre el archivo `Atek-endpoints.postman_collection.json` que se encuentra en el directorio `root` de este proyecto

⚠️ Tenga en cuenta, a la hora de hacer login, que se recomienda el uso de las siguientes credenciales, ya que este usuario tiene el rol de `Administrator`. Se hace esta observación ya que **existe un control de acceso por rol implementado en ciertos endpoints**:

```
{
    "email": "john.admin@email.com",
    "password": "Admin123456*"
}
```

Dichas credenciales ya están colocadas en el endpoint del login ubicado en la carpeta auth de la colección en Postman.

✅ De igual manera, un aspecto a resaltar es que, **cada vez que se ejecute el endpoint de login en Postman, automáticamente se extrae el token de la respuesta y se coloca en una variable global de la colección llamada `authToken` (que fue configurada de antemano). Esta variable se colocó como Bearer Token en cada uno de los endpoints que requieren que el usuario esté autenticado. Por lo tanto, cada vez que se ejecute el endpoint de login, se actualizará el Bearer Token de cada endpoint que lo esté utilizando. Esto ahorra tiempo a la persona que esté probando la API, ya que no tendrá que colocar manualmente el token en cada endpoint luego de que este expire o después de volver a llamar al endpoint de login.**

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Diagrama Entidad Relación

![Diagrama Entidad Relación](https://github.com/RabindraHarichand/avila-tek-test/blob/main/assets/images/AvilaTek-ER.png)

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Arquitectura del sistema

Este proyecto se desarrolló utilizando los principios de la **Arquitectura Limpia (Clean Architecture)**. Uno de los objetivos
de esta arquitectura es la separación de responsabilidades y se logra dicha separación dividiendo el software en capas

La **Regla de Dependencia** es fundamental para esta arquitectura. Esta regla establece que cualquier dependencia del
código fuente tiene que apuntar hacia la parte de adentro del esquema de capas. Las capas más internas no deberían saber nada
de las capas más externas.

Para propósitos de este proyecto la capa más interna está representada por la carpeta `domain`, la siguiente capa está representada por la carpeta `presentation` y la capa más externa está representada por la carpeta `infrastructure`

**ATEK-TEST**

```
|
|-- 📁 src
| |-- 📁 config
| |
| |-- 📁 data
| |
| |-- 📁 domain
| |
| |-- 📁 infrastructure
| |
| |-- 📁 presentation
| |
| |-- 📁 shared
| |
| |-- 📄 app.ts
|
|-- 📁 tests
| |-- 📁 presentation
| | |
| | |-- 📁 products
| |
| |-- 📄 app.test.ts
```

## **En domain existen las siguientes carpetas:**

- `datasources`: Esta carpeta alberga clases abstractas con métodos abstractos que definen cómo la aplicación interactúa con las fuentes de datos externas. Esto permite que la lógica de dominio esté desacoplada de detalles específicos de infraestructura, como bases de datos, APIs externas o sistemas de archivos. De esta manera, si en el futuro se decide cambiar la fuente de datos, solo se tendrá que modificar la implementación sin afectar el resto del sistema. Para propósitos de la aplicación se utilizo una sola fuente de datos, PostgreSql.

- `dtos`: Los DTOs son objetos cuya misión es transportar datos entre diferentes capas de la apliación

- `entities`: Aquí residen la entidades del dominio, que representan los objetos clave del modelo de negocio. Estas clases encapsulan datos y cualquier comportamiento relacionado a ellas. De esta manera se mantiene la coherencia y la integridad de los datos en toda la aplicación. Las entidades son independientes de detalles de implementación externos.

- `errors`: En esta carpeta se definen las excepciones personalizadas. De esta manera se proporcionan mensajes más significativos cuando ocurren excepciones en el sistema.

- `repositories`: Los repositorios actúan como intermediarios entre el dominio y las fuentes de datos. En esta carpeta, se definen clases abstractas con métodos abstractos que establecen las operaciones que se pueden realizar sobre las entidades (como agregar, actualizar, eliminar, obtener por ID, etc.). Nuevamente, se trata de especificar qué operaciones son necesarias sin dictar cómo se llevan a cabo. Esto promueve un diseño flexible y fácil de mantener, donde las implementaciones concretas pueden variar sin afectar la lógica de negocio.

## **En presentation existen las siguientes carpetas**

- Se reprenta con una carpeta los conceptos clave del dominio. En este caso las carpetas `auth` , `orders`, `users` y `products`:

Cada una de estas carpetas contiene:

- `controller`: Los controladores son los intermediarios entre las solicitudes del usuario y la lógica de negocio. Actúan como receptores de las peticiones HTTP entrantes, interpretando los datos y llamando a los servicios adecuados para procesar la información. Una vez completada la operación, los controladores se encargan de enviar una respuesta apropiada al cliente. En la arquitectura limpia, los controladores delegan la mayor parte de la lógica a los servicios, lo que facilita el mantenimiento y la prueba del código.

- `routes`: Estas rutas definen los puntos de acceso específicos de la aplicación. Son las direcciones URL que los clientes utilizarán para interactuar con diferentes funcionalidades. Estas rutas están vinculadas a los controladores correspondientes, asegurando que cada solicitud se dirija al lugar correcto.

De igual maner existen otras carpetas y archivos en presentation:

- `servicies`: Los servicios contienen la lógica de negocio y orquestan las acciones necesarias para cumplir con una solicitud.

- `middlewares`: Los middlewares son funciones que se ejecutan antes o después de las solicitudes a los controladores. Actúan como capas intermedias que pueden modificar o inspeccionar las solicitudes y respuestas.

## **En infrastructure existen las siguientes carpetas**

- `repositories`: En esta carpeta se tienen las implementaciones concretas de los repositorios definidos en el dominio. Vale la pena resaltar que los repositorios se comunican con los datasources, esto permite cambiar la fuente de datos con mayor facilidad. Para propósitos de esta aplicación solo hay una fuente de datos (PostgreSQL). Pero si se el día de mañana se tuviera que intercambiar o incluso añadir otra fuente de datos, entonces este diseño (repositories con datasources), facilita poder hacerlo.

- `datasources`: En esta carpeta se tienen las implementaciones concretas de los datasources definidos en el dominio

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Justificación de la arquitectura

- Es una arquitectura **independiente de cualquier framework o librería**, por lo tanto el diseño del sistema no está fuertemente
  acoplado a ningún detalle de implementación. Esto significa que la lógica y las reglas del negocio se mantienen separadas y no
  dependen de ninguna herramienta externa.

- La arquitectura permite **realizar pruebas exhaustivas de manera sencilla**. Las reglas de negocio pueden ser probadas sin la necesidad de una UI, base de datos, servidor web o cualquier otro elemento externo.

- **Es flexible**. Si el día de mañana se decide cambiar la base de datos, entonces fácilmente se podrá hacer esto sin la necesidad
  de refactorizaciones importantes.

- **Facilita la actualización y mantenimiento del sistema**, ya que los cambios en las herramientas o librerías no afectan la lógica de negocios

- Gracias a la **inyección de dependencias** en la arquitectura limpia se facilita la modularidad y el mantenimiento al desacoplar las dependencias de los componentes, permitiendo la sustitución fácil de implementaciones para pruebas y actualizaciones sin afectar la lógica del negocio. Esto se logra inyectando las dependencias desde fuera, promoviendo la flexibilidad y manteniendo la lógica central independiente de frameworks y bibliotecas específicos.

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Patrón de diseño

Se destaca el uso del siguiente patrón de diseño:

### Patrón Adaptador

Permite que objetos con interfaces incompatilbles trabajen juntos, también es util para utilizar librerías de terceros dentro de una aplicación sin depender directamente de ellas.

Motivo del Uso de Patrón Adaptador

✅ Centralización de Dependencias: Dentro de la aplicación se utilizó este patrón para encapsular todas las interacciones con las librerías de `jsonwebtoken` y `bcrypt`. De esta manera se logra un único punto de cambio. Esto facilita la actualización o sustitución de cualquiera de estas dos librerías si en el futuro se decide utilizar otra herramienta para la gestión de tokens o para la encriptación de datos sensibles.

# Librerías y Frameworks

- **bcrypt (v5.1.1):** Biblioteca para hashing de contraseñas. Proporciona funciones para crear y verificar hashes seguros. Fue utilizada para encriptar la contraseña de los usuarios.

- **dotenv (v16.4.7):** Carga variables de entorno desde el archivo `.env` a `process.env`. Permite gestionar datos y configuraciones sensibles dentro del proyecto.

- **express (v4.21.2):** Framework web para Node.js, utilizado para construir aplicaciones y APIs de manera sencilla y eficiente.
  Dentro del proyecto se utilizó esta librería para configurar el servidor, definir rutas y middlewares, gestionar errores, implementar autenticación y autorización y conectar la base de datos.

- **joi (v17.13.3):** Biblioteca para validar datos. Permite definir y verificar las variables de entorno definidas para el proyecto.

- **jsonwebtoken (v9.0.2):** Implementación de JSON Web Tokens (JWT) para la autenticación segura de usuarios.

- **jest (v29.7.0):** Framework de pruebas para JavaScript, diseñado para asegurar la corrección del código a través de pruebas unitarias y de integración.

- **prisma (v6.1.0):** ORM moderno para Node.js y TypeScript, simplifica las consultas de bases de datos y la gestión de esquemas.

- **supertest (v7.0.0):** Herramienta para probar APIs HTTP. Permite realizar solicitudes y verificar respuestas en aplicaciones Express.

- **compression (^1.7.5):** Middleware para Express utilizado para reducir el tamaño de las respuestas HTTP enviadas al cliente. Funciona comprimiendo los datos, lo que ayuda a mejorar la velocidad de carga de la página y el rendimiento general de la aplicación.

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

## Documentación de la API

- ⚠️En los Endpoints la variable {`PORT`} es el número del puerto especificado en el archivo `.env`

- ⚠️En cada uno de los Endpoints que tengan el atributo **Autorización** la variable {`token`} es el token que se genera al hacer login. Si se importa el archivo con la colección de Endpoints `Atek-endpoints.postman_collection.json` en Postman, entonces los Bearer Token de cada endpoint que tenga habilitada la autorización se colocarán de manera automática luego de hacer login.

- ⚠️Si no se hace el import de la colección de endpoints, entonces se requiere hacer el siguiente proceso para configurar la autorización de cada petición:
  1. seleccionar la sección de autorización del endpoint
  2. elegir la opción de Bearer Token
  3. colocar el token generado por el login.

### Autenticación

#### Registrar usuario

```http
  POST /api/auth/register
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/auth/register
  Content-Type: application/json

{
    "firstName": "Rabindra",
    "lastName": "Harichand",
    "email": "rabindra.harichand@gmail.com",
    "password": "1234567"
}
```

| Body item   | Type     | Description                                           |
| :---------- | :------- | :---------------------------------------------------- |
| `firstName` | `string` | **Requerido**. Nombre del usuario que se registra.    |
| `lastName`  | `string` | **Requerido**. Apellido del usuario que se registra.  |
| `email`     | `string` | **Requerido, Único**. Correo del usuario a registrar. |
| `password`  | `string` | **Requerido**. Contraseña de usuario a registrar.     |

#### Inicio de sesión de usuario

```http
  POST /api/auth/login
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/auth/login
  Content-Type: application/json

{
    "email": "rabindra.harichand@gmail.com",
    "password": "1234567"
}
```

| Body item  | Type     | Description                                            |
| :--------- | :------- | :----------------------------------------------------- |
| `email`    | `string` | **Requerido**. Correo del usuario que se registra.     |
| `password` | `string` | **Requerido**. Contraseña del usuario que se registra. |

#### Validación del correo del usuario

```http
  GET /api/validate-email/:token
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/validate-email/:token
  Content-Type: application/json
```

| Parameter | Type     | Description          |
| :-------- | :------- | :------------------- |
| `token`   | `string` | **Requerido**. token |

```http
  GET /api/validate-email/asfafjlasjpqoqj
```

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

### Usuarios

#### Crear Usuario

```http
  POST /api/users
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/users
  Content-Type: application/json
  Autorización: Bearer {token}

{
    "firstName": "Rabindra",
    "lastName": "Harichand",
    "email": "rabindra.harichand@gmail.com",
    "password": "1234567"
}
```

| Body item   | Type     | Description                                           |
| :---------- | :------- | :---------------------------------------------------- |
| `firstName` | `string` | **Requerido**. Nombre del usuario que se registra.    |
| `lastName`  | `string` | **Requerido**. Apellido del usuario que se registra.  |
| `email`     | `string` | **Requerido, Único**. Correo del usuario a registrar. |
| `password`  | `string` | **Requerido**. Contraseña de usuario a registrar.     |

#### Obtener Usuarios

```http
  GET /api/users
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/users
  Content-Type: application/json
  Autorización: Bearer {token}
  Parámetros de Consulta (Query Parameters): limit | page

```

| Query Parameter | Type     | Description                                                         |
| :-------------- | :------- | :------------------------------------------------------------------ |
| `limit`         | `number` | **Opcional**. Cantidad de usuarios por página (por defecto es 1).   |
| `page`          | `number` | **Opcional**. Número de la página a visualizar (por defecto es 10). |

```http
  GET /api/users?page=1&limit=2
```

#### Obtener Usuario

```http
  GET /api/users/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/users/:id
  Content-Type: application/json
  Autorización: Bearer {token}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `number` | **Requerido**. ID del usuario |

```http
  GET /api/users/1
```

#### Modificar Usuario

```http
  PUT /api/users/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/users/:id
  Content-Type: application/json
  Autorización: Bearer {token}

  {
    "role": "Administrator",
    "email": "test@email.com"
}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `number` | **Requerido**. ID del usuario |

```http
  PUT /api/users/1
```

#### Eliminar Usuario

```http
  DELETE /api/users/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/users/:id
  Content-Type: application/json
  Autorización: Bearer {token}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `number` | **Requerido**. ID del usuario |

```http
  DELETE /api/users/1
```

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

### Productos

#### Obtener Productos

```http
  GET /api/products
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/products
  Content-Type: application/json
  Autorización: Bearer {token}
  Parámetros de Consulta (Query Parameters): limit | page

```

| Query Parameter | Type     | Description                                                         |
| :-------------- | :------- | :------------------------------------------------------------------ |
| `limit`         | `number` | **Opcional**. Cantidad de productos por página (por defecto es 1).  |
| `page`          | `number` | **Opcional**. Número de la página a visualizar (por defecto es 10). |

```http
  GET /api/products?page=1&limit=2
```

#### Obtener Producto

```http
  GET /api/products/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/products/:id
  Content-Type: application/json
  Autorización: Bearer {token}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `number` | **Requerido**. ID del usuario |

```http
  GET /api/products/1
```

#### Crear Producto

```http
  GET /api/products
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/products
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator

{
    "name": "Chocolate",
    "price": 3.4,
    "description": "Made with milk",
    "quantity": 7
}
```

| Body item     | Type     | Description                                            |
| :------------ | :------- | :----------------------------------------------------- |
| `name`        | `string` | **Requerido, Único**. Nombre del producto a modificar. |
| `price`       | `number` | **Requerido**. Precio del producto a modificar.        |
| `description` | `string` | **Requerido**. Descripción del producto a modificar.   |
| `quantity`    | `number` | **Requerido**. Cantidad del producto a modificar.      |

#### Modificar Producto

```http
  PUT /api/products/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/products
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator

{
    "name": "Chocolate",
    "price": 3.4,
    "description": "Made with milk",
    "quantity": 7
}
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `number` | **Requerido**. ID del producto |

| Body item     | Type     | Description                                            |
| :------------ | :------- | :----------------------------------------------------- |
| `name`        | `string` | **Requerido, Único**. Nombre del producto a modificar. |
| `price`       | `number` | **Requerido**. Precio del producto a modificar.        |
| `description` | `string` | **Requerido**. Descripción del producto a modificar.   |
| `quantity`    | `number` | **Requerido**. Cantidad del producto a modificar.      |

```http
  PUT /api/products/1
```

#### Eliminar Producto

```http
  DELETE /api/products/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/products
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `number` | **Requerido**. ID del producto a eliminar |

```http
  DELETE /api/products/1
```

#### Modificar solo la cantidad del Producto

```http
  PATCH /api/products/:id/quantity
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/products
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator

{
    "quantity": 4
}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `number` | **Requerido**. ID del producto a modificar |

| Body item  | Type     | Description                                       |
| :--------- | :------- | :------------------------------------------------ |
| `quantity` | `number` | **Requerido**. Cantidad del producto a modificar. |

```http
  PATCH /api/products/1/quantity
```

#### Modificar solo el precio del Producto

```http
  PATCH /api/products/:id/price
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/products
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator

{
    "price": 4.5
}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `number` | **Requerido**. ID del producto a modificar |

| Body item | Type     | Description                                     |
| :-------- | :------- | :---------------------------------------------- |
| `price`   | `number` | **Requerido**. Precio del producto a modificar. |

```http
  PATCH /api/products/1/price
```

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**

### Ordenes

#### Obtener Órdenes

```http
  GET /api/orders
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/orders
  Content-Type: application/json
  Autorización: Bearer {token}
  Parámetros de Consulta (Query Parameters): limit | page
  Rol Necesario: Administrator

```

| Query Parameter | Type     | Description                                                         |
| :-------------- | :------- | :------------------------------------------------------------------ |
| `limit`         | `number` | **Opcional**. Cantidad de órdenes por página (por defecto es 1).    |
| `page`          | `number` | **Opcional**. Número de la página a visualizar (por defecto es 10). |

```http
  GET /api/orders?page=1&limit=2
```

#### Obtener Orden

```http
  GET /api/orders/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/orders/:id
  Content-Type: application/json
  Autorización: Bearer {token}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `number` | **Requerido**. ID de la Orden |

```http
  GET /api/orders/1
```

#### Obtener Órdenes por Id de Usuario

```http
  GET /api/orders/user/:id
  Host: localhost:{PORT}
  Url: localhost:{PORT}/api/orders/user/:id
  Content-Type: application/json
  Autorización: Bearer {token}
  Parámetros de Consulta (Query Parameters): limit | page

```

| Query Parameter | Type     | Description                                                         |
| :-------------- | :------- | :------------------------------------------------------------------ |
| `limit`         | `number` | **Opcional**. Cantidad de órdenes por página (por defecto es 1).    |
| `page`          | `number` | **Opcional**. Número de la página a visualizar (por defecto es 10). |

```http
  GET /api/orders/user/1?page=1&limit=2
```

#### Crear Orden

```http
  GET /api/orders
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/orders
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator

{
    "id": 1,
    "email": "test@email.con",
    "role": "Administrator",
    "products": [{
        "id": 1,
        "quantity": 1
    }]
}
```

| Body item             | Type     | Description                                                                        |
| :-------------------- | :------- | :--------------------------------------------------------------------------------- |
| `id`                  | `string` | **Requerido, Único**. ID del usuario al que pertenece la orden.                    |
| `email`               | `number` | **Requerido**. Email del usuario al que pertenece la orden.                        |
| `role`                | `string` | **Requerido**. Rol del usuario al que pertenece la orden. (Debe ser Administrator) |
| `products`            | `array`  | **Requerido**. Lista de productos en la orden.                                     |
| `products[].id`       | `number` | **Requerido**. ID del producto.                                                    |
| `products[].quantity` | `number` | **Requerido**. Cantidad del producto en la orden                                   |

#### Eliminar Orden

```http
  DELETE /api/orders/:id
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/orders
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `number` | **Requerido**. ID de la orden a eliminar |

```http
  DELETE /api/orders/1
```

#### Modificar estatus de la Orden

```http
  PATCH /api/orders/:id/status
  Host: localhost:{PORT}
  Host: localhost:{PORT}/api/orders/:id/status
  Content-Type: application/json
  Autorización: Bearer {token}
  Rol Necesario: Administrator

{
    "status": 4.5
}
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `id`      | `number` | **Requerido**. ID de la orden a modificar |

| Body item | Type     | Description                                                                                                                     |
| :-------- | :------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `status`  | `string` | **Requerido**. Estatus de la orden a modificar. Debe ser uno de estos valores ["Pending", "Processing", "Shipped", "Delivered"] |

```http
  PATCH /api/orders/1/status
```

**[⬆ Volver a la Tabla de contenido](#Tabla-de-contenido)**
