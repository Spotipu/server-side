const Music = require('../models/music');

class MusicController {

    static upload(req, res, next) {
        const { url } = req.file
        const { title, artist } = req.body;
        const { id } = req.decode;
        const newMusic = {
            title,
            artist,
            url,
            UserId: id
        }
        Music.create(newMusic)
        .then(music => {
            res.status(201).json( music );
        })
        .catch(next)
    }

    static getMyMusic(req, res, next) {
        const { id } = req.decode;
        Music.find({
            UserId: id
        })
            .populate('UserId')
            .then(music => {
                if (music.length !== 0) {
                    res.status(200).json(music);
                } else {
                    res.status(404).json({ message: 'You have not upload any music yet' });
                }
            })
            .catch(next)
    }

    static getMyFavorite(req, res, next) {
        const { id } = req.decode;
        Music.find({
            favorites: id
        })
            .populate('UserId')
            .then(music => {
                res.status(200).json(music);
            })
            .catch(next)
    }

    static getAllMusic(req, res, next) {
        Music.find()
            .populate('UserId')
            .then(music => {
                res.status(200).json(music);
            })
            .catch(next)
    }

    static addFavorite(req, res, next) {
        const _id = req.params.id;
        const { id } = req.decode;
        Music.findByIdAndUpdate({
            _id
        }, {
                $push: {
                    favorites: id
                }
            }, {
                new: true
            })
            .then(music => {
                res.status(200).json({
                    message: `Success added music to your favorite`
                });
            })
            .catch(next)
    }

    static unFavorite(req, res, next) {
        const _id = req.params.id;
        const { id } = req.decode;
        Music.findByIdAndUpdate({
            _id
        }, {
                $pull: {
                    favorites: id
                }
            }, {
                new: true
            })
            .then(music => {
                res.status(200).json({
                    message: `Success delete music from your favorite`
                });
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        Music.findByIdAndDelete({
            _id
        })
            .then(() => {
                res.status(200).json({ message: `Success delete music` });
            })
            .catch(next)
    }

}

module.exports = MusicController;