'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = (req, res) => {
  res.json(cats);
};

const getCat = (req, res) => {
  //console.log(req.params);
  const id = req.params.catId;
  // filter matching cat(s) based on id
  const filteredCats = cats.filter(cat => id == cat.id);
  if (filteredCats.length > 0) {
    res.json(filteredCats[0]);
  } else {
    // send response 404 if id not found in array 
    // res.sendStatus(404);
    res.status(404).json({message: 'Cat not found.'})
  }
};

const postCat = (req, res) => {
  res.send('With this endpoint you can add cats');
};

const putCat = (req, res) => {
  res.send('With this endpoint you can modify a cat');
};

const deleteCat = (req, res) => {
  res.send('With this endpoint you can delete a cat');
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;