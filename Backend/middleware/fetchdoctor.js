const jwt = require('jsonwebtoken')

const JWT_SECRET = "ThitchanaIsACutie"

const fetchdoctor = (req,res,next) =>{
    let success = false

    // Get user details from JWT token
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Authenticate using a valid token", success})
    }

    try{
    const data = jwt.verify(token, JWT_SECRET);
    req.doctor = data.doc;
    next();
    } catch(error){
        return res.status(401).json({error:error})
    }

}


module.exports = fetchdoctor;