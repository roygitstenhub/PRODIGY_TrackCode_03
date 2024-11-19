import mongoose from "mongoose";

const database = async () => {
    try {

        const conn = await mongoose.connect(`mongodb://0.0.0.0:27017/ekart`)
        console.log(`connected mongoDB ${conn.connection.host}`)

    } catch (err) {
        console.log(`error roysten : ${err.message}`)
        process.exit(1)
    }
}

export default database