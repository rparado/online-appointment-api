import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Specialization from './Specialization.js';

const Doctor = sequelize.define('Doctor', {
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
	gender: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isIn: [['male', 'female']],
		},
	},
	specialization_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
		  model: Specialization,
		  key: 'id',
		},
		onDelete: 'SET NULL',
	  },
	medical_license: { type: DataTypes.STRING(50), allowNull: false },
	consultation_fee: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
		defaultValue: 0.00,
	},
}, {
	timestamps: true,
	underscored: true,
});

//realtionships
User.hasOne(Doctor, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'user_id' });


Specialization.hasMany(Doctor, { foreignKey: 'specialization_id', onDelete: 'SET NULL' });
Doctor.belongsTo(Specialization, { foreignKey: 'specialization_id' });


export default Doctor;
