const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy)
  const collection = await dbService.getCollection('stay')
  if (filterBy.page) var stays = await collection.find(criteria).limit(filterBy.page * 20).toArray()
  else var stays = await collection.find(criteria).toArray()
  console.log(stays.length);
  return stays
}

async function querySearchedStays(country){
  const criteria = _buildCriteria({country})
  const collection = await dbService.getCollection('stay')
  var stays = await collection.find(criteria).limit(5).toArray()
  return stays.map(stay  =>{
    return {country:stay.loc.country , city: stay.loc.city , name:stay.name}
  })
}

async function getById(stayId) {
  const collection = await dbService.getCollection('stay')
  const stay = collection.findOne({ _id: ObjectId(stayId) })
  return stay
}

async function remove(stayId) {
  const collection = await dbService.getCollection('stay')
  await collection.deleteOne({ _id: ObjectId(stayId) })
  return stayId
}

async function add(stay) {
  const collection = await dbService.getCollection('stay')
  const { ops } = await collection.insertOne(stay)
  return ops[0]
}
async function update(stay) {
  var id = ObjectId(stay._id)
  delete stay._id
  const collection = await dbService.getCollection('stay')
  await collection.updateOne({ _id: id }, { $set: { ...stay } })
  stay._id = id
  return stay
}

function _buildCriteria(filterBy) {
  var criteria = {}
  if (filterBy.country) {
    const txtCriteria = { $regex: filterBy.country, $options: 'i' }
    criteria.$or = [{ name: txtCriteria }, { "loc.country": txtCriteria }  , { "loc.city": txtCriteria } ]
  }
  if (filterBy.label) {
    const labelCriteria = { $regex: filterBy.label, $options: 'i' }
    criteria.type = labelCriteria
  }
  if(filterBy.capacity){
    criteria.capacity = {$gt: +filterBy.guestsCount}
  }
  
  return criteria
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  querySearchedStays
}
