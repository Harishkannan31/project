import mongoose from "mongoose";
require('dotenv').config();

const dbUrl:string=process.env.DB_URL || '';

const connectDB=async()=>{
    try {
        const data = await mongoose.connect(dbUrl);
        console.log(`DB connected with ${data.connection.host}`);
    } catch (error) {
        // Handle connection error
        console.error('Error connecting to the database:', error);
    }
    
}

export default connectDB;