import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('itp211', 'breaduser', 'P@ssword123', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");
export default(sequelize)