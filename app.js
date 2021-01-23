const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet'); // protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP
const session = require('cookie-session'); // options de cookie suivantes pour accroître la sécurité
const expressSession = require('express-session');

const cors = require("cors");

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');

// Middleware
mongoose.connect('mongodb+srv://kobe:opc6@opcprojet6.xqee8.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(helmet()); 

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // Cookie session de 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'http://localhost:3000',
            expires: expiryDate
          }
  })
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use(expressSession({secret: 'max', saveUninitialized: true, resave: true}));


 // Routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;