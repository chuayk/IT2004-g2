import ORM from 'sequelize'
const { Sequelize, DataTypes, Model } = ORM;


export class ModelCode extends Model{
	/**
	 * Initializer of the model
	 * @see Model.init
	 * @access public
	 * @param {Sequelize} database The configured Sequelize handle
	**/
	static initialize(database) {
		ModelCode.init({
			"uuid"       : { type: DataTypes.CHAR(36),    primaryKey: true, defaultValue: DataTypes.UUIDV4 },
            "code"       : {type: DataTypes.CHAR(10), allowNull: false},
            "type"       : {type: DataTypes.ENUM("%","$"),defaultValue:"$"},
            "amount"     : {type: DataTypes.INTEGER(), allowNull: false},
            "expireon"  : {type: DataTypes.DATE(),allowNull: false}
		}, {
			"sequelize": database,
			"modelName": "Codes",
			"hooks"    : {
				"afterUpdate": ModelCode._auto_update_timestamp
			}
		});
	}

	/**
	 * Emulates "TRIGGER" of "AFTER UPDATE" in most SQL databases.
	 * This function simply assist to update the 'dateUpdated' timestamp.
	 * @private
	 * @param {ModelCode}     instance The entity model to be updated
	 * @param {UpdateOptions} options  Additional options of update propagated from the initial call
	**/
	static _auto_update_timestamp(instance, options) {
		// @ts-ignore
		instance.dateUpdated = Sequelize.literal('CURRENT_TIMESTAMP');
	}
    get uuid() {return this.getDataValue("uuid")}
    get code() {return this.getDataValue("code")}
    get type() {return this.getDataValue("type")}
    get amount() {return this.getDataValue("amount")}
    get formatedamount() {
        if(this.getDataValue("type") == "$")
        {return this.getDataValue("amount")/100}
        return this.getDataValue("amount")
    }
    check_valid(){
        if(this.getDataValue("expireon")>new Date()){
            return true;
        }
        else{
            return false;
        }
    }
}
