import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET || "default_secret";

export const generarToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verificarToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
};
