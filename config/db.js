import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function ConnectDB() {

    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = (await mongoose.connect(`${process.env.MONGODB_URI}/technologia`,opts)).then( mongoose => {})
            return mongoose
        }

        cached.conn = await cached.promise
        return cached.conn
    }

export default ConnectDB
