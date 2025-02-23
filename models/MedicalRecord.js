import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Appointment from './Appointment.js';

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
      model: Patient,
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
  appointment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Appointment,
      key: 'id',
    },
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prescription: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  underscored: true,
});

Patient.hasMany(MedicalRecord, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
Appointment.hasOne(MedicalRecord, { foreignKey: 'appointment_id', onDelete: 'CASCADE' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patient_id' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctor_id' });
MedicalRecord.belongsTo(Appointment, { foreignKey: 'appointment_id' });

export default MedicalRecord;
