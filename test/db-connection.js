const sequelize = require("../src/application/database");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close(); // Jangan lupa menutup koneksi
  }
}

testConnection();