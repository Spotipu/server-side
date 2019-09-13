function errorHandler( err ,req, res ,next ) {
    console.log(err);
    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';
    if ( err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        status = 401
        message = 'Please login first, you are not logged in yet!'
    } else if (err.name === 'ValidationError') {
        status = 400
        const arr = []
        for ( let key in err.errors ) {
            arr.push( err.errors[key].message )
        }
        message = arr
    }  else if ( err.name === 'MongoError') {
        if ( err.errmsg.includes('duplicate') ) {
            status = 400
            message = 'Email already registered'
        }
    }
    res.status(status).json({status , message})
  
}
module.exports = errorHandler;