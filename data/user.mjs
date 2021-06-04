// import Sequelize from 'sequelize';
// import  db from './database.mjs';

// /* Creates a user(s) table in MySQL Database.
// Note that Sequelize automatically pleuralizes the entity name as the table name
// */
// export class UserRole {
// 	static get Admin() { return "admin"; }
// 	static get User()  { return "user";  }
// }


// // user is the name of the table.

// export const ModelUser = db.define('user', {

//     username: {type: Sequelize.STRING, allowNull: false},
//     email: {type: Sequelize.STRING, allowNull: false},
//     password: {type: Sequelize.STRING, allowNull: false},
//     phoneNumber: {type: Sequelize.STRING, allowNull: true},

//     phoneNumber_pin: {type: Sequelize.STRING, allowNull: true},
//     verified: {type: Sequelize.STRING, defaultValue: "False", allowNull: true},
//     verification_hash: {type: Sequelize.STRING, allowNull: true},
//     comment: {type: Sequelize.TEXT, allowNull: true},
//     address: {type: Sequelize.TEXT, allowNull: true},
//     role: {type: Sequelize.TEXT, defaultValue: "Guest", allowNull: false},
//     accountStatus: {type: Sequelize.TEXT, defaultValue: "Active", allowNull: false},
//     dateCreated: {type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW},
//     dateUpdated: {type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW}



// });

// await ModelUser.sync({ force: false });
// console.log("The table for the User model was just (re)created!");
// export default(ModelUser) 

// exporting it as 'test' for now
import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;

export class UserRole {
	static get Admin() { return "admin"; }
	static get User()  { return "user";  }
}

export class ModelUser extends Model{
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelUser.init({

    username: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    phoneNumber: {type: Sequelize.STRING, allowNull: true},

    phoneNumber_pin: {type: Sequelize.STRING, allowNull: true},
    verified: {type: Sequelize.STRING, defaultValue: "False", allowNull: true},
    verification_hash: {type: Sequelize.STRING, allowNull: true},
    comment: {type: Sequelize.TEXT, allowNull: true},
    address: {type: Sequelize.TEXT, allowNull: true},
    role: {type: Sequelize.TEXT, defaultValue: "Guest", allowNull: false},
    accountStatus: {type: Sequelize.TEXT, defaultValue: "Active", allowNull: false},
    dateCreated: {type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW},
    dateUpdated: {type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW}

		}, {
			"sequelize": database,
			"modelName": "user",
			"hooks"    : {
				"afterUpdate": ModelUser._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelUser}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
}