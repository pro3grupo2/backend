-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: proyectos3
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Create database
--

DROP DATABASE proyectos3;
CREATE DATABASE proyectos3;
USE proyectos3;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas`
(
    `id`     int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas`
    DISABLE KEYS */;
INSERT INTO `areas`
VALUES (3, 'Animación'),
       (2, 'Diseño digital'),
       (1, 'Ingeniería del software'),
       (4, 'Videojuegos');
/*!40000 ALTER TABLE `areas`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturas`
--

DROP TABLE IF EXISTS `asignaturas`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturas`
(
    `id`     int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(200) DEFAULT NULL,
    `curso`  int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 222
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas`
    DISABLE KEYS */;
INSERT INTO `asignaturas`
VALUES (1, 'Historia y Tradición Artística', 1),
       (2, 'Introducción al dibujo y la pintura', 1),
       (3, 'Principios de Gráficos 3D', 1),
       (4, 'Elementos de Composición Visual y Cinematográfica', 1),
       (5, 'Guion', 1),
       (6, 'Pensamiento Creativo', 1),
       (7, 'Anatomía Humana y Animal', 1),
       (8, 'Principios de Animación', 1),
       (9, 'Sistemas de Representación Geométrica', 1),
       (10, 'Teoría del color y la luz', 1),
       (11, 'Historia del Cine y la Animación', 1),
       (12, 'Narrativa Audiovisual', 1),
       (13, 'Principios de dinámicas del cuerpo', 2),
       (14, 'Escultura', 2),
       (15, 'Edición digital', 2),
       (16, 'Fundamentos de música y Diseño de Sonido', 2),
       (17, 'Guión Visual Storyboarding', 2),
       (18, 'Modelado de Objetos', 2),
       (19, 'Producción Digital', 2),
       (20, 'Animación 3D de Personajes I', 2),
       (21, 'Diseño de Personajes', 2),
       (22, 'Fotografía', 2),
       (23, 'Proyectos II: creación de una animática', 2),
       (24, 'Modelado Orgánico', 2),
       (25, 'Previsualización y Realización', 2),
       (26, 'Texturizado y Shading', 3),
       (27, 'Animación 3D de Personajes II', 3),
       (28, 'Diseño y Desarrollo de Entornos y Elementos', 3),
       (29, 'Proyectos III: preproducción para la creación de un cortometraje y/o de arte para videojuegos y sistemas inmersivos', 3),
       (30, 'Iluminación y Composición I', 3),
       (31, 'Desarrollo de Proyectos 2D', 3),
       (32, 'Layout 2D', 3),
       (33, 'Desarrollo de Personajes 2D', 3),
       (34, 'Ink & Paint 2D', 3),
       (35, 'Animación 2D de Personajes I', 3),
       (36, 'Diseño de Videojuegos', 3),
       (37, 'Modelado para Videojuegos y sistemas inmersivos', 3),
       (38, 'Rigging para Videojuegos y sistemas inmersivos', 3),
       (39, 'Animación para Videojuegos y sistemas inmersivos', 3),
       (40, 'Shading e Iluminación para Videojuegos y sistemas inmersivos I', 3),
       (41, 'Desarrollo de Proyectos 3D', 3),
       (42, 'Layout 3D', 3),
       (43, 'Rigging', 3),
       (44, 'Programación para escenas 3D', 3),
       (45, 'Character FX', 3),
       (46, 'Animación avanzada', 4),
       (47, 'Animación experimental', 4),
       (48, 'Prácticas en Empresas', 4),
       (49, 'Proyectos IV: producción y postproducción de un cortometraje de animación y/o de arte para videojuegos y sistemas inmersivos', 4),
       (50, 'Trabajo de fin de Grado', 4),
       (51, 'Prácticas en Empresa', 4),
       (52, 'Formación para el Empleo', 4),
       (53, 'Composición y Efectos 2D', 4),
       (54, 'Animación 2D de Personajes II', 4),
       (55, 'Efectos Visuales para Videojuegos y sistemas inmersivos', 4),
       (56, 'Shading e Ilumnación para Videojuegos y sistemas inmersivos II', 4),
       (57, 'Efectos Visuales 3D', 4),
       (58, 'Iluminación y Composición II', 4),
       (59, 'Matte Painting', 4),
       (60, 'Historia del Arte', 1),
       (61, 'Historia del Diseño y la Iconografía', 1),
       (62, 'Fundamentos de la estética y análisis de la imagen', 1),
       (63, 'Tratamiento Digital de la Imagen', 1),
       (64, 'Dibujo: Análisis e Ideación I', 1),
       (65, 'Dibujo: Análisis e Ideación II', 1),
       (66, 'Composición Gráfica', 1),
       (67, 'Tipografía y Caligrafía', 1),
       (68, 'Prácticas en Empresas (2018)', 4),
       (69, 'Historia del Arte electrónico y digitalx', 2),
       (70, 'Fundamentos de Entornos 3D', 2),
       (71, 'Ilustración', 2),
       (72, 'Infografía y Visualización de Datos', 2),
       (73, 'Dirección de Arte y Comunicación Publicitaria I', 2),
       (74, 'Dirección de Arte y Comunicación Publicitaria II', 2),
       (75, 'Edición y Postproducción digital', 2),
       (76, 'Motion Graphics I', 2),
       (77, 'Negocios y Modelos Digitales', 2),
       (78, 'Proyectos I: Creación de Imagen Digital', 2),
       (79, 'Entornos 3D I', 3),
       (80, 'Entornos 3D II', 3),
       (81, 'Programación para el Arte y el Diseño', 3),
       (82, 'Sistemas Interactivos', 3),
       (83, 'Motion Graphics II', 3),
       (84, 'Diseño y Usabilidad de Interfaces I', 3),
       (85, 'Maquetación y Estructuras Web/App I', 3),
       (86, 'Sociedad Digital', 3),
       (87, 'Proyectos II: Desarrollo de Imagen de Marca', 3),
       (88, 'Proyectos III: Creación de un proyecto de Motion Graphics', 3),
       (89, 'Diseño Editorial', 3),
       (90, 'Proyectos Tecnológicos', 3),
       (91, 'Digitalización y Materialización', 4),
       (92, 'Diseño y Usabilidad de Interfaces II', 4),
       (93, 'Maquetación y Estructuras Web/App II', 4),
       (94, 'Marketing en la Red', 4),
       (95, 'Creación y Dirección de Empresas', 4),
       (96, 'Proyectos IV: Desarrollo de Web/App/Arte Electrónico', 4),
       (97, 'Diseño de Packaging', 4),
       (98, 'Animación 3D', 4),
       (99, 'Entornos Interactivos para Televisión', 4),
       (100, 'Trabajo Fin de Grado', 4),
       (101, 'Habilidades de Dirección', 4),
       (102, 'Fundamentos de matemáticas y física', 1),
       (103, 'Tecnología para Diseñadores', 1),
       (104, 'Teoría del Juego', 1),
       (105, 'Introducción al Diseño de Juegos', 1),
       (106, 'Habilidades de Comunicación y Exposición', 1),
       (107, 'Proyectos I', 1),
       (108, 'Historia de los Juegos', 1),
       (109, 'Fundamentos Literarios', 1),
       (110, 'Introducción a la Programación', 1),
       (111, 'Percepción y Expresión Visual', 1),
       (112, 'Proyectos II', 1),
       (113, 'Scripting (I)', 2),
       (114, 'Psicología del Juego', 2),
       (115, 'Diseño de Videojuegos (I)', 2),
       (116, 'Narrativa y Storytelling visual', 2),
       (117, 'Elementos de Composición Visual', 2),
       (118, 'Proyectos III', 2),
       (119, 'Scripting (II)', 2),
       (120, 'Dirección de Arte', 2),
       (121, 'Diseño Gráfico: Interfaz y Experiencia de Usuario', 2),
       (122, 'Fundamentos de Experiencia de Usuario: UX', 2),
       (123, 'Proyectos IV', 2),
       (124, 'Scripting (III)', 3),
       (125, 'Animación para videojuegos', 3),
       (126, 'Creación de Contenidos 3D', 3),
       (127, 'Diseño de Videojuegos (II)', 3),
       (128, 'Proyectos V', 3),
       (129, 'Diseño de Música y Sonido', 3),
       (130, 'Usabilidad y Testeo', 3),
       (131, 'Diseño de Videojuegos (III)', 3),
       (132, 'Diseño Avanzado de Niveles', 3),
       (133, 'Comunicación Audiovisual', 3),
       (134, 'Proyectos VI', 3),
       (135, 'Ampliación al Diseño Interactivo', 4),
       (136, 'Creación y Desarrollo de Empresas', 4),
       (137, 'Propiedad Intelectual', 4),
       (138, 'Dirección y gestión de Proyectos', 4),
       (139, 'Producción de Videojuegos', 4),
       (140, 'Proyectos VII', 4),
       (141, 'Diseño web y aplicaciones', 4),
       (142, 'Programación Avanzada', 4),
       (143, 'Inteligencia Artificial para Videojuegos', 4),
       (144, 'Diseño para RA y RV', 4),
       (145, 'Diseño de Juegos Casuales', 4),
       (146, 'Diseño de Juegos Serios', 4),
       (147, 'Diseño de juegos Sociales y Multijugador', 4),
       (148, 'Proyectos VIII', 4),
       (149, 'Fundamentos de Desarrollo Web', 1),
       (150, 'Introducción a la Programación I', 1),
       (151, 'Laboratorios de Redes y Sistemas Operativos', 1),
       (152, 'Lógica y Matemática Discreta', 1),
       (153, 'Álgebra', 1),
       (154, 'Arquitectura de Ordenadores', 1),
       (155, 'Introducción a la Programación II', 1),
       (156, 'Laboratorio de Bases de Datos y Sistemas Distribuidos', 1),
       (157, 'Proyectos I: Técnicas y Tecnologías Digitales', 1),
       (158, 'Fundamentos de Composición Visual', 2),
       (159, 'Probabilidad y Estadística', 2),
       (160, 'Programación Orientada a Objetos', 2),
       (161, 'Redes de Ordenadores', 2),
       (162, 'Sistemas Operativos', 2),
       (163, 'Análisis y Diseño de Algoritmos', 2),
       (164, 'Bases de Datos', 2),
       (165, 'Cálculo', 2),
       (166, 'Diseño de Software', 2),
       (167, 'Proyectos II: Tendencias de la Ingeniería del Software', 2),
       (168, 'Inteligencia Artificial', 3),
       (169, 'Programación de Sistemas Distribuidos', 3),
       (170, 'Programación Web I: Cliente', 3),
       (171, 'Programación Web II: Servidor', 3),
       (172, 'Desarrollo de aplicaciones móviles', 3),
       (173, 'Fundamentos de UX', 3),
       (174, 'Proyectos III: Desarrollo Web y Apps', 3),
       (175, 'Introducción a la Seguridad Informática', 3),
       (176, 'Análisis Forense', 3),
       (177, 'Hacking Ético', 3),
       (178, 'Ampliación de Bases de Datos', 3),
       (179, 'Búsqueda y Análisis de la Información', 3),
       (180, 'Procesamiento de Datos', 3),
       (181, 'Programación de videojuegos', 3),
       (182, 'Programación Gráfica', 3),
       (183, 'Física e Inteligencia Artificial para videojuegos', 3),
       (184, 'TFG', 4),
       (185, 'Ingeniería del Software', 4),
       (186, 'Paradigmas de Programación', 4),
       (187, 'OPTATIVIDAD Entorno Laboral', 4),
       (188, 'Programación de Bajo Nivel', 4),
       (189, 'Verificación de Software', 4),
       (190, 'Proyectos de Ciberseguridad: Ciberejercicios', 4),
       (191, 'Bastionado', 4),
       (192, 'Técnicas y Metodologías de Investigación en Ciberseguridad', 4),
       (193, 'Análisis de Malware', 4),
       (194, 'Desarrollo de Herramientas de Ciberseguridad', 4),
       (195, 'Proyectos de Ingeniería de Datos', 4),
       (196, 'Aprendizaje Automático I', 4),
       (197, 'Visión por Computador', 4),
       (198, 'Aprendizaje Automático II', 4),
       (199, 'Visualización de Datos', 4),
       (200, 'Proyectos de Programación Gráfica', 4),
       (201, 'Sistemas Inmersivos', 4),
       (202, 'Programación de Videojuegos Avanzada', 4),
       (203, 'Simulación de efectos especiales', 4),
       (204, 'Prácticas en Empresa (2018)', 4),
       (205, 'Álgebra Lineal', 2),
       (206, 'Análisis Matemático I', 2),
       (207, 'Análisis Matemático II', 2),
       (208, 'Geometría Lineal', 2),
       (209, 'Topología', 3),
       (210, 'Cálculo Numérico', 3),
       (211, 'Ecuaciones Diferenciales Ordinarias', 3),
       (212, 'Matemática Discreta II', 3),
       (213, 'Análisis Matemático III', 4),
       (214, 'Estructuras Algebraicas', 4),
       (215, 'Optimización', 4),
       (216, 'Cálculo de Probabilidades', 4),
       (217, 'Curvas y Superficies', 4),
       (218, 'Inferencia Estadística', 4),
       (219, 'Ecuaciones en Derivadas Parciales', 5),
       (220, 'Trabajo de Fin de Grado Matemática Computacional', 5),
       (221, 'Trabajo Fin de Grado Ingeniería del Software', 5);
