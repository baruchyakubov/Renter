const dbService = require('../../services/db.service')
const utilService = require('../../services/utilService.js')
const ObjectId = require('mongodb').ObjectId

async function query(loggedInUserId) {
  const collection = await dbService.getCollection('order')
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

async function addReview(review, orderId) {
  try {
    const collection = await dbService.getCollection('order')
    review.id = utilService.makeId()
    review.createdAt = Date.now()
    await collection.updateOne(
      { _id: ObjectId(orderId) },
      { $push: { reviews: review } }
    )
    return review
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addMsg(orderId, msg) {
  const order = await getById(orderId)
  order.msgs = order.msgs || []
  order.msgs.push(msg)
  update(order)
}

function _buildCriteria(filterBy) {
  const criteria = {}
  console.log('filterBy', filterBy)
  if (filterBy.country) {
    const txtCriteria = { $regex: filterBy.country, $options: 'i' }
    criteria.name = txtCriteria
  }
  if(filterBy.label){
    const labelCriteria = { $regex: filterBy.label, $options: 'i' }
    criteria.type = labelCriteria
  }
  return criteria
}

module.exports = {
  query,
  add,
  update,
  addReview,
  addMsg,
}
