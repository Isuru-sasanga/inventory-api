const { sequelize } = require("../config/database");
const User = require("./User");

const syncDatabase = async () => {
  try {
    // Check if tables exist
    const [results] = await sequelize.query(`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_NAME = 'Users'
      `);

    if (results.length === 0) {
      console.log("Creating database tables...");
      await sequelize.sync({ force: false });
    } else {
      console.log("Database tables already exist");
    }

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
