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
    timeSlot: {
      startTime: { 
        type: Date, 
        required: true
      },
      endTime: { 
        type: Date, 
        required: true,
        validate: {
          validator: function (EndTimeVal: Date): boolean {
            return EndTimeVal > this.timeSlot.startTime;
          }
        }
      }
    }
  }
)
export const ClassSession = mongoose.model("ClassSession", classSessionSchema);