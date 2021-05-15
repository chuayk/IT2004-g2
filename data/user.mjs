import Sequelize from 'sequelize';
import  db from './database.mjs';

/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/


// user is the name of the table.

export const ModelUser = db.define('user', {

    username: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING}
});

await ModelUser.sync({ force: true });
console.log("The table for the User model was just (re)created!");
export default(ModelUser) 

// exporting it as 'test' for now