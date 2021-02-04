const jwt = require('jsonwebtoken');

// Authentification des tokens envoyés par le frontend
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // vérification que l'user id du token correspond à celui de la requête
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' })
    }
}