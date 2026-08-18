import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document { //I is a naming convention for interface btw
  fullName: string;
  email: string;
  password: string;
  role: 'member' | 'trainer';
}

const userSchema = new Schema<IUser>(
  {
    fullName: { 
      type: String, 
      required: true, 
      trim: true // for whitespaces
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
      enum: ['member', 'trainer'], 
      default: 'member',
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

export const User = model<IUser>("User", userSchema);