# Proyectos

La subida y descarga de los proyectos es el objetivo principal de la API.

Para ello, se han definido las siguientes rutas:

- **GET /api/v1/proyectos**: Listar todos los proyectos.
- **GET /api/v1/proyectos/:proyecto_id**: Obtener un proyecto por su id.
- **POST /api/v1/proyectos**: Crear un nuevo proyecto.
- **PUT /api/v1/proyectos/:proyecto_id**: Actualizar un proyecto.
- **DELETE /api/v1/proyectos/:proyecto_id**: Eliminar un proyecto.

> Para poder acceder a estas rutas, es necesario autenticarse.
>
> Para editar o eliminar un proyecto, es necesario ser el propietario del mismo o administrador.

## Listar todos los proyectos

### Ejemplo de lista de proyectos

```http request
GET /api/v1/proyectos
Authorization: Bearer tu_token_de_acceso
```

### Respuesta de lista de proyectos

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 836
ETag: W/"344-AHdRj9ApGL02AudNGWvwftiesC8"
Date: Wed, 21 Feb 2024 14:58:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": [
    {
      "id": 2,
      "id_creador": 1,
      "id_asignatura": null,
      "titulo": "proyecto.titulo mejorado",
      "ficha_tecnica": "proyecto.ficha_tecnica",
      "ruta_fichero": "proyecto.ruta_fichero",
      "ruta_imagen": "proyecto.ruta_imagen",
      "usuarios": {
        "id": 1,
        "correo": "adriantoral@live.u-tad.com",
        "nombre_completo": "Adrian Toral",
        "alias": "adriantoral"
      },
      "proyectos_premios": [
        {
          "premios": {
            "id": 1,
            "titulo": "Premio 1 mejorado"
          },
          "anio": 2024
        },
        {
          "premios": {
            "id": 2,
            "titulo": "Premio 2"
          },
          "anio": 2024
        },
        {
          "premios": {
            "id": 3,
            "titulo": "Premio 3"
          },
          "anio": 2024
        }
      ]
    },
    {
      "id": 3,
      "id_creador": 1,
      "id_asignatura": null,
      "titulo": "proyecto.titulo",
      "ficha_tecnica": "proyecto.ficha_tecnica",
      "ruta_fichero": "proyecto.ruta_fichero",
      "ruta_imagen": "proyecto.ruta_imagen",
      "usuarios": {
        "id": 1,
        "correo": "adriantoral@live.u-tad.com",
        "nombre_completo": "Adrian Toral",
        "alias": "adriantoral"
      },
      "proyectos_premios": []
    }
  ]
}
```

## Obtener un proyecto por su id

### Parametros de obtención de proyecto

```javascript
const get_proyecto = [
    param('proyecto_id', 'Type: Int').exists().toInt(),
    validate
]
```

### Ejemplo de obtención de proyecto

```http request
GET /api/v1/proyectos/2
Authorization: Bearer tu_token_de_acceso
```

### Respuesta de obtención de proyecto

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 655
ETag: W/"28f-fVpg6145vJ0rbY+4cpVvi2ccjwM"
Date: Wed, 21 Feb 2024 14:59:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 2,
    "id_creador": 1,
    "id_asignatura": null,
    "titulo": "proyecto.titulo mejorado",
    "ficha_tecnica": "proyecto.ficha_tecnica",
    "ruta_fichero": "proyecto.ruta_fichero",
    "ruta_imagen": "proyecto.ruta_imagen",
    "proyectos_usuarios": [
      {
        "usuarios": {
          "id": 2,
          "correo": "pepe",
          "nombre_completo": "pep",
          "alias": "pepe",
          "password": "pepe",
          "frase_recuperacion": "peep"
        }
      }
    ],
    "usuarios": {
      "id": 1,
      "correo": "adriantoral@live.u-tad.com",
      "nombre_completo": "Adrian Toral",
      "alias": "adriantoral"
    },
    "proyectos_premios": [
      {
        "premios": {
          "id": 1,
          "titulo": "Premio 1 mejorado"
        },
        "anio": 2024
      },
      {
        "premios": {
          "id": 2,
          "titulo": "Premio 2"
        },
        "anio": 2024
      },
      {
        "premios": {
          "id": 3,
          "titulo": "Premio 3"
        },
        "anio": 2024
      }
    ]
  }
}
```

