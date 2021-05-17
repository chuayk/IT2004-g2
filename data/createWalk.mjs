import Sequelize from 'sequelize';
import  db from './database.mjs';


/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
export const walkInUser = db.define('walkInUser', {

    fullName: {
        type: Sequelize.STRING
    },
    nric: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.FLOAT
    },
    temperature: {
        type: Sequelize.FLOAT
    },
});

await walkInUser.sync({ force: true });
console.log("The table for the walkInUser was just (re)created!");
export default(walkInUser) 