import User from './UserModel.js';
import PengajuanSurat from './PengajuanSuratModel.js';
import LogPengajuan from './LogPengajuanModel.js';

// USER 1 - N PENGAJUAN_SURAT
User.hasMany(PengajuanSurat, { foreignKey: 'id_user' });
PengajuanSurat.belongsTo(User, { foreignKey: 'id_user' });

// USER 1 - N LOG_PENGAJUAN (admin yang melakukan aksi)
User.hasMany(LogPengajuan, { foreignKey: 'id_user' });
LogPengajuan.belongsTo(User, { foreignKey: 'id_user' });

// PENGAJUAN_SURAT 1 - N LOG_PENGAJUAN
PengajuanSurat.hasMany(LogPengajuan, { foreignKey: 'id_pengajuan' });
LogPengajuan.belongsTo(PengajuanSurat, { foreignKey: 'id_pengajuan' });

export { User, PengajuanSurat, LogPengajuan };
