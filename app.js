const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet'); 
const session = require('cookie-session');

const cors = require("cors");

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // Cookie session de 1 hour

require('dotenv').config();


//  MIDDLEWARRE

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Application express
const app = express();

// Protége l'application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP
app.use(helmet()); 

// Ajoute une date d'expiration pour les cookies de sessions et rajoute l'option httpOnly
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

// Autorise certaines requêtes CORS normalement non autorisées
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Evite les problèmes lié au CORS (enlève cette restriction)
app.use(cors());

// Transforme le corps de la requête en Json utilisable pour toute les routes
app.use(bodyParser.json());

// liaison avec le dossier static image avec path qui donne accès au chemin 
app.use('/images', express.static(path.join(__dirname, 'images')));


 // ROUTES

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;