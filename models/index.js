import sequelize from '../config/db.js';
import User from './User.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Secretary from './Secretary.js';
import Appointment from './Appointments.js';
import Payment from './Payment.js';
import DoctorAvailability from './DoctorAvailability.js';
import MedicalRecord from './MedicalRecord.js';
import Specialization from './Specialization.js';

const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log('Database synced!');
};

syncDB();

export { User, Patient, Doctor, Secretary, Appointment, Payment, DoctorAvailability, MedicalRecord, Specialization };