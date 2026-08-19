import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
    Session:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "classSession",
        required: true
    },

    Member:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },

    Status:{
    type : String,
    required : true,
    enum : [ "booked", "cancelled" ]
   }
});

export const Booking = mongoose.model("Booking", BookingSchema);