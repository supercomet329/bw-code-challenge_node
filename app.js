var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var low = require('lowdb');
var path = require('path');
const FileSync = require('lowdb/adapters/FileSync')

var app = express();

const adapter = new FileSync(path.join('data', 'users.json'));

// connect to database - path.join uses parameters to create path to json file
const db = low(adapter);

// set view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// display home page
app.get('/', function(req, res) {
  res.render('login')
});

// display user information
app.get('/profile/:id', function(req, res) {
  var user = db.get('users').find({ id: req.params.id }).value();

  res.render('user', { user : user});
})

app.listen(3000, function() {
  console.log('server on port 3000');
});
