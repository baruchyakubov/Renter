const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(loggedInUserId) {
  const collection = await dbService.getCollection('order')
  console.log(loggedInUserId);
  var orders = await collection.find({ hostId : { $eq : loggedInUserId } }).toArray()
  return orders
}

async function add(order) {
  const collection = await dbService.getCollection('order')
  const { ops } = await collection.insertOne(order)
  return ops[0]
}

async function update(order) {
  var id = ObjectId(order._id)
  delete order._id
  const collection = await dbService.getCollection('order')
  await collection.updateOne({ _id: id }, { $set: { ...order } })
  order._id = id
  return order
}

module.exports = {
  query,
  add,
  update
}
