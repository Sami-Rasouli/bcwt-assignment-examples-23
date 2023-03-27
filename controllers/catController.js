'use strict';
const catModel = require('../models/catModel');

const getCatList = async (req, res) => {
  try {
    let cats = await catModel.getAllCats();
    //console.log(cats);
    // convert ISQ date to date only
    // should this be done on the front-end side??
    cats = cats.map(cat => {
      cat.birthdate = cat.birthdate.toISOString().split('T')[0];
      return cat;
    });
    res.json(cats);
  } catch (error) {
    res.status(500).json({error: 500, message: error.message});
  }
};

const getCat = async (req, res) => {
  //console.log(req.params);
  // convert id value to number
  const catId = Number(req.params.id);
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
  try{
    const newCat = req.body;
    newCat.filename = req.file.filename;
    // TODO: add try-catch
    const result = await catModel.insertCat(newCat);
    // send correct response if upload successful
    res.status(201).json({message: 'new cat added!'});
  }catch(error){
    res.status(500).json({error: 500, message: error.message});
  }
};


const putCat = async (req, res) => {
  console.log('modifying a cat', req.body);
  // TODO: add try-catch
  try{
    const cat = req.body;
    const result = await catModel.modifyCat(cat);
    res.status(200).json('cat modified!');
      // send correct response if upload successful
  }catch(error){
    res.status(500).json({error: 500, message: error.message});
  }
};

const deleteCat = async (req, res) => {
  console.log('deleting a cat', req.params.id);
  // TODO: add try-catch
  try{
    const result = await catModel.deleteCat(req.params.id);
    // send correct response if upload successful
    res.status(200).json('cat deleted!');
  }catch(error){
    res.status(500).json({error: 500, message: error.message});
  }
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;
