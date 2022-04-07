-- create database
DROP DATABASE IF EXISTS TCTmanagement;
CREATE DATABASE TCTmanagement;
USE TCTmanagement;

-- create table: User
DROP TABLE IF EXISTS 	`User`;
CREATE TABLE IF NOT EXISTS `User` ( 	
	user_id 			INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	user_name	 		NVARCHAR(50) NOT NULL UNIQUE,
	`password` 			NVARCHAR(800) NOT NULL,
	first_name	 		NVARCHAR(50) NOT NULL,
	last_name 			NVARCHAR(50) NOT NULL,
    status_boolean		ENUM('active','inactive') NOT NULL DEFAULT 'active',
    created_date 		DATETIME DEFAULT NOW(),
    link_social			NVARCHAR(800),
    avatar_url			NVARCHAR(8000),
    facebook_url		NVARCHAR(800),
    testing_system_id	NVARCHAR(800),
    `role`				ENUM('MENTOR','ADMIN','STUDENT','TEACHER','MANAGER') NOT NULL DEFAULT 'STUDENT'
);
DROP TABLE IF EXISTS 	`Mentor`;
CREATE TABLE IF NOT EXISTS `Mentor` ( 	
	mentor_id 		INT UNSIGNED NOT NULL,
	school_name		NVARCHAR(50),
    FOREIGN KEY (mentor_id) REFERENCES `User` (user_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`Student`;
CREATE TABLE IF NOT EXISTS `Student` ( 	
	student_id 				INT UNSIGNED NOT NULL ,
	school_name				NVARCHAR(800),
    grade					TINYINT NOT NULL,
    student_phone_number	NVARCHAR(50) NOT NULL UNIQUE,
    parent_phone_number		NVARCHAR(50) NOT NULL,
    parent_name				NVARCHAR(50),
    student_score			DOUBLE DEFAULT 0,
    start_date				DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES `User` (user_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`DeactivedStudent`;
CREATE TABLE IF NOT EXISTS `DeactivedStudent` ( 	
	student_id 				INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name	 			NVARCHAR(50) NOT NULL,
	last_name 				NVARCHAR(50) NOT NULL,
	school_name				NVARCHAR(800),
    grade					TINYINT NOT NULL,
    student_phone_number	NVARCHAR(50) NOT NULL,
    parent_phone_number		NVARCHAR(50) NOT NULL,
    parent_name				NVARCHAR(50),
    link_social				NVARCHAR(800),
    process_status			ENUM('0' ,'1') DEFAULT '0', -- 0 là chưa xử lý, 1 là xử lý r
    left_date				DATE NOT NULL
);
DROP TABLE IF EXISTS 	`ReasonLeft`;
CREATE TABLE IF NOT EXISTS `ReasonLeft` ( 	
	reason_id 				INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id 				INT UNSIGNED NOT NULL,
	reason_left 			NVARCHAR(8000) NOT NULL,
	department_name			NVARCHAR(800),
	FOREIGN KEY (student_id) REFERENCES `DeactivedStudent` (student_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`Teacher`;
CREATE TABLE IF NOT EXISTS `Teacher` ( 	
	teacher_id 				INT UNSIGNED NOT NULL ,
	subject_name			NVARCHAR(50) NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES `User` (user_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`Class`;
CREATE TABLE IF NOT EXISTS `Class` ( 	 
	class_id 		INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	class_name	 	NVARCHAR(50) NOT NULL ,
    grade			TINYINT NOT NULL,
    subject_name	NVARCHAR(50) NOT NULL ,
	created_date 	DATETIME NOT NULL DEFAULT NOW(),
    status_boolean	ENUM('active','inactive'),
    teacher_id		INT UNSIGNED NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES `Teacher` (teacher_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`Schedule`;
CREATE TABLE IF NOT EXISTS `Schedule` ( 	 
	schedule_id 	INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    class_id		INT UNSIGNED NOT NULL,
    start_time		TIME NOT NULL,
    end_time		TIME NOT NULL,
    schedule_tb		ENUM('1','2','3','4','5','6','7') NOT NULL, -- 1 stand for sunday 
    FOREIGN KEY (class_id) REFERENCES `Class` (class_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`ClassroomStudent`;
CREATE TABLE IF NOT EXISTS `ClassroomStudent` ( 	   
	class_id		INT UNSIGNED NOT NULL,
    student_id 		INT UNSIGNED NOT NULL,
    status_boolean	ENUM('active','inactive') NOT NULL DEFAULT 'active',		
	PRIMARY KEY (class_id, student_id),
    FOREIGN KEY (class_id) REFERENCES `Class` (class_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES `Student` (student_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`ClassroomMentor`;
CREATE TABLE IF NOT EXISTS `ClassroomMentor` ( 	   
	class_id		INT UNSIGNED NOT NULL,
    mentor_id 		INT UNSIGNED NOT NULL,
	PRIMARY KEY (class_id, mentor_id),
    FOREIGN KEY (class_id) REFERENCES `Class` (class_id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES `Mentor` (mentor_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`Attendance`;
CREATE TABLE IF NOT EXISTS `Attendance` ( 
	class_id		INT UNSIGNED NOT NULL,
	student_id		INT UNSIGNED NOT NULL,
    date_id			DATE NOT NULL,
    status_boolean	ENUM("P", "A", "L") NOT NULL DEFAULT "P",
    `date`			DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (class_id, student_id,date_id),
    FOREIGN KEY (student_id) REFERENCES `Student` (student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES `Class` (class_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`SubAttendance`;
CREATE TABLE IF NOT EXISTS `SubAttendance` ( 
	class_id		INT UNSIGNED NOT NULL,
	student_id		INT UNSIGNED NOT NULL,
    date_id			DATE NOT NULL,
    status_boolean	ENUM("P", "A", "L") NOT NULL DEFAULT "P",
    `date`			DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (class_id, student_id,date_id),
    FOREIGN KEY (student_id) REFERENCES `Student` (student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES `Class` (class_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`ExamType`;
CREATE TABLE IF NOT EXISTS `ExamType` ( 
	examtype_id		INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`			NVARCHAR(100) NOT NULL
);
DROP TABLE IF EXISTS 	`Exam`;
CREATE TABLE IF NOT EXISTS `Exam` ( 
	exam_id					INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    testing_system_id		NVARCHAR(8000),
	`exam_name`				NVARCHAR(100) NOT NULL,
    exam_type				INT UNSIGNED NOT NULL,
    start_date				DATE NOT NULL,
	FOREIGN KEY (exam_type) REFERENCES `ExamType` (examtype_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`ExamResult`;
CREATE TABLE IF NOT EXISTS `ExamResult` ( 
	exam_id			INT UNSIGNED NOT NULL,
    student_id		INT UNSIGNED NOT NULL,
    class_id		INT UNSIGNED NOT NULL,
    mark			DOUBLE UNSIGNED NOT NULL,	
    PRIMARY KEY (class_id, student_id,exam_id),
    FOREIGN KEY (exam_id) REFERENCES `Exam` (exam_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES `Student` (student_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES `Class` (class_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`Video`;
CREATE TABLE IF NOT EXISTS `Video` ( 
	video_id		INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    video_name		NVARCHAR(800) NOT NULL,
    grade			INT UNSIGNED NOT NULL,
    `subject`		NVARCHAR(800) NOT NULL,	
    video_link		NVARCHAR(8000) NOT NULL
);
DROP TABLE IF EXISTS 	`Chapter`;
CREATE TABLE IF NOT EXISTS `Chapter` ( 
	chapter_id		INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    chapter_name	NVARCHAR(800) NOT NULL,
    grade			INT UNSIGNED NOT NULL,
    `subject`		NVARCHAR(800) NOT NULL
);

DROP TABLE IF EXISTS 	`Lesson`;
CREATE TABLE IF NOT EXISTS `Lesson` ( 
	lesson_id		INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lesson_name		NVARCHAR(800) NOT NULL,
    `date`			DATE NOT NULL,
    chapter_id		INT UNSIGNED NOT NULL,
    video_id		INT UNSIGNED,
    FOREIGN KEY (chapter_id) REFERENCES `Chapter` (chapter_id) ON DELETE CASCADE,
    FOREIGN KEY (video_id) REFERENCES `Video` (video_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`ClassroomLesson`;
CREATE TABLE IF NOT EXISTS `ClassroomLesson` ( 
	lesson_id		INT UNSIGNED NOT NULL,
    class_id		INT UNSIGNED NOT NULL,
    PRIMARY KEY (class_id, lesson_id),
    FOREIGN KEY (class_id) REFERENCES `Class` (class_id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES `Lesson` (lesson_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`HomeWork`;
CREATE TABLE IF NOT EXISTS `HomeWork` ( 
	home_work_id	INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    home_work_name	NVARCHAR(800) NOT NULL,
    home_work_link	NVARCHAR(8000) NOT NULL,
    home_work_key	NVARCHAR(8000) NOT NULL,
    misson_detail	NVARCHAR(800) NOT NULL,
    home_work_type	ENUM('MC','ES') DEFAULT 'MC',
    quizz_id		INT UNSIGNED,
    deadline		DATETIME,
    lesson_id		INT UNSIGNED NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES `Lesson` (lesson_id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS 	`StudentHomeWork`;
CREATE TABLE IF NOT EXISTS `StudentHomeWork` ( 
	submission_id	BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	lesson_id		INT UNSIGNED NOT NULL,
    student_id		INT UNSIGNED NOT NULL,
    mark			DOUBLE UNSIGNED NOT NULL DEFAULT 10,
	submit_date		DATE NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES `Lesson` (lesson_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES `Student` (student_id) ON DELETE CASCADE
);
-- DROP TABLE IF EXISTS 	`StudentScore`;
-- CREATE TABLE IF NOT EXISTS `StudentScore` ( 
-- 	score_id		INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     student_id		INT UNSIGNED NOT NULL,
--     total_score		DOUBLE UNSIGNED NOT NULL DEFAULT 10,
--     FOREIGN KEY (student_id) REFERENCES `Student` (student_id) ON DELETE CASCADE
-- );

DROP TABLE IF EXISTS 	`StudentComment`;
CREATE TABLE IF NOT EXISTS `StudentComment` ( 
	comment_id		INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id		INT UNSIGNED NOT NULL,
    user_id			INT UNSIGNED NOT NULL,
    comment_date	DATETIME NOT NULL DEFAULT NOW(),
    comment_text	NVARCHAR(8000) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES `Student` (student_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES `User` (user_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`SubmissionImages`;
CREATE TABLE IF NOT EXISTS `SubmissionImages` ( 
    submission_id	BIGINT UNSIGNED NOT NULL,
    image_link		NVARCHAR(8000) NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES `StudentHomeWork` (submission_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`Questions`;
CREATE TABLE IF NOT EXISTS `Questions` ( 
	question_id	    	BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	homework_id			INT UNSIGNED NOT NULL,
    score				DOUBLE NOT NULL,
    question_type		ENUM('MC','SC') NOT NULL DEFAULT 'SC',
    content				NVARCHAR(8000),	
    question_image_link	NVARCHAR(8000),
    FOREIGN KEY (homework_id) REFERENCES `HomeWork` (home_work_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS 	`QuestionChoices`;
CREATE TABLE IF NOT EXISTS `QuestionChoices` ( 
    question_choice_id	    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id	    		BIGINT UNSIGNED NOT NULL,
    content					NVARCHAR(8000) NOT NULL,	
    is_correct				ENUM('0','1') DEFAULT '1', 
    choice_image_link		NVARCHAR(8000),
    FOREIGN KEY (question_id) REFERENCES `Questions` (question_id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS 	`SubmissionTakeMultiChoices`;
CREATE TABLE IF NOT EXISTS `SubmissionTakeMultiChoices` ( 
	take_id					BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id	    		BIGINT UNSIGNED NOT NULL,
    question_choice_id	    BIGINT UNSIGNED NOT NULL,
    submission_id			BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES `StudentHomeWork` (submission_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES `Questions` (question_id) ON DELETE CASCADE,
    FOREIGN KEY (question_choice_id) REFERENCES `QuestionChoices` (question_choice_id) ON DELETE CASCADE
);



INSERT INTO `TCTmanagement`.`User` (`user_name`, `password`, `first_name`, `last_name`,`role`) VALUES ('ducthang1', '123456789', 'Thắng', 'Nguyễn Đức','ADMIN');
INSERT INTO `TCTmanagement`.`ExamType` (`name`) VALUES ('Luyện Đề');
INSERT INTO `TCTmanagement`.`ExamType` (`name`) VALUES ('Kiểm Tra Chương');
INSERT INTO `TCTmanagement`.`ExamType` (`name`) VALUES ('Kiểm Tra 15p');
INSERT INTO `TCTmanagement`.`ExamType` (`name`) VALUES ('Kiểm Tra Tháng');

										
