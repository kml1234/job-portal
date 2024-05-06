import mongoose from "mongoose";
import colors from "colors";
const connectDB=async()=>{
   try {
    const conn=mongoose.connect(process.env.MONGO_URL);
    console.log("database connected successfully".bgGreen.white);
   } catch (error) {
    console.log("database connected failed");
   }
}
export default connectDB;