/*!40000 ALTER TABLE `asignaturas`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigos`
--

DROP TABLE IF EXISTS `codigos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigos`
(
    `id`     int NOT NULL AUTO_INCREMENT,
    `codigo` varchar(10) DEFAULT NULL,
    `usos`   int         DEFAULT '1',
    PRIMARY KEY (`id`),
    UNIQUE KEY `codigo` (`codigo`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigos`
--

LOCK TABLES `codigos` WRITE;
/*!40000 ALTER TABLE `codigos`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `codigos`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participantes`
--

DROP TABLE IF EXISTS `participantes`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participantes`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `id_proyecto` int          DEFAULT NULL,
    `correo`      varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `id_proyecto` (`id_proyecto`),
    CONSTRAINT `participantes_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantes`
--

LOCK TABLES `participantes` WRITE;
/*!40000 ALTER TABLE `participantes`
    DISABLE KEYS */;
INSERT INTO `participantes`
VALUES (1, 1, 'adriantoral@sertor.es'),
       (2, 1, 'pedro.limones@live.u-tad.com'),
       (3, 2, 'adriantoral@sertor.es'),
       (4, 2, 'pedro.limones@live.u-tad.com');
/*!40000 ALTER TABLE `participantes`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `premios`
--

DROP TABLE IF EXISTS `premios`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `premios`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `id_proyecto` int          DEFAULT NULL,
    `titulo`      varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `id_proyecto` (`id_proyecto`),
    CONSTRAINT `premios_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premios`
--

LOCK TABLES `premios` WRITE;
/*!40000 ALTER TABLE `premios`
    DISABLE KEYS */;
