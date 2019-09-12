if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const enviroment = process.env.NODE_ENV || `Default`;
const app = express();
const DB = process.env.DB || `mongodb://localhost/spotipu`;
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes/index');
const errorHandling = require('./middlewares/errorHandler');

const mongoose = require('mongoose');
mongoose.connect(DB, { useNewUrlParser: true, useFindAndModify: false }, function (err) {
    if (!err) {
        console.log(`connect mas eee`);
    } else {
        console.log(err);
    }
})

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);
app.use(errorHandling);

app.listen(port, function () {
    console.log(`Listening on port :${port}, and running on : ${enviroment} enviroment`);
})