import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: { 
    type: DataTypes.STRING,
    allowNull: false, 
    defaultValue: 'patient' 
  },
  token: {
    type: DataTypes.STRING(500),
  },
}, {
  timestamps: true,
  underscored: true,
});

export default User;