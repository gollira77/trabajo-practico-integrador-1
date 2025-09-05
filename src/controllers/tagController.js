import { Tag, Article } from "../models/index.js";

export const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existing = await Tag.findOne({ where: { name } });
    if (existing) return res.status(400).json({ mensaje: "Etiqueta ya existe" });

    const tag = await Tag.create({ name });
    res.status(201).json({ mensaje: "Etiqueta creada", tag });
  } catch (err) {
    next(err);
  }
};

export const listTags = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json({ tags });
  } catch (err) {
    next(err);
  }
};

export const getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Article, as: "articles" }
    });
    if (!tag) return res.status(404).json({ mensaje: "Etiqueta no encontrada" });

    res.status(200).json({ tag });
  } catch (err) {
    next(err);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ mensaje: "Etiqueta no encontrada" });

    await tag.update(req.body);
    res.status(200).json({ mensaje: "Etiqueta actualizada", tag });
  } catch (err) {
    next(err);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ mensaje: "Etiqueta no encontrada" });

    await tag.destroy(); 
    res.status(200).json({ mensaje: "Etiqueta eliminada" });
  } catch (err) {
    next(err);
  }
};
