import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error("❌ Error: MONGO_URI is missing from your .env file!");
            process.exit(1);
        }
        console.log("🔄 Connecting to MongoDB Atlas...");
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
        });
        //await mongoose.connect(uri);
        console.log("MongoDB connected: ${conn.connection.host}");
    }
    catch (error) {
        //console.log("MongoDB connection error: ", error);
        console.error(`❌ MongoDB connection error: ${error.message}`);
        console.error("💡 Fix: Go to MongoDB Atlas -> Network Access -> Add IP Address -> 'Allow Access From Anywhere' (0.0.0.0/0)");
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map