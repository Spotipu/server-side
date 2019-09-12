const mongoose = require('mongoose');
const { hash } = require('../helpers/bcrypt')
const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: [true , "Email is required"],
        validate : [{
            validator: function emailFormat(email) {
                const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return format.test(email);
            },
            message: function ( props ) { 
                return `Invalid email format`
            }
        }, 
        {
            validator: function emailUnique(email) {
                return User.findOne({ email: this.email })
                    .then(function (user) {
                        if (user) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                    .catch(function (err) {
                        return false;
                    })
            },
            message: props => `Email ${props.value} already registered by another user`
        }]
    },
    password : {
        type : String,
        required: [true , "Password is required"]
    },
},{
    timestamps: true,
    versionKey: false
});

userSchema.pre('save' , function ( next ) {
    this.password = hash( this.password )
    next();
})

const User = mongoose.model( 'User' , userSchema );
module.exports = User;