import express from "express";
import {
  getPengajuanSurat,
  getPengajuanSuratById,
  createPengajuanSurat,
  updatePengajuanSurat,
  deletePengajuanSurat,
} from "../controllers/PengajuanSuratController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ✅ POST pengajuan surat (dengan upload file)
router.post("/pengajuan-surat", verifyToken, upload.single("dokumen_pendukung"), createPengajuanSurat);

// GET all pengajuan surat
router.get("/pengajuan-surat", verifyToken, getPengajuanSurat);

// GET pengajuan surat by ID
router.get("/pengajuan-surat/:id", verifyToken, getPengajuanSuratById);

// PUT update pengajuan surat
router.put("/pengajuan-surat/:id", verifyToken, updatePengajuanSurat);

// DELETE pengajuan surat
router.delete("/pengajuan-surat/:id", verifyToken, deletePengajuanSurat);

export default router;
