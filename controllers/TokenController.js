import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new Error("Refresh token tidak ada");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user || !user.refresh_token) {
      const error = new Error("Refresh token tidak ada");
      error.statusCode = 401;
      throw error;
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error) {
          return res.status(403).json({
            status: "Error",
            message: "Refresh token tidak valid",
          });
        }

        // ✅ Gunakan data eksplisit yang pasti tersedia
        const accessToken = jwt.sign(
          {
            id_user: user.id_user,   // ✅ wajib agar getUserId() bisa jalan
            role: user.role,         // ✅ disarankan untuk hak akses
            email: user.email        // opsional, kalau mau kirim juga
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );

        return res.status(200).json({
          status: "Success",
          message: "Berhasil mendapatkan access token.",
          accessToken,
        });
      }
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};
