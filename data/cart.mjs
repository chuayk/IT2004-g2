// import ORM from 'sequelize'
// const { Sequelize, DataTypes, Model } = ORM;
// export class ModelCart extends Model{
// 	/**
// 	 * Initializer of the model
// 	 * @see Model.init
// 	 * @access public
// 	 * @param {Sequelize} database The configured Sequelize handle
// 	**/
// 	static initialize(database) {
// 		ModelCart.init({
// 			"uuid"       : { type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
// 			"pname"      :{ type: DataTypes.STRING(128), allowNull: false },
// 			"category"       : { type: DataTypes.STRING(64),  allowNull: false },
// 			"total_price"      : { type: DataTypes.INTEGER(), allowNull: false },
//             "grand_total"      : { type: DataTypes.INTEGER(), allowNull: false },
// 			"dateUpdated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },

// 		}, {
// 			"sequelize": database,
// 			"modelName": "Cart",
// 			"hooks"    : {
// 				"afterUpdate": ModelCart._auto_update_timestamp
// 			}
// 		});
// 	}

// 	/**
// 	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
// 	 * This function simply assist to update the 'dateUpdated' timestamp.
// 	 * @private
// 	 * @param {ModelCart}     instance The entity model to be updated
// 	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
// 	**/
// 	static _auto_update_timestamp(instance, options) {
// 		// @ts-ignore
// 		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
// 	}
// }
