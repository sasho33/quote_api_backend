const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.status(200).send({ quote: randomQuote });
});

app.get('/api/quotes/', (req, res, next) => {
  const author = req.query.person;
  if (!author) {
    res.send({ quotes });
  } else if (author) {
    const quotesByAuthor = quotes.filter((quote) => quote.person === author);
    res.send({ quotes: quotesByAuthor });
  }
});

app.post('/api/quotes/', (req, res, next) => {
  const person = req.query.person;
  const quote = req.query.quote;
  if (person && quote) {
    const newQuote = {};
    newQuote.person = person;
    newQuote.quote = quote;
    quotes.push(newQuote);
    console.log(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send('Unable to add new quote, check that author and quote exist');
  }
});

app.listen(PORT, (req, res, next) => {
  console.log(`listening on port ${PORT}`);
});
