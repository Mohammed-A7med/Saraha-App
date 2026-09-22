import { model, Schema } from "mongoose";

export const genders = {
  male: "male",
  female: "female",
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
     match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 15,
    },
    isActive: { type: Boolean, default: false },
    phone: {
      type: String,
      required: true,
    },
    gender: { type: String, enum: Object.values(genders) },
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
