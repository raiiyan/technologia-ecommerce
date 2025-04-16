import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl : {
        type: String,
        required: true,
    },
    cartItem: {
        type: Object,
        default: {},
    },
}, { minimize: false})

const User = mongoose.models.user || mongoose.model("User", userSchema)
export default User
