const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MaskData = require('maskdata');

const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 0,
    unmaskedEndCharactersAfterAt: 257, // Give a number which is more than the characters after @
    maskAtTheRate: false
};

exports.signup = (req, res, next) => { 
    // maskage de l'email avant le @
    let maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
    // hashage du mot de passe 
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
          // Création d'un user apres maskage et hashage
          const user = new User({
            email: maskedEmail,
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(501).json({ error }));
};

exports.login = (req, res, next) => {
  let maskedEmail = MaskData.maskEmail2(req.body.email, emailMask2Options);
    User.findOne({ email: maskedEmail })
      .then(user => {
        // si l'user n'est pas trouvé dans la BDD
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // si user trouvé, on compare le hash des mdp
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              // Les hash ne correspondent pas
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // hash correspondent, Création d'un token d'idenfication, d'une durée de 24h
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
