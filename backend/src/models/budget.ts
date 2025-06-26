import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
import { number } from "zod";

interface BudgetAttributes {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  month: string;
}

interface BudgetCreationAttributes extends Optional<BudgetAttributes, "id"> {}

class Budget
  extends Model<BudgetAttributes, BudgetCreationAttributes>
  implements BudgetAttributes
{
  public id!: number;
  public userId!: number;
  public categoryId!: number;
  public amount!: number;
  public month!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Budget.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "budgets",
  }
);

User.hasMany(Budget, { foreignKey: "userId" });
Budget.belongsTo(User, { foreignKey: "userId" });

export default Budget;
