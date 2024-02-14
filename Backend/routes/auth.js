const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const multer = require('multer')
const path = require('path')

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// Secret key used in verifying signature
const JWT_SECRET = "ThitchanaIsACutie"








// To create a new user ie register a new user in the database [No login required]
router.post('/createuser',

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
            let success = false;
            return res.status(400).json({ errors: errors.array(), success });
        }

        // To check if the account already exists, check for duplicate emails
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ error: "Email already exists", success });
        }

        // Hashing and adding Salt to the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create user if everything is perfect
        success = true;
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        // Sending a JWT (JSON web token) as response to the user
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        return res.json({ authToken, success })
    })




// For authenticating ie logging in an existing user [No login required]
router.post('/login',
    // For express validator
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password should not be empty').exists()
    ],
    async (req, res) => {
        try {
            // To check for entry value errors using express validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), success: false });
            }

            // To check if an account with given email exists
            const { email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "Incorrect email or password", success: false });
            }

            // To check if the password matches
            let passcmp = null
            if (typeof password === 'object') {
                passcmp = await bcrypt.compare(password[0], user.password);
            }
            else {
                passcmp = await bcrypt.compare(password, user.password);
            }

            if (!passcmp) {
                return res.status(400).json({ error: "Incorrect email or password", success: false });
            }

            const data = {
                user: {
                    id: user.id
                }
            };

            // Sending a JWT (JSON web token) as a response
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            return res.json({ authtoken, success });
        } catch (error) {
            console.error("Login error:", error);
            success = false;
            return res.status(500).json({ error: "Internal server error", success });
        }
    }
);







// Fetching user details
router.post('/getuser', fetchuser, async (req, res) => {

    // Fetchuser will get executed and the JWT is checked and user id is returned
    // User id is searched and all details except password is returned
    let success = true
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
})


// Updating user details
router.post('/updateuser', fetchuser, async(req,res)=>{

    let userId = req.user.id;
    const user = await User.findById(userId);
    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({success:true, user});
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

router.post('/updateuserimg',upload.single('file'), fetchuser,async (req,res)=>{

    let userId = req.user.id
    const user = await User.findById(userId)

    try{
        Object.assign(user,{profileimg:`images/${req.file.filename}`})
        await user.save()
        res.status(200).json({success:true})
    } catch(error){
        res.status(500).json({error:"error"})
    }
})


module.exports = router