import { User, Profile } from "../models/index.js";
import { hashPassword, compararPassword } from "../helpers/bcrypt.js";
import { generarToken } from "../helpers/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ mensaje: "Email ya registrado" });

    const hashed = await hashPassword(password);
    const user = await User.create({ username, email, password: hashed });

    await Profile.create({ user_id: user.id });

    const token = generarToken({ id: user.id, username: user.username, role: user.role });
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ mensaje: "Usuario registrado", token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ mensaje: "Usuario no encontrado" });

    const ok = await compararPassword(password, user.password);
    if (!ok) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = generarToken({ id: user.id, username: user.username, role: user.role });
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ mensaje: "Login exitoso", token });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ mensaje: "Logout exitoso" });
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: { model: Profile, as: "profile" },
    });
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json({ usuario: user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: { model: Profile, as: "profile" },
    });
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    await user.profile.update(req.body);
    res.status(200).json({ mensaje: "Perfil actualizado", profile: user.profile });
  } catch (err) {
    next(err);
  }
};
