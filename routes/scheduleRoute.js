import express from 'express';
import {
  createScheduleForUser,
  getAllSchedulesForUser,
  updateSchedule,
  deleteSchedule
} from '../controllers/scheduleController.js';

const router = express.Router();

// Rute untuk mendapatkan & membuat jadwal yang terkait dengan user tertentu
router.get('/users/:userId/schedules', getAllSchedulesForUser);
router.post('/users/:userId/schedules', createScheduleForUser);

// Rute untuk mengedit & menghapus jadwal spesifik berdasarkan ID jadwal itu sendiri
router.put('/schedules/:scheduleId', updateSchedule);
router.delete('/schedules/:scheduleId', deleteSchedule);

export default router;