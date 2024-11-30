-- 创建 user 表
CREATE TABLE user (
    id BIGINT(13) NOT NULL PRIMARY KEY,
    accountType VARCHAR(255) NOT NULL,
    account VARCHAR(255) NOT NULL,
    password VARCHAR(255) DEFAULT NULL,
    nickName VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'normal',
    languageCode VARCHAR(255) NOT NULL,
    languageRegionCode VARCHAR(255) NOT NULL,
    createTime TIMESTAMP NOT NULL
);

-- 创建 user 表的插入前触发器
DELIMITER //
CREATE TRIGGER user_before_insert BEFORE INSERT ON user
FOR EACH ROW
BEGIN
    DECLARE random_id BIGINT(13);
    SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    WHILE EXISTS (SELECT 1 FROM user WHERE id = random_id) DO
        SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    END WHILE;
    SET NEW.id = random_id;
    SET NEW.createTime = NOW();
END //
DELIMITER ;

-- 创建 user 表的删除前触发器
DELIMITER //
CREATE TRIGGER user_before_delete BEFORE DELETE ON user
FOR EACH ROW
BEGIN
    DELETE FROM food WHERE auth = OLD.id;
    DELETE FROM comment WHERE sendId = OLD.id OR acceptId = OLD.id;
    DELETE FROM favourite WHERE user_id = OLD.id;
END //
DELIMITER ;

-- 创建 food 表
CREATE TABLE food (
    id BIGINT(13) NOT NULL PRIMARY KEY,
    auth BIGINT(13) NOT NULL,
    title VARCHAR(255) NOT NULL,
    recommend FLOAT NOT NULL DEFAULT 0.0,
    finished VARCHAR(255) NOT NULL,
    ingredients JSON NOT NULL,
    steps JSON NOT NULL,
    languageCode VARCHAR(255) NOT NULL,
    languageRegionCode VARCHAR(255) NOT NULL,
    createTime TIMESTAMP NOT NULL,
    FOREIGN KEY (auth) REFERENCES user(id)
);

-- 创建 food 表的插入前触发器
DELIMITER //
CREATE TRIGGER food_before_insert BEFORE INSERT ON food
FOR EACH ROW
BEGIN
    DECLARE random_id BIGINT(13);
    SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    WHILE EXISTS (SELECT 1 FROM food WHERE id = random_id) DO
        SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    END WHILE;
    SET NEW.id = random_id;
    SET NEW.createTime = NOW();
END //
DELIMITER ;

-- 创建 comment 表
CREATE TABLE comment (
    id BIGINT(13) NOT NULL PRIMARY KEY,
    comment VARCHAR(255) NOT NULL,
    languageCode VARCHAR(255) NOT NULL,
    languageRegionCode VARCHAR(255) NOT NULL,
    foodId BIGINT(13) NOT NULL,
    sendId BIGINT(13) NOT NULL,
    acceptId BIGINT(13) DEFAULT NULL,
    createTime TIMESTAMP NOT NULL,
    FOREIGN KEY (foodId) REFERENCES food(id),
    FOREIGN KEY (sendId) REFERENCES user(id),
    FOREIGN KEY (acceptId) REFERENCES user(id)
);

-- 创建 comment 表的插入前触发器
DELIMITER //
CREATE TRIGGER comment_before_insert BEFORE INSERT ON comment
FOR EACH ROW
BEGIN
    DECLARE random_id BIGINT(13);
    SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    WHILE EXISTS (SELECT 1 FROM comment WHERE id = random_id) DO
        SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    END WHILE;
    SET NEW.id = random_id;
    SET NEW.createTime = NOW();
END //
DELIMITER ;

-- 创建 favourite 表
CREATE TABLE favourite (
    id BIGINT(13) NOT NULL PRIMARY KEY,
    languageCode VARCHAR(255) NOT NULL,
    languageRegionCode VARCHAR(255) NOT NULL,
    foodId BIGINT(13) NOT NULL,
    creatTime TIMESTAMP NOT NULL,
    FOREIGN KEY (foodId) REFERENCES food(id)
);

