const router = require('express').Router();
const MusicController = require('../controllers/music');
const authentication = require('../middlewares/authentication');
const { AuthOwner } = require('../middlewares/authorization');
const music = require('../helpers/music');

router.use(authentication);
router.post('/upload', music.multer.single('file'), music.sendUploadToGCS, MusicController.upload);
router.get('/', MusicController.getAllMusic);
router.get('/mymusic', MusicController.getMyMusic);
router.get('/favorites', MusicController.getMyFavorite);
router.patch('/favorite/:id', MusicController.addFavorite);
router.patch('/unfavorite/:id', MusicController.unFavorite);
router.delete('/:id', AuthOwner, MusicController.delete);

module.exports = router;    