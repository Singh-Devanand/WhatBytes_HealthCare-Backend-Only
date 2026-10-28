const {Router} = require('express');
const {createDoctorController, getAllDoctorsController, getDoctorByIdController, updateDoctorController, deleteDoctorController} = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const doctorRouter = Router();

doctorRouter.post('/doctors', authMiddleware, createDoctorController);
doctorRouter.get('/doctors', authMiddleware, getAllDoctorsController);
doctorRouter.get('/doctors/:id', authMiddleware, getDoctorByIdController);
doctorRouter.put('/doctors/:id', authMiddleware, updateDoctorController);
doctorRouter.delete('/doctors/:id', authMiddleware, deleteDoctorController);

module.exports = doctorRouter;

