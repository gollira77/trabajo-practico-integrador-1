import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Profile extends Model {}

Profile.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING(100), allowNull: true },
    lastName: { type: DataTypes.STRING(100), allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "profiles",
    timestamps: true,
  }
);

export default Profile;
