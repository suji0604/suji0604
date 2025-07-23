const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

// Dummy credentials
const USERNAME = 'user';
const PASSWORD = 'pass';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/storymap');
  } else {
    res.send('Invalid credentials <a href="/login.html">Try again</a>');
  }
});

app.get('/storymap', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(__dirname + '/storymap.html');
  } else {
    res.redirect('/login.html');
  }
});

app.use(express.static(__dirname)); // to serve HTML/CSS/JS files

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