INSERT INTO `premios`
VALUES (1, 1, 'Premio 1'),
       (2, 1, '...'),
       (3, 2, 'Premio 1'),
       (4, 2, '...');
/*!40000 ALTER TABLE `premios`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `id_creador` int                                       DEFAULT NULL,
    `titulo`     varchar(200)                              DEFAULT NULL,
    `ficha`      text,
    `url`        text,
    `portada`    text,
    `estado`     enum ('pendiente','aceptado','rechazado') DEFAULT 'pendiente',
    `premiado`   tinyint(1)                                DEFAULT '0',
    `anio`       year                                      DEFAULT (year(curdate())),
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`),
    KEY `id_creador` (`id_creador`),
    CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_creador`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 21
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos`
    DISABLE KEYS */;
INSERT INTO `proyectos`
VALUES (1, 1, 'Mi primer proyecto 1', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'aceptado', 1, 2023),
       (2, 1, 'Mi primer proyecto 2', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'rechazado', 0, 2020),
       (3, 1, 'Mi primer proyecto 3', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'aceptado', 1, 2019),
       (4, 1, 'Mi primer proyecto 4', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'pendiente', 0, 2023),
       (5, 1, 'Mi primer proyecto 5', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'pendiente', 1, 2021),
       (6, 1, 'Mi primer proyecto 6', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'pendiente', 0, 2022),
       (7, 1, 'Mi primer proyecto 7', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'aceptado', 1, 2021),
       (8, 1, 'Mi primer proyecto 8', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'rechazado', 0, 2020),
       (9, 1, 'Mi primer proyecto 9', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'pendiente', 1, 2018),
       (10, 1, 'Mi primer proyecto 10', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'pendiente', 0, 2019),
       (11, 1, 'Mi primer proyecto 11', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'aceptado', 1, 2018),
       (12, 1, 'Mi primer proyecto 12', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'rechazado', 0, 2018),
       (13, 1, 'Mi primer proyecto 13', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'pendiente', 1, 2020),
       (14, 1, 'Mi primer proyecto 14', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'pendiente', 0, 2020),
       (15, 1, 'Mi primer proyecto 15', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'aceptado', 1, 2020),
       (16, 1, 'Mi primer proyecto 16', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'rechazado', 1, 2023),
       (17, 1, 'Mi primer proyecto 17', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'pendiente', 1, 2021),
       (18, 1, 'Mi primer proyecto 18', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'pendiente', 1, 2023),
       (19, 1, 'Mi primer proyecto 19', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://atlassianblog.wpengine.com/wp-content/uploads/Projectmanagement-1361x760.png', 'aceptado', 1, 2021),
       (20, 1, 'Mi primer proyecto 20', 'Mi primer proyecto es una aplicación web que...', 'https://youtube.com', 'https://images.squarespace-cdn.com/content/v1/5a7269ce1f318daf3337dfbf/1fd0a583-9189-4b7d-877e-478c9a7a5e5a/projectwaterlogo.png', 'rechazado', 1, 2020);
/*!40000 ALTER TABLE `proyectos`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos_asignaturas`
--

DROP TABLE IF EXISTS `proyectos_asignaturas`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos_asignaturas`
(
    `id_proyecto`   int NOT NULL,
    `id_asignatura` int NOT NULL,
    PRIMARY KEY (`id_proyecto`, `id_asignatura`),
    KEY `id_proyecto` (`id_proyecto`),
    KEY `id_asignatura` (`id_asignatura`),
    CONSTRAINT `proyectos_asignaturas_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`),
    CONSTRAINT `proyectos_asignaturas_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos_asignaturas`
--

LOCK TABLES `proyectos_asignaturas` WRITE;
/*!40000 ALTER TABLE `proyectos_asignaturas`
    DISABLE KEYS */;
INSERT INTO `proyectos_asignaturas`
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 194),
       (2, 1),
       (2, 2),
       (2, 3),
       (2, 194);
/*!40000 ALTER TABLE `proyectos_asignaturas`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titulaciones`
--

DROP TABLE IF EXISTS `titulaciones`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titulaciones`
(
    `id`      int NOT NULL AUTO_INCREMENT,
    `id_area` int          DEFAULT NULL,
    `titulo`  varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`id_area`, `titulo`),
    KEY `id_area` (`id_area`),
    CONSTRAINT `titulaciones_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 42
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titulaciones`
--

LOCK TABLES `titulaciones` WRITE;
/*!40000 ALTER TABLE `titulaciones`
    DISABLE KEYS */;
INSERT INTO `titulaciones`
VALUES (6, 1, 'Certificado de formación permanente en Desarrollo para Realidad Virtual, Aumentada y Mixta'),
       (9, 1, 'Ciclo de Grado Superior en Administración de Sistemas Informáticos en Red'),
       (7, 1, 'Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma'),
       (10, 1, 'Ciclo de Grado Superior en Desarrollo de Aplicaciones Multiplataforma Dual'),
       (8, 1, 'Ciclo de Grado Superior en Desarrollo de Aplicaciones Web'),
       (3, 1, 'Doble Grado en Física Computacional e Ingeniería del Software'),
       (2, 1, 'Doble Grado en Matemática Computacional e Ingeniería del Software'),
       (1, 1, 'Grado en Ingeniería del Software'),
       (5, 1, 'Máster Universitario en Computación Gráfica, Realidad Virtual y Simulación'),
       (4, 1, 'Programa Avanzado en Programación de Videojuegos'),
       (13, 2, 'Ciclo de Grado Superior en Artes Plásticas y Diseño en Animación'),
       (14, 2, 'Ciclo de Grado Superior en Artes Plásticas y Diseño en Ilustración'),
       (15, 2, 'Grado en Diseño Digital'),
       (12, 2, 'Máster Universitario en Tecnologías Digitales para el Arte'),
       (11, 2, 'Programa Avanzado en Ilustración'),
       (16, 3, 'Arte para Videojuegos'),
       (28, 3, 'Ciclo de Grado Superior en Animaciones 3D, Juegos y Entornos Interactivos'),
       (18, 3, 'Grado en Animación'),
       (17, 3, 'Programa Avanzado en Animación 2D'),
       (23, 3, 'Programa Avanzado en Animación 3D de Personajes'),
       (25, 3, 'Programa Avanzado en Composición Digital para VFX'),
       (21, 3, 'Programa Avanzado en Concept Art'),
       (26, 3, 'Programa Avanzado en Dirección de Producción para Animación, VFX y Videojuegos'),
       (27, 3, 'Programa Avanzado en Diseño de Personajes'),
       (22, 3, 'Programa avanzado en Modelado 3D de Personajes'),
       (20, 3, 'Programa Avanzado en Previs y Layout'),
       (24, 3, 'Programa Avanzado en Rigging y Character FX'),
       (19, 3, 'Programa Avanzado en Story Art'),
       (30, 4, 'Arte para Videojuegos'),
       (41, 4, 'Ciclo de Grado Superior en Animaciones 3D, Juegos y Entornos Interactivos'),
       (31, 4, 'Curso de Especialización en Desarrollo de Videojuegos y Realidad Virtual'),
       (29, 4, 'Desarrollo de Videojuegos'),
       (33, 4, 'Grado en Diseño de Productos Interactivos'),
       (39, 4, 'Máster Universitario en Computación Gráfica, Realidad Virtual y Simulación'),
       (38, 4, 'Programa Avanzado en Arte y Diseño Visual de Videojuegos'),
       (34, 4, 'Programa Avanzado en Concept Art'),
       (40, 4, 'Programa Avanzado en Dirección de Producción para Animación, VFX y Videojuegos'),
       (32, 4, 'Programa Avanzado en Environment y Prop Art para Videojuegos'),
       (37, 4, 'Programa Avanzado en Game Design'),
       (35, 4, 'Programa avanzado en Modelado 3D de Personajes'),
       (36, 4, 'Programa Avanzado en Programación de Videojuegos');
