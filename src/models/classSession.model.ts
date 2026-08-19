import mongoose from 'mongoose';

  const classSessionSchema = new mongoose.Schema(
  {
    className: { 
      type: String, 
      required: true, 
      trim: true 
    },
    instructor: { 
      type: String , 
      ref: 'User', 
      required: true 
    },
    startTime: { 
      type: Date, 
      required: true
    },
    endTime: { 
      type: Date, 
      required: true
    },
    capacity: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    attendees: { 
        type: [String],
        default: [] 
    }
  }
)
export const ClassSession = mongoose.model("ClassSession", classSessionSchema);