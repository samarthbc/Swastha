const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is a model created for 'doctor'
const DoctorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    certified:{
        type: Boolean,
        default: false
    },
    specialisation:{
        type: String,
        default: "General"
    },
    description:{
        type: String,
        default: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, quae? Culpa deleniti nemo aut accusantium eligendi necessitatibus, sit a consectetur?"
    },
    experience:{
        type: String,
        default: "10 years"
    },
    profileimg:{
        type: String,
        default: "images/pfp_blank.png"
    }
  });

const Doctor = mongoose.model('doctor', DoctorSchema);
Doctor.createIndexes();
module.exports = Doctor;