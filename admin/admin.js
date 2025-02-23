import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';
import { Sequelize } from 'sequelize';
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
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export default (app) => {
  app.use(adminJs.options.rootPath, adminRouter);
};
