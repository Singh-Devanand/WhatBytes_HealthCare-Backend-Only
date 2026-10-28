const doctorModel = require('../models/doctor.model');

async function createDoctorController(req, res) {
    try{
        const {name, specialization, email, phone, experience} = req.body;

        if(!name || !specialization || !email || !phone || !experience) {
            return res.status(400).json({
                message: 'Please provide valid doctor details'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingDoctor = await doctorModel.findOne({
            email: normalizedEmail
        });

        if(existingDoctor) {
            return res.status(409).json({
                message: 'A doctor with this email already exists'
            });
        }

        const doctor = await doctorModel.create({
            name,
            specialization,
            email: normalizedEmail,
            phone,
            experience: Number(experience),
            createdBy: req.user.id
        });

        return res.status(201).json({
            message: 'Doctor created successfully',
            doctor
        });
    } 
    catch(error) {
        console.log("error in adding doctor : ", error);
        return res.status(500).json({
            message: 'Failed to create doctor',
            error: error.message
        });
    }
}

async function getAllDoctorsController(req, res) {
    try{
        const doctors = await doctorModel.find({
            createdBy: req.user.id
        }).sort({createdAt: -1});

        return res.status(200).json({
            message: 'Doctors fetched successfully',
            count: doctors.length,
            doctors
        });
    } 
    catch(error) {
        console.log("error in Retrieving all the doctors : ", error);
        return res.status(500).json({
            message: 'Failed to fetch doctors',
            error: error.message
        });
    }
}

async function getDoctorByIdController(req, res) {
    try{
        const doctor = await doctorModel.findOne({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if(!doctor) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        return res.status(200).json({
            message: 'Doctor fetched successfully',
            doctor
        });
    } 
    catch(error) {
        console.log("error in fetching a doctor by ID : ", error);
        return res.status(500).json({
            message: 'Failed to fetch doctor',
            error: error.message
        });
    }
}

async function updateDoctorController(req, res) {
    try{
        const {name, specialization, email, phone, experience} = req.body;
        const updates = {};

        if(name !== undefined) {
            if(typeof name !== 'string' || !name) {
                return res.status(400).json({
                    message: 'Name must be a non-empty string'
                });
            }
            updates.name = name;
        }

        if(specialization !== undefined) {
            if(typeof specialization !== 'string' ||!specialization) {
                return res.status(400).json({
                    message: 'Specialization must be a non-empty string'
                });
            }
            updates.specialization = specialization;
        }

        if(email !== undefined) {
            if(typeof email !== 'string' ||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({
                    message: 'Please provide a valid email'
                });
            }

            updates.email = email.toLowerCase();

            const existingDoctor = await doctorModel.findOne({
                email: updates.email,
                _id: { $ne: req.params.id }
            });

            if(existingDoctor) {
                return res.status(409).json({
                    message: 'A doctor with this email already exists'
                });
            }
        }

        if(phone !== undefined) {
            if (typeof phone !== 'string' || !phone) {
                return res.status(400).json({
                    message: 'Phone must be a non-empty string'
                });
            }
            updates.phone = phone;
        }

        if(experience !== undefined) {
            if(!Number.isInteger(Number(experience)) || Number(experience) < 0) {
                return res.status(400).json({
                    message: 'Experience must be a non-negative integer'
                });
            }
            updates.experience = Number(experience);
        }

        if(Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: 'Provide at least one field to update'
            });
        }

        const doctor = await doctorModel.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id},
            { $set: updates },
            { new: true, runValidators: true }
        );

        if(!doctor) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        return res.status(200).json({
            message: 'Doctor updated successfully',
            doctor
        });
    } 
    catch(error) {
        console.log("error in upadting doctor details : ", error);
        return res.status(500).json({
            message: 'Failed to update doctor',
            error: error.message
        });
    }
}

async function deleteDoctorController(req, res) {
    try{
        const doctor = await doctorModel.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if(!doctor) {
            return res.status(404).json({
                message: 'Doctor not found'
            });
        }

        return res.status(200).json({
            message: 'Doctor deleted successfully'
        });
    } 
    catch(error) {
        console.log("error in deleting doctor by ID : ", error);
        return res.status(500).json({
            message: 'Failed to delete doctor',
            error: error.message
        });
    }
}

module.exports = {createDoctorController, getAllDoctorsController, getDoctorByIdController, updateDoctorController, deleteDoctorController};