## Crear un nuevo proyecto

### Parametros de creación de proyecto

```javascript
const create_proyecto = [
    body('id_asignatura', 'Type: Int').exists().toInt().optional(),
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    body('ficha_tecnica', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('ruta_fichero', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    body('ruta_imagen', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    validate
]
```

### Ejemplo de creación de proyecto

```http request
POST /api/v1/proyectos/
Authorization: Bearer tu_token_de_acceso
Content-Type: multipart/form-data; boundary=WebAppBoundary

--WebAppBoundary
Content-Disposition: form-data; name="ruta_fichero"; filename="package.json"
Content-Type: application/pdf

< package.json
--WebAppBoundary
Content-Disposition: form-data; name="id_asignatura"

1
--WebAppBoundary
Content-Disposition: form-data; name="titulo"

proyecto.titulo
--WebAppBoundary
Content-Disposition: form-data; name="ficha_tecnica"

proyecto.ficha_tecnica
--WebAppBoundary
Content-Disposition: form-data; name="ruta_imagen"; filename="imagen.jpg"
Content-Type: image/jpeg

< imagen.jpg
--WebAppBoundary
```

### Respuesta de creación de proyecto

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 210
ETag: W/"d2-qhhjdI/HBUbeRdcLnRmw/Xx2h8I"
Date: Sat, 24 Feb 2024 11:24:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 36,
    "id_creador": 1,
    "id_asignatura": 1,
    "titulo": "proyecto.titulo",
    "ficha_tecnica": "proyecto.ficha_tecnica",
    "ruta_fichero": "./files/11708773863460.json",
    "ruta_imagen": "./files/11708773863463.jpg"
  }
}
```

## Actualizar un proyecto

### Parametros de actualización de proyecto

```javascript
const update_proyecto = [
    param('proyecto_id', 'Type: Int').exists().toInt(),
    body('id_asignatura', 'Type: Int').exists().toInt().optional(),
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    body('ficha_tecnica', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('ruta_fichero', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    body('ruta_imagen', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    validate
]
```

### Ejemplo de actualización de proyecto

```http request
PUT /api/v1/proyectos/2
Authorization: Bearer tu_token_de_acceso
Content-Type: application/json

{
  "titulo": "proyecto.titulo mejorado"
}
```

### Respuesta de actualización de proyecto

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 206
ETag: W/"ce-t+fOlCdSEujQeR7tNc+ySY9KCNM"
Date: Wed, 21 Feb 2024 14:59:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 2,
    "id_creador": 1,
    "id_asignatura": null,
    "titulo": "proyecto.titulo mejorado",
    "ficha_tecnica": "proyecto.ficha_tecnica",
    "ruta_fichero": "proyecto.ruta_fichero",
    "ruta_imagen": "proyecto.ruta_imagen"
  }
}
```

## Eliminar un proyecto

### Parametros de eliminación de proyecto

```javascript
const delete_proyecto = [
    param('proyecto_id', 'Type: Int').exists().toInt(),
    validate
]
```

### Ejemplo de eliminación de proyecto

```http request
DELETE /api/v1/proyectos/1
Authorization: Bearer tu_token_de_acceso
```

### Respuesta de eliminación de proyecto

```http request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 207
ETag: W/"cf-b105MM97MN0JTcMNFaUcm3wr+gY"
Date: Sat, 24 Feb 2024 11:22:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "data": {
    "id": 34,
    "id_creador": 1,
    "id_asignatura": 1,
    "titulo": "proyecto.titulo",
    "ficha_tecnica": "proyecto.ficha_tecnica",
    "ruta_fichero": "./files/11708771989788.json",
    "ruta_imagen": "./files/11708771989790.jpg"
  }
}
```
