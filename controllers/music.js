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
            .then(music => {
                res.status(200).json(music);
            })
            .catch(next)
    }

    static getAllMusic(req, res, next) {
        Music.find()
            .then(music => {
                res.status(200).json(music);
            })
            .catch(next)
    }

}

module.exports = MusicController;