const { decode } = require('../helpers/jwt');

function authentication ( req , res, next ) {
    try {
        const decoded = decode( req.headers.token ) 
        req.decode = decoded;
        next()
    } catch ( err ) {
        next({ status : 401 , message : "Need Token"})
    }
}

module.exports = authentication;