import mongoose from "mongoose";

const adminModel = new mongoose.Schema({

    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    age: { type: Number, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    loggedIn: { type: Boolean, default: false}

},
{
    timestamps: true
});

export default mongoose.model("Admin", adminModel);
