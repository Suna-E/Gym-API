import mongoose from "mongoose";


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         fullName:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         role:
 *           type: string
 *           enum: [member, trainer]
 *           description: User's role
 *       example:
 *         fullName: "ahmed mohammed"
 *         email: "ahmed@gmail.com"
 *         password: 123456789
 *         role: "member"
 */
const userSchema = new mongoose.Schema(
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
      lowercase: true,
      trim: true
    },
    password: { 
      type: String, 
      required: true, 
      //trim: true
    },
    role: { 
      type: String, 
      enum: ['member', 'trainer'], 
      default: 'member',
      required: true 
    },
  }
);
export const User = mongoose.model("User", userSchema);