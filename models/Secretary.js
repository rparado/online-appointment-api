import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Secretary = sequelize.define('Secretary', {
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
}, {
  timestamps: true,
  underscored: true,
});

User.hasOne(Secretary, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Secretary.belongsTo(User, { foreignKey: 'user_id' });

export default Secretary;
