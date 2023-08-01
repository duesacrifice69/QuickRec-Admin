import Sequelize from "sequelize";
import config from "./dbconfig.js";

// Create a Sequelize instance
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.server,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false, // For secure connections
    },
  },
});

// Export the instance
export default sequelize;
