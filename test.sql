CREATE TABLE `User` (
	`user_id`	INT	NOT NULL,
	`username`	VARCHAR(50)	NOT NULL,
	`email`	VARCHAR(100)	NOT NULL,
	`password`	VARCHAR(100)	NOT NULL,
	`created_at`	DATETIME	NOT NULL
);

CREATE TABLE `User_mission` (
	`user_mission_id`	INT	NOT NULL,
	`user_id2`	INT	NOT NULL,
	`mission_id2`	INT	NOT NULL,
	`status`	ENUM("진행중", "완료")	NOT NULL,
	`started_at`	DATETIME NOT	NULL,
	`completed_at`	DATETIME	NOT NULL
);

CREATE TABLE `Mission` (
	`mission_id`	INT	NOT NULL,
	`title`	VARCHAR(100)	NOT NULL,
	`description`	TEXT	NULL,
	`created_at`	DATETIME	NOT NULL,
	`status`	ENUM ("진행중", "완료") NOT	NULL
);

ALTER TABLE `User` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `User_mission` ADD CONSTRAINT `PK_USER_MISSION` PRIMARY KEY (
	`user_mission_id`,
	`user_id2`,
	`mission_id2`
);

ALTER TABLE `Mission` ADD CONSTRAINT `PK_MISSION` PRIMARY KEY (
	`mission_id`
);

ALTER TABLE `User_mission` ADD CONSTRAINT `FK_User_TO_User_mission_1` FOREIGN KEY (
	`user_id2`
)
REFERENCES `User` (
	`user_id`
);

ALTER TABLE `User_mission` ADD CONSTRAINT `FK_Mission_TO_User_mission_1` FOREIGN KEY (
	`mission_id2`
)
REFERENCES `Mission` (
	`mission_id`
);
