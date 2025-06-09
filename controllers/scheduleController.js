import Schedule from '../models/schedule.js';

// Membuat jadwal baru untuk user tertentu dari URL
export const createScheduleForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // --- PERUBAHAN DI SINI: Ambil field baru dari body ---
    const { title, description, start_time, end_time, location, latitude, longitude } = req.body;

    const newSchedule = await Schedule.create({
      title,
      description,
      start_time,
      end_time,
      location,     // <-- Simpan ke database
      latitude,     // <-- Simpan ke database
      longitude,    // <-- Simpan ke database
      user_id: userId
    });
    res.status(201).json({ message: 'Jadwal berhasil dibuat.', schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fungsi lain tidak perlu diubah
export const getAllSchedulesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const schedules = await Schedule.findAll({ where: { user_id: userId } });
    if (schedules.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const [updated] = await Schedule.update(req.body, {
            where: { id: scheduleId }
        });

        if (updated) {
            const updatedSchedule = await Schedule.findByPk(scheduleId);
            return res.status(200).json({ message: 'Jadwal berhasil diperbarui.', schedule: updatedSchedule });
        }
        throw new Error('Jadwal tidak ditemukan.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSchedule = async (req, res) => {
    try {
        const { scheduleId } = req.params;
        const deleted = await Schedule.destroy({
            where: { id: scheduleId }
        });
        if (deleted) {
            return res.status(200).json({ message: 'Jadwal berhasil dihapus.' });
        }
        throw new Error('Jadwal tidak ditemukan.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};