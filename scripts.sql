-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_usuarios
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recuperacao_senha`
--

DROP TABLE IF EXISTS `recuperacao_senha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recuperacao_senha` (
  `ID_RECUPERACAO` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `CODIGO_RECUPERACAO` int NOT NULL,
  `DATA_EXPERICAO` varchar(10) NOT NULL,
  PRIMARY KEY (`ID_RECUPERACAO`),
  KEY `FK_USUARIO` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recuperacao_senha`
--

LOCK TABLES `recuperacao_senha` WRITE;
/*!40000 ALTER TABLE `recuperacao_senha` DISABLE KEYS */;
/*!40000 ALTER TABLE `recuperacao_senha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) DEFAULT NULL,
  `login` varchar(15) DEFAULT NULL,
  `senha` varchar(10) DEFAULT NULL,
  `dataNasc` date NOT NULL,
  `dataRegistro` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Geraldo Filho','geraldo.filho','123456','1991-02-01','1994-01-01'),(3,'Gilson Miranda','gilson.miranda','1234567','1997-06-11','2022-01-01'),(4,'Ana Silva','ana.silva','abcdefg','1990-03-15','2022-01-02'),(5,'Carlos Oliveira','carlos.oliveira','qwerty','1985-09-25','2022-01-03'),(7,'Lucas Luquinha','lucas.lucco','abcd123','1988-07-19','2022-01-05'),(8,'Marina Lima','marina.lima','password','1995-02-14','2022-01-06'),(9,'Ricardo Santos','ricardo.santos','pass123','1982-11-30','2022-01-07'),(10,'Camila Oliveira','camila.oliveira','876543','1998-04-03','2022-01-08'),(11,'Pedro Almeida','pedro.almeida','abc123xyz','1980-06-22','2022-01-09'),(12,'Tatiane Costa','tatiane.costa','xyz987','1991-09-10','2022-01-10'),(13,'Aline Lima','aline.lima','aline123','1994-08-27','2022-01-11'),(14,'Roberto Santos','roberto.santos','rbs456','1987-05-18','2022-01-12'),(15,'Luciano Costa','luciano.costa','lc123','1983-04-14','2022-01-14'),(16,'Isabela Silva','isabela.silva','isabela456','1999-01-05','2022-01-15'),(17,'Ricardo Peixoto','rica.peixoto','abcdeg','1995-09-15','2024-01-02'),(18,'Joao gomez','joao.comes.com','147258','2009-03-26','2024-01-30'),(19,'gadelha junior','gad.jr','741852','2006-03-30','2023-12-12'),(20,'Joao Ferreira','j.ferreira','123456','2004-11-24','2022-05-01'),(21,'maria alves','mari.alves','147258','2012-02-06','2024-02-27');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;



-- Dump completed on 2024-03-04 15:16:42
