import { ArticleTag, Article, Tag } from "../models/index.js";

export const addTagToArticle = async (req, res, next) => {
  try {
    const { article_id, tag_id } = req.body;
    const article = await Article.findByPk(article_id);

    if (!article) return res.status(404).json({ mensaje: "Artículo no encontrado" });
    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    const relation = await ArticleTag.create({ article_id, tag_id });
    res.status(201).json({ mensaje: "Etiqueta asociada al artículo", relation });
  } catch (err) {
    next(err);
  }
};

export const removeTagFromArticle = async (req, res, next) => {
  try {
    const relation = await ArticleTag.findByPk(req.params.id);
    if (!relation) return res.status(404).json({ mensaje: "Relación no encontrada" });

    const article = await Article.findByPk(relation.article_id);
    if (req.user.id !== article.user_id && req.user.role !== "admin") {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    await relation.destroy();
    res.status(200).json({ mensaje: "Etiqueta removida del artículo" });
  } catch (err) {
    next(err);
  }
};
