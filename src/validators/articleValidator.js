import { body, validationResult } from "express-validator";

export const articleValidator = [
  body("title").notEmpty().withMessage("El título es obligatorio").isLength({ min: 3 }),
  body("content").notEmpty().withMessage("El contenido es obligatorio").isLength({ min: 10 }),
  body("status").optional().isIn(["draft", "published"]).withMessage("Status inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
    next();
  },
];
