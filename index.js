const express = require('express');
const { sanitizeBody } = require('express-validator');

const es6Renderer = require('express-es6-template-engine');

const app = express();  
// Use the urlencoded middleware
// to read Post bodies

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// "static assets" like css,js, and images
// will go in a directory named "public"
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));    

app.use((req, res, next) => {
    console.log("I am middleware.yay.");
    console.log(req.url);
    // res.send("sorry");
    next();
})


const Todo = require('./Todo');
const user = require('./user');
// Create a variable for the port
const port = 3000;

app.get('/', (req, res) => {
    res.render('index', {
        locals: {
            message: "Something!"
        },
        partials: {
            navbar: './navbar',
            includes: 'includes'
        } 
    });
})

app.get('/profile', (req, res) => {
    res.render('profile', {
        locals: {

        },
        partials:{
            navbar: 'navbar',
            includes: 'includes'
        }
    })
})

app.get('/profile/todolist', async (req, res) => {
    const userId = 1;   //using hard code id for now
    const theUser = await user.getOne(userId);
    res.render('todolist', {
        locals: {
            todos: theUser.todos
        },
        partials:{
            navbar: 'navbar',
            includes: 'includes'
        }
    })
});

// 1. Allow the user to GET the form for creating a todo
app.get('/profile/todolist/create', (req, res) => {
    // Render the "create new todo" form template
    res.render('create-todo', {
        partials: {
            navbar: 'navbar',
            includes: 'includes'
        }
    })
});


// 2. Process the body of the form they POST
app.post('/profile/todolist/create',[
    sanitizeBody('task').escape(),
], async (req, res) => {
    // Handle the req.body from the "create new todo" form
    console.log(req.body);

    // normally, we dont include the user id in the form.
    // When you log into a site, it keeps track of your
    // id for you
    const taskId = await user.createToDo(1, req.body.task);
    res.send(taskId);
});

app.get('/',(req, res) => res.send('Hello World'))

app.get('/Todo', (req, res) => {
    console.log('You got a request');
    const allTodos = Todo.getAll();
    allTodos
        .then((data) =>{
            console.log('The Daaa');
            console.log(data);
            res.json(data);
        });
});


app.get('/Todo/:taskId', (req, res) => {
    const id = parseInt(req.params.taskId, 10);
    const aTask = Todo.getOne(id);
    aTask
    .then((data) =>{
        res.json(data);
    });
});


app.get('/users', async (req, res) => {
    const allUsers = await user.getAll();
    res.json(allUsers);
});

app.get('/users/:userId', async (req, res) => {
    const theId = parseInt(req.params.userId, 10);
    const aUser = await user.getOne(theId);
    res.json(aUser);
});

app.post('/users', [
    sanitizeBody('username').escape(),
    sanitizeBody('displayname').escape()
], async (req, res) => {
    console.log("WE got a POST request");
    const newUserInfo = await user.createUser(req.body)
    // .send() is different from .end()
    res.json(newUserInfo);

    console.log("GOt body here")
    console.log(req.body);

    //     displayname: req.body.displayname,
    //     username: req.body.username
    // });
});

app.listen(port, () => console.log(`The server is listeneing on Port: ${port}`))

app.post('/users/:userId/todo', async(req, res) => {
    const newToDo = await user.createToDo(req.body)
    res.json(newToDo);
})


// const server = http.createServer((req, res) => {
//     console.log('You got a request!')
//     const allTodos = Todo.getAll();
//     allTodos
//         .then((data) => {
//             console.log('ERMERGERD ITS DATAAZZZZZZ');
//             console.log(data);   
//             res.end(JSON.stringify(data));
//         })
//         console.log('\n\n\n==========================')
//         console.log(allTodos);
//     // res.end(allTodos);
// });

// server.listen(3000);

// Work that is needed for express install for db manipulation
