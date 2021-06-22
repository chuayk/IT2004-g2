import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;
import {ModelProduct} from '../data/createProduct.mjs'
import { ModelUser } from '../data/user.mjs';
import {ModelCode} from '../data/code.mjs'
import { ModelReward } from '../data/rewards.mjs';
/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
export function initialize_models(database) {
	try {
		console.log("Intitializing ORM models");
		//	Initialzie models
		ModelProduct.initialize(database);
		ModelUser.initialize(database);
		ModelCode.initialize(database);
		ModelReward.initialize(database);

		console.log("Building ORM model relations and indices");
		//	Create relations between models or tables
		//	Setup foreign keys, indexes etc
	
	}
	catch (error) {
		console.error ("Failed to configure ORM models");
		console.error (error);
	}
}

