const express = require('express');
const app = express();  

// Use the urlencoded middleware
// to read Post bodies

app.use(express.urlencoded({extended: true}));    


const Todo = require('./Todo');
const user = require('./user');
// Create a variable for the port
const port = 3000;

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

app.post('/users', async (req, res) => {
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
