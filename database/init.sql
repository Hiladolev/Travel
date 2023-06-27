CREATE DATABASE IF NOT EXISTS `travel`;
USE `travel`;
/*!50503 SET NAMES utf8 */
;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
CREATE TABLE IF NOT EXISTS `vacations` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `destination` VARCHAR(256) NOT NULL,
    `description` VARCHAR(256) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `price` INT NOT NULL,
    `image` VARCHAR(256) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 155 DEFAULT CHARSET = utf8mb4;
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `email` VARCHAR(256) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `role` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `followers` (
    `followerId` INT NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `vacationId` INT NOT NULL,
    PRIMARY KEY (`followerId`),
    CONSTRAINT `FK_userId` FOREIGN KEY (`userId`) REFERENCES users(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `FK_vacationId` FOREIGN KEY (`vacationId`) REFERENCES vacations(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO `users`
VALUES(
        1,
        'hila',
        'dolev',
        'hiladolev1@gmail.com',
        '12345678',
        'admin'
    );
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */
;
INSERT INTO `vacations`
VALUES(
        1,
        'Hersonissos',
        'Maritime Suites by Enorme are located in Hersonissos. Only 20 metres from the sandy beach, the 3-storey building features accommodation with private balconies some of which with sea view.',
        '2023-06-23',
        '2023-06-24',
        71,
        '1687529879805_304386221.jpg'
    ),
    (
        2,
        'Ayia Napa',
        'Located in Ayia Napa, 200 metres from Latchi Adams beach, Atlantica Callisto provides accommodation with a seasonal outdoor swimming pool, free private parking, a garden and a shared lounge. ',
        '2023-08-09',
        '2023-08-16',
        1829,
        '1687530021037_470662963.jpg'
    ),
    (
        3,
        'Long Melford',
        'Welcome to our 15th Century inn where our modern twist on the traditional creates a wonderful setting to enjoy our food, sample our local ales, explore our wine list and rest a weary head',
        '2023-08-01',
        '2023-08-05',
        531,
        '1687530224249_397536100.jpg'
    ),
    (
        4,
        'Amsterdam',
        'Situated in the heart of the city centre, Eden Hotel Amsterdam offers warm-coloured rooms and free WiFi. The famous Rembrandt Square is right around the corner. The central station is 10 minutes away by tram',
        '2023-10-27',
        '2023-10-28',
        295,
        '1687531004468_177954582.jpg'
    ),
    (
        5,
        'New York',
        'Featuring Danny Meyer\'s restaurant and Maialino Restaurant, The Redbury New York is located in the NoMad neighbourhood in New York, 280 metres from Madison Square Park. Free WiFi access is available.',
        '2023-06-26',
        '2023-07-01',
        1058,
        '1687530866681_80577635.jpg'
    ),
    (
        6,
        'Badung',
        'Featuring mountain views, The Ume in Badung features accommodation, an outdoor swimming pool, a garden, a terrace, a bar and a private beach area. The aparthotel features both WiFi and private parking free of charge.',
        '2023-09-05',
        '2023-09-26',
        890,
        '1687530355427_276742237.jpg'
    ),
    (
        7,
        'Uroa',
        'Facing the beachfront, Sunny Palms Beach Bungalows offers 4-star accommodation in Uroa and features a fitness centre, garden and shared lounge. This 4-star hotel offers a kids club, room service and free WiFi.',
        '2023-07-12',
        '2023-07-20',
        1126,
        '1687530702894_321471164.jpg'
    ),
    (
        8,
        'Ein Gedi Glamping',
        'Dead Sea Camping is set in Ein Gedi, within 1 km of The Botanical Garden in Kibbutz Ein Gedi, and offers both Bungalow and empty lots.',
        '2023-07-08',
        '2023-07-10',
        80,
        '1687524333676_ein.jpg'
    ),
    (
        9,
        'Fes',
        'Built in the 17th century and recently restored with patience, passion and talent, the riads design respects typical Moroccan architecture.',
        '2023-08-16',
        '2023-08-26',
        721,
        '1687531174524_86097927.jpg'
    ),
    (
        10,
        'Dubai',
        'The First Collection Business Bay is a modern, stylish hotel located in the Business Bay district and is 1.6 km away from Dubai Mall and the Burj Khalif',
        '2023-08-02',
        '2023-08-12',
        652,
        '1687531285115_372059078.jpg'
    ),
    (
        11,
        'Buenos Aires',
        'Tango de Mayo Hotel is located in the heart of the well-known Mayo Avenue, only 300 metres from 9 de Julio Avenue and 800 metres from The Obelisk of Buenos Aires',
        '2023-06-26',
        '2023-07-01',
        750,
        '1687531412730_41436821.jpg'
    ),
    (
        12,
        'Tel Aviv',
        'Ideally situated in Tel Aviv, Villa Brown Tel-Aviv, a member of Brown Hotels features air-conditioned rooms, free bikes, free WiFi and a garden.',
        '2023-10-03',
        '2023-10-07',
        851,
        '1687531541834_409727043.jpg'
    );
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */
;