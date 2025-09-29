import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA

AssetModel.belongsToMany(CategoryModel, {
  through: AssetCategoryModel,
  foreignkey: "asset_id",
  as: "category",
  onDelete: "CASCADE",
});

CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategoryModel,
  foreignkey: "category_id",
  as: "assets",
  onDelete: "CASCADE",
});
