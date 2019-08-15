const db = require('./db');

async function getAll() {
    try{
        return await db.any(`
                select * from todos
            `);
    }catch (error) {
        console.log(error);
        return[];
    }
            


}


async function getOne(id) {
    // When you want one and only one,
    // use the .one() method.
    // That way, if you don't find it,
    // it triggers the .catch().
    // This is better than doing an if/else
    // inside your .then().
    // .one() will throw an exception if it
    // gets anything but 1 and only 1 result.
    try {
        const todosToday = await db.one(`
            select * from todos where id=$1
        `, [id])
    
        return todosToday;
    }catch (error) {
        console.log("uh oh.");
        console.log(error);
        return {};
    }
}

module.exports = {
    // This is the same as
    // getAll: getAll,
    getAll,
    getOne,
};