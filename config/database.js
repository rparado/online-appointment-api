import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);
sequelize.authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection failed:", err));
export default sequelize;
