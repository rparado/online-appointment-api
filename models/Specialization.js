import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Specialization = sequelize.define('Specialization', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
  underscored: true,
});

export default Specialization;