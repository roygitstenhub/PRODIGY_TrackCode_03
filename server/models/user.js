import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    contact: {
        type: Number,
    },
    picture: String,
    

});


const User = mongoose.model("User", userSchema)

export default User