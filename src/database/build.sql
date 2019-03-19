BEGIN;

DROP TABLE IF EXISTS users, tasks CASCADE;


CREATE TABLE users (
	id SERIAL UNIQUE PRIMARY KEY,
	fname varchar(100) NOT NULL,
	lname varchar(100) NOT NULL,
	email varchar(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
	image TEXT,
	spec TEXT,
	hobbies TEXT,
	abstract TEXT,
	reg_Date  Date DEFAULT NOW()
);


CREATE TABLE tasks (
	id serial UNIQUE NOT NULL,
	user_id INTEGER NOT NULL,
	title varchar(200),
	task TEXT NOT NULL,
	done BOOLEAN NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);


INSERT INTO users (fname, lname, email, password, image ,spec ,hobbies, abstract)VALUES
('Marwan',
'Elkhoudaryq',
'marwan@marwan.com',
'$2a$10$bv2111VmWoDSsvqsU2nbP.dwiAA8yH4M55gmRp25qWRXjFgzYg2VS',
'https://pbs.twimg.com/profile_images/757952391404724224/tQCw1fKY_400x400.jpg',
'Computer Systems Engineering',
'Programming - Swimming',
'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren'
);

INSERT INTO tasks (user_id, title, task, done)VALUES
(1, 'Home Work', 'Home Work', 'false'),
(1, 'Home Work', 'Reading', 'false'),
(1, 'Home Work', 'Cooking', 'false');


COMMIT;

