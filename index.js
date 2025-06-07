// index.js

import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';
import scheduleRoutes from './routes/scheduleRoute.js';
import userRoutes from './routes/userRoute.js'; // <-- 1. TAMBAHKAN BARIS INI

// Impor model untuk sinkronisasi
import './models/user.js';
import './models/schedule.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('👋 Selamat Datang di API Jadwal dan User!');
});

// Daftarkan Rute API
app.use('/api', scheduleRoutes);
app.use('/api', userRoutes); // <-- 2. TAMBAHKAN BARIS INI

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database & tabel berhasil disinkronkan. ✅');
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Gagal menyambung ke database: ❌', error);
  }
};

startServer();