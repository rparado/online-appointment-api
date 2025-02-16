import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, unique: true, allowNull: false },
  email_address: { type: DataTypes.STRING, unique: true, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "patient", allowNull: false },
}, 
    { 
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
              if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
              }
            },
          },
    }
);

const Patient = sequelize.define("Patient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  date_of_birth: { type: DataTypes.DATE, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT },
  medical_history: { type: DataTypes.TEXT },
  //created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  //updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Relationships
User.hasOne(Patient, { foreignKey: "user_id", onDelete: "CASCADE" });
Patient.belongsTo(User, { foreignKey: "user_id" });

export { sequelize, User, Patient };
