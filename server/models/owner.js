import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({

    fullname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Owner = mongoose.model("Owner", ownerSchema)

export default Owner