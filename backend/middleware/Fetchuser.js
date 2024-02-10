const jwt = require('jsonwebtoken')
const SECRETKEY_SIGNIN = "nikhilkumaristhemostsuccessfulperson"
Fetchuser = (req, res, next)=>{
    // GET the user from the jwt token
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token!"})
    }
    try {
        const data = jwt.verify(token, SECRETKEY_SIGNIN)
        req.user = data.user;
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token!"})
    }
    next()
}

module.exports = Fetchuser
