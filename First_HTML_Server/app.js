
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let counter = 0;

app.get('/api/counter', (req, res) => {
    res.send({ data: ++counter });

});

app.listen(8080, () => {
    console.log('Server us running on port', 8080);
});