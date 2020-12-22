BEGIN;

TRUNCATE
    user_information,
    init_posts,
    init_following
    RESTART IDENTITY CASCADE;

INSERT INTO user_information (fullname, username, user_password, email, about_user, user_stack)
VALUES
    ('Adyceum', 'Admin', '$2a$12$UUVsvVL.9zfko4nrqrYEUehCBaPJLgpB/zs64fzdoXEHLtH/qt8r2', 'admin_dev@init.com', 'Admin priveledges come with all the responsibility.', 'Full Stack'),
    ('Test_user1', 'test1', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user1@gmail.com', 'Although social media weirds me out, I test for code breaks.', 'Frontend'),
    ('Test_user2', 'test2', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user2@live.com', 'How many frames can I collapse in a single try...', 'Backend'),
    ('Test_user3', 'test3', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user3@icloud.com', 'Testing, testing, 1, 2, 3. iOS is where it is at!', 'Full Stack'),
    ('Test_user4', 'test4', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user4@outlook.com', 'Although Androids weird me out, I still need to make a living.', ''),
    ('Test_user5', 'test5', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user5@aol.com', 'It is all about the user experience.', 'Frontend'),
    ('Test_user6', 'test6', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user6@yahoo.com', 'Data structures are keeping init running.', 'Backend'),
    ('Test_user7', 'test7', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user7@i-MCcarri.com', 'Ready to collab with other programming professionals.', 'Full Stack'),
    ('Test_user8', 'test8', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'test_user8@earthdragon.com', 'ohm, good design brings inner peice.', '');

INSERT INTO init_following (following_id, users_id, unread)
VALUES
    (2, 1, true),
    (3, 1, false),
    (4, 1, true),
    (4, 2, false),
    (1, 2, true),
    (3, 2, false),
    (1, 4, true),
    (2, 4, false),
    (3, 4, true),
    (6, 4, false),
    (7, 4, true),
    (8, 4, false),
    (5, 4, true),
    (4, 5, false),
    (4, 6, true);

COMMIT;