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

// callback function: a function reference provided as an argument with the possibility, 
// perhaps (of being called later). The function is not called immediately,
//  but rather passed as a reference to be invoked at a later time. In this case, the callback function is executed when a GET request is made to the specified route.

// functions as first-class citizens 
// = I can do with functions what i can do with other data types

// these operations typically include assigning functions to variables, 
// passing them as arguments to other functions, and returning them from functions.

// the whole thing = route



// How can i send data in a GET request
// path variable: /users/1
// query paramters: ?userId=1&likespProgramming=true

// create a /beers route
app.get('/beers/:beerType/:amount', (req, res) => {
    console.log(req.params);
    res.send({ data: `you ordered ${req.params.amount} of ${req.params.beerType}`});
})




// /bars/forgottenItems?myGirlfriend=mygirlfriend&myMom=myMom&myHorn=myHorn
app.get('/bars/:forgottenItems', (req, res) => {
    res.send({ data: `You forgot your ${req.query.forgottenItem} at the bar`});

});


const beers = {
    lager: 'lager',
    ale: 'ale',
    stout: 'stout',
    pilsner: 'pilsner'
}

const forgottenItem = {
    myGirlfriend: 'my girlfriend',
    myMom: 'my Mom',
    myHorn: 'my horn',
}




// makes the app liste on port 8080
app.listen(8080);