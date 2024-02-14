const mongoose = require('mongoose');
// const mongoURL = "mongodb://localhost:27017/swastha?";
const mongoURL = "mongodb+srv://unknownalien1:1210sampada@cluster0.fgxndej.mongodb.net/swastha?retryWrites=true&w=majority"; // MongoDB atlas Swastha
// const mongoURL = "mongodb://192.168.0.106:27017/swastha?"; //IP address

const connectToMongo = ()=>{
    mongoose.connect(mongoURL)
};

module.exports = connectToMongo;