/*!40000 ALTER TABLE `titulaciones`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titulaciones_asignaturas`
--

DROP TABLE IF EXISTS `titulaciones_asignaturas`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titulaciones_asignaturas`
(
    `id_titulacion` int NOT NULL,
    `id_asignatura` int NOT NULL,
    PRIMARY KEY (`id_titulacion`, `id_asignatura`),
    KEY `id_asignatura` (`id_asignatura`),
    CONSTRAINT `titulaciones_asignaturas_ibfk_1` FOREIGN KEY (`id_titulacion`) REFERENCES `titulaciones` (`id`),
    CONSTRAINT `titulaciones_asignaturas_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titulaciones_asignaturas`
--

LOCK TABLES `titulaciones_asignaturas` WRITE;
/*!40000 ALTER TABLE `titulaciones_asignaturas`
    DISABLE KEYS */;
INSERT INTO `titulaciones_asignaturas`
VALUES (33, 1),
       (18, 2),
       (18, 3),
       (18, 4),
       (18, 5),
       (1, 6),
       (18, 7),
       (18, 8),
       (15, 9),
       (15, 10),
       (18, 10),
       (18, 11),
       (15, 12),
       (18, 13),
       (15, 14),
       (18, 15),
       (18, 16),
       (18, 18),
       (18, 19),
       (18, 20),
       (15, 21),
       (15, 22),
       (18, 23),
       (18, 24),
       (18, 25),
       (18, 26),
       (18, 27),
       (18, 28),
       (18, 29),
       (18, 30),
       (18, 31),
       (18, 32),
       (18, 33),
       (18, 34),
       (18, 35),
       (1, 36),
       (18, 37),
       (18, 38),
       (18, 39),
       (18, 40),
       (18, 41),
       (18, 42),
       (18, 43),
       (18, 44),
       (18, 45),
       (18, 46),
       (18, 47),
       (18, 48),
       (18, 49),
       (18, 50),
       (1, 51),
       (1, 52),
       (18, 53),
       (18, 54),
       (18, 55),
       (18, 56),
       (18, 57),
       (18, 58),
       (18, 59),
       (15, 60),
       (15, 61),
       (15, 62),
       (15, 63),
       (15, 66),
       (15, 67),
       (15, 68),
       (15, 69),
       (15, 70),
       (15, 71),
       (15, 72),
       (15, 73),
       (15, 74),
       (15, 75),
       (15, 76),
       (1, 77),
       (15, 79),
       (15, 80),
       (15, 81),
       (15, 82),
       (15, 83),
       (15, 84),
       (15, 85),
       (1, 86),
       (33, 86),
       (15, 89),
       (15, 90),
       (15, 91),
       (15, 92),
       (15, 93),
       (15, 94),
       (1, 95),
       (15, 97),
       (15, 98),
       (15, 99),
       (33, 100),
       (15, 101),
       (33, 102),
       (33, 103),
       (33, 104),
       (33, 105),
       (33, 106),
       (33, 107),
       (33, 108),
       (33, 109),
       (33, 110),
       (33, 111),
       (33, 112),
       (33, 113),
       (33, 114),
       (33, 115),
       (33, 116),
       (33, 117),
       (33, 118),
       (33, 119),
       (33, 120),
       (33, 123),
       (33, 124),
       (33, 125),
       (33, 126),
       (33, 127),
       (33, 128),
       (33, 129),
       (33, 130),
       (33, 131),
       (33, 132),
       (33, 133),
       (33, 134),
       (33, 135),
       (33, 136),
       (33, 137),
       (1, 138),
       (33, 138),
       (33, 139),
       (33, 140),
       (33, 141),
       (33, 142),
       (33, 143),
       (33, 144),
       (33, 145),
       (33, 146),
       (33, 147),
       (33, 148),
       (1, 149),
       (1, 150),
       (1, 151),
       (1, 152),
       (1, 153),
       (1, 154),
       (1, 155),
       (1, 156),
       (1, 157),
       (1, 158),
       (1, 159),
       (1, 160),
       (1, 161),
       (1, 162),
       (1, 163),
       (1, 164),
       (1, 165),
       (1, 166),
       (1, 167),
       (1, 168),
       (1, 169),
       (1, 170),
       (1, 171),
       (1, 172),
       (1, 173),
       (1, 174),
       (1, 175),
       (1, 176),
       (1, 177),
       (1, 178),
       (1, 179),
       (1, 180),
       (1, 181),
       (1, 182),
       (1, 183),
       (1, 184),
       (1, 185),
       (1, 186),
       (1, 188),
       (1, 189),
       (1, 190),
       (1, 191),
       (1, 192),
       (1, 193),
       (1, 194),
       (1, 195),
       (1, 196),
       (1, 197),
       (1, 198),
       (1, 199),
       (1, 200),
       (1, 201),
       (1, 202),
       (1, 203),
       (1, 204);
