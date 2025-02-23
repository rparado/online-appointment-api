import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role]);
    const userId = result.insertId;

    // Generate token
    const token = jwt.sign({ userId, email, role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Store token in the database
    await db.query('UPDATE users SET token = ? WHERE id = ?', [token, userId]);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Generate token
    const token = jwt.sign({ userId: user[0].id, email: user[0].email, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Store token in the database
    await db.query('UPDATE users SET token = ? WHERE id = ?', [token, user[0].id]);

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
