import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const LogPengajuan = db.define(
  "log_pengajuan",
  {
    id_log: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pengajuan: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    aksi_admin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alasan: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    waktu_aksi: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false, // karena kita pakai waktu_aksi manual, bukan createdAt/updatedAt
    freezeTableName: true,
  }
);

db.sync().then(() => console.log("Database synced"));

export default LogPengajuan;
