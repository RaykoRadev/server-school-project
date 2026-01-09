import mongoose from "mongoose";

mongoose.set("autoIndex", false);
mongoose.set("bufferCommands", false);

let cashed = global.mongoose;

if (!cashed) {
    cashed = global.mongoose = { conn: null, promise: null };
}

async function initDatabase() {
    if (cashed.conn) return cashed.conn;

    if (!cashed.promise) {
        const dbName = process.env.DB_NAME || "school-online-tasks";

        cashed.promise = mongoose
            .connect(process.env.DB_URL, {
                dbName,
                maxPoolSize: 5,
                serverSelectionTimeoutMS: 3000,
            })
            .then((conn) => {
                console.log("MongoDB connected");
                return conn;
            });
    }
    try {
        cashed.conn = await cashed.promise;
    } catch (err) {
        console.log("Db connection faild");
        console.log(err.message);
        throw err;
    }

    return cashed.conn;
}

export default initDatabase;
