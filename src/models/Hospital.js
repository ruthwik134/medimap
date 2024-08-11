import mongoose from "mongoose";
const hospitalSchema = new mongoose.Schema({
    Address: String,
    Hospital: String,
    specialization: {
        type: [String],
        required: true,
    },
    insurances: {
        type: [String],
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"], 
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});
hospitalSchema.index({ location: "2dsphere" });
export const Hospital = mongoose.model("Hospital", hospitalSchema);
