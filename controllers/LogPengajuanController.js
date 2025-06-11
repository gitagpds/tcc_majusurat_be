import LogPengajuan from "../models/LogPengajuanModel.js";
import User from "../models/UserModel.js";
import PengajuanSurat from "../models/PengajuanSuratModel.js";

// GET ALL
export const getLogPengajuans = async (req, res) => {
  try {
    const logs = await LogPengajuan.findAll({
      include: [
        {
          model: User,
          attributes: ["id_user", "name", "email"],
        },
        {
          model: PengajuanSurat,
          attributes: ["id_pengajuan", "keperluan_surat", "status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: "Success",
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// GET BY ID
export const getLogPengajuanById = async (req, res) => {
  try {
    const log = await LogPengajuan.findOne({
      where: { id_log: req.params.id },
      include: [
        {
          model: User,
          attributes: ["id_user", "name", "email"],
        },
        {
          model: PengajuanSurat,
          attributes: ["id_pengajuan", "keperluan_surat", "status"],
        },
      ],
    });

    if (!log) {
      return res.status(404).json({
        status: "Error",
        message: "Log tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "Success",
      data: log,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// CREATE
export const createLogPengajuan = async (req, res) => {
  try {
    const { id_pengajuan, id_user, aksi_admin, alasan } = req.body;

    if (!id_pengajuan || !id_user || !aksi_admin) {
      return res.status(400).json({
        status: "Error",
        message: "Field wajib tidak boleh kosong",
      });
    }

    const newLog = await LogPengajuan.create({
      id_pengajuan,
      id_user,
      aksi_admin,
      alasan,
    });

    res.status(201).json({
      status: "Success",
      message: "Log berhasil dibuat",
      data: newLog,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// DELETE
export const deleteLogPengajuan = async (req, res) => {
  try {
    const log = await LogPengajuan.findByPk(req.params.id);

    if (!log) {
      return res.status(404).json({
        status: "Error",
        message: "Log tidak ditemukan",
      });
    }

    await log.destroy();

    res.status(200).json({
      status: "Success",
      message: "Log berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
