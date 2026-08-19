import mongoose from 'mongoose';

  const classSessionSchema = new mongoose.Schema(
  {
    className: { 
      type: String, 
      required: true, 
      trim: true 
    },
    Member:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
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
      }/*
    timeSlot: {
      startTime: { 
        type: Date, 
        required: true
      },
      endTime: { 
        type: Date, 
        required: true,
      }
    }*/
  }
)
export const classSession = mongoose.model("ClassSession", classSessionSchema);