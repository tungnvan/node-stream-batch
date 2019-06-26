const express = require('express');
const fs = require('fs');
const {lucBatFormat} = require('./luc-bat-format');

const HOST = 'localhost';
const PORT = '5000';

const app = express();

app.get('/truyen-kieu', (req, res) => {
    fs.readFile('./truyen-kieu.txt', (err, data) => {
        if (err) {
            res.write(err.message);
        } else {
            res.write(lucBatFormat(data));
        }
        res.end();
    });
});

app.get('/big-file', () => {

});

app.listen(PORT, HOST, () => {console.log(`Server is listening on ${HOST}:${PORT}`)});