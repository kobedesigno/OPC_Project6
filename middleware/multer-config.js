const multer = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// Paramètre d'enregistrement grâce a multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Elimination des espaces par des "_"
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); // création du filename entier
    }
});

module.exports = multer({ storage }).single('image'); // single = fichier unique (pas de groupe de fichier)