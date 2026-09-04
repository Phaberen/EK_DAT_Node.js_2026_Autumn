// require functions as an import

const express = require('express');

// declares the variable app and assigns its value to express();
const app = express();

// const app = require('express')();



app.get('/blablabla', (req, res) => {
    res.send({ data: "They talk a lot but nothing is said"});
}); 
    // -- this is a route handler, it takes a path and a callback function 
    // originally this is a json object
    // express converts it to json and sends it to the client


app.get('/blablabla', (req, res) => {
    res.send({ data2: "2nd They talk a lot but nothing is said"});
}); 

app.get('/myTestEndpoint', (req, res) => {
    res.send({ data: "Greetings, you succeeded reaching my test endpoint"});
})

// makes the app liste on port 8080
app.listen(8080);