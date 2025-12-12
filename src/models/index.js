const { sequelize } = require("../config/database");
const User = require("./User");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error.message);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  syncDatabase,
};
