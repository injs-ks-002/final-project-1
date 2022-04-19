var jwt = require('jsonwebtoken');
const privateKey = 'varchar'

function generateToken(payload) {
    return jwt.sign( payload, privateKey, {
        algorithm: 'HS256',
        expiresIn: "1h"
   });
}

const verify = async (req, res, next) => {
    const token = req.headers["x-access-token"]
    jwt.verify(token, privateKey, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                "message": err
            })
        }
        req.id = decoded.id
        next()
    })
}

module.exports = {
    generateToken, verify
}