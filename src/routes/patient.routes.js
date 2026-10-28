const {Router} = require('express');
const {createPatientController, getAllPatientsController, getPatientByIdController, updatePatientController, deletePatientController} = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const patientRouter = Router();

patientRouter.post("/patients", authMiddleware ,createPatientController);
patientRouter.get("/patients", authMiddleware ,getAllPatientsController);
patientRouter.get('/patients/:id', authMiddleware, getPatientByIdController);
patientRouter.put('/patients/:id', authMiddleware, updatePatientController);
patientRouter.delete('/patients/:id', authMiddleware, deletePatientController);

module.exports = patientRouter;

