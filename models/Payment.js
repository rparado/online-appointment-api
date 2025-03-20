import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Appointment from './Appointments.js';

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patient_id: { type: DataTypes.INTEGER, allowNull: false },
  doctor_id: { type: DataTypes.INTEGER, allowNull: false },
  appointment_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: { type: DataTypes.STRING(50), defaultValue: 'pending' },
  payment_method: { type: DataTypes.STRING(50), allowNull: false },
  transaction_id: { type: DataTypes.STRING(255), unique: true, allowNull: true },
}, {
  timestamps: true,
  underscored: true,
});

export default Payment;
