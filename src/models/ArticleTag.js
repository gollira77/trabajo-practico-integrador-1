import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class ArticleTag extends Model {}

ArticleTag.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    article_id: { type: DataTypes.INTEGER, allowNull: false },
    tag_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "ArticleTag",
    tableName: "articles_tags",
    timestamps: true,
  }
);

export default ArticleTag;
