export const ownerMiddleware = (req, res, next) => {
  const { id } = req.params;

  if (req.user.role !== "admin" && req.user.id !== parseInt(id)) {
    return res.status(403).json({ mensaje: "No tienes permisos para modificar este recurso." });
  }
  next();
};
