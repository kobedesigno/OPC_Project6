const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // On enlève le champ id du req.body car il va être généré par le frontend n'est pas le bon, il doit être geré par mangoDB
    delete sauceObject._id;
    // Nouvelle instance du model Sauce contenant toutes les infos
    const sauce = new Sauce({
      ...sauceObject,
      // http(s)://localhost:3000/images/nomdel'image (url dynamique)
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // si changement de req.file (changement d'image)
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }; // si pas de req.file (pas changement d'image)
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; // récupération du nom du fichier
        fs.unlink(`images/${filename}`, () => { // unlink = supprime le fichier
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          console.log(sauce);
          res.status(200).json(sauce)
        })
        .catch(error => res.status(404).json({ error }));
    
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {  // Function that allows users to like / dislike / un-like / un-dislike sauces
    switch (req.body.like) {  // 
      case 0: // Delete like or dislike of the sauce + put the like or the dislike to 0 + remove userId of the dislike or like array
        Sauce.findOne({_id: req.params.id})
          .then((sauce) => {
            if (sauce.usersDisliked.includes(req.body.userId)) {
              Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }})
              .then(() => res.status(200).json({ message: 'Dislike supprimé + id enlevé !'}))
              .catch(error => res.status(400).json({ error }));
            } else if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }})
            .then(() => res.status(200).json({ message: 'like supprimé + id enlevé !'}))
            .catch(error => res.status(400).json({ error }));
            }
          })
          .catch((error) => res.status(500).json({ error }));
        break;
      case 1 : // user liked the sauce + push idUser in the disliked array
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: {usersLiked: req.body.userId }})
            .then(() => res.status(200).json({ message: 'Like ajouté !'}))
            .catch(error => res.status(400).json({ error }));

        break;
      case -1 :  // user Disliked the sauce + push idUser in the disliked array
          Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: +1 }, $push: { usersDisliked: req.body.userId }})
          .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
          .catch(error => res.status(400).json({ error }));
        break;
        
      default: // 
        throw { error: "Erreur, Recommencez !" };
    }
};