const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser');
const fetchdoctor = require('../middleware/fetchdoctor');

// A middleware used to parse the incoming post request into JSON
router.use(express.json());


// To schedule a new appointment
router.post('/new', fetchuser,
[
    body('description', 'Enter minimum 5 characters').isLength({ min: 5 }),
]

, async (req,res) => {

    let userId = req.user.id;
    const {doctor, appointmentdate, description} = req.body
    const appointment = new Appointment({user:userId,doctor,appointmentdate,description})
    await appointment.save();
    return res.json(appointment)
})


// To get all appointments of the given user
router.post('/getappointmentuser',fetchuser, async (req,res)=>{
    let userId = req.user.id;

    const appointments = await Appointment.find({user: userId}).populate('doctor');
    return res.json(appointments);
})

// To get all appointments of the given doctor
router.post('/getappointmentdoc',fetchdoctor, async (req,res) => {
    let docId = req.doctor.id;

    const appointments = await Appointment.find({doctor: docId}).populate('user');
    return res.json(appointments);
})


module.exports = router