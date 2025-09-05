import { verificarToken } from "../helpers/jwt.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado." });
  }

  const data = verificarToken(token.replace("Bearer ", ""));
  if (!data) {
    return res.status(401).json({ mensaje: "Token inválido o expirado." });
  }

  req.user = data;
  next();
};
