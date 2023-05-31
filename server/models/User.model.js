import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "Please provide your firstName"]
    },
    lastName: {
        type: String,
        require: [true, "Please provide your lastName"]
    },
    email: {
        type: String,
        require: [true, "Please provide your email"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        require: [true, "Please provide your password"]
    },
    role: {
        type: String,
        default: "user"
    },
    image: {
        type: String,
        default: ""
    }
})

const User = mongoose.model("User",userSchema)

export default User