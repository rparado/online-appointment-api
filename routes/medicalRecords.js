import express from 'express';
import db from '../config/db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { patient_id, doctor_id, diagnosis, prescription, file_url } = req.body;
  await db.query('INSERT INTO medical_records (patient_id, doctor_id, diagnosis, prescription, file_url) VALUES (?, ?, ?, ?, ?)', [patient_id, doctor_id, diagnosis, prescription, file_url]);
  res.status(201).json({ message: 'Medical record created successfully' });
});

export default router;