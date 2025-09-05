import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Article extends Model {}

Article.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM("draft", "published"), defaultValue: "draft" },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Article",
    tableName: "articles",
    timestamps: true,
  }
);

export default Article;
