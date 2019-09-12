'use strict'
require('dotenv').config();
const path = require('path')
const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET;

const storage = new Storage({
    projectId: process.env.CLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
});
const bucket = storage.bucket(CLOUD_BUCKET)
const url = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
};
const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });
    stream.on('error', (err) => {
        console.log('test error')
        req.file.cloudStorageError = err
        next(err);
    });
    stream.on('finish', () => {
        console.log('test')
        req.file.cloudStorageObject = gcsname
        file.makePublic().then(() => {
            req.file.url = url(gcsname)
            next();
        });
    });
    stream.end(req.file.buffer);
}
const Multer = require('multer'),
    multer = Multer({
        fileFilter: function (req, file, next) {
            if ((path.extname(file.originalname) === '.mp3') || (path.extname(file.originalname) === '.wav') || (path.extname(file.originalname) === '.m4a') || (path.extname(file.originalname) === '.aac')) {
                next(null, true);
            } else {
                next({ status : 400 , message : "Invalid Audio Type"});
            }
        },
        storage: Multer.MemoryStorage,
        limits: {
            fileSize: 10485760
        }
    });

module.exports = {
    url,
    sendUploadToGCS,
    multer
}