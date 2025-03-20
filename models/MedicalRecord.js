import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Doctor from './Doctor.js';

const MedicalRecord = sequelize.define('MedicalRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id',
    },
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  treatment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  visit_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true,
  underscored: true,
});

User.hasMany(MedicalRecord, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
MedicalRecord.belongsTo(User, { foreignKey: 'patient_id' });

Doctor.hasMany(MedicalRecord, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctor_id' });

export default MedicalRecord;