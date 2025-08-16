import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // this reads .env file and loads them into process.env
export async function connect_to_mongo_db(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("successfully connected to mongo db");
  } catch (error) {
    console.error("error connecting to mongo db",error);
    process.exit(1);
  }
}
