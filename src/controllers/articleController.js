import { Article, User, Tag } from "../models/index.js";

export const createArticle = async (req, res, next) => {
  try {
    const { title, content, status } = req.body;
    const article = await Article.create({
      title,
      content,
      status: status || "draft",
      user_id: req.user.id
    });
    res.status(201).json({ mensaje: "Artículo creado", article });
  } catch (err) {
    next(err);
  }
};

export const listPublishedArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      where: { status: "published" },
      include: [
        { model: User, as: "author", attributes: ["id", "username"] },
        { model: Tag, as: "tags", attributes: ["id", "name"] }
      ]
    });
    res.status(200).json({ articles });
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [
        { model: User, as: "author", attributes: ["id", "username"] },
        { model: Tag, as: "tags", attributes: ["id", "name"] }
      ]
    });
    if (!article) return res.status(404).json({ mensaje: "Artículo no encontrado" });
    res.status(200).json({ article });
  } catch (err) {
    next(err);
  }
};

export const listUserArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Tag, as: "tags", attributes: ["id", "name"] }]
    });
    res.status(200).json({ articles });
  } catch (err) {
    next(err);
  }
};

export const getUserArticleById = async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: { id: req.params.id, user_id: req.user.id },
      include: [{ model: Tag, as: "tags", attributes: ["id", "name"] }]
    });
    if (!article) return res.status(404).json({ mensaje: "Artículo no encontrado" });
    res.status(200).json({ article });
  } catch (err) {
    next(err);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ mensaje: "Artículo no encontrado" });

    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    await article.update(req.body);
    res.status(200).json({ mensaje: "Artículo actualizado", article });
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ mensaje: "Artículo no encontrado" });

    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    await article.destroy(); 
    res.status(200).json({ mensaje: "Artículo eliminado" });
  } catch (err) {
    next(err);
  }
};
