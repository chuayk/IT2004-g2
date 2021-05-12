import Sequelize from 'sequelize';
import  db from './database.mjs';

/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
export const test = db.define('test', {

    please: {
        type: Sequelize.STRING
    },
});

await test.sync({ force: true });
console.log("The table for the User model was just (re)created!");
export default(test) 