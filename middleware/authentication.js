var jwt = require('jsonwebtoken');
const privateKey = 'varchar'

function generateToken(payload) {
    return jwt.sign( payload, privateKey, {
        algorithm: 'HS256',
        expiresIn: "1h"
   });
}
module.exports = {
    generateToken
}