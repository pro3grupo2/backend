# Autenticación

Para poder acceder a los recursos de la API, es necesario autenticarse.

Existen tres rutas para completar el proceso de autenticación:

- **POST /api/v1/auth/signin**: Iniciar sesión.
- **POST /api/v1/auth/signup**: Registrarse.
- **GET /api/v1/auth/me**: Informacion de tu usuario.

> Necesitaras una cuenta obligatoriamente para poder acceder a los recursos de la API.

## Iniciar sesión

### Parámetros de inicio de sesión

```javascript
const signin = [
    body('correo', 'Type: String, Max-Length: 50').exists().notEmpty().isEmail().isLength({max: 50}),
    body('password', 'Type: String, Max-Length: 102').exists().notEmpty().isString().isLength({max: 102}),
    validate
]
```

### Ejemplo de inicio de sesión

```http request
POST /api/v1/auth/signin
Content-Type: application/json

{
    "correo": "tu_correo@dominio.com",
    "password": "tu_password"
}
```

### Respuesta de inicio de sesión

```http request
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 158
ETag: W/"9e-8oJchP6iIGZFNG0ELPZSTjZc+6Y"
Date: Wed, 21 Feb 2024 14:43:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4NTI2NTkxLCJleHAiOjE3MDg2MTI5OTF9.4oPWrdWop2JdJQloOh2lc6jsUW1tM4GC5chiSzSHr_4"
  }
}
```

## Registrarse

### Parámetros de registro

```javascript
const signup = [
    body('correo', 'Type: String, Max-Length: 50').exists().notEmpty().isEmail().isLength({max: 50}),
    body('nombre_completo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    body('alias', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    body('password', 'Type: String, Max-Length: 102').exists().notEmpty().isString().isLength({max: 102}),
    body('frase_recuperacion', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    validate
]
```

### Ejemplo de registro

```http request
POST /api/v1/auth/signup
Content-Type: application/json

{
    "correo": "tu_corro@dominio.com",
    "nombre_completo": "tu_nombre_completo",
    "alias": "tu_alias",
    "password": "tu_password",
    "frase_recuperacion": "tu_frase_recuperacion"
}
```

### Respuesta de registro

```http request
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 166
ETag: W/"a6-jkt7T7i4sAUMTOZj2RxA+sH8SZ4"
Date: Wed, 21 Feb 2024 14:43:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 1,
    "correo": "tu_corro@dominio.com",
    "nombre_completo": "tu_nombre_completo",
    "alias": "tu_alias",
    "password": "tu_password",
    "frase_recuperacion": "tu_frase_recuperacion"
  }
}
```

## Información de tu usuario (me)

### Ejemplo de información de tu usuario

```http request
GET http://localhost:3000/api/v1/auth/me
Authorization: Bearer tu_token_de_acceso
```

### Respuesta de información de tu usuario

```http request
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 206
ETag: W/"ce-H/ojNhNSQd2Q1pUizlTvIRuOtqQ"
Date: Wed, 21 Feb 2024 14:46:51 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 1,
    "correo": "tu_corro@dominio.com",
    "nombre_completo": "tu_nombre_completo",
    "alias": "tu_alias",
    "proyectos": [
      {
        "id": 1,
        "titulo": "titulo_proyecto",
        "ruta_imagen": "ruta_imagen"
      }
    ]
  }
}
```
