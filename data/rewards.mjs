import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;


export class ModelReward extends Model{
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelReward.init({
			"uuid"       : {type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            "name"       : {type: DataTypes.STRING(30), allowNull: false},
            "description": {type: DataTypes.STRING(150), allowNull:false},
            "type"       : {type: DataTypes.ENUM("%","$"),defaultValue:"$"},
            "amount"     : {type: DataTypes.INTEGER(), allowNull: false},
            "duration"   : {type: DataTypes.INTEGER(),allowNull: false},
            "price"      : {type: DataTypes.INTEGER(),allowNull: false},
		}, {
			"sequelize": database,
			"modelName": "Rewards",
			"hooks"    : {
				"afterUpdate": ModelReward._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelReward}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
    // get uuid() {return this.getDataValue("uuid")}
    // get name() {return this.getDataValue("name")}
    // get description() {return this.getDataValue("description")}
    // get type() {return this.getDataValue("type")}
    // get amount() {return this.getDataValue("amount")}
    // get duration() {return this.getDataValue("duration")}
    // get price() {return this.getDataValue("price")}
}
