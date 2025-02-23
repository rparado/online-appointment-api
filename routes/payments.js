import express from 'express';
import db from '../config/db.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, amount, status } = req.body;
  await db.query('INSERT INTO payments (user_id, amount, status) VALUES (?, ?, ?)', [user_id, amount, status]);
  res.status(201).json({ message: 'Payment recorded successfully' });
});

export default router;