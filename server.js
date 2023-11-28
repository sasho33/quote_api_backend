const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes).quote;
  console.log(randomQuote);
  res.status(200).send({ quote: randomQuote });
});

app.listen(PORT, (req, res, next) => {
  console.log(`listening on port ${PORT}`);
});