/*!40000 ALTER TABLE `titulaciones_asignaturas`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios`
(
    `id`              int NOT NULL AUTO_INCREMENT,
    `correo`          varchar(200)                                                DEFAULT NULL,
    `alias`           varchar(200)                                                DEFAULT NULL,
    `nombre_completo` varchar(200)                                                DEFAULT NULL,
    `password`        varchar(200)                                                DEFAULT NULL,
    `descripcion`     text,
    `portfolio`       varchar(200)                                                DEFAULT NULL,
    `foto`            varchar(200)                                                DEFAULT NULL,
    `rol`             enum ('alumno','alumni','profesor','coordinador','externo') DEFAULT NULL,
    `promocion`       year                                                        DEFAULT (year(curdate())),
    PRIMARY KEY (`id`),
    UNIQUE KEY `correo` (`correo`),
    UNIQUE KEY `alias` (`alias`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios`
    DISABLE KEYS */;
INSERT INTO `usuarios`
VALUES (1, 'adrian.toral@live.u-tad.com', 'adriantoral', 'Adrian Toral', '$2a$10$pntUftxDSSovJTFQ6wwCpOKfaTSOCzciEsjT6Oech0Ghqd6FCA/Me', 'None', 'https://adriantoral.sertor.es/', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'alumno', 2019),
       (2, 'admin.admin@u-tad.com', 'admin', 'Adrian Toral', '$2a$10$pntUftxDSSovJTFQ6wwCpOKfaTSOCzciEsjT6Oech0Ghqd6FCA/Me', 'None', 'https://adriantoral.sertor.es/', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'coordinador', 2019);
/*!40000 ALTER TABLE `usuarios`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 20:36:00
