# ROLL THE DICE!

API con CRUD para la trata de la aplicaci贸n Roll The Dice.

### App deployeada en Heroku

[URL a la aplicaci贸n](https://roll-the-dice---api.herokuapp.com/)

### Instalaci贸n 馃敡

_Para instalar el proyecto deber谩s copiar en tu disco local el repositorio de GitHub con el siguiente comando:_

```
git clone https://github.com/AxelUrizar/RollTheDice-Backend.git
```

_Tras lo cual tendremos que installar las dependencias con:_

```
npm install
```
o

```
yarn install
```

Y por 煤ltimo ser谩 necesario a帽adir las siguientes variables de entorno en un documento ".env".

```
PORT=(Puerto en el que deseas que se ejecute la aplicaci贸n)
```
```
MONGO_URI=(Link para conectar a tu base de datos de MongoDB)
```
```
JWT_SECRET=(Palabra clave para tus tokens)
```

## Ejecutando las pruebas 鈿欙笍

_Para probar el proyecto usaremos Postman mandando peticiones a todos los endpoints_

Endpoints Usuarios:

* Mostrar todos los usuarios: (GET "/users")

* Registrar nuevo usuario: (POST "/users/newUser") y pasamos por body con formato JSON los datos del nuevo usuario.

* Login a un usuario: (POST "/users/login") con lo que recibiremos un token para poder acceder a las funcionalidades como ver tu perfil o borrarlo.

* Mostrar tu perfil: (GET "users/profile") pasandole adem谩s un token de autentificaci贸n nos dejar谩 acceder a nuestro perfil y ver nuestros datos.

* Editar Alias: (PUT "/users/edit")Edita el Alias del usuario que lance la petici贸n.

* Logout Usuario: (DELETE "/users/logout") Borrar谩 el token en uso del usuario que lance la petici贸n.

* Logout All Usuario: (DELETE "/users/logoutAll") Borrar谩 todos los tokens del usuario que lance la petici贸n.

Endpoints Games: 

* Mostrar todas las partidas: (GET "/gamesHistory") Muestra todas las partidas guardadas en la base de datos

* Mostrar partidas de un usuario: (GET "/gamesHistory/userHistory") Muestra las partidas guardadas de el usuario que lance la petici贸n.

* Nueva partida: (POST "/gamesHistory/newGame") Crea una partida con los datos que  el usuario env铆a a la petici贸n.

Endpoints Admin: 

* Editar alias usuario: (PUT "/admin/edit") Edita el alias de cualquier usuario que el administrador elija.

## Construido con 馃洜锔?

* Javascript
* Node.js
* MongoDB
* Express

## Autores 鉁掞笍

* **Axel Urizar** - [GitHub](https://github.com/AxelUrizar)
