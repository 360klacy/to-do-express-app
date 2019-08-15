insert into users
    (displayname, username)
VALUES  
    ('apple', 'l33th4x0r'),
    ('burger', 'puppy_lover')
;


INSERT INTO todos (priority, task, user_id) VALUES 
    (1, 'Feed the dog', 1),
    (2, 'Pet the cat', 1),
    (3, 'Worship the hamster', 1),
    (99, 'go to work', 1),
    (1, 'Feed the dog', 2),
    (2, 'Pet the cat', 2),
    (3, 'Walk the dog',2)
;

select * from todos;
