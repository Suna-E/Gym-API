import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'Member' | 'Trainer';
}

const userSchema = new Schema<IUser>(
  {
    fullName: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },
    password: { 
      type: String, 
      required: true, 
      select: false // Excludes password from query results by default
    },
    role: { 
      type: String, 
      enum: ['Member', 'Trainer'], 
      default: 'Member',
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

export const User = model<IUser>("User", userSchema);