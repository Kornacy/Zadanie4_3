'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// define endpoint for exercise 1 here
let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [

  {

    'joke': 'Dlaczego komputer poszedł do lekarza?',

    'response': 'Bo złapał wirusa!'

  },

  {

    'joke': 'Dlaczego komputer nie może być głodny?',

    'response': 'Bo ma pełen dysk!'

  },

  {

    'joke': 'Co mówi jeden bit do drugiego?',

    'response': '„Trzymaj się, zaraz się przestawiamy!”'

  }

];

let lameJoke = [

  {

    'joke': 'Dlaczego programiści preferują noc?',

    'response': 'Bo w nocy jest mniej bugów do łapania!'

  },

  {

    'joke': 'Jak nazywa się bardzo szybki programista?',

    'response': 'Błyskawiczny kompilator!'

  }

];
app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});
app.get('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;
  if (!categories.includes(category)) {
    return res.status(404).json({ error: 'No joke for category ' + category });
  }
  let jokes;
  if (category === 'funnyJoke') {
    jokes = funnyJoke;
  } else if (category === 'lameJoke') {
    jokes = lameJoke;
  }
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});
app.get('/jokebook/random', (req, res) => {
  const allJokes = funnyJoke.concat(lameJoke);
  const randomIndex = Math.floor(Math.random() * allJokes.length);
  res.json(allJokes[randomIndex]);
});

app.post('/jokebook/joke/:category', express.json(), (req, res) => {
  const category = req.params.category;
  const { joke, response } = req.body;
  if (!joke || !response) {
    return res.status(400).json({ error: 'Joke and response are required' });
  }
  if (!categories.includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  const newJoke = { joke, response };
  if (category === 'funnyJoke') {
    funnyJoke.push(newJoke);
  } else if (category === 'lameJoke') {
    lameJoke.push(newJoke);
  }
  res.status(201).json({ message: 'Joke added successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.use(express.static('public'));