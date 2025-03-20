import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Patient = sequelize.define('Patient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' },
  },
  first_name: { type: DataTypes.STRING(100), allowNull: false },
  middle_name: { type: DataTypes.STRING(100), allowNull: true },
  last_name: { type: DataTypes.STRING(100), allowNull: false },
  phone_number: { type: DataTypes.STRING(20), allowNull: false },
  date_of_birth: { type: DataTypes.DATEONLY, allowNull: false },
  gender: { type: DataTypes.STRING(10), allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: true },
  medical_history: { type: DataTypes.TEXT, allowNull: true },
  profile_updated: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  timestamps: true,
  underscored: true,
});

User.hasOne(Patient, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'user_id' });

export default Patient;
