import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import appointmentRoutes from './routes/appointments.js';
import paymentRoutes from './routes/payments.js';
import recordRoutes from './routes/medicalRecords.js';
import { authenticateToken } from './middlewares/authMiddleware.js';
import adminJs from './admin/admin.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// AdminJS
adminJs(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/appointments', authenticateToken, appointmentRoutes);
app.use('/api/payments', authenticateToken, paymentRoutes);
app.use('/api/records', authenticateToken, recordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));