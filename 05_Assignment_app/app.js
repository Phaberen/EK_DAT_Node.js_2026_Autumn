  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
  });

  app.get('/api/late/:date', (req, res) => {
      const classTime = new Date(req.params.date + 'T08:30:00+02:00');
      const milliseconds = (new Date() - classTime);

      res.send({
          data: {
              months: Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 30),
              weeks: Math.floor(milliseconds / 1000 / 60 / 60 / 24 / 7),
              days: Math.floor(milliseconds / 1000 / 60 / 60 / 24),
              hours: Math.floor(milliseconds / 1000 / 60 / 60),
              minutes: Math.floor(milliseconds / 1000 / 60),
              milliseconds: milliseconds
          }
      });
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
  });

  module.exports = app;