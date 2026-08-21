import mongoose from 'mongoose';


/**
 * @swagger
 * components:
 *   schemas:
 *     ClassSession:
 *       type: object
 *       required:
 *         - className
 *         - trainer
 *         - timeStart
 *         - capacity
 *       properties:
 *         className:
 *           type: string
 *           description: class name
 *         trainer:
 *           type: string
 *           description: Member Id
 *         timeStart:
 *           type: date-time
 *           description: class start date
 *         capacity:
 *           type: number
 *           description: Maximum allowed members for this session
 *       example:
 *         className: "yoga"
 *         trainer: "66c3b2f5e1a2c3b4a5d6e702"
 *         timeStart: "2026-09-12T10:00:00:000Z"
 *         capacity: 20
 */
const classSessionSchema = new mongoose.Schema(
  {
    className: { 
      type: String, 
      required: true, 
      trim: true 
    },
    trainer:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    capacity: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    startTime: { 
        type: Date, 
        required: true
      }
  }
)
export const classSession = mongoose.model("classSession", classSessionSchema);
