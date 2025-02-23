import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const getUsers = async (req, res) => {
  const [users] = await db.query('SELECT id, email, role FROM users');
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const [user] = await db.query('SELECT id, email, role FROM users WHERE id = ?', [id]);
  if (user.length === 0) return res.status(404).json({ message: 'User not found' });
  res.json(user[0]);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  let hashedPassword = null;
  if (password) hashedPassword = await bcrypt.hash(password, 10);
  await db.query('UPDATE users SET email = ?, password = COALESCE(?, password) WHERE id = ?', [email, hashedPassword, id]);
  res.json({ message: 'User updated successfully' });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'User deleted successfully' });
};
