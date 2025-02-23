import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Doctor = sequelize.define('Doctor', {
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
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience_years: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: true,
  underscored: true,
});

User.hasOne(Doctor, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'user_id' });

export default Doctor;
