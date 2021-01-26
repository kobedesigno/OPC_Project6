const validator = require('validator');

// module.exports = (req, res, next) => {
//     if (validator.isStrongPassword(req.body.password)) {
//         res.writeHead(400, '{"message":"Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule, 1 symbol, un chiffre"}', {
//             'content-type': 'application/json'
//         });
//         res.end('Format de mot de passe incorrect');
//     } else {
//         next();
//     }
// };

module.exports = (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
        res.writeHead(400, '{"message":"Format email Incorrect"}', {
            'content-type': 'application/json'
        });
        res.end("Format d'email incorrect");
    } else {
        next();
        console.log(validator.isStrongPassword(req.body.password))
    }
};
