import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Tag extends Model {}

Tag.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamps: true,
  }
);

export default Tag;
