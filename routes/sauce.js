const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const saucesValidator = require('../middleware/saucesValidator');

router.post('/:id/like', auth, saucesCtrl.likeSauce);
router.post('/',/*saucesValidator,*/ auth, multer, saucesCtrl.createSauce);
router.put('/:id',/*saucesValidator,*/ auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);


module.exports = router;