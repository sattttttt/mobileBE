import Schedule from '../models/schedule.js';

// Membuat jadwal baru untuk user tertentu dari URL
export const createScheduleForUser = async (req, res) => {
  try {
    // Ambil user ID dari parameter URL, bukan dari body
    const { userId } = req.params;
    const { title, description, start_time, end_time } = req.body;

    const newSchedule = await Schedule.create({
      title,
      description,
      start_time,
      end_time,
      user_id: userId // Masukkan user_id dari URL secara otomatis
    });
    res.status(201).json({ message: 'Jadwal berhasil dibuat.', schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan semua jadwal milik user tertentu dari URL
export const getAllSchedulesForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const schedules = await Schedule.findAll({ where: { user_id: userId } });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui sebuah jadwal
export const updateSchedule = async (req, res) => {
    try {
        // Kita butuh ID jadwal dari params
        const { scheduleId } = req.params;

        // Update data dari body
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

// Menghapus sebuah jadwal
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