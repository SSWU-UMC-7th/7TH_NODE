-- CreateTable
CREATE TABLE `user` (
    `email` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `gender` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birth` DATE NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `detail_address` VARCHAR(100) NULL,
    `phone_number` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
