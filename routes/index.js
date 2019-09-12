const router = require('express').Router();
const musicRouter =  require('./music');
// const musicRouter =  require('./user');

// router.use('/user' , userRouter );
router.use('/music' , musicRouter );

module.exports = router;