import { body, validationResult } from "express-validator";

export const updateProfileValidator = [
  body("firstName").optional().isLength({ min: 2 }).withMessage("Nombre demasiado corto"),
  body("lastName").optional().isLength({ min: 2 }).withMessage("Apellido demasiado corto"),
  body("bio").optional().isLength({ max: 500 }).withMessage("La bio no puede superar 500 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
    next();
  },
];
