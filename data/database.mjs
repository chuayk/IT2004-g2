import { Sequelize } from 'sequelize';
import { ModelUser } from './user.mjs';

const sequelize = new Sequelize('itp211', 'breaduser', 'P@ssword123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
await sequelize.sync({ force: false });
console.log("All models were synchronized successfully.");
export default(sequelize)