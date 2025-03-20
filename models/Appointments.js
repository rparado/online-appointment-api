import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Patient, key: 'id' },
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Doctor, key: 'id' },
  },
  appointment_date: { type: DataTypes.DATEONLY, allowNull: false },
  appointment_time: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.STRING(50), defaultValue: 'pending' },
  reason: { type: DataTypes.TEXT, allowNull: true },
}, {
  timestamps: true,
  underscored: true,
});

export default Appointment;
