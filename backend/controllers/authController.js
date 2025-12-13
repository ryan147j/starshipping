const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

// Helper to access the users model regardless of generated name casing
function getUsersModel() {
  return db.User || db.users || db.Users || db.user;
}

// POST /api/auth/login
// Body: { email, password }
// Response: { data: { token, user } }
async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const Users = getUsersModel();
    if (!Users) {
      return res.status(500).json({ message: 'Users model not initialized' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Default scope excludes password; use unscoped to include it for comparison
    const user = await Users.unscoped().findOne({ where: { email: normalizedEmail } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const ok = await bcrypt.compare(String(password), user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password: _omit, ...safeUser } = user.toJSON();
    return res.json({ data: { token, user: safeUser } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { login };
