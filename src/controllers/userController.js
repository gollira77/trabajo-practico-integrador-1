import { User, Profile, Article } from "../models/index.js";

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" }
      ]
    });
    res.status(200).json({ usuarios: users });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" }
      ]
    });
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json({ usuario: user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const { password, ...data } = req.body;
    await user.update(data);

    res.status(200).json({ mensaje: "Usuario actualizado", usuario: user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    await user.destroy(); 
    res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (err) {
    next(err);
  }
};
