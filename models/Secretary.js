import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Secretary = sequelize.define('Secretary', {
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
  gender: { type: DataTypes.STRING(10), allowNull: false },
}, {
  timestamps: true,
  underscored: true,
});

User.hasOne(Secretary, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Secretary.belongsTo(User, { foreignKey: 'user_id' });

export default Secretary;
