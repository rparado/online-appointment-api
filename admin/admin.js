import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import { Sequelize } from 'sequelize';
import { User, Patient, Doctor, Secretary, Appointment, MedicalRecord, Payment } from '../models/index.js';
AdminJS.registerAdapter({ Database, Resource });

// Define Sequelize connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Initialize AdminJS
const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        parent: {
          name: 'Users Management',
          icon: 'User',
        },
        listProperties: ['id', 'email', 'role', 'createdAt'],
        editProperties: ['email', 'password', 'role'],
        showProperties: ['id', 'email', 'role', 'createdAt', 'updatedAt'],
      },
    },
    {
      resource: Patient,
      options: {
        parent: {
          name: 'Patient Management',
          icon: 'Heartbeat',
        },
        listProperties: ['id', 'first_name', 'last_name', 'date_of_birth', 'gender'],
        editProperties: ['first_name', 'last_name', 'date_of_birth', 'gender', 'address', 'medical_history'],
        showProperties: ['id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'address', 'medical_history'],
      },
    },
    {
      resource: Doctor,
      options: {
        parent: {
          name: 'Doctor Management',
          icon: 'Stethoscope',
        },
        listProperties: ['id', 'first_name', 'last_name', 'specialization', 'medical_license'],
        editProperties: ['first_name', 'last_name', 'specialization', 'medical_license'],
        showProperties: ['id', 'first_name', 'last_name', 'specialization', 'medical_license'],
      },
    },
    {
      resource: Secretary,
      options: {
        parent: {
          name: 'Staff Management',
          icon: 'Briefcase',
        },
        listProperties: ['id', 'first_name', 'last_name', 'gender'],
        editProperties: ['first_name', 'last_name', 'gender'],
        showProperties: ['id', 'first_name', 'last_name', 'gender'],
      },
    },
    {
      resource: Appointment,
      options: {
        parent: {
          name: 'Appointments',
          icon: 'Calendar',
        },
        listProperties: ['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'status'],
        editProperties: ['patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'status', 'reason'],
        showProperties: ['id', 'patient_id', 'doctor_id', 'appointment_date', 'appointment_time', 'status', 'reason'],
      },
    },
    {
      resource: MedicalRecord,
      options: {
        parent: {
          name: 'Medical Records',
          icon: 'FileMedical',
        },
        listProperties: ['id', 'patient_id', 'doctor_id', 'diagnosis', 'prescription'],
        editProperties: ['patient_id', 'doctor_id', 'diagnosis', 'prescription', 'prescription_file'],
        showProperties: ['id', 'patient_id', 'doctor_id', 'diagnosis', 'prescription', 'prescription_file'],
      },
    },
    {
      resource: Payment,
      options: {
        parent: {
          name: 'Payments',
          icon: 'DollarSign',
        },
        listProperties: ['id', 'appointment_id', 'patient_id', 'doctor_id', 'amount', 'status', 'payment_method'],
        editProperties: ['appointment_id', 'patient_id', 'doctor_id', 'amount', 'status', 'payment_method'],
        showProperties: ['id', 'appointment_id', 'patient_id', 'doctor_id', 'amount', 'status', 'payment_method', 'transaction_id'],
      },
    },
  ],
  branding: {
    companyName: 'Healthcare Admin',
    logo: 'https://your-logo-url.com/logo.png',
    theme: {
      colors: {
        primary100: '#1976D2',
        accent: '#FFC107',
      },
    },
  },
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export default (app) => {
  app.use(adminJs.options.rootPath, adminRouter);
};
