import mongoose, { mongo } from "mongoose";
import { type } from "os";
import { PassThrough } from "stream";

const userSchema = new mongoose.Schema({
    // username
    //email
    //password
    //verfiyToken
    //verifyToken-Expiry
    //Forgot-Password!
    
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Create a strong Password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPassword: String,
    forgotPasswordExpiry: Date,
    forgotToken: String,
    forgotTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User