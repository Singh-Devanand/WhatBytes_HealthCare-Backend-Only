const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Patient name is required"],
            trim: true
        },

        age: {
            type: Number,
            required: [true, "Patient age is required"],
            min: [0, "Age cannot be negative"],
            max: [150, "Age cannot exceed 150"]
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: [true, "Gender is required"]
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        }
    },
    {timestamps: true}
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;

