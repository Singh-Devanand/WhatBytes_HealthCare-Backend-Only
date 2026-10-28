const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRouter = require('./routes/doctor.routes');
const patientDoctorRouter = require('./routes/patientDoctor.routes');

app.use(cookieParser());
app.use(express.json());

// here i can place all the router codes
app.use('/api/auth', authRoutes);
app.use('/api', patientRoutes);
app.use('/api', doctorRouter);
app.use('/api', patientDoctorRouter);
module.exports = app;

