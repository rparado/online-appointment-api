import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import { Sequelize } from "sequelize";
import sequelize from "./config/database.js"; // Import sequelize instance
import authRoutes from "./routes/auth.js"; // Import routes
import { admin, adminRouter } from "./admin/admin.js"; // Import AdminJS setup



const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// AdminJS setup
app.use(admin.options.rootPath, adminRouter);

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("Database connection error:", err);
});