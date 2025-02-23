import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Appointment from './Appointment.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Appointment,
      key: 'id',
    },
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
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM('cash', 'credit_card', 'insurance', 'paypal'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: true, // Only needed for online payments
  },
}, {
  timestamps: true,
  underscored: true,
});

// Relationships
Appointment.hasOne(Payment, { foreignKey: 'appointment_id', onDelete: 'CASCADE' });
Payment.belongsTo(Appointment, { foreignKey: 'appointment_id' });

Patient.hasMany(Payment, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Payment.belongsTo(Patient, { foreignKey: 'patient_id' });

Doctor.hasMany(Payment, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
Payment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

export default Payment;
