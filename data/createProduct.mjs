import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;


export class ModelProduct extends Model{
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelProduct.init({
			"product_uuid"       : { type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
			"pname"      :{ type: DataTypes.STRING(128), allowNull: false },
			"category"       : { type: DataTypes.STRING(64),  allowNull: false },
			"price"      : { type: DataTypes.INTEGER(), allowNull: false },
			"stockCount"      : { type: DataTypes.INTEGER(128), allowNull: false },
			"description"       : { type: DataTypes.STRING(256),  allowNull: false },
			"picUrl"			: { type: DataTypes.STRING(256),  allowNull: false},
			"dateUpdated": { type: DataTypes.DATE(),      allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },

			// "password"   : { type: DataTypes.STRING(64),  allowNull: false },
			// "role"       : { type: DataTypes.ENUM(UserRole.User, UserRole.Admin), defaultValue: UserRole.User, allowNull: false },
			// "verified"   : { type: DataTypes.BOOLEAN,     allowNull: false, defaultValue: false }
		}, {
			"sequelize": database,
			"modelName": "Product",
			"hooks"    : {
				"afterUpdate": ModelProduct._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelProduct}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
}
