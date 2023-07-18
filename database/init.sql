CREATE DATABASE IF NOT EXISTS `travel`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;
USE `travel`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: travel
-- ------------------------------------------------------
-- Server version	8.0.32
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;
--
-- Table structure for table `followers`
--
DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `followers` (
    `followerId` int NOT NULL AUTO_INCREMENT,
    `userId` int NOT NULL,
    `vacationId` int NOT NULL,
    PRIMARY KEY (`followerId`),
    KEY `FK_userId` (`userId`),
    KEY `FK_vacationId` (`vacationId`),
    CONSTRAINT `FK_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `FK_vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 41 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `followers`
--
LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */
;
INSERT INTO `followers`
VALUES (5, 64, 50),
    (33, 63, 50),
    (37, 63, 51),
    (38, 67, 75),
    (39, 67, 74),
    (40, 67, 51);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `firstName` varchar(45) NOT NULL,
    `lastName` varchar(45) NOT NULL,
    `email` varchar(256) NOT NULL,
    `password` varchar(256) NOT NULL,
    `role` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 71 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO `users`
VALUES (
        62,
        'Hila',
        'Dolev',
        'hiladolev1@gmail.com',
        '12345678',
        'admin'
    ),
    (
        63,
        'Ofir',
        'Magnezi',
        'ofirmagnezi@gmail.com',
        '1234',
        'user'
    ),
    (
        64,
        'Lior',
        'Dolev',
        'lido@walla.com',
        '33442',
        'user'
    ),
    (
        65,
        'gaya',
        'levy',
        'gayalevy@gmail.com',
        '8977',
        'user'
    ),
    (
        66,
        'hila',
        'dolev',
        'hiladolev12@gmail.com',
        '8999',
        'user'
    ),
    (
        67,
        'lady',
        'gaga',
        'ladygaga@gmail.com',
        '559989',
        'user'
    ),
    (
        70,
        'miss',
        'meow meow',
        'pop07@gmail.com',
        '9887',
        'user'
    );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
UNLOCK TABLES;
--
-- Table structure for table `vacations`
--
DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `vacations` (
    `id` int NOT NULL AUTO_INCREMENT,
    `destination` varchar(256) NOT NULL,
    `description` varchar(256) NOT NULL,
    `startDate` date NOT NULL,
    `endDate` date NOT NULL,
    `price` int NOT NULL,
    `image` varchar(256) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 87 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
--
-- Dumping data for table `vacations`
--
LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */
;
INSERT INTO `vacations`
VALUES (
        49,
        'Hersonissos',
        'Maritime Suites by Enorme are located in Hersonissos. Only 20 metres from the sandy beach, the 3-storey building features accommodation with private balconies some of which with sea view.',
        '2023-06-23',
        '2023-06-24',
        71,
        '1687529879805_304386221.jpg'
    ),
    (
        50,
        'Ayia Napa',
        'Located in Ayia Napa, 200 metres from Latchi Adams beach, Atlantica Callisto provides accommodation with a seasonal outdoor swimming pool, free private parking, a garden and a shared lounge. ',
        '2023-08-09',
        '2023-08-16',
        1829,
        '1687530021037_470662963.jpg'
    ),
    (
        51,
        'Long Melford',
        'Welcome to our 15th Century inn where our modern twist on the traditional creates a wonderful setting to enjoy our food, sample our local ales, explore our wine list and rest a weary head',
        '2023-08-01',
        '2023-08-05',
        531,
        '1687530224249_397536100.jpg'
    ),
    (
        52,
        'Amsterdam',
        'Situated in the heart of the city centre, Eden Hotel Amsterdam offers warm-coloured rooms and free WiFi. The famous Rembrandt Square is right around the corner. The central station is 10 minutes away by tram',
        '2023-10-27',
        '2023-10-28',
        295,
        '1687531004468_177954582.jpg'
    ),
    (
        61,
        'New York',
        'Featuring Danny Meyer’s MARTA restaurant and Maialino Restaurant, The Redbury New York is located in the NoMad neighbourhood in New York, 280 metres from Madison Square Park. Free WiFi access is available.',
        '2023-06-26',
        '2023-07-01',
        1058,
        '1687530866681_80577635.jpg'
    ),
    (
        62,
        'Badung',
        'Featuring mountain views, The Ume in Badung features accommodation, an outdoor swimming pool, a garden, a terrace, a bar and a private beach area. The aparthotel features both WiFi and private parking free of charge.',
        '2023-09-05',
        '2023-09-26',
        890,
        '1687530355427_276742237.jpg'
    ),
    (
        63,
        'Uroa',
        'Facing the beachfront, Sunny Palms Beach Bungalows offers 4-star accommodation in Uroa and features a fitness centre, garden and shared lounge. This 4-star hotel offers a kids club, room service and free WiFi.',
        '2023-07-12',
        '2023-07-20',
        1126,
        '1687530702894_321471164.jpg'
    ),
    (
        73,
        'Ein Gedi Glamping',
        'Dead Sea Camping is set in Ein Gedi, within 1 km of The Botanical Garden in Kibbutz Ein Gedi, and offers both Bungalow and empty lots.',
        '2023-07-08',
        '2023-07-10',
        80,
        '1687524333676_ein.jpg'
    ),
    (
        74,
        'Fes',
        'Built in the 17th century and recently restored with patience, passion and talent, the riads design respects typical Moroccan architecture.',
        '2023-08-16',
        '2023-08-26',
        721,
        '1687531174524_86097927.jpg'
    ),
    (
        75,
        'Dubai',
        'The First Collection Business Bay is a modern, stylish hotel located in the Business Bay district and is 1.6 km away from Dubai Mall and the Burj Khalif',
        '2023-08-02',
        '2023-08-12',
        652,
        '1687531285115_372059078.jpg'
    ),
    (
        76,
        'Buenos Aires',
        'Tango de Mayo Hotel is located in the heart of the well-known Mayo Avenue, only 300 metres from 9 de Julio Avenue and 800 metres from The Obelisk of Buenos Aires',
        '2023-06-26',
        '2023-07-01',
        750,
        '1687531412730_41436821.jpg'
    ),
    (
        77,
        'Tel Aviv',
        'Ideally situated in Tel Aviv, Villa Brown Tel-Aviv, a member of Brown Hotels features air-conditioned rooms, free bikes, free WiFi and a garden.',
        '2023-10-03',
        '2023-10-07',
        851,
        '1687531541834_409727043.jpg'
    );
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;
-- Dump completed on 2023-06-30 13:12:48