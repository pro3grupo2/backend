-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: pr3
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
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas`
(
    `id`     int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `asignaturas_materias`
--

DROP TABLE IF EXISTS `asignaturas_materias`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturas_materias`
(
    `id_asignatura` int NOT NULL,
    `id_materia`    int NOT NULL,
    PRIMARY KEY (`id_asignatura`, `id_materia`),
    KEY `id_materia` (`id_materia`),
    CONSTRAINT `asignaturas_materias_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id`),
    CONSTRAINT `asignaturas_materias_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `codigos`
--

DROP TABLE IF EXISTS `codigos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigos`
(
    `id`    int NOT NULL AUTO_INCREMENT,
    `token` varchar(50) DEFAULT NULL,
    `usos`  int         DEFAULT '1',
    PRIMARY KEY (`id`),
    UNIQUE KEY `token` (`token`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`),
    UNIQUE KEY `titulo_2` (`titulo`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos`
(
    `id`            int NOT NULL AUTO_INCREMENT,
    `id_creador`    int         DEFAULT NULL,
    `id_asignatura` int         DEFAULT NULL,
    `titulo`        varchar(50) DEFAULT NULL,
    `ficha`         text,
    `url`           text,
    `portada`       text,
    `validado`      tinyint(1)  DEFAULT '0',
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`),
    KEY `id_creador` (`id_creador`),
    KEY `id_asignatura` (`id_asignatura`),
    CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_creador`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `proyectos_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignaturas` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proyectos_premios`
--

DROP TABLE IF EXISTS `proyectos_premios`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos_premios`
(
    `id_proyecto` int NOT NULL,
    `id_premio`   int NOT NULL,
    PRIMARY KEY (`id_proyecto`, `id_premio`),
    KEY `id_premio` (`id_premio`),
    CONSTRAINT `proyectos_premios_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`),
    CONSTRAINT `proyectos_premios_ibfk_2` FOREIGN KEY (`id_premio`) REFERENCES `premios` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `titulaciones`
--

DROP TABLE IF EXISTS `titulaciones`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titulaciones`
(
    `id`      int NOT NULL AUTO_INCREMENT,
    `id_area` int         DEFAULT NULL,
    `titulo`  varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `titulo` (`titulo`),
    KEY `id_area` (`id_area`),
    CONSTRAINT `titulaciones_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios`
(
    `id`                 int NOT NULL AUTO_INCREMENT,
    `correo`             varchar(50)                                                  DEFAULT NULL,
    `nombre_completo`    varchar(50)                                                  DEFAULT NULL,
    `alias`              varchar(50)                                                  DEFAULT NULL,
    `password`           varchar(200)                                                 DEFAULT NULL,
    `frase_recuperacion` varchar(100)                                                 DEFAULT NULL,
    `rol`                enum ('alumno','alumni','profesor','coordinador','invitado') DEFAULT NULL,
    `promocion`          year                                                         DEFAULT (year(curdate())),
    PRIMARY KEY (`id`),
    UNIQUE KEY `correo` (`correo`),
    UNIQUE KEY `alias` (`alias`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios_departamentos`
--

DROP TABLE IF EXISTS `usuarios_departamentos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_departamentos`
(
    `id_usuario`      int NOT NULL,
    `id_departamento` int NOT NULL,
    PRIMARY KEY (`id_usuario`, `id_departamento`),
    KEY `id_departamento` (`id_departamento`),
    CONSTRAINT `usuarios_departamentos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `usuarios_departamentos_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios_proyectos`
--

DROP TABLE IF EXISTS `usuarios_proyectos`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_proyectos`
(
    `id_usuario`  int NOT NULL,
    `id_proyecto` int NOT NULL,
    PRIMARY KEY (`id_usuario`, `id_proyecto`),
    KEY `id_proyecto` (`id_proyecto`),
    CONSTRAINT `usuarios_proyectos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `usuarios_proyectos_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios_titulaciones`
--

DROP TABLE IF EXISTS `usuarios_titulaciones`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_titulaciones`
(
    `id_usuario`    int NOT NULL,
    `id_titulacion` int NOT NULL,
    PRIMARY KEY (`id_usuario`, `id_titulacion`),
    KEY `id_titulacion` (`id_titulacion`),
    CONSTRAINT `usuarios_titulaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
    CONSTRAINT `usuarios_titulaciones_ibfk_2` FOREIGN KEY (`id_titulacion`) REFERENCES `titulaciones` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2024-03-13 12:33:17
