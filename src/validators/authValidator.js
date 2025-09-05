import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("username")
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  body("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
    next();
  },
];

export const loginValidator = [
  body("email").notEmpty().withMessage("El email es obligatorio").isEmail(),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
    next();
  },
];
