// const express = require('express');
const toyService = require('./toy.service.js');
const logger = require('../../services/logger.service')

module.exports = {
  getToys,
  getToyById,
  saveToy,
  removeToy,
};

// Get list Of Toys:

async function getToys(req, res) {
  try {
    const filter = JSON.parse(req.query.filterBy)
    const toys = await toyService.query(filter);
    res.json(toys);
    // res.send(toys);
    console.log('toys in toy.controll:',toys);
    return toys;
  } catch (err) {
    logger.error('Cannot get toys', err);
    res.status(500).send({ err: 'Failed to get toys' });
  }
}

// Get a single toy by id
async function getToyById(req, res) {
  try {
    const toyId = req.params.id;
    const toy = await toyService.getById(toyId);
    res.json(toy);
    // res.send(toy);
  } catch {
    logger.error('Cannot get toy', err);
    res.status(500).send({ err: 'Failed to get toy' });
  }
}

// Add a new Toy
async function saveToy(req, res) {
  try {
    const toy = req.body;
    const savedToy = await toyService.save(toy);
    res.json(savedToy);
  } catch {
    logger.error('Failed to add toy', err);
    res.status(500).send({ err: 'Failed to add toy' });
  }
}

// remove Toy by id
async function removeToy(req, res) {
  try {
    const toyId = req.params.id;
    await toyService.remove(toyId)
    res.send({ msg: 'Deleted successfully' })
  } catch {
    logger.error('Failed to add toy', err);
    res.status(500).send({ err: 'Failed to add toy' });
  }
}

// Get list Of Toys with filter:
// router.get('/', (req, res) => {
//     var visitCount = req.cookies.visitCount || 0;
//     visitCount++;
//     res.cookie('visitCount', visitCount, {maxAge: 1000 * 60 * 60 * 24})

//     const filterBy = {
//         txt: req.query.txt || '',
//         pageIdx: +req.query.pageIdx || 0 /////////////////////
//     }
//     bugService.query(filterBy)
//         .then(bugs => {
//             res.json(bugs)
//         })
// })
