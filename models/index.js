import sequelize from '../config/database.js';
import User from './User.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Secretary from './Secretary.js';
import Appointment from './Appointment.js';
import DoctorAvailability from './DoctorAvailability.js';
import Payment from './Payment.js';
import MedicalRecord from './MedicalRecord.js';

// Define model relationships
User.hasOne(Patient, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Doctor, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Secretary, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Secretary.belongsTo(User, { foreignKey: 'user_id' });

Patient.hasMany(Appointment, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

Doctor.hasMany(DoctorAvailability, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
DoctorAvailability.belongsTo(Doctor, { foreignKey: 'doctor_id' });

Patient.hasMany(Payment, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Doctor.hasMany(Payment, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
Appointment.hasOne(Payment, { foreignKey: 'appointment_id', onDelete: 'CASCADE' });
Payment.belongsTo(Patient, { foreignKey: 'patient_id' });
Payment.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Payment.belongsTo(Appointment, { foreignKey: 'appointment_id' });

Patient.hasMany(MedicalRecord, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctor_id', onDelete: 'CASCADE' });
Appointment.hasOne(MedicalRecord, { foreignKey: 'appointment_id', onDelete: 'CASCADE' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patient_id' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctor_id' });
MedicalRecord.belongsTo(Appointment, { foreignKey: 'appointment_id' });

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
});

export { sequelize, User, Patient, Doctor, Secretary, Appointment, DoctorAvailability, Payment, MedicalRecord };
