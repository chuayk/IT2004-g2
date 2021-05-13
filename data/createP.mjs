import DataTypes from 'sequelize';
import  db from './database.mjs';


/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
const product = db.define('product', {

    name: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    stock_count: {
        type: DataTypes.FLOAT
    },
    description: {
        type: DataTypes.STRING
    },
});

await product.sync({ force: true });
console.log("The table for the User model was just (re)created!");
export default(product) 