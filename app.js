const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

let app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req,res) => {
  res.render('form');
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  let results = {};
  results.name = req.body.name;
  results.email = req.body.email;
  results.dob = req.body.dob;
  results.position = req.body.position;
  results.password = req.body.password;

  res.render('form', {results: results});
})

app.listen(3000, () => {
  console.log('server running on 3000.');
})
