
// 1. Collect and prep ingredients
const db = require('./db');

// 2. Cook.


async function getAll() {
    const users = await db.any(`SELECT * FROM users`);
    // const todosForUsers = await db.any(`SELECT * FROM todos WHERE`);
    // const test = [];
    const arrayOfPromises = users.map( async user => {
        console.log(user.id);
        const userTodos = await db.any(`SELECT * FROM todos WHERE id = $1`, [user.id])
        user.todos = userTodos
        console.log(user);  
        return user;
    })
    
    const arrayOfUsersWithTodos = await Promise.all(arrayOfPromises);
    return arrayOfUsersWithTodos
}
    // .forEach( (user) => {
    //     db.any(`SELECT * FROM todos WHERE id = $1`, [user.id])
    //         .then(userTodos => {
    //             user.todos = userTodos;
    //             console.log(users);
    //         })
        
        
        // test.push(user)
        // console.log(test)
    // })
    // console.log('array')
    // console.log(newArray)
    // return newArray;


// async function getAll(){
//     const userAll = await db.any(`
//         select * from users
//     `);

//    return userAll;
// }

// {
//     id: 1,
//     displayname: "apple",
//     username: "l33th4x0r",
//     todos: [
//         {id:1, task: "walk the cat down the street."},
//         {},
//         {}
//     ]
// }

async function getOne(id){
    try{
        const user = await db.one(`
            select * from users where id=$1
        `,[id]);
    
        const todosForUser = await db.any(`
            select * from todos where user_id=$1
            `,[id])
            
            user.todos = todosForUser;
          return user; 
        } catch (error){
            console.log("error on page");
            return{
                id: 0,
                displayname: "No user found"
            };
        }
    }

// Accept an object argument so we have flexibility later on.
// That is, we can add more database colummns
// withouth having to update all of our function calls
async function createUser(userDataObj){
    const {displayname, username} = userDataObj;
    const newUserInfo = await db.one(`
        insert into users
            (displayname, username)
        values ($1, $2)

        returning id

    `,[displayname, username]);

    console.log(newUserInfo);
    return newUserInfo;
}

createUser({
    displayname: "bigbank",
    username: "takebank"
})


// 3. Serve.
module.exports = {
    getAll,
    getOne,
    createUser
};