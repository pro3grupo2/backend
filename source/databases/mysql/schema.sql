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
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores`
(
    `id_usuario` int DEFAULT NULL,
    KEY `id_usuario` (`id_usuario`),
    CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos`
(
    `id_usuario`    int DEFAULT NULL,
    `id_titulacion` int DEFAULT NULL,
    `promocion`     int DEFAULT NULL,
    KEY `id_usuario` (`id_usuario`),
    KEY `id_titulacion` (`id_titulacion`),
    CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `alumnos_ibfk_2` FOREIGN KEY (`id_titulacion`) REFERENCES `titulaciones` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `alumnos`
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
    `titulo` varchar(50) DEFAULT NULL,
    `curso`  int         DEFAULT NULL,
    `letra`  char(1)     DEFAULT NULL,
    PRIMARY KEY (`id`)
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
-- Table structure for table `asignaturas_materias`
--

DROP TABLE IF EXISTS `asignaturas_materias`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturas_materias`
(
    `id_asignatura` int DEFAULT NULL,
    `id_materia`    int DEFAULT NULL,
    KEY `id_asignatura` (`id_asignatura`),
    KEY `id_materia` (`id_materia`),
    CONSTRAINT `asignaturas_materias_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id`),
    CONSTRAINT `asignaturas_materias_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas_materias`
--

LOCK TABLES `asignaturas_materias` WRITE;
/*!40000 ALTER TABLE `asignaturas_materias`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `asignaturas_materias`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturas_titulaciones`
--

DROP TABLE IF EXISTS `asignaturas_titulaciones`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturas_titulaciones`
(
    `id_asignatura` int DEFAULT NULL,
    `id_titulacion` int DEFAULT NULL,
    KEY `id_asignatura` (`id_asignatura`),
    KEY `id_titulacion` (`id_titulacion`),
    CONSTRAINT `asignaturas_titulaciones_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id`),
    CONSTRAINT `asignaturas_titulaciones_ibfk_2` FOREIGN KEY (`id_titulacion`) REFERENCES `titulaciones` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas_titulaciones`
--

LOCK TABLES `asignaturas_titulaciones` WRITE;
/*!40000 ALTER TABLE `asignaturas_titulaciones`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `asignaturas_titulaciones`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creadores`
--

DROP TABLE IF EXISTS `creadores`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creadores`
(
    `id_usuario` int DEFAULT NULL,
    KEY `id_usuario` (`id_usuario`),
    CONSTRAINT `creadores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creadores`
--

LOCK TABLES `creadores` WRITE;
/*!40000 ALTER TABLE `creadores`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `creadores`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos`
(
    `id`     int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `departamentos`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos_usuarios`
--

DROP TABLE IF EXISTS `departamentos_usuarios`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos_usuarios`
(
    `id_usuario`      int DEFAULT NULL,
    `id_departamento` int DEFAULT NULL,
    KEY `id_usuario` (`id_usuario`),
    KEY `id_departamento` (`id_departamento`),
    CONSTRAINT `departamentos_usuarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `departamentos_usuarios_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos_usuarios`
--

LOCK TABLES `departamentos_usuarios` WRITE;
/*!40000 ALTER TABLE `departamentos_usuarios`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `departamentos_usuarios`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias`
(
    `id`     int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `materias`
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
    `id`     int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
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
    `id`            int NOT NULL AUTO_INCREMENT,
    `id_creador`    int          DEFAULT NULL,
    `id_asignatura` int          DEFAULT NULL,
    `titulo`        varchar(100) DEFAULT NULL,
    `ficha_tecnica` text,
    `ruta_fichero`  varchar(100) DEFAULT NULL,
    `ruta_imagen`   varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `id_creador` (`id_creador`),
    KEY `id_asignatura` (`id_asignatura`),
    CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_creador`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `proyectos_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id`)
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
-- Table structure for table `proyectos_premios`
--

DROP TABLE IF EXISTS `proyectos_premios`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos_premios`
(
    `id_proyecto` int DEFAULT NULL,
    `id_premio`   int DEFAULT NULL,
    `anio`        int DEFAULT NULL,
    KEY `id_proyecto` (`id_proyecto`),
    KEY `id_premio` (`id_premio`),
    CONSTRAINT `proyectos_premios_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`),
    CONSTRAINT `proyectos_premios_ibfk_2` FOREIGN KEY (`id_premio`) REFERENCES `premios` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos_premios`
--

LOCK TABLES `proyectos_premios` WRITE;
/*!40000 ALTER TABLE `proyectos_premios`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `proyectos_premios`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos_usuarios`
--

DROP TABLE IF EXISTS `proyectos_usuarios`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos_usuarios`
(
    `id_proyecto` int DEFAULT NULL,
    `id_usuario`  int DEFAULT NULL,
    KEY `id_proyecto` (`id_proyecto`),
    KEY `id_usuario` (`id_usuario`),
    CONSTRAINT `proyectos_usuarios_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`),
    CONSTRAINT `proyectos_usuarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos_usuarios`
--

LOCK TABLES `proyectos_usuarios` WRITE;
/*!40000 ALTER TABLE `proyectos_usuarios`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `proyectos_usuarios`
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
    `id`     int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titulaciones`
--

LOCK TABLES `titulaciones` WRITE;
/*!40000 ALTER TABLE `titulaciones`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `titulaciones`
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
    `id`                 int NOT NULL AUTO_INCREMENT,
    `correo`             varchar(50)  DEFAULT NULL,
    `nombre_completo`    varchar(50)  DEFAULT NULL,
    `alias`              varchar(50)  DEFAULT NULL,
    `password`           varchar(102) DEFAULT NULL,
    `frase_recuperacion` varchar(100) DEFAULT NULL,
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

-- Dump completed on 2024-02-20 13:22:32
