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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas`
    DISABLE KEYS */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantes`
--

LOCK TABLES `participantes` WRITE;
/*!40000 ALTER TABLE `participantes`
    DISABLE KEYS */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premios`
--

LOCK TABLES `premios` WRITE;
/*!40000 ALTER TABLE `premios`
    DISABLE KEYS */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos`
    DISABLE KEYS */;
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
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios`
    DISABLE KEYS */;
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

-- Dump completed on 2024-03-26 11:17:14
