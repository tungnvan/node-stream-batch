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

app.get('/big-file', (req, res) => {
    const readable_stream = fs.createReadStream('./1gb.test');
    const writable_stream = fs.createWriteStream('/dev/null');
    const start_time = new Date();
    readable_stream.on('close', () => {
        const end_time = new Date();
        console.log('Time elapsed (ms): ', end_time - start_time);
        res.end('Done');
    });
    readable_stream.pipe(writable_stream);
});

app.listen(PORT, HOST, () => {console.log(`Server is listening on ${HOST}:${PORT}`)});