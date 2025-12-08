require("dotenv").config();
const app = require("./src/app");
const { testConnection } = require("./src/config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    const connected = await testConnection();

    if (!connected) {
      console.log("Server starting without database connection");
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Test it: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
