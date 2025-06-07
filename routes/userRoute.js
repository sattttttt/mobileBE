import express from 'express';
import {
  createUser,
  loginUser, // Impor fungsi baru
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', loginUser); // Rute baru untuk login
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;