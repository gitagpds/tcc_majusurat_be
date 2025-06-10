import express from "express";
import {
  getPengajuanSurat,
  getPengajuanSuratById,
  createPengajuanSurat,
  updatePengajuanSurat,
  deletePengajuanSurat,
} from "../controllers/PengajuanSuratController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all pengajuan surat (butuh autentikasi)
router.get("/pengajuan-surat", verifyToken, getPengajuanSurat);

// GET pengajuan surat by ID (butuh autentikasi)
router.get("/pengajuan-surat/:id", verifyToken, getPengajuanSuratById);

// POST create pengajuan surat (bisa tanpa token kalau perlu, tapi biasanya pakai token)
router.post("/pengajuan-surat", verifyToken, createPengajuanSurat);

// PUT update pengajuan surat by ID (butuh autentikasi)
router.put("/pengajuan-surat/:id", verifyToken, updatePengajuanSurat);

// DELETE pengajuan surat by ID (butuh autentikasi)
router.delete("/pengajuan-surat/:id", verifyToken, deletePengajuanSurat);

export default router;
