import { Schema, model } from "mongoose";

// TODO: configurar el virtuals para el populate inverso con assets

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

CategorySchema.virtual("Assets", {
  ref: "Asset",
  localField: "_id",
  foreignField: "categoria",
});

CategorySchema.set("ToJson", {
  virtuals: true,
  transform: (doc, Result) => {
    delete Result.id;
  },
});
// ! FALTA COMPLETAR ACA

export const CategoryModel = model("Category", CategorySchema);
