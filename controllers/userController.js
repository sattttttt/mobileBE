import User from '../models/user.js';
import Schedule from '../models/schedule.js'; // Diperlukan jika Anda ingin menghapus jadwal user juga
import bcrypt from 'bcryptjs';

// Membuat user baru (Registrasi) dengan password terenkripsi
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, dan password wajib diisi.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    res.status(201).json({ message: '✅ User berhasil dibuat.', user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Username atau Email sudah terdaftar.' });
    }
    res.status(500).json({ error: error.message });
  }
};

// LOGIN untuk memverifikasi password
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Kombinasi email dan password salah." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Kombinasi email dan password salah." });
    }
    res.json({ message: "Login berhasil!", user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan semua user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'] // Jangan sertakan password
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan satu user berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email'],
      include: Schedule // Opsional: sertakan jadwal milik user
    });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui data user
export const updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id, {
                 attributes: ['id', 'username', 'email']
            });
            return res.status(200).json({ message: '🔄 User berhasil diperbarui.', user: updatedUser });
        }
        throw new Error('User tidak ditemukan.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menghapus user
export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            // Catatan: Jadwal yang berelasi akan menjadi 'yatim' kecuali diatur onDelete: 'CASCADE' di model
            return res.status(200).json({ message: '🗑️ User berhasil dihapus.' });
        }
        throw new Error('User tidak ditemukan.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};