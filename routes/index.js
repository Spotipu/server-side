const router = require('express').Router();
// const musicRouter =  require('./music');
const userRouter =  require('./user');


router.use('/' , userRouter );
// router.use('/music' , musicRouter );


module.exports = router;