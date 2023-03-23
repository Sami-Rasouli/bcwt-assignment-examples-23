'use strict';
const catModel = require('../models/catModel');

const getCatList = async (req, res) => {
  try {
    const cats = await catModel.getAllCats();
    //console.log(cats);
    res.json(cats);
  } catch (error) {
    res.status(500).json({error: 500, message: error.message});
  }
};

const getCat = async (req, res) => {
  //console.log(req.params);
  // convert id value to number
  const catId = Number(req.params.catId);
  // check if number is not an integer
  if (!Number.isInteger(catId)) {
    res.status(400).json({error: 500, message: 'invalid id'});
    return;
  }
  // TODO: wrap to try-catch
  const [cat] = await catModel.getCatById(catId);
  console.log('getCat', cat);
  if (cat) {
    res.json(cat);
  } else {
    // send response 404 if id not found in array 
    // res.sendStatus(404);
    res.status(404).json({message: 'Cat not found.'})
  }
};

const postCat = async (req, res) => {
  console.log('posting a cat', req.body, req.file);
  // add cat details to cats array
  const newCat = req.body;
  newCat.filename = req.file.filename;
  // TODO: add try-catch
  const result = await catModel.insertCat(newCat);
  // send correct response if upload successful
  res.status(201).send('new cat added!');
};


const putCat = async (req, res) => {
  console.log('modifying a cat', req.body);
  // TODO: add try-catch
  const cat = req.body;
  const result = await catModel.modifyCat(cat);
  // send correct response if upload successful
  res.status(200).send('cat modified!');
};

const deleteCat = async (req, res) => {
  console.log('deleting a cat', req.params.catId);
  // TODO: add try-catch
  const result = await catModel.deleteCat(req.params.catId);
  // send correct response if upload successful
  res.status(200).send('cat deleted!');
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;
