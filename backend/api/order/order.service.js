const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(loggedInUserId) {
  const collection = await dbService.getCollection('order')
  var orders = await collection.find({ hostId: { $eq: loggedInUserId } }).sort({"createdAt":-1}).toArray()
  return orders
}

async function queryUserOrders(loggedInUserId) {
  const collection = await dbService.getCollection('order')
  console.log(loggedInUserId);
  var orders = await collection.find({'buyer._id': loggedInUserId }).sort({"createdAt":-1}).toArray()
  console.log(orders);
  return orders
}

async function add(order) {
  try {
    const collection = await dbService.getCollection('order')
    const { ops } = await collection.insertOne(order)
    return ops[0]
  }catch(err){
    throw err
  }
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
  update,
  queryUserOrders
}
