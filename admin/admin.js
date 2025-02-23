import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import session from 'express-session';
import dotenv from 'dotenv';
import { User, Patient, Doctor, Secretary, Appointment, MedicalRecord, Payment, DoctorAvailability } from '../models/index.js';

dotenv.config();

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
      options: { navigation: { name: 'Users', icon: 'User' } },
    },
    {
      resource: Patient,
      options: { navigation: { name: 'Patients', icon: 'User' } },
    },
    {
      resource: Doctor,
      options: { navigation: { name: 'Doctors', icon: 'Stethoscope' } },
    },
    {
      resource: Secretary,
      options: { navigation: { name: 'Secretaries', icon: 'Assistant' } },
    },
    {
      resource: Appointment,
      options: { navigation: { name: 'Appointments', icon: 'Calendar' } },
    },
    {
      resource: DoctorAvailability,
      options: { navigation: { name: 'Doctor Availability', icon: 'Clock' } },
    },
    {
      resource: Payment,
      options: { navigation: { name: 'Payments', icon: 'Money' } },
    },
    {
      resource: MedicalRecord,
      options: { navigation: { name: 'Medical Records', icon: 'File' } },
    },
  ],
  branding: {
    companyName: 'Admin',
    // logo: '/logo.png',
    // theme: {
    //   colors: {
    //     primary100: '#D4E157',
    //     primary80: '#CDDC39',
    //     primary60: '#C0CA33',
    //     primary40: '#AFB42B',
    //     primary20: '#9E9D24',
    //   },
    // },
  },
});

// AdminJS authentication
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && bcrypt.compareSync(password, adminPassword)) {
      return { email };
    }
    return null;
  },
  cookiePassword: process.env.SESSION_SECRET || 'supersecret',
}, null, {
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'supersecret',
  cookie: { secure: false }, // Set `true` if using HTTPS
});

export default (app) => {
  app.use(adminJs.options.rootPath, adminRouter);
};
