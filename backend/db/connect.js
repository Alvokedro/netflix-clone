import mongoose from "mongoose";

const connectDb = async(uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Database Connected");
    } catch (error) {
        console.error("Error Connect to DataBase")
    }
}

export default connectDb;