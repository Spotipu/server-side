//sementara
function authorization ( req, res ,next ) {
    if( req.decode ){
        next()
    } else {
        next({ status : 401 , message : "Not Authorized" })
    }
}

module.exports = authorization;