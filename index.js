import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // <-- 1. Impor paket cors
import sequelize from './config/database.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 8080; // Gunakan 8080 untuk cloud deployment

// --- Middleware ---
app.use(cors()); // <-- 2. Gunakan cors sebagai middleware. WAJIB diletakkan sebelum rute.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rute API
app.get('/', (req, res) => {
    res.send('Selamat Datang di API Jadwal (dengan CORS)!');
});
app.use('/api', scheduleRoutes);
app.use('/api', userRoutes);

// Sinkronisasi database dan jalankan server
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