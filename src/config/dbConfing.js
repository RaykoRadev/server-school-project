import mongoose from "mongoose";

async function initDatabase() {
    //todo may need change
    const dbName = "school-online-tasks";
    try {
        await mongoose.connect(process.env.DB_URL, { dbName });
        console.log("DB connected succssesfully");
    } catch (err) {
        console.log("Db connection faild");
        console.log(err.message);
    }
}

export default initDatabase;
