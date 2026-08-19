import mongoose from "mongoose";


/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - Session
 *         - Member
 *         - Status
 *       properties:
 *         Session:
 *           type: string
 *           description: classSession Id
 *         Member:
 *           type: string
 *           description: Member Id
 *         Status:
 *           type: string
 *           enum: [booked, cancelled]
 *           description: the allowed values are booked or cancelled
 *       example:
 *         Session: "66c3b2f5e1a2c3b4a5d6e701"
 *         Member: "66c3b2f5e1a2c3b4a5d6e702"
 *         Status: "booked"
 */
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