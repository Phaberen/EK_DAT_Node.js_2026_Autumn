
// declares and assigns const variable express to the import of express ()
const express = require('express');

// declares const app and assingns its value to the express import variable const express
const app = express();

// 
app.use(express.json());


const days = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];


console.log(new Date());
// 2026-09-18T08:03:31.726Z // UTC

console.log(Date());
// Fri Sep 18 2026 10:09:07 GMT+0200 (Central European Summer Time)

console.log(Date.now());
// 1789719060516
// Unix Epoch Time
// Seconds since Jan. 1st 1970

// task create a route that serves /months which returns the current month



app.get("/months", (req, res) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 
        'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentMonth = months [new Date().getMonth()];

    res.send({ data: currentMonth });

   // res.send({ data: (Date.getMonth) });
   // console.log("user accessed endpoint");
});

app.get("/months/v2", (req, res) => {

    const currentMonth = new Date().toLocaleDateString('da-dk', {month: 'long', day: '2-digit'});

    res.send({ data: currentMonth })
});


// below method takes the array of days named days
// 
app.get("/days/v1", (req, res) => {
    const currentDay = days[new Date().getDay()];

    res.send({ data: currentDay })
});

app.get("days/v2", (req, res) => {
    const currentday = new Date().toLocaleDateString("en-uk", { weekday: 'long'});

    res.send({ data: currentday })
})

const sample = new Date();
  console.log(sample.getMonth());

app.listen(8080, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port, 8080");
});