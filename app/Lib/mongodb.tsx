import mongoose from "mongoose";

const mongo_uri = process.env.MONGODB_URI as string;

if (!mongo_uri) {
  throw new Error("mongo uri is not working");
}

let cached = (global as any).mongoose || { conn: null, Promise: null };

export async function connectDB() {
  if (cached.conn) 
    return cached.conn;

  if (!cached.Promise) {
    cached.Promise = mongoose.connect("mongodb+srv://safuwan:safwan1234@cluster0.lqm6ryb.mongodb.net/habitTracker").then((mongoose) => mongoose);
    console.log("db connected");
    
  }


  cached.conn = await cached.Promise;
  return cached.conn;
}

(global as any).mongoose = cached;