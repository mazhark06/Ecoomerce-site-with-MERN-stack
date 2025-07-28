import mongoose from "mongoose";

async function db() {
    try {

        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log('MONGODB CONNECTED SUCCESSFULLY');

    } 
    catch (err) {
        console.log("MONGODB CONNECTION ERROR", err);
        process.exit(1); // Exit process with failure
    }
}

export default db;