const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

module.exports = {
  query,
  getById,
  remove,
  save,
};

//Get all Toys with filtering:
async function query(filterBy) {
  const criteria = _buildCriteria(filterBy);
  console.log(criteria);
  try {
    const collection = await dbService.getCollection('toys');
    const toys = await collection.find(criteria).toArray();
    return toys;
  } catch (err) {
    logger.error('cannot find toys', err);
    throw err;
  }
}

// Get Toy by Id
async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toys');
    const toy = await collection.findOne({ _id: ObjectId(toyId) });
    return toy;
  } catch (err) {
    logger.error('cannot find toys', err);
    throw err;
  }
}

// Add new Toy
async function save(toy) {
  try {
    var newToy;
    const toyToSave = {
      _id: ObjectId(toy._id),
      name: toy.name,
      price: toy.price,
      type: toy.type,
      createdAt: toy.createdAt,
      inStock: toy.inStock,
      img: toy.img,
    };
    const collection = await dbService.getCollection('toys');
    if (toy._id) {
      console.log('toy', toy);
      newToy = await collection.updateOne({ _id: toyToSave._id },{ $set: toyToSave });
    } else {
      newToy = await collection.insert(toy);
    }
    return newToy;
  } catch (err) {
    logger.error('cannot save toys', err);
    throw err;
  }
}

// Delete a Toy
async function remove(toyId) {
  try {
    const collection = await dbService.getCollection('toys');
    await collection.deleteOne({ _id: ObjectId(toyId) });
  } catch (err) {
    logger.error('cannot remove toys', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  var criteria;
  var criterias = [];
  if (filterBy.name !== '') {
    const name = { name: { $regex: filterBy.name, $options: 'i' } };
    criterias.push(name);
  }
  if (filterBy.isInStock !== 'all') {
    var inStock;
    if (filterBy.isInStock === 'true') {
      inStock = { inStock: Boolean(filterBy.isInStock) };
    } else {
      inStock = { inStock: Boolean(0) };
    }
    criterias.push(inStock);
  }
  if (filterBy.type !== 'all') {
    const type = { type: { $regex: filterBy.type, $options: 'i' } };
    criterias.push(type);
  }
  criteria = criterias.length === 0 ? {} : { $and: criterias };
  console.log('criteria', criteria);
  return criteria;
}

// function _makeId(length = 5) {
//   var txt = '';
//   var possible =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   for (var i = 0; i < length; i++) {
//     txt += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return txt;
// }

// function _saveToysToFile() {
//   return new Promise((resolve, reject) => {
//     const fs = require('fs');
//     fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });
// }
