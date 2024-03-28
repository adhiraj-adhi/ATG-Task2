import mongoose from "mongoose";

const Connection = (URL) => {
    try {
        return mongoose.connect(URL);
    } catch (error) {
        console.log(error);
    }
}

export default Connection;