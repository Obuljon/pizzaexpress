import { Schema, model } from "mongoose";

export const objectSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    deskimg: { type: String, required: true },
    planshetyimg: { type: String, required: true },
    phoneimg: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("object", objectSchema);
