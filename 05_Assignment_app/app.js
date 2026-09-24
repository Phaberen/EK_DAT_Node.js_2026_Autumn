const express = require('express');
const app = express();

// console.log(new Date());
// 2026-09-18T08:03:15.983Z  // UTC

// console.log(Date());
// Fri Sep 18 2026 10:07:01 GMT+0200 (Central European Summer Time)
// Local time

// console.log(Date.now());
// 1789718995151
// Unix Epoch Time
// Seconds since Jan. 1st 1970

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// task create a route that serves /months which returns the current month
app.get('/months/v1', (req, res) => {
    const currentMonth = months[new Date().getMonth()];

    res.send({ data: currentMonth });
});

app.get('/', (req, res) => {
    res.send({ data: "hello from Vercel" });
});


app.listen(8080, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", 8080);
});