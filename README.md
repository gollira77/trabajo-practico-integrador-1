# trabajo-practico-integrador-1

Repositorio para el Trabajo Práctico Integrador 1 

Estructura y ramas:
- main: rama principal (README inicial)
- develop: rama de desarrollo
- proyecto-integrador: rama donde se desarrollará la solución

Tecnologías: Node.js, Express, Sequelize, MySQL, JWT, bcrypt, express-validator

# Blog Personal - API

## 1. Instalación

```bash```
git clone https://github.com/gollira77/trabajo-practico-integrador-1
cd trabajo-practico-integrador-1
npm install
cp .env.example .env

# Levantar el servidor:
si va a levantar para seguir desarrollando o para modiicar use "npm run dev"
si quiero probar sin cambiar nada use "npm start"

# Endpoints principales

Preferencia mia: yo al principio siempre le pongo http://loaclhost/3000 cuando hago los endpoints en el thunder Client

Auth
POST /api/auth/register

{
  "username": "usuario1",
  "email": "usuario1@correo.com",
  "password": "Passw0rd"
}

POST /api/auth/login

{
  "email": "usuario1@correo.com",
  "password": "Passw0rd"
}

POST /api/auth/logout → limpia cookie
GET /api/auth/profile → devuelve perfil (auth)
PUT /api/auth/profile → actualiza perfil (auth)

# Users (solo admin)

GET /api/users → lista usuarios
GET /api/users/:id → usuario específico
PUT /api/users/:id → actualizar usuario
DELETE /api/users/:id → eliminación lógica

# Tags

POST /api/tags → crear tag (admin)
GET /api/tags → listar tags (auth)
GET /api/tags/:id → detalle tag con artículos (admin)
PUT /api/tags/:id → actualizar tag (admin)
DELETE /api/tags/:id → eliminar tag (admin)

# Articles

POST /api/articles → crear artículo (auth)
GET /api/articles → listar publicados
GET /api/articles/:id → detalle artículo
GET /api/articles/user/me → mis artículos
GET /api/articles/user/:id → artículo propio por ID
PUT /api/articles/:id → editar (autor/admin)
DELETE /api/articles/:id → eliminar (autor/admin)

# Articles-Tags

POST /api/articles-tags → asociar tag a artículo
DELETE /api/articles-tags/:id → remover relación


# Tests básicos de los endpoints en el Thunder Client QUE YO HICE:

# Registro:

POST http://loaclhost/3000/api/auth/register
Body: 
{ 
    "username":"user1",
    "email":"a@b.com",
    "password":"Passw0rd" 
}

# Login:

POST http://loaclhost/3000/api/auth/login
Body:
{
    "email":"a@b.com",
    "password":"Passw0rd"
}

# Crear tag:

POST http://loaclhost/3000/api/tags
Header: Authorization: Bearer <JWT_ADMIN> //con el token del admin se accede.
Body:
{
    "name": "Fitness"
}

# Crear Articulo:
POST http://loaclhost/3000/api/articles
Header: Authorization: Bearer <JWT_USER> //con el token del propietario se accede.
Body:
{
    "title":"Mi Artículo",
    "content":"Contenido",
    "status":"published"
}

# Asociar Tag:
POST http://loaclhost/3000/api/articles-tags
Body:
{
    "article_id": 1,
    "tag_id": 1
}

# Listar Artículos publicados:
GET http://loaclhost/3000/api/articles

# Editar artículo (solo autor):
PUT http://loaclhost/3000/api/articles/1
Body:
{
    "title": "Nuevo título"
}

# Eliminar artículo (solo autor):
DELETE http://loaclhost/3000/api/articles/1

# Crud Users (admin)
GET http://loaclhost/3000/api/users
PUT http://loaclhost/3000/api/users/2
DELETE http://loaclhost/3000/api/users/2

