import { httpService } from './http.service';
const TOY_URL = 'toy/';
var gFilterBy = { pageIdx: 0 };

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmpty,
  setFilter,
  nextPage,
  prevPage,
};

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function nextPage() {
  gFilterBy.pageIdx++;
}

function prevPage() {
  if (gFilterBy.pageIdx < 1) return;
  gFilterBy.pageIdx--;
}

// function query(filterBy) {
async function query() {
  try {
    const toys = await httpService.get(TOY_URL);
    return toys;
  } catch (err) {
    console.log('error in toy service fronten: ', err);
  }
}

async function getById(id) {
  try {
    const toy = await httpService.get(TOY_URL + id);
    console.log('toy from toyService frontend:', toy);
    return toy;
  } catch (err) {
    console.log('getById in toy service fronten: ', err);
  }
}

async function remove(id) {
  try {
    const toy = await httpService.delete(TOY_URL + id);
    console.log('toy from toyService frontend:', toy);
    return toy;
  } catch (err) {
    console.log('deleted toy service fronten: ', err);
  }
}

async function save(toy) {
  var savedToy;
  try {
    if (toy._id) {
      savedToy = await httpService.put(TOY_URL + toy._id, toy);
      console.log('savedToy from save toy service', savedToy);
    } else {
      console.log('got toy from store', toy);
      savedToy = await httpService.post(TOY_URL, toy);
      console.log('update from save toy service', savedToy);
    }
    console.log('before return in save service', savedToy);
    return savedToy;
  } catch (err) {
    console.log('saved toy from service frontend: ', err);
  }
}

function getEmpty(name = '', price = 100, type = 'Funny', img = 'toy-11.jpg') {
  return {
    name,
    price,
    type,
    createdAt: Date.now(),
    inStock: true,
    img,
  };
}

// Get toys with filter:

// function query(filterBy = {txt: '', action: 'all'}) {
//     const toys = storageService.query(KEY)
//     .then((toys) => {
//         if (!toys || !toys.length) toys = gToys
//         if (filterBy.action === 'done') {
//             toys = toys.filter(toy => toy.completed)
//         } else if (filterBy.action === 'active') {
//             toys = toys.filter(toy => !toy.completed)
//         }
//         const regex = new RegExp(filterBy.txt, 'i');
//         toys = toys.filter((toy) => regex.test(toy.txt));
//         return toys;
//     })
//     return toys;
// }
