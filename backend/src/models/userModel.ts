import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  matchPassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends IUser, Document {}

export type UserWithId = Omit<IUserModel, "password"> & { _id: string };

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUserModel>("User", userSchema);
