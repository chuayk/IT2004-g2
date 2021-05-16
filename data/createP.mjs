import Sequelize from 'sequelize';
import  db from './database.mjs';


/* Creates a user(s) table in MySQL Database.
Note that Sequelize automatically pleuralizes the entity name as the table name
*/
export const product = db.define('product', {

    name: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    stock_count: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.STRING
    },
});

await product.sync({ force: true });
console.log("The table for the product model was just (re)created!");
export default(product) 