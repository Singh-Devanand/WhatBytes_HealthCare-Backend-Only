const {Router} = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { assignDoctorController, getAllMappingsController, getPatientMappingsController, deleteMappingController} = require('../controllers/patientDoctor.controller');

const patientDoctorRouter = Router();

patientDoctorRouter.post('/mappings', authMiddleware, assignDoctorController);
patientDoctorRouter.get('/mappings', authMiddleware, getAllMappingsController);
patientDoctorRouter.get('/mappings/:patient_id', authMiddleware, getPatientMappingsController);
patientDoctorRouter.delete('/mappings/:id', authMiddleware, deleteMappingController);

module.exports = patientDoctorRouter;

