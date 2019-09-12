const router = require('express').Router();
const MusicController = require('../controllers/music');
const authentication = require('../middlewares/authentication');
const music = require('../helpers/music');

router.use(authentication);
router.post('/upload', music.multer.single('file'), music.sendUploadToGCS, MusicController.upload);
router.get('/', MusicController.getAllMusic);
router.get('/mymusic', MusicController.getMyMusic);
router.get('/favorite', MusicController.getMyFavorite);

module.exports = router;    