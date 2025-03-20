import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const AuthToken = sequelize.define('AuthToken', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' },
        onDelete: 'CASCADE',
    },
    token: { type: DataTypes.STRING, allowNull: false, unique: true },
    expires_at: { type: DataTypes.DATE, allowNull: false },
}, {
    timestamps: true,
    underscored: true,
});

// Define Relationship
User.hasMany(AuthToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
AuthToken.belongsTo(User, { foreignKey: 'user_id' });

export default AuthToken;
