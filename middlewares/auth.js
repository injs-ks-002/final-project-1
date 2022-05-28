const jwt = require('jsonwebtoken')
var privateKey = 'KuyMabar123'

const verify = async (req, res, next) => {
    const token = req.headers["auth"]
    jwt.verify(token, privateKey, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                err: err
            })
        }
        req.id = decoded.id
        next()
    })
}

const generateToken = (payload) => {
    jwt.sign(payload, privateKey, {expiresIn: '1h'}, function(err, token) {
        if(!err) {
            return token
        }
    })
}

module.exports = {
    verify,
    generateToken,
    privateKey
}