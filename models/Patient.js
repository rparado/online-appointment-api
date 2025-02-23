import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  medical_history: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  underscored: true,
});

User.hasOne(Patient, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'user_id' });

export default Patient;
