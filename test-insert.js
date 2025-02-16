import sequelize from "./config/database.js";
import User from './models/index.js';

(async () => {
  try {
    await sequelize.sync(); // Ensures table exists

    const testUser = await User.create({
      password: "securepassword",
      phone_number: "1234567890",
      email_address: "user@example.com",
      role: "admin",
    });

    console.log("✅ User created successfully:", testUser.toJSON());
  } catch (error) {
    console.error("❌ Error creating user:", error);
  } finally {
    await sequelize.close();
  }
})();