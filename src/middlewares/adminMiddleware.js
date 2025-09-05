export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ mensaje: "Acceso restringido. Solo administradores." });
  }
  next();
};
