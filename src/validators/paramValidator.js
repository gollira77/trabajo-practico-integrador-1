import { param, validationResult } from "express-validator";

export const idValidator = [
  param("id").isInt().withMessage("El ID debe ser un número entero"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
    next();
  },
];
