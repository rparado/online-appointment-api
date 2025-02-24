import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import session from 'express-session';
import dotenv from 'dotenv';
import { User, Patient, Doctor, Secretary, Appointment, MedicalRecord, Payment, DoctorAvailability } from '../models/index.js';

dotenv.config();

// Register AdminJS adapter
AdminJS.registerAdapter({ Database, Resource });

// Define Sequelize connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Disable logging for cleaner output
});

// Check database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Define AdminJS options
const adminJsOptions = {
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        navigation: { name: 'Users', icon: 'User' },
        actions: {
          list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
        }
      }
    },
    {
      resource: Patient,
      options: {
        navigation: { name: 'Patients', icon: 'User' },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin && (currentAdmin.role === 'doctor' || currentAdmin.role === 'admin'),
            before: async (request, { currentAdmin }) => {
              if (currentAdmin?.role === 'doctor') {
                request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
              }
              return request;
            }
          }
        }
      }
    },
	{
		resource: Doctor,
		options: {
		  navigation: { name: 'Doctors', icon: 'Assistant' },
		  actions: {
			list: {
			  isAccessible: ({ currentAdmin }) => (currentAdmin?.role === 'doctor' || currentAdmin.role === 'admin'),
			  before: async (request, { currentAdmin }) => {
				if (currentAdmin?.role === 'doctor') {
				  request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
				}
				return request;
			  }
			}
		  }
		}
	  },
    {
      resource: Secretary,
      options: {
        navigation: { name: 'Secretaries', icon: 'Assistant' },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => (currentAdmin?.role === 'doctor' || currentAdmin.role === 'admin'),
            before: async (request, { currentAdmin }) => {
              if (currentAdmin?.role === 'doctor') {
                request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
              }
              return request;
            }
          }
        }
      }
    },
    {
      resource: Appointment,
      options: {
        navigation: { name: 'Appointments', icon: 'Calendar' },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin && (currentAdmin.role === 'doctor' || currentAdmin.role === 'admin'),
            before: async (request, { currentAdmin }) => {
              if (currentAdmin?.role === 'doctor') {
                request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
              }
              return request;
            }
          }
        }
      }
    },
    {
      resource: DoctorAvailability,
      options: {
        navigation: { name: 'Doctor Availability', icon: 'Clock' },
        actions: {
          list: { isAccessible: ({ currentAdmin }) => (currentAdmin?.role === 'doctor' || currentAdmin.role === 'admin') }
        }
      }
    },
    {
      resource: MedicalRecord,
      options: {
        navigation: { name: 'Medical Records', icon: 'File' },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => (currentAdmin?.role === 'doctor' || currentAdmin.role === 'admin'),
            before: async (request, { currentAdmin }) => {
              if (currentAdmin?.role === 'doctor') {
                request.query = { ...request.query, where: { doctor_id: currentAdmin.id } };
              }
              return request;
            }
          }
        }
      }
    }
  ],
  branding: {
    companyName: 'Admin',
  }
};

// Initialize AdminJS
const adminJs = new AdminJS(adminJsOptions);

// AdminJS authentication
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      console.log(`Trying to log in with email: ${email}`);

      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.log('User not found!');
        return null;
      }

      console.log(`Found user: ${user.email}, checking password...`);

      if (bcrypt.compareSync(password, user.password)) {
        console.log('Login successful!');
        return { email, role: user.role, id: user.id };
      }

      console.log('Incorrect password!');
      return null;
    },
    cookiePassword: process.env.SESSION_SECRET || 'supersecret',
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'supersecret',
    cookie: { secure: false }, // Set to true if using HTTPS
  }
);

// Middleware to filter data based on roles
adminRouter.use(async (req, res, next) => {
  if (!req.session.adminUser) return next();

  const { role, id } = req.session.adminUser;

  if (role === 'doctor') {
    console.log(`Doctor ${id} logged in - Restricting access`);

    adminJs.resources.find(r => r.resource === Secretary).options.filter = { doctor_id: id };
    adminJs.resources.find(r => r.resource === Appointment).options.filter = { doctor_id: id };
    adminJs.resources.find(r => r.resource === MedicalRecord).options.filter = { doctor_id: id };
  }

  next();
});

export default (app) => {
  app.use(adminJs.options.rootPath, adminRouter);
};
