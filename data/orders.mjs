// import Sequelize from 'sequelize';
// import  db from './database.mjs';
// /* Creates a user(s) table in MySQL Database.
// Note that Sequelize automatically pleuralizes the entity name as the table name
// */
// export const orders = db.define('cart', {
//     username: {
//         type: Sequelize.STRING, 
//         allowNull: false},
//     email: {
//         type: Sequelize.STRING, 
//         allowNull: false},
//     phoneNumber: {
//         type: Sequelize.STRING, 
//         allowNull: true},
//     address: {type: Sequelize.TEXT, 
//         allowNull: true},
//     productName: {
//         type: Sequelize.STRING,
//         allowNull: falses
//     },
//     category: {
//         type: Sequelize.STRING
//     },
//     quantity: {
//         type: Sequelize.INTEGER
//     },
//     grandTotal: {
//         type: Sequelize.FLOAT(10,2)
//     },
//     orderDate:{
//         type: Sequelize.DATEONLY,
//         defaultValue: Sequelize.NOW
//     }
// });

// await orders.sync({ force: false });
// console.log("The table for the product model was just (re)created!");
// export default(orders) 