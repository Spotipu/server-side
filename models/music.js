const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title can not be empty`]
    },
    artist: {
        type: String,
        required: [true, `Artist can not be empty`]
    },
    url: {
        type: String,
        required: [true, `Music Url can not be empty`]
    },
    UserId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
        timestamps: true,
        versionKey: false
    });


const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;
