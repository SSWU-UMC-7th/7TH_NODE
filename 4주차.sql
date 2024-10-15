CREATE DATABASE week4;
USE week4;

CREATE TABLE User (
	`user_id`	INT	NOT NULL,
	`username`	VARCHAR(20)	NOT NULL,
	`email`	VARCHAR(100)	NOT NULL,
	`password`	VARCHAR(100)	NOT NULL,
	`created_at`	DATETIME	NOT NULL,
	`status`	VARCHAR(20)	NULL,
	`address`	VARCHAR(100)	NULL
);

ALTER TABLE `User` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
); 

SELECT * FROM User;
