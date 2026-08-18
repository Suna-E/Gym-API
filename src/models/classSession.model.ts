import {Schema , model, Document, Types } from 'mongoose';
export interface IClassSession extends Document {
    className: string;
    instructor: string;
    startTime: Date;
    endTime: Date;
    capacity: number;
    attendees: string[];
    isDeleted: boolean;
}
const classSessionSchema = new Schema<IClassSession>(
  {
    className: { 
      type: String, 
      required: [true, 'Class name is required'], 
      trim: true 
    },
    instructor: { 
      type: String , 
      ref: 'User', 
      required: true 
    },
    startTime: { 
      type: Date, 
      required: [true, 'Start time is required'] 
    },
    endTime: { 
      type: Date, 
      required: [true, 'End time is required'] 
    },
    capacity: { 
      type: Number, 
      required: [true, 'Capacity is required'], 
      min: [1, 'Capacity must be at least 1'] 
    },
    attendees: { 
        type: [String],
        default: [] 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    }
  },
  { timestamps: true } 
)
export const ClassSession = model<IClassSession>('ClassSession', classSessionSchema);
