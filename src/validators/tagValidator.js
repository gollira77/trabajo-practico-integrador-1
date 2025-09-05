import { body, validationResult } from "express-validator";

export const tagValidator = [
  body("name").notEmpty().withMessage("El nombre de la etiqueta es obligatorio").isLength({ min: 2 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
    next();
  },
];
