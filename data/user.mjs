import Sequelize from 'sequelize';
import  db from './database.mjs';

/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
export class UserRole {
	static get Admin() { return "admin"; }
	static get User()  { return "user";  }
}


// user is the name of the table.

export const ModelUser = db.define('user', {

    username: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    phoneNumber: {type: Sequelize.STRING, allowNull: true},
    comment: {type: Sequelize.TEXT, allowNull: true},
    address: {type: Sequelize.TEXT, allowNull: true},
    role: {type: Sequelize.TEXT, defaultValue: "Guest", allowNull: false},
    accountStatus: {type: Sequelize.TEXT, defaultValue: "Active", allowNull: false},
    dateCreated: {type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW},
    dateUpdated: {type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW}



});

await ModelUser.sync({ force: true });
console.log("The table for the User model was just (re)created!");
export default(ModelUser) 

// exporting it as 'test' for now