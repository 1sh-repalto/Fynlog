import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";

interface CategoryAttributes {
  id: number;
  userId: number;
  name: string;
  isDefault: boolean;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public userId!: number;
  public name!: string;
  public isDefault!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: { type: DataTypes.STRING, allowNull: false },
    isDefault: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "categories",
    indexes: [
      {
        unique: true,
        fields: ["userId", "name"],
      },
    ],
  }
);

User.hasMany(Category, { foreignKey: "userId" });
Category.belongsTo(User, { foreignKey: "userId" });

export default Category;
