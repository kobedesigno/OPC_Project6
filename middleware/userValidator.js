const validator = require('validator');

module.exports = (req, res, next) => {
    if (validator.isStrongPassword(req.body.password) === false) {
        res.writeHead(400, '{"message":"Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule, 1 symbol, un chiffre"}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};

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

// const constraints = {
//     email: {
//         email: true,
//         presence: true,
//         format: {
//             pattern: /@/g,
//             message: function(value, attribute, validatorOptions, attributes, globalOptions) {
//                 return validate.format("^%{email} n'est pas un email valide", {
//                     email: value
//                 });
//             }
//         }
//     },
//     password: {
//         presence: true,
//         length: {
//             minimum: 6,
//             maximum : 20,
//             message: "6 caractères minimum et 20 maximum. Doit contenir au moins une majuscule, une minuscule et un chiffre"
//         },
//         format: {
//             pattern: /@/g,
//             message: function(value, attribute, validatorOptions, attributes, globalOptions) {
//                 return validate.format("^%{email} n'est pas un email valide", {
//                     email: value
//                 });
//             }
//         },
//     }
// }