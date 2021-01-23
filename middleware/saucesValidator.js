const express = require('express');
const router = express.Router();
const validator = require('validator');

module.exports = (req, res, next) => {
    switch(req.body) {
        case (!validator.isLength(req.body.name, {min: 2, max: 30})) :
            res.writeHead(400, '{"message":"Format de nom requis : 30 caractères maximum, 2 minimum"}', {
                'content-type': 'application/json'
            });
            res.end('Format de nom incorrect');
            break;
        case (!validator.isLength(req.body.manufacturer , {min: 2, max: 100})) :
            res.writeHead(400, '{"message":"Format de manufacturer requis : 100 caractères maximum, 2 minimum"}', {
                'content-type': 'application/json'
            });
            res.end("Format de manufacturer incorrect");
            break;
        case (!validator.isLength(req.body.description, {min: 2, max: 300})) :
            res.writeHead(400, '{"message":"Format de description requis : 300 caractères maximum, 2 minimum"}', {
                'content-type': 'application/json'
            });
            res.end("Format d'email incorrect");
            break;
        case (!validator.isLength(req.body.mainPepper , {min: 2, max: 100})) :
            res.writeHead(400, '{"message":"Format de Main Pepper requis : 100 caractères maximum, 2 minimum"}', {
                'content-type': 'application/json'
            });
            res.end("Format de mainPepper incorrect");
            break;
        case (!validator.isURL(req.body.imageUrl)) :
            res.writeHead(400, '{"message":"Format image Incorrect"}', {
                'content-type': 'application/json'
            });
            res.end("Format image incorrect");
            break;
        case (!validator.isFloat(req.body.heat, { min: 1, max: 10 })) :
            res.writeHead(400, '{"message":"Format heat Incorrect: doit être comprise entre 1 et 10"}', {
                'content-type': 'application/json'
            });
            res.end("Format d'email incorrect");
    }
}
