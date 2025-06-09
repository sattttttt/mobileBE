import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database.js';
import scheduleRoutes from './routes/scheduleRoute.js';
import userRoutes from './routes/userRoute.js';

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 8080;

// --- Middleware ---
app.use(cors());
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
    // KEMBALIKAN SEPERTI SEMULA (tanpa alter: true)
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