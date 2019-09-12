const Music = require('../models/music');

module.exports = {

    AuthOwner(req, res, next) {
        const { id } = req.decode;
        const _id = req.params.id;
        Music.findById(_id)
            .then(music => {
                if (music.UserId == id) {
                    next();
                } else {
                    next({ status: 403, message: `You dont have access to delete this music` });
                }
            })
            .catch(next)
    },

};
