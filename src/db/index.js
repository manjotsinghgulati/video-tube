import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log('Database is connected to:', db.connection.host)
    } catch (error) {
        console.error("Mongo DB connection error", error);
        process.exit(1)
    }
}

export default ConnectDB;