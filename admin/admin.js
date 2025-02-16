import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from '@adminjs/sequelize';
import { User, Patient } from "../models/index.js";

AdminJS.registerAdapter(AdminJSSequelize);


const admin = new AdminJS({
  resources: [User, Patient],
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(admin);

export { admin, adminRouter };
