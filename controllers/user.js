const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt');
class UserController {
    static login ( req , res ,next ){
        const { email , password } = req.body;
        User.findOne({ email })
        .then ( found => {
            if ( found ) {
                if ( compare( password , found.password ) ) {
                    const token = generateToken({
                        id : found._id,
                        email : found.email
                    })
                    res.status(200).json({ status: 200 , token })
                } else {
                    next({ status : 400 , message : "Invalid Email/Password"})
                }
            } else {
                next({ status : 400 , message : "Invalid Email/Password"})
            }
        })
        .catch( next )
    }
    static register ( req, res ,next ) {
        const { email, password } = req.body;
        User.create({ email , password })
        .then ( createdUser => {
            res.status(200).json({ status: 200 , createdUser });
        })
        .catch( next );
    }
}

module.exports = UserController;