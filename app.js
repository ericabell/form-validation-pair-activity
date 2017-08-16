const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const expressValidator = require('express-validator');

let app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false}));

app.use(expressValidator());

app.get('/', (req,res) => {
  res.render('form');
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  req.checkBody("name", "Name was blank.").notEmpty();
  req.assert("name", "Name should be between 1 and 10 chars").len(1,10);
  req.checkBody("email", "Email was blank.").notEmpty();
  req.assert("email", "Email should be a valid email").isEmail();
  req.checkBody("dob", "Dob was blank.").notEmpty();
  req.checkBody("dob", "Dob between 1900 and 2017").isAfter('1900-1-1');
  req.checkBody("dob", "Dob between 1900 and 2017").isBefore('2017-9-1');
  req.checkBody("position", "Need to select position").notEmpty();
  req.checkBody("password", "Pass was blank").notEmpty();
  req.checkBody("password", "Pass at least 8 chars long").isLength({min: 8, max: undefined});

  let results = {};
  results.name = req.body.name;
  results.email = req.body.email;
  results.dob = req.body.dob;
  results.position = req.body.position;
  results.password = req.body.password;

  let errors = req.validationErrors();
  console.log(errors);

  if( errors ){
    res.render('form', {errors: errors});
  } else {
    res.render('form', {results: results});
  }

})

app.listen(3000, () => {
  console.log('server running on 3000.');
})
