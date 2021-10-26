CREATE TABLE `quiznow`.`categories` ( `id` INT UNSIGNED NOT NULL , `type` VARCHAR(150) NOT NULL , PRIMARY KEY (`id`), UNIQUE (`type`)) ENGINE = InnoDB;

ALTER TABLE `categories` CHANGE `id` `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE `quiznow`.`keywords` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `title` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `quiznow`. `quizzes` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `miniatura` VARCHAR(256) NOT NULL , `title` VARCHAR(100) NOT NULL , `description` TEXT NULL , `user_id` INT NOT NULL , `category_id` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `quizzes` ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `quizzes` ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE `quiznow`.`questions` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `title` VARCHAR(200) NOT NULL , `quiz_id` INT UNSIGNED NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `questions` ADD CONSTRAINT `fk_questions_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE `quiznow`.`answers` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `title` VARCHAR(150) NOT NULL , `question_id` INT UNSIGNED NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `answers` ADD CONSTRAINT `fk_answers_questions_id` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE `quiznow`.`keywords_quizzes` ( `id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `quiz_id` INT UNSIGNED NOT NULL , `keyword_id` INT UNSIGNED NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `keywords_quizzes` ADD CONSTRAINT `fk_keywords_quizzes_keyword_id` FOREIGN KEY (`keyword_id`) REFERENCES `keywords`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT; ALTER TABLE `keywords_quizzes` ADD CONSTRAINT `fk_keywords_quizzes_quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
