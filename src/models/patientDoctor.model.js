const mongoose = require("mongoose")

const patientDoctorSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: [true, "Patient ID is required"],
            index: true
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor ID is required"],
            index: true
        },

        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true}
);

patientDoctorSchema.index(
    { patient: 1, doctor: 1 },
    { unique: true }
);

const PatientDoctor = mongoose.model(
    "PatientDoctor",
    patientDoctorSchema
);

module.exports = PatientDoctor;

