const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Doctor name is required"],
            trim: true
        },

        specialization: {
            type: String,
            required: [true, "Specialization is required"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Doctor email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Enter a valid email"]
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true
        },

        experience: {
            type: Number,
            required: [true, "Experience is required"],
            min: [0, "Experience cannot be negative"]
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

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

