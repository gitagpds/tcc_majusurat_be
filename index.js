import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import "./models/relation.js";
import db from "./config/Database.js";

// Import routes
import userRoute from "./routes/UserRoute.js";
import pengajuanSuratRoute from "./routes/PengajuanSuratRoute.js";
import logPengajuanRoute from "./routes/LogPengajuanRoute.js";

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://majusurat-fe-dot-a-06-new.uc.r.appspot.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Default route
app.get("/", (req, res) => {
  res.send("🔥 Server berjalan dengan baik.");
});

app.use(express.json());

app.use(userRoute);
app.use(pengajuanSuratRoute);
app.use(logPengajuanRoute);

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({ status: "Error", message: "Route tidak ditemukan" });
});

// Jalankan server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
