const patientModel = require('../models/patient.model');

async function createPatientController(req, res) {
    try {
        const {name, age, gender, address} = req.body;

        if(!name || !age || !gender || !address) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const patient = await patientModel.create({
            name,
            age,
            gender,
            address,
            createdBy: req.user.id
        });

        return res.status(201).json({
            message: 'Patient created successfully',
            patient
        });
    } 
    catch(error) {
        console.log("error in creating patient : ", error);
        return res.status(500).json({
            message: 'Failed to create patient',
            error: error.message
        });
    }
}


async function getAllPatientsController(req, res) {
    try{
        const patients = await patientModel.find({
            createdBy: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Patients fetched successfully',
            count: patients.length,
            patients
        });
    } 
    catch(error) {
        console.log("error in fetching patients : ", error);
        return res.status(500).json({
            message: 'Failed to fetch patients',
            error: error.message
        });
    }
}

async function getPatientByIdController(req, res) {
    try{
        const patient = await patientModel.findOne({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if(!patient) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        return res.status(200).json({
            message: 'Patient fetched successfully',
            patient
        });
    } 
    catch(error) {
        console.log("error in fetching patient by their id : ", error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid patient ID'
            });
        }
        return res.status(500).json({
            message: 'Failed to fetch patient',
            error: error.message
        });
    }
}

async function updatePatientController(req, res) {
    try {
        const {name, age, gender, address} = req.body;
        const updates = {};

        if(name !== undefined) {
            if(typeof name !== 'string' || !name) {
                return res.status(400).json({
                    message: 'Name must be a non-empty string'
                });
            }
            updates.name = name;
        }

        if(age !== undefined) {
            if(!Number.isInteger(Number(age)) || Number(age) < 0) {
                return res.status(400).json({
                    message: 'Age must be a valid non-negative integer'
                });
            }
            updates.age = Number(age);
        }

        if(gender !== undefined) {
            if(!['Male', 'Female', 'Other'].includes(gender)) {
                return res.status(400).json({
                    message: 'Gender must be Male, Female, or Other'
                });
            }
            updates.gender = gender;
        }

        if(address !== undefined) {
            if(typeof address !== 'string' || !address) {
                return res.status(400).json({
                    message: 'Address must be a non-empty string'
                });
            }
            updates.address = address;
        }

        if(Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: 'Provide at least one field to update'
            });
        }

        const patient = await patientModel.findOneAndUpdate(
            {_id: req.params.id, createdBy: req.user.id},
            { $set: updates },
            { new: true, runValidators: true }
        );

        if(!patient) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        return res.status(200).json({
            message: 'Patient updated successfully',
            patient
        });
    } 
    catch(error) {
        console.log("error in updating patient : ", error);
        return res.status(500).json({
            message: 'Failed to update patient',
            error: error.message
        });
    }
}

async function deletePatientController(req, res) {
    try{
        const patient = await patientModel.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if(!patient) {
            return res.status(404).json({
                message: 'Patient not found'
            });
        }

        return res.status(200).json({
            message: 'Patient deleted successfully'
        });
    } 
    catch(error) {
        console.log("error in deleting patient : ", error);
        return res.status(500).json({
            message: 'Failed to delete patient',
            error: error.message
        });
    }
}

module.exports = {createPatientController, getAllPatientsController, getPatientByIdController, updatePatientController, deletePatientController};

