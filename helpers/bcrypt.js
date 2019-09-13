const bcrypt = require('bcryptjs');
const SALT_ROUND = Number( process.env.SALT_ROUND )|| 10 ;

function hash ( string ) {
    const salt = bcrypt.genSaltSync( SALT_ROUND )
    return bcrypt.hashSync( string , salt );
}
function compare ( string, hashedString ) {
    return bcrypt.compareSync( string , hashedString )
}
module.exports = {
    hash,
    compare
}