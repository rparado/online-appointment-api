import express from 'express';
import db from '../config/db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { patient_id, doctor_id, date } = req.body;
  await db.query('INSERT INTO appointments (patient_id, doctor_id, date) VALUES (?, ?, ?)', [patient_id, doctor_id, date]);
  res.status(201).json({ message: 'Appointment created successfully' });
});

export default router;