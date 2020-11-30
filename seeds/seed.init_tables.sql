BEGIN;

TRUNCATE
    user_information,
    init_posts,
    init_following
    RESTART IDENTITY CASCADE;

INSERT INTO user_information (fullname, username, user_password, email, about_user, user_stack)
VALUES
    ('Kakarot', 'Really Son Goku', '$2a$12$3yf.8jQ4tnfQPzARFkkjP.h12CHtJjz1xFJgPo3kTtWcZCswjPu3a', 'goku@gmail.com', 'I love to eat, fight, and that is about it!', 'Frontend'),
    ('Vegeta', 'The Strongest Ever', '$2a$12$yLwyuRRlkhaATZ8PtuhX7eiWvJmmkWyvy74.yvBzJGLSZiGumrrDa', 'vegeta@gmail.com', 'I am the Prince of all Saiyans. What else do you need to know...', 'Full Stack'),
    ('Gohan', 'ProfessorGo', '$2a$12$6jexarPNvKvKFx/stNvYF.l3bRfkLJiptPF5G5vbYg7gBhDWSKH.2', 'gohan@yahoo.com', 'Proud nerd and father.', 'Backend'),
    ('Trunks', 'Time Traveller Trunks', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks@yahoo.com', 'Although Androids weird me out, I still need to make a living.', 'Frontend'),
    ('Test user 1', 'test1', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks1@yahoo.com', 'Although Androids weird me out, I still need to make a living.', 'Frontend'),
    ('Test user 2', 'test2', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks2@yahoo.com', 'Although Androids weird me out, I still need to make a living.', 'Frontend'),
    ('Test user 3', 'test3', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks3@yahoo.com', 'Although Androids weird me out, I still need to make a living.', 'Frontend'),
    ('Test user 4', 'test4', '$2a$12$zh9chAG0bjcvniAQQuQ0quZ/7qD1ihon2Kk5Bz6N.YeVdCI1ES9Nu', 'trunks4@yahoo.com', 'Although Androids weird me out, I still need to make a living.', 'Frontend');
INSERT INTO init_posts (username, post_title, post_description, post_live_link, post_repository, post_image_file, post_image_type, tech_stack, user_id)
VALUES
    ('Really Son Goku', 'My Computer', 'Here is the sweet machine I use', 'https://gs-computer.vercel.app/', 'https://github.com/reallysongoku/compuuuter', '/hexadeci', '/hexadeci', 'Sony A6000', 1),
    ('The Strongest Ever', 'Zenkai Power', 'Doctor Brief needed an algorithm to understand the Saiyan healing process', 'https://zenkai.vercel.app/', 'https://github.com/thestrongestever/zenkai', '/hexadeci', '/hexadeci', 'Python', 2),
    ('The Strongest Ever', 'Key to Strength', 'Source code for the artifical gravity machine', 'https://artificial-gravity.vercel.app/', 'https://github.com/thestrongestever/AG', '/hexadeci', '/hexadeci', 'Python', 2),
    ('ProfessorGo', 'Biology of Cell', 'The secrets to understanding the genetic makeup of Cell', 'https://how-cell-works.vercel.app/', 'https://github.com/professorgo/cell', '/hexadeci', '/hexadeci', 'React, Node', 3),
    ('ProfessorGo', 'Great Book List', 'A list of all of my favorite books put together into a nice website', 'https://greatest-books.vercel.app/', 'https://github.com/professorgo/greatbooks', '/hexadeci', '/hexadeci', 'Javascript, CSS', 3),
    ('ProfessorGo', 'Herculean Suit', 'Code for a powered exoskeleton for my father in law, Hercule', 'https://herculean-suit.vercel.app/', 'https://github.com/professorgo/herculean', '/hexadeci', '/hexadeci', 'C#', 3),
    ('Time Traveller Trunks', 'Buster Katana', 'Blueprint for 3D printing my old katana','https://buster-katana.vercel.app/', 'https://github.com/timetravellertrunks/katana', '/hexadeci', '/hexadeci', 'Python', 4),
    ('Time Traveller Trunks', 'Pro Port', 'Not really a big deal... just my killer portfolio', 'https://ttt-portfolio.vercel.app/', 'https://github.com/timetravellertrunks/portfolio', '/hexadeci', '/hexadeci', 'HTML, Javascript, CSS', 4);

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

INSERT INTO init_comments (
  text,
  post_id,
  user_id,
  unread
) VALUES
  (
    'This post is amazing',
    1,
    2,
    true
  ),
  (
    'Yeh I agree it''s amazing',
    1,
    3,
    false
  ),
  (
    'I would go so far as to say it''s double amazing',
    1,
    4,
    true
  ),
  (
    'A-mazing!',
    1,
    5,
    false
  ),
  (
    'That''s some interesting lorems you raise',
    2,
    6,
    true
  ),
  (
    'Yeh totally I''d never thought about lorems like that before',
    2,
    1,
    false
  ),
  (
    'So you''re saying consectetur adipisicing elit?',
    2,
    3,
    true
  ),
  (
    'Sixth? You mean sith?!!',
    2,
    6,
    false
  ),
  (
    'What do you call an evil procrastinator? Darth Later! Hahahahaha!',
    2,
    4,
    true
  ),
  (
    'Ten ten ten ten ten ten ten!',
    1,
    3,
    false
  ),
  (
    'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!!!',
    1,
    5,
    true
  ),
  (
    '5, 6, 7, 8! My boot-scootin'' baby is drivin'' me crazy...!',
    2,
    1,
    false
  ),
  (
    'My obsession from a western! My dance floor date',
    1,
    2,
    true
  ),
  (
    'My rodeo Romeo. A cowboy god from head to toe',
    1,
    3,
    false
  ),
  (
    'Wanna make you mine. Better get in line. 5, 6, 7, 8!',
    1,
    4,
    true
  );

COMMIT;



