# Premios

Los premios son una forma de reconocer el esfuerzo y la calidad de los proyectos. En esta sección se pueden ver los premios que se han otorgado a los proyectos.

Para ello, se han definido las siguientes rutas:

- **GET /api/v1/premios**: Listar todos los premios.
- **GET /api/v1/premios/:premio_id**: Obtener un premio por su id.
- **POST /api/v1/premios**: Crear un nuevo premio.
- **PUT /api/v1/premios/:premio_id**: Actualizar un premio.
- **DELETE /api/v1/premios/:premio_id**: Eliminar un premio.

> Para poder acceder a estas rutas, es necesario autenticarse.
>
> Para crear, editar o eliminar un premio, es necesario ser administrador.

## Listar todos los premios

### Ejemplo de lista de premios

```http request
GET /api/v1/premios/
Authorization: Bearer tu_token_de_acceso
```

### Respuesta de lista de premios

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 126
ETag: W/"7e-37UiS+uHY1TTefkwc796ZeYAlbM"
Date: Wed, 21 Feb 2024 14:53:15 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": [
    {
      "id": 1,
      "titulo": "Premio 1"
    },
    {
      "id": 2,
      "titulo": "Premio 2"
    },
    {
      "id": 3,
      "titulo": "Premio 3"
    },
    {
      "id": 4,
      "titulo": "Premio 1"
    }
  ]
}
```

## Obtener un premio por su id

### Parámetros de obtención de premio

```javascript
const get_premio = [
    param('premio_id', 'Type: Int').exists().toInt(),
    validate
]
```

### Ejemplo de obtención de premio

```http request
GET /api/v1/premios/1
Authorization: Bearer tu_token_de_acceso
```

### Respuesta de obtención de premio

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37
ETag: W/"25-FuJwUmgG4lno46y6z9ffnghhwF4"
Date: Wed, 21 Feb 2024 14:56:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 1,
    "titulo": "Premio 1"
  }
}
```

## Crear un nuevo premio

### Parámetros de creación de premio

```javascript
const create_premio = [
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    validate
]
```

### Ejemplo de creación de premio

```http request
POST /api/v1/premios/
Authorization: Bearer tu_token_de_acceso
Content-Type: application/json

{
  "titulo": "Premio 1"
}
```

### Respuesta de creación de premio

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37
ETag: W/"25-d8o+3L3DAsWjA6WLfaYovzG+THc"
Date: Wed, 21 Feb 2024 14:51:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 4,
    "titulo": "Premio 1"
  }
}
```

## Actualizar un premio

### Parámetros de actualización de premio

```javascript
const update_premio = [
    param('premio_id', 'Type: Int').exists().toInt(),
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}).optional(),
    validate
]
```

### Ejemplo de actualización de premio

```http request
PUT /api/v1/premios/1
Authorization: Bearer tu_token_de_acceso
Content-Type: application/json

{
  "titulo": "Premio 1 mejorado"
}
```

### Respuesta de actualización de premio

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-CWz95ssQ3+4ccOM+o+iRLVLaukY"
Date: Wed, 21 Feb 2024 14:57:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 1,
    "titulo": "Premio 1 mejorado"
  }
}
```

## Eliminar un premio

### Parámetros de eliminación de premio

```javascript
const delete_premio = [
    param('premio_id', 'Type: Int').exists().toInt(),
    validate
]
```

### Ejemplo de eliminación de premio

```http request
DELETE /api/v1/premios/1
Authorization: Bearer tu_token_de_acceso
```

### Respuesta de eliminación de premio

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 38
ETag: W/"26-RR5/Bswjz8w1WLQsPkSBUZxXdnA"
Date: Sat, 24 Feb 2024 11:47:34 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 5,
    "titulo": "Premio 10"
  }
}
```
