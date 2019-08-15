CREATE TABLE users (
    id serial primary key,
    displayname varchar(20) not null,
    username varchar(50) not null
);
CREATE TABLE todos (
    id serial PRIMARY KEY, 
    priority INTEGER NOT NULL,
    task VARCHAR(50) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    user_id integer references users(id)
);
