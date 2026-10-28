const patientDoctorModel = require('../models/patientDoctor.model');
const patientModel = require('../models/patient.model');
const doctorModel = require('../models/doctor.model');

async function assignDoctorController(req, res) {
    try{
        const {patient, doctor} = req.body;

        if(!patient || !doctor){
            return res.status(400).json({
                message: 'Patient ID and doctor ID are required'
            });
        } 

        const patientExists = await patientModel.findOne({
            _id: patient,
            createdBy: req.user.id
        });

        if(!patientExists){
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        const doctorExists = await doctorModel.findById(doctor);

        if(!doctorExists){
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        const existingMapping = await patientDoctorModel.findOne({patient, doctor});

        if(existingMapping){
            return res.status(409).json({
                message: 'Doctor is already assigned to this patient'
            });
        }

        const mapping = await patientDoctorModel.create({
            patient,
            doctor,
            assignedBy: req.user.id
        });

        const populatedMapping = await patientDoctorModel.findById(mapping._id).populate('patient').populate('doctor');

        return res.status(201).json({
            message: 'Doctor assigned to patient successfully',
            mapping: populatedMapping
        });
    } 
    catch(error){
        console.log("error in mapping a doctor to a patient : ", error);
        return res.status(500).json({
            message: 'Failed to assign doctor',
            error: error.message
        });
    }
}

async function getAllMappingsController(req, res) {
    try{
        const mappings = await patientDoctorModel.find({ assignedBy: req.user.id }).populate('patient').populate('doctor').sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Mappings fetched successfully',
            count: mappings.length,
            mappings
        });
    }
    catch(error) {
        console.log("error in fetching all the doctor-patient mapping : ", error);
        return res.status(500).json({
            message: 'Failed to fetch mappings',
            error: error.message
        });
    }
}

async function getPatientMappingsController(req, res) {
    try{
        const {patient_id} = req.params;

        const patientExists = await patientModel.findOne({
            _id: patient_id,
            createdBy: req.user.id
        });

        if(!patientExists){
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        const mappings = await patientDoctorModel.find({patient: patient_id, assignedBy: req.user.id}).populate('doctor').sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Patient mappings fetched successfully',
            count: mappings.length,
            mappings
        });
    } 
    catch(error){
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid patient ID'
            });
        }

        return res.status(500).json({
            message: 'Failed to fetch patient mappings',
            error: error.message
        });
    }
}

async function deleteMappingController(req, res) {
    try{
        const mapping = await patientDoctorModel.findOneAndDelete({
            _id: req.params.id,
            assignedBy: req.user.id
        });

        if(!mapping){
            return res.status(404).json({
                message: 'Mapping not found'
            });
        }

        return res.status(200).json({
            message: 'Doctor assignment removed successfully'
        });
    } 
    catch(error){
        console.log("error in deleting a mapping : ", error);
        return res.status(500).json({
            message: 'Failed to delete mapping',
            error: error.message
        });
    }
}

module.exports = {assignDoctorController, getAllMappingsController, getPatientMappingsController, deleteMappingController};

