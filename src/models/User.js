import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: { type: String, minLength: 8, required: true },
    insurances: [
        { type: Object, name: String, coverage: Number, expiry: String },
    ],
});
export const UserModel = mongoose.model("User", userSchema);
