import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const PengajuanSurat = db.define(
  "pengajuan_surat",
  {
    id_pengajuan: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    keperluan_surat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    instansi_tujuan: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tanggal_berangkat: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    tanggal_kembali: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    dokumen_pendukung: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("proses", "disetujui", "ditolak"),
      defaultValue: "proses",
    },
  },
  {
    freezeTableName: true, // Biar nama tabel tidak diubah jadi jamak oleh Sequelize
  }
);

// Sinkronisasi model dengan database
db.sync().then(() => console.log("Database synced"));

export default PengajuanSurat;
