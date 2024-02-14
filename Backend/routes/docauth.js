const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser');
const fetchdoctor = require('../middleware/fetchdoctor');
const multer = require('multer')
const path = require('path')


// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// Secret key used in verifying signature
const JWT_SECRET = "ThitchanaIsACutie"








// To create a new user ie register a new user in the database [No login required]
router.post('/createdoc',

    // For express validator
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ]

    , async (req, res) => {

        // To check for entry value errors using express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }

        // To check if the account already exists, check for duplicate emails
        let doc = await Doctor.findOne({ email: req.body.email });
        if (doc) {
            return res.status(400).json({ error: "Email already exists", success: false });
        }

        // Hashing and adding Salt to the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create user if everything is perfect
        doc = await Doctor.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        // Sending a JWT (JSON web token) as response to the user
        const data = {
            doc: {
                id: doc.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        return res.json({ authToken, success: true })
    })






// For authenticating ie logging in an existing user [No login required]
router.post('/login',

    // For express validator
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password should not be empty').exists()
    ]

    , async (req, res) => {

        // To check for entry value errors using express validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }

        // To check if an account with given email exists
        const { email, password } = req.body;
        let doc = await Doctor.findOne({ email })
        if (!doc) {
            return res.status(400).json({ error: "Incorrect email or password", success: false });
        }

        // To check if the password matches
        let passcmp = null
        if (typeof password === 'object') {
            passcmp = await bcrypt.compare(password[0], doc.password);
        }
        else {
            passcmp = await bcrypt.compare(password, doc.password);
        }

        if (!passcmp) {
            return res.status(400).json({ error: "Incorrect email or password", success: false });
        }

        // Sending a JWT (JSON web token) as a response
        const data = {
            doc: {
                id: doc.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        return res.json({ authtoken, success: true })

    })






// Fetching user details
router.post('/getdoc', fetchdoctor, async (req, res) => {

    // Fetchuser will get executed and the JWT is checked and user id is returned
    // User id is searched and all details except password is returned

    let docId = req.doctor.id;
    const doc = await Doctor.findById(docId).select("-password");
    res.send(doc);
})


// Fetching all docs
router.get('/getalldoc', async (req, res) => {
    const alldoc = await Doctor.find();
    return res.json(alldoc)
})

// Fetching the doc when docid given in body
router.get('/getdocwithid/:id', async (req, res) => {
    const docId = req.params.id

    try {
        let reqdoc = await Doctor.findById(docId)

        if (!reqdoc) {
            return res.status(404).json({ error: "No doctor with given id found", success: flase })
        }

        return res.json(reqdoc)

    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server error" })
    }

})

// Updating doc details
router.post('/updatedoc', fetchdoctor, async(req,res)=>{

    let docId = req.doctor.id;
    const doc = await Doctor.findById(docId);
    Object.assign(doc, req.body);
    await doc.save();
    res.status(200).json({success:true, doc});
})




// Updating the profile image
// Setting up a folder to store images using multer
const storage = multer.diskStorage({
    destination:(req,res,cb) => {
      cb(null,"public/images")
    },
    filename:(req,file,cb) => {
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
  })
  
const upload = multer({
    storage: storage
  })

router.post('/updatedocimg',upload.single('file'), fetchdoctor,async (req,res)=>{

    let docId = req.doctor.id
    const doc = await Doctor.findById(docId)

    try{
        Object.assign(doc,{profileimg:`images/${req.file.filename}`})
        await doc.save()
        res.status(200).json({success:true})
    } catch(error){
        res.status(500).json({error:"error"})
    }
})


module.exports = router