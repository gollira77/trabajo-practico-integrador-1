export const errorHandler = (err, req, res, next) => {
  console.error("Error capturado:", err.message);
  res.status(500).json({
    mensaje: "Ocurrió un error interno en el servidor",
    error: err.message,
  });
};
