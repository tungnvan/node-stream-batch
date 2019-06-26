const express = require('express');
const fs = require('fs');
const {Transform} = require('stream');
const {lucBatFormat} = require('./luc-bat-format');

const HOST = 'localhost';
const PORT = '5000';

const app = express();

const upperCaseTr = new Transform({
    transform(chunk, encoding, callback) {
        this.push(lucBatFormat(chunk));
        callback();
    }
});

app.get('/truyen-kieu', (req, res) => {
    const readable_stream = fs.createReadStream('./truyen-kieu.txt');
    readable_stream.pipe(upperCaseTr).pipe(res);
});

app.get('/big-file', () => {

});

app.listen(PORT, HOST, () => {console.log(`Server is listening on ${HOST}:${PORT}`)});