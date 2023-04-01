'use strict';
const express = require('express');
const multer = require('multer');
const router = express.Router();
const {body} = require('express-validator');
const catController = require('../controllers/catController');

const fileFilter = (req, file, cb) => { 
    const allowedType = ['image/jpeg', 'image/png'];
    if (allowedType.includes(file.mimetype)){
        //accept file
        cb(null, true)
    }else{
        //reject file
        cb(null, false);
    }
};
const upload = multer({dest: 'uploads/', fileFilter});


//ROOT of cat endpoing (e.g. http://localhost:3000/cat)
router.route('/')
    .get(catController.getCatList)
    .post(
        upload.single('cat'),
        body('name').isAlphanumeric().isLength({min: 1, max: 200}).escape().trim(),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 50}),
        body('owner').isInt({min: 1}),
        catController.postCat
    )
    .put(
        upload.single('cat'),
        body('name').isAlphanumeric().isLength({min: 1, max: 200}).escape().trim(),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 50}),
        body('owner').isInt({min: 1}),
        catController.putCat)
//All /cat/:id endpoints
router
    .route('/:id')
    .get(catController.getCat)
    .delete(catController.deleteCat)

module.exports = router;