-- 创建 favourite 表的插入前触发器
DELIMITER //
CREATE TRIGGER favourite_before_insert BEFORE INSERT ON favourite
FOR EACH ROW
BEGIN
    DECLARE random_id BIGINT(13);
    SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    WHILE EXISTS (SELECT 1 FROM favourite WHERE id = random_id) DO
        SET random_id = FLOOR(RAND() * 10000000000000 + 10000000000000);
    END WHILE;
    SET NEW.id = random_id;
    SET NEW.creatTime = NOW();
END //
DELIMITER ;

-- 向 user 表插入十条数据
INSERT INTO user (accountType, account, password, nickName, avatar, status, languageCode, languageRegionCode) VALUES
('user_type_1', 'account1', 'password1', 'nickname1', 'avatar1', 'normal', 'en', 'US'),
('user_type_2', 'account2', 'password2', 'nickname2', 'avatar2', 'normal', 'en', 'UK'),
('user_type_3', 'account3', 'password3', 'nickname3', 'avatar3', 'normal', 'fr', 'FR'),
('user_type_4', 'account4', 'password4', 'nickname4', 'avatar4', 'normal', 'de', 'DE'),
('user_type_5', 'account5', 'password5', 'nickname5', 'avatar5', 'normal', 'es', 'ES'),
('user_type_6', 'account6', 'password6', 'nickname6', 'avatar6', 'normal', 'it', 'IT'),
('user_type_7', 'account7', 'password7', 'nickname7', 'avatar7', 'normal', 'pt', 'PT'),
('user_type_8', 'account8', 'password8', 'nickname8', 'avatar8', 'normal', 'ru', 'RU'),
('user_type_9', 'account9', 'password9', 'nickname9', 'avatar9', 'normal', 'zh', 'CN'),
('user_type_10', 'account10', 'password10', 'nickname10', 'avatar10', 'normal', 'ja', 'JP');

-- 向 food 表插入十条数据，关联到已插入的用户表数据
INSERT INTO food (auth, title, recommend, finished, ingredients, steps, languageCode, languageRegionCode) VALUES
((SELECT id FROM user WHERE nickname = 'nickname1'), 'Food Title 1', 0.5, 'finished', '{"ingredient1": "amount1"}', '{"step1": "description1"}', 'en', 'US'),
((SELECT id FROM user WHERE nickname = 'nickname2'), 'Food Title 2', 0.3, 'finished', '{"ingredient2": "amount2"}', '{"step2": "description2"}', 'en', 'UK'),
((SELECT id FROM user WHERE nickname = 'nickname3'), 'Food Title 3', 0.7, 'finished', '{"ingredient3": "amount3"}', '{"step3": "description3"}', 'fr', 'FR'),
((SELECT id FROM user WHERE nickname = 'nickname4'), 'Food Title 4', 0.2, 'finished', '{"ingredient4": "amount4"}', '{"step4": "description4"}', 'de', 'DE'),
((SELECT id FROM user WHERE nickname = 'nickname5'), 'Food Title 5', 0.8, 'finished', '{"ingredient5": "amount5"}', '{"step5": "description5"}', 'es', 'ES'),
((SELECT id FROM user WHERE nickname = 'nickname6'), 'Food Title 6', 0.4, 'finished', '{"ingredient6": "amount6"}', '{"step6": "description6"}', 'it', 'IT'),
((SELECT id FROM user WHERE nickname = 'nickname7'), 'Food Title 7', 0.6, 'finished', '{"ingredient7": "amount7"}', '{"step7": "description7"}', 'pt', 'PT'),
((SELECT id FROM user WHERE nickname = 'nickname8'), 'Food Title 8', 0.1, 'finished', '{"ingredient8": "amount8"}', '{"step8": "description8"}', 'ru', 'RU'),
((SELECT id FROM user WHERE nickname = 'nickname9'), 'Food Title 9', 0.9, 'finished', '{"ingredient9": "amount9"}', '{"step9": "description9"}', 'zh', 'CN'),
((SELECT id FROM user WHERE nickname = 'nickname10'), 'Food Title 10', 0.5, 'finished', '{"ingredient10": "amount10"}', '{"step10": "description10"}', 'ja', 'JP');

-- 向 comment 表插入十条数据，关联到已插入的用户表和食物表数据
INSERT INTO comment (comment, languageCode, languageRegionCode, foodId, sendId, acceptId) VALUES
('Comment 1', 'en', 'US', (SELECT id FROM food WHERE title = 'Food Title 1'), (SELECT id FROM user WHERE nickname = 'nickname1'), (SELECT id FROM user WHERE nickname = 'nickname2')),
('Comment 2', 'en', 'UK', (SELECT id FROM food WHERE title = 'Food Title 2'), (SELECT id FROM user WHERE nickname = 'nickname2'), (SELECT id FROM user WHERE nickname = 'nickname3')),
('Comment 3', 'fr', 'FR', (SELECT id FROM food WHERE title = 'Food Title 3'), (SELECT id FROM user WHERE nickname = 'nickname3'), (SELECT id FROM user WHERE nickname = 'nickname6')),
('Comment 4', 'de', 'DE', (SELECT id FROM food WHERE title = 'Food Title 4'), (SELECT id FROM user WHERE nickname = 'nickname4'), (SELECT id FROM user WHERE nickname = 'nickname5')),
('Comment 5', 'es', 'ES', (SELECT id FROM food WHERE title = 'Food Title 5'), (SELECT id FROM user WHERE nickname = 'nickname5'), (SELECT id FROM user WHERE nickname = 'nickname6')),
('Comment 6', 'it', 'IT', (SELECT id FROM food WHERE title = 'Food Title 6'), (SELECT id FROM user WHERE nickname = 'nickname6'), (SELECT id FROM user WHERE nickname = 'nickname7')),
('Comment 7', 'pt', 'PT', (SELECT id FROM food WHERE title = 'Food Title 7'), (SELECT id FROM user WHERE nickname = 'nickname7'), (SELECT id FROM user WHERE nickname = 'nickname6')),
('Comment 8', 'ru', 'RU', (SELECT id FROM food WHERE title = 'Food Title 8'), (SELECT id FROM user WHERE nickname = 'nickname6'), (SELECT id FROM user WHERE nickname = 'nickname9')),
('Comment 9', 'zh', 'CN', (SELECT id FROM food WHERE title = 'Food Title 9'), (SELECT id FROM user WHERE nickname = 'nickname9'), (SELECT id FROM user WHERE nickname = 'nickname6')),
('Comment 10', 'ja', 'JP', (SELECT id FROM food WHERE title = 'Food Title 10'), (SELECT id FROM user WHERE nickname = 'nickname6'), (SELECT id FROM user WHERE nickname = 'nickname1'));

-- 向 favourite 表插入十条数据，关联到已插入的食物表数据
INSERT INTO favourite (languageCode, languageRegionCode, foodId) VALUES
('en', 'US', (SELECT id FROM food WHERE title = 'Food Title 1')),
('en', 'UK', (SELECT id FROM food WHERE title = 'Food Title 2')),
('fr', 'FR', (SELECT id FROM food WHERE title = 'Food Title 3')),
('de', 'DE', (SELECT id FROM food WHERE title = 'Food Title 4')),
('es', 'ES', (SELECT id FROM food WHERE title = 'Food Title 5')),
('it', 'IT', (SELECT id FROM food WHERE title = 'Food Title 6')),
('pt', 'PT', (SELECT id FROM food WHERE title = 'Food Title 7')),
('ru', 'RU', (SELECT id FROM food WHERE title = 'Food Title 8')),
('zh', 'CN', (SELECT id FROM food WHERE title = 'Food Title 9')),
('ja', 'JP', (SELECT id FROM food WHERE title = 'Food Title 10'));

