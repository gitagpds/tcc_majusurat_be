import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "./models/relation.js";
import db from "./config/Database.js";

// Import routes
import userRoute from "./routes/UserRoute.js";
import pengajuanSuratRoute from "./routes/PengajuanSuratRoute.js";
import logPengajuanRoute from "./routes/LogPengajuanRoute.js";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://majusurat-fe-dot-a-06-new.uc.r.appspot.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

// Tes koneksi database
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Koneksi ke MySQL berhasil.");
  } catch (error) {
    console.error("❌ Gagal koneksi ke database:", error.message);
  }
})();

// Routes
app.use(userRoute);
app.use(pengajuanSuratRoute);
app.use(logPengajuanRoute);

// Default route
app.get("/", (req, res) => {
  res.send("🔥 Server berjalan dengan baik.");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: "Error", message: "Route tidak ditemukan" });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
