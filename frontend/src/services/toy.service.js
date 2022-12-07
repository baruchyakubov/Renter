import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const TOY_LIST = 'toy-list'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle","Outdoor"]

const BASE_URL = `toy/`

function query(filterBy) {
  console.log(filterBy);
  return httpService.get(BASE_URL , filterBy )
}

function save(toy) {
  return toy._id ? _update(toy) : _add(toy)
}

function _add(addedToy) {
  const newToy = _createToy(addedToy.name , addedToy.price )
  return httpService.post(BASE_URL , newToy)
}

function _update(updatedToy) {
  return httpService.put(BASE_URL + updatedToy._id , updatedToy)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

export default {
  query,
  getById,
  save,
  remove,
}




function _createToy(name , price) {
  return {
    name,
    price,
    labels: ["Doll", "Battery Powered", "Baby"],
    createdAt: Date.now(),
    inStock: true
  }
}
