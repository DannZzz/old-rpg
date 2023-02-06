import mongoose from "mongoose"
import { MONGO_URI } from "../config.js"
import Database from "./db.js"

export default function connectMongo() {
  mongoose.connect(MONGO_URI).then(async () => {
    try {
      await Database.get("Auth").model.collection.createIndex(
        { expireIn: 1 },
        { expireAfterSeconds: 3600 * 24 }
      )
    } catch {}
    console.log("Database connected")
  })
}
