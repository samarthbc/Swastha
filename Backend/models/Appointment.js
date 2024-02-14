const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is model for Appointments
const AppointmentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    },

    appointmentdate:{
        type: Date,
        required: true
    },

    currentdate:{
        type: Date,
        default: Date.now
    },

    description:{
        type: String,
        required: true
    }
});

const Appointment = mongoose.model('appointment', AppointmentSchema);
Appointment.createIndexes();
module.exports = Appointment;