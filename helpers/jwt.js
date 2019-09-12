const jwt = require('jsonwebtoken');

const SECRET_JWT = process.env.SECRET_JWTs;

function generateToken ( payload ) {
    return jwt.sign( payload , SECRET_JWT )
}
function decode ( token ) {
    return jwt.verify( token , SECRET_JWT );
}

module.exports = {
    generateToken,
    decode
}