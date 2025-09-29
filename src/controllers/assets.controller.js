import { AssetModel } from "../models/mongoose/asset.model";

export const createAsset = async (req, res) => {
  try {
    const {
      inventoryNumber,
      description,
      branch,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
    } = req.body;
    await ArticleModels.create({
      inventoryNumber,
      description,
      branch,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
    });
    // TODO: crear asset (usuario autenticado)
    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    const Article = await AssetModel.find().populate("categoria");
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    return res.status(200).json({ data: Article });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